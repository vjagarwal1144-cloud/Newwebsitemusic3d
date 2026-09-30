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
  loadPlaylist: (options: { listType: 'playlist'; list: string; index?: number; startSeconds?: number }) => void;
  cuePlaylist: (options: { listType: 'playlist'; list: string }) => void;
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

// Curated fallback lo-fi tracks in case offline / initial state
const FALLBACK_TRACKS: CurrentTrack[] = [
  {
    id: 'chai_01',
    title: 'Rain over Chandni Chowk (Sitar & Lo-fi)',
    author: 'Chaiwala Soundscapes',
    duration: 184,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_02',
    title: 'Warm Kulhad in the Morning Mist',
    author: 'Tapri Beats Collective',
    duration: 210,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
  {
    id: 'chai_03',
    title: 'Midnight Cardamom & Rainy Windows',
    author: 'Dhaba Lounge',
    duration: 195,
    thumbnailUrl: `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
  },
];

export function useYouTubePlayer(initialPlaylistId = 'PLSW-rtFaY_80') {
  const [playlistId, setPlaylistId] = useState(initialPlaylistId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [playlistVideoIds, setPlaylistVideoIds] = useState<string[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrack[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(FALLBACK_TRACKS[0]);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const containerId = 'youtube-ambient-player';
  const progressTimerRef = useRef<number | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    let scriptLoaded = false;
    const existingScript = document.getElementById('yt-iframe-api');

    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      scriptLoaded = true;
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const playerTarget = document.getElementById(containerId);
      if (!playerTarget) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
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
            setIsReady(true);
            setErrorMsg(null);
            event.target.setVolume(volume);
            event.target.cuePlaylist({
              listType: 'playlist',
              list: playlistId,
            });
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
              setErrorMsg("That playlist's videos cannot be embedded outside YouTube. Showing tapri ambient station.");
            } else if (code === 100) {
              setErrorMsg('Playlist or video not found.');
            } else {
              setErrorMsg('Unable to play track on this network. Ambient soundscapes remain active.');
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
        } catch {
          // ignore
        }
      }
    };
  }, [playlistId]);

  // Track progress updater
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        if (playerRef.current) {
          try {
            const curr = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 180;
            setCurrentTime(curr);
            if (dur > 0) setDuration(dur);
            setPlaylistIndex(playerRef.current.getPlaylistIndex() || 0);
          } catch {
            // ignore
          }
        }
      }, 800);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying]);

  const updateTrackData = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const data = playerRef.current.getVideoData();
      const dur = playerRef.current.getDuration() || 180;
      if (data && data.title) {
        setCurrentTrack({
          id: data.video_id,
          title: data.title || 'Chai Wala Radio',
          author: data.author || 'Lo-fi Tea Lounge',
          duration: dur,
          thumbnailUrl: data.video_id
            ? `https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg`
            : `${import.meta.env.BASE_URL}background/chaiwala.jpg`,
        });
      }
    } catch {
      // fallback
    }
  }, []);

  const fetchPlaylistMetadata = async (videoIds: string[]) => {
    // Populate track titles
    const tracks: PlaylistTrack[] = videoIds.slice(0, 20).map((id, index) => ({
      id,
      title: `Track #${index + 1} · Lo-fi Instrumental`,
      author: 'Chaiwala Radio',
    }));
    setPlaylistTracks(tracks);

    // Fetch accurate oEmbed title for first few tracks
    for (let i = 0; i < Math.min(6, videoIds.length); i++) {
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
      } catch {
        // ignore
      }
    }
  };

  const play = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } catch {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.nextVideo();
        setTimeout(updateTrackData, 500);
      } catch {}
    }
  }, [updateTrackData]);

  const previous = useCallback(() => {
    if (playerRef.current) {
      try {
        playerRef.current.previousVideo();
        setTimeout(updateTrackData, 500);
      } catch {}
    }
  }, [updateTrackData]);

  const playIndex = useCallback((index: number) => {
    if (playerRef.current) {
      try {
        playerRef.current.playVideoAt(index);
        setTimeout(updateTrackData, 500);
      } catch {}
    }
  }, [updateTrackData]);

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current) {
      try {
        playerRef.current.seekTo(seconds, true);
        setCurrentTime(seconds);
      } catch {}
    }
  }, []);

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

  const switchPlaylist = useCallback((newId: string) => {
    setPlaylistId(newId);
    setErrorMsg(null);
    if (playerRef.current) {
      try {
        playerRef.current.loadPlaylist({
          listType: 'playlist',
          list: newId,
        });
      } catch {}
    }
  }, []);

  return {
    containerId,
    isPlaying,
    isReady,
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
