type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  const measurementId = import.meta.env.VITE_GA_ID as string | undefined;
  if (!measurementId) return;

  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
