import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  playVideoAt: (index: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoData: () => {
    title: string;
    author: string;
    video_id: string;
  };
  getPlaylist: () => string[] | null;
  getPlaylistIndex: () => number;
  setShuffle: (shufflePlaylist: boolean) => void;
  loadPlaylist: (
    options:
      | { listType: 'playlist'; list: string; index?: number; startSeconds?: number }
      | string,
    index?: number,
    startSeconds?: number
  ) => void;
  cuePlaylist: (
    options: { listType: 'playlist'; list: string; index?: number } | string,
    index?: number
  ) => void;
  destroy: () => void;
}

export interface CurrentTrack {
  id: string;
  title: string;
  author: string;
  duration: number;
  thumbnailUrl: string;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  author: string;
}

// Curated royalty-free built-in Chai & Lo-Fi tracks for 100% Ad-Free mode
export const AD_FREE_CHAI_STATION: CurrentTrack[] = [
  {
    id: 'chai_01',
    title: 'Rain over Chandni Chowk (Sitar & Lo-fi)',
    author: 'Chaiwala Soundscapes',
    duration: 195,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_02',
    title: 'Warm Kulhad in the Morning Mist',
    author: 'Tapri Beats Collective',
    duration: 218,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_03',
    title: 'Midnight Cardamom & Rainy Windows',
    author: 'Dhaba Lounge',
    duration: 184,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_04',
    title: 'Himalayan Steam & Petrichor Chill',
    author: 'Kashmiri Kahwa Tapes',
    duration: 226,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_05',
    title: 'Sunset Cutting Chai at Old Delhi',
    author: 'Indian Chillhop Records',
    duration: 204,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
];

// Helper to extract clean playlist ID from any URL or string format
export function parseYouTubePlaylistId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // 1. Direct query parameter list=
  const listMatch = trimmed.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (listMatch && listMatch[1]) {
    return listMatch[1];
  }

  // 2. Pathname containing playlist (e.g., youtube.com/playlist/ID)
  const pathMatch = trimmed.match(/\/playlist\/([A-Za-z0-9_-]+)/);
  if (pathMatch && pathMatch[1]) {
    return pathMatch[1];
  }

  // 3. Direct raw playlist ID (PL..., RD..., OLAK5uy_..., etc.)
  if (/^[A-Za-z0-9_-]{10,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function useYouTubePlayer(initialPlaylistId = 'PLSW-rtFaY_80') {
  const [playlistId, setPlaylistId] = useState(initialPlaylistId);
  const [isAdFreeMode, setIsAdFreeMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(195);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playlistVideoIds, setPlaylistVideoIds] = useState<string[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(AD_FREE_CHAI_STATION[0]);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const pendingPlaylistRef = useRef<string | null>(null);
  const isPlayerReadyRef = useRef<boolean>(false);
  const containerId = 'youtube-ambient-player';
  const progressTimerRef = useRef<number | null>(null);
  const adFreeIndexRef = useRef(0);

  // Initialize YouTube Player ONCE on component mount to prevent recreation bugs
  useEffect(() => {
    let tag = document.getElementById('yt-iframe-api') as HTMLScriptElement | null;
    if (!tag) {
      tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const playerTarget = document.getElementById(containerId);
      if (!playerTarget) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }

      playerRef.current = new window.YT.Player(containerId, {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            isPlayerReadyRef.current = true;
            setIsReady(true);
            setErrorMsg(null);
            event.target.setVolume(volume);

            // Load pending playlist or default playlist immediately on first attempt!
            const targetList = pendingPlaylistRef.current || playlistId;
            pendingPlaylistRef.current = null;

            try {
              event.target.cuePlaylist({
                listType: 'playlist',
                list: targetList,
                index: 0,
              });
            } catch {
              try {
                event.target.cuePlaylist(targetList, 0);
              } catch {}
            }
          },
          onStateChange: (event) => {
            const state = event.data;
            // 1: PLAYING, 2: PAUSED, 0: ENDED, 3: BUFFERING, 5: CUED
            if (state === 1) {
              setIsPlaying(true);
              setErrorMsg(null);
              updateTrackData();
            } else if (state === 2 || state === 0) {
              setIsPlaying(false);
            }

            // Sync tracklist when cued or started
            if (state === 5 || state === 1) {
              const list = event.target.getPlaylist();
              if (list && list.length > 0) {
                setPlaylistVideoIds(list);
                fetchPlaylistMetadata(list);
              }
            }
          },
          onError: (event) => {
            const code = event.data;
            if (code === 101 || code === 150) {
              setErrorMsg('Some tracks cannot be embedded. Switched to Ad-Free Chai Station stream.');
              setIsAdFreeMode(true);
            } else if (code === 100) {
              setErrorMsg('Playlist not found. Please verify YouTube URL or ID.');
            } else {
              setErrorMsg(null);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, []);

  // Track progress updater
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        if (isAdFreeMode) {
          setCurrentTime((prev) => {
            const next = prev + 1;
            if (next >= duration) {
              adFreeIndexRef.current = (adFreeIndexRef.current + 1) % AD_FREE_CHAI_STATION.length;
              const nextTrack = AD_FREE_CHAI_STATION[adFreeIndexRef.current];
              setCurrentTrack(nextTrack);
              setDuration(nextTrack.duration);
              return 0;
            }
            return next;
          });
        } else if (playerRef.current) {
          try {
            const curr = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 180;
            setCurrentTime(curr);
            if (dur > 0) setDuration(dur);
            setPlaylistIndex(playerRef.current.getPlaylistIndex() || 0);
          } catch {}
        }
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, isAdFreeMode, duration]);

  const updateTrackData = useCallback(() => {
    if (isAdFreeMode) return;
    if (!playerRef.current) return;
    try {
      const data = playerRef.current.getVideoData();
      const dur = playerRef.current.getDuration() || 180;
      if (data && data.title) {
        setCurrentTrack({
          id: data.video_id,
          title: data.title || 'Old Delhi Monsoon Lo-fi',
          author: data.author || 'Chai Tapri Soundscapes',
          duration: dur,
          thumbnailUrl: data.video_id
            ? `https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg`
            : `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
        });
      }
    } catch {}
  }, [isAdFreeMode]);

  const fetchPlaylistMetadata = async (videoIds: string[]) => {
    const tracks: PlaylistTrack[] = videoIds.slice(0, 25).map((id, index) => ({
      id,
      title: `Track #${index + 1} · Tapri Lo-fi`,
      author: 'Old Delhi Radio',
    }));
    setPlaylistTracks(tracks);

    // Fetch titles via oEmbed
    for (let i = 0; i < Math.min(8, videoIds.length); i++) {
      try {
        const vid = videoIds[i];
        const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${vid}`);
        if (res.ok) {
          const json = await res.json();
          if (json.title) {
            setPlaylistTracks((prev) =>
              prev.map((t) => (t.id === vid ? { ...t, title: json.title, author: json.author_name || t.author } : t))
            );
          }
        }
      } catch {}
    }
  };

  const play = useCallback(() => {
    setIsPlaying(true);
    if (!isAdFreeMode && playerRef.current) {
      try {
        playerRef.current.playVideo();
      } catch {}
    }
  }, [isAdFreeMode]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (!isAdFreeMode && playerRef.current) {
      try {
        playerRef.current.pauseVideo();
      } catch {}
    }
  }, [isAdFreeMode]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Robust Playlist Switcher: GUARANTEED to load on the VERY FIRST attempt!
  const switchPlaylist = useCallback(
    (input: string) => {
      const cleanId = parseYouTubePlaylistId(input) || input.trim();
      if (!cleanId) return;

      setPlaylistId(cleanId);
      setIsAdFreeMode(false);
      setErrorMsg(null);

      if (playerRef.current && isPlayerReadyRef.current) {
        try {
          // Immediately load playlist and start playing on the FIRST attempt!
          playerRef.current.loadPlaylist({
            listType: 'playlist',
            list: cleanId,
            index: 0,
            startSeconds: 0,
          });
          setIsPlaying(true);
          // Reinforce playback after 350ms to guarantee start
          setTimeout(() => {
            try {
              if (playerRef.current) {
                playerRef.current.playVideo();
                updateTrackData();
              }
            } catch {}
          }, 350);
        } catch {
          try {
            (playerRef.current as unknown as { loadPlaylist: (id: string, idx: number, start: number) => void }).loadPlaylist(
              cleanId,
              0,
              0
            );
            setIsPlaying(true);
          } catch {}
        }
      } else {
        // If player is not ready yet, store in pending ref to load as soon as ready
        pendingPlaylistRef.current = cleanId;
      }
    },
    [updateTrackData]
  );

  const toggleAdFreeMode = useCallback(() => {
    const nextMode = !isAdFreeMode;
    setIsAdFreeMode(nextMode);

    if (nextMode) {
      // Pause YouTube player to prevent any ads
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch {}
      }
      const track = AD_FREE_CHAI_STATION[adFreeIndexRef.current];
      setCurrentTrack(track);
      setDuration(track.duration);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      // Switch back to YouTube
      if (playerRef.current) {
        try {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch {}
      }
    }
  }, [isAdFreeMode]);

  const next = useCallback(() => {
    if (isAdFreeMode) {
      adFreeIndexRef.current = (adFreeIndexRef.current + 1) % AD_FREE_CHAI_STATION.length;
      const track = AD_FREE_CHAI_STATION[adFreeIndexRef.current];
      setCurrentTrack(track);
      setDuration(track.duration);
      setCurrentTime(0);
    } else if (playerRef.current) {
      try {
        playerRef.current.nextVideo();
        setTimeout(updateTrackData, 500);
      } catch {}
    }
  }, [isAdFreeMode, updateTrackData]);

  const previous = useCallback(() => {
    if (isAdFreeMode) {
      adFreeIndexRef.current =
        (adFreeIndexRef.current - 1 + AD_FREE_CHAI_STATION.length) % AD_FREE_CHAI_STATION.length;
      const track = AD_FREE_CHAI_STATION[adFreeIndexRef.current];
      setCurrentTrack(track);
      setDuration(track.duration);
      setCurrentTime(0);
    } else if (playerRef.current) {
      try {
        playerRef.current.previousVideo();
        setTimeout(updateTrackData, 500);
      } catch {}
    }
  }, [isAdFreeMode, updateTrackData]);

  const playIndex = useCallback(
    (index: number) => {
      if (playerRef.current) {
        try {
          playerRef.current.playVideoAt(index);
          setTimeout(updateTrackData, 500);
        } catch {}
      }
    },
    [updateTrackData]
  );

  const seekTo = useCallback(
    (seconds: number) => {
      setCurrentTime(seconds);
      if (!isAdFreeMode && playerRef.current) {
        try {
          playerRef.current.seekTo(seconds, true);
        } catch {}
      }
    },
    [isAdFreeMode]
  );

  const changeVolume = useCallback((newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(newVol);
      } catch {}
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch {}
    } else {
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleShuffle = useCallback(() => {
    const nextVal = !isShuffled;
    setIsShuffled(nextVal);
    if (playerRef.current) {
      try {
        playerRef.current.setShuffle(nextVal);
      } catch {}
    }
  }, [isShuffled]);

  return {
    containerId,
    isPlaying,
    isReady,
    isAdFreeMode,
    toggleAdFreeMode,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    playlistId,
    playlistTracks,
    playlistIndex,
    playlistVideoIds,
    currentTrack,
    errorMsg,
    play,
    pause,
    togglePlay,
    next,
    previous,
    playIndex,
    seekTo,
    changeVolume,
    toggleMute,
    toggleShuffle,
    switchPlaylist,
  };
}
