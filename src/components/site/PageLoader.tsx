import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import logoAsset from "@/assets/orvix-logo.png.asset.json";

const MIN_VISIBLE_MS = 650;

/**
 * Full-screen route transition loader: the Orvix logo spins in the centre
 * every time the user navigates to a different page.
 */
export function PageLoader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPending = useRouterState({ select: (s) => s.status === "pending" });

  const [visible, setVisible] = useState(false);
  const firstRender = useRef(true);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousPath.current = pathname;
      return;
    }
    if (previousPath.current === pathname && !isPending) return;
    previousPath.current = pathname;

    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), MIN_VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, [pathname, isPending]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-md animate-in fade-in duration-200"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="relative flex size-28 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full opacity-40 blur-2xl"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden
        />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand" aria-hidden />
        <img
          src={logoAsset.url}
          alt=""
          className="size-16 animate-spin rounded-2xl object-cover [animation-duration:1.6s]"
        />
      </div>
    </div>
  );
}
