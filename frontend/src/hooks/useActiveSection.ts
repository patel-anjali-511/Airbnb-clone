import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks the active section on scroll inside a custom modal container.
 * Calculates position using container's scrollTop + section offsetTop values.
 * Temporarily ignores updates during programmatic smooth scrolls.
 */
export function useActiveSection(
  sectionIds: string[],
  containerRef: RefObject<HTMLDivElement | null>,
  isProgrammaticScrollRef: RefObject<boolean>,
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !sectionIds.length) return;

    const handleScroll = () => {
      // Skip scroll detection if we are programmatically scrolling
      if (isProgrammaticScrollRef.current) return;

      // Scroll offset threshold is minimal (e.g. ~30px) since top bar elements scroll away naturally
      const offsetThreshold = 30;
      const currentScroll = container.scrollTop + offsetThreshold;

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        // Check if container scrolled past section's offsetTop
        if (el.offsetTop <= currentScroll) {
          current = id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to initialize correct state
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [sectionIds, containerRef, isProgrammaticScrollRef]);

  return activeId;
}
