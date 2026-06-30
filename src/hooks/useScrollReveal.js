import { useState, useEffect, useRef } from 'react';

export default function useScrollReveal(itemCount, options = {}) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -40px 0px',
    staggerDelay = 80,
  } = options;

  const [visible, setVisible] = useState(() => new Array(itemCount).fill(false));
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(new Array(itemCount).fill(true));
      return;
    }

    const el = containerRef.current;
    if (!el || itemCount === 0) return;

    const reveals = el.querySelectorAll('[data-reveal]');
    const startTimes = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.reveal);
          observer.unobserve(entry.target);

          const delay = index * staggerDelay;
          startTimes.set(index, performance.now() + delay);

          requestAnimationFrame(function tick(now) {
            if (now >= startTimes.get(index)) {
              setVisible((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            } else {
              requestAnimationFrame(tick);
            }
          });
        });
      },
      { threshold, rootMargin }
    );

    reveals.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [itemCount, threshold, rootMargin, staggerDelay, reducedMotion]);

  return { containerRef, visible };
}
