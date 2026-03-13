"use client";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ScrollBottomButton({
  labels,
}: {
  labels: {
    top: string;
    bottom: string;
  };
}) {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = scrollHeight - viewportHeight - scrollTop;
      const hasOverflow = scrollHeight > viewportHeight + 160;

      setCanScrollUp(hasOverflow && scrollTop > 240);
      setCanScrollDown(hasOverflow && distanceFromBottom > 240);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!canScrollUp && !canScrollDown) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      {canScrollUp ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={labels.top}
          title={labels.top}
          className="pointer-events-auto size-11 rounded-full shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <ChevronsUp className="size-4" />
        </Button>
      ) : null}
      {canScrollDown ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={labels.bottom}
          title={labels.bottom}
          className="pointer-events-auto size-11 rounded-full shadow-lg backdrop-blur transition-transform hover:translate-y-0.5"
          onClick={() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <ChevronsDown className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}
