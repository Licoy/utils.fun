"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 240;
const FAILSAFE_MS = 8000;

type RouteTransitionContextValue = {
  start: () => void;
};

const RouteTransitionContext = React.createContext<RouteTransitionContextValue | null>(null);

function isModifiedEvent(event: MouseEvent) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isNavigableAnchor(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") {
    return false;
  }

  if (anchor.hasAttribute("download")) {
    return false;
  }

  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#")) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  if (url.pathname === window.location.pathname && url.search === window.location.search) {
    return false;
  }

  return true;
}

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const [pending, setPending] = React.useState(false);
  const pendingRef = React.useRef(false);
  const startedAtRef = React.useRef<number | null>(null);
  const clearPendingTimeoutRef = React.useRef<number | null>(null);
  const failsafeTimeoutRef = React.useRef<number | null>(null);

  const clearTimers = React.useCallback(() => {
    if (clearPendingTimeoutRef.current !== null) {
      window.clearTimeout(clearPendingTimeoutRef.current);
      clearPendingTimeoutRef.current = null;
    }

    if (failsafeTimeoutRef.current !== null) {
      window.clearTimeout(failsafeTimeoutRef.current);
      failsafeTimeoutRef.current = null;
    }
  }, []);

  const finish = React.useCallback(() => {
    if (!pendingRef.current) {
      return;
    }

    clearTimers();

    const startedAt = startedAtRef.current ?? performance.now();
    const elapsed = performance.now() - startedAt;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    clearPendingTimeoutRef.current = window.setTimeout(() => {
      pendingRef.current = false;
      startedAtRef.current = null;
      setPending(false);
      clearPendingTimeoutRef.current = null;
    }, delay);
  }, [clearTimers]);

  const start = React.useCallback(() => {
    clearTimers();

    if (!pendingRef.current) {
      pendingRef.current = true;
      startedAtRef.current = performance.now();
      setPending(true);
    }

    failsafeTimeoutRef.current = window.setTimeout(() => {
      pendingRef.current = false;
      startedAtRef.current = null;
      setPending(false);
      failsafeTimeoutRef.current = null;
    }, FAILSAFE_MS);
  }, [clearTimers]);

  React.useEffect(() => {
    function onClick(event: MouseEvent) {
      if (isModifiedEvent(event)) {
        return;
      }

      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const anchor = target.closest("a");

      if (!(anchor instanceof HTMLAnchorElement) || !isNavigableAnchor(anchor)) {
        return;
      }

      start();
    }

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, [start]);

  React.useEffect(() => {
    finish();
  }, [finish, pathname, searchKey]);

  React.useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <RouteTransitionContext.Provider value={{ start }}>
      {children}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[80] transition-opacity duration-200",
          pending ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="h-1 border-b border-border/40 bg-background/70">
          <div className="route-transition-bar h-full w-full bg-primary/35" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-0 z-[70] transition-opacity duration-200",
          pending ? "bg-background/18 opacity-100 backdrop-blur-[1px]" : "opacity-0",
        )}
      />
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  return React.useContext(RouteTransitionContext) ?? { start: () => {} };
}
