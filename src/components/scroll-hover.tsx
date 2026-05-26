"use client";

import { useEffect, useMemo, useState } from "react";

export function ScrollHoverReveal() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.querySelector("main.scrollbar-thin") as HTMLElement | null;
    const target = main ?? document.documentElement;

    const onScroll = () => {
      const max = (target.scrollHeight || 1) - (target.clientHeight || 1);
      const p = max > 0 ? target.scrollTop / max : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  // Used by CSS to animate hover cards slightly as the user scrolls.
  const cssVar = useMemo(() => ({ "--scrollHover": String(progress) }), [progress]);

  return (
    <>
      <style>
        {`
          :root { --scrollHover: 0; }
          /* For elements that want scroll-based motion */
          .scroll-hover-anim { 
            transform: translateY(calc((var(--scrollHover) - 0.5) * -6px));
            transition: transform 120ms ease-out;
          }
          .scroll-hover-anim:hover { 
            transform: translateY(calc((var(--scrollHover) - 0.5) * -6px - 4px));
          }
        `}
      </style>
      {/* bind css var */}
      <div style={cssVar as React.CSSProperties} className="hidden" />
    </>
  );
}




