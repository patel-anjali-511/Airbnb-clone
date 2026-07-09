import { useEffect, useRef } from "react";

/**
 * Observes multiple section refs and calls onIntersect
 * with the id of the section that is currently in view.
 */
export function useIntersectionObserver(
  sectionIds: string[],
  onIntersect: (id: string) => void,
  options: IntersectionObserverInit = {}
) {
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Disconnect any previous observers
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // trigger when element is in upper 40% of viewport
      threshold: 0,
      ...options,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onIntersect(id);
        }
      }, defaultOptions);

      observer.observe(el);
      observersRef.current.push(observer);
    });

    return () => {
      observersRef.current.forEach((o) => o.disconnect());
    };
  }, [sectionIds.join(",")]); // eslint-disable-line
}
