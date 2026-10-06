import React, { useMemo, useState } from 'react';
import { Check, Copy, Facebook, Link2, MessageCircle, Share2, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return 'https://chaiwala-gamma.vercel.app/?ref=share';
    const url = new URL(window.location.href);
    url.searchParams.set('ref', 'share');
    return url.toString();
  }, [isOpen]);

  const shareText = 'Take a chai break ☕ — listen to Indian tapri ambience, lo-fi music and relaxing chai sounds at Chai Wala.';

  if (!isOpen) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this Chai Wala link:', shareUrl);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: 'Chai Wala', text: shareText, url: shareUrl });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Share Chai Wala">
      <div className="w-full max-w-md rounded-3xl border border-[#ffecd6]/15 bg-[#160d09]/95 shadow-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#f2b877] text-xs uppercase tracking-[0.2em] font-semibold">Pass the chai</p>
            <h2 className="font-display text-2xl text-[#f5e9dc]">Share Chai Wala</h2>
          </div>
          <button onClick={onClose} aria-label="Close share dialog" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-[#f5e9dc]/70 leading-relaxed mb-5">{shareText}</p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button onClick={nativeShare} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#e8934a]/15 border border-[#e8934a]/30 py-3 hover:bg-[#e8934a]/25">
              <Share2 className="w-5 h-5 text-[#f2b877]" />
              <span className="text-[11px]">Share</span>
            </button>
          )}
          <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 border border-white/10 py-3 hover:bg-white/10">
            <MessageCircle className="w-5 h-5 text-[#f2b877]" />
            <span className="text-[11px]">WhatsApp</span>
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 border border-white/10 py-3 hover:bg-white/10">
            <Facebook className="w-5 h-5 text-[#f2b877]" />
            <span className="text-[11px]">Facebook</span>
          </a>
        </div>

        <button onClick={copyLink} className="w-full flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10">
          <span className="flex items-center gap-2 text-sm text-[#f5e9dc]/80 min-w-0">
            <Link2 className="w-4 h-4 text-[#f2b877]" />
            <span className="truncate">{shareUrl}</span>
          </span>
          {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5 text-[#f2b877]" />}
        </button>

        <p className="mt-4 text-center text-[11px] text-[#f5e9dc]/45">Every share helps a real person discover the tapri.</p>
      </div>
    </div>
  );
};
