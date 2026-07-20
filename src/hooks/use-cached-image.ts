import { useState, useEffect, useRef } from "react";

const CACHE_NAME = "zola-auth-images";

async function resolveCachedUrl(src: string): Promise<string> {
  try {
    if (typeof caches === "undefined") return src;
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(src);
    if (hit) {
      const blob = await hit.blob();
      return URL.createObjectURL(blob);
    }
    const res = await fetch(src, { mode: "cors" });
    if (!res.ok) return src;
    await cache.put(src, res.clone());
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return src;
  }
}

/**
 * Returns a cached (blob) URL for the given image src.
 * - On first load: fetches from network, caches it, returns blob URL.
 * - On subsequent loads: reads from Cache API, returns blob URL.
 * - If cache and network both fail: returns the original src (graceful degradation).
 */
export function useCachedImage(src: string): string {
  const [url, setUrl] = useState(src);
  const urlRef = useRef(src);

  useEffect(() => {
    let cancelled = false;
    resolveCachedUrl(src)
      .then((resolved) => {
        if (cancelled) {
          if (resolved !== src && resolved.startsWith("blob:")) {
            URL.revokeObjectURL(resolved);
          }
          return;
        }
        if (urlRef.current !== src && urlRef.current.startsWith("blob:")) {
          URL.revokeObjectURL(urlRef.current);
        }
        urlRef.current = resolved;
        setUrl(resolved);
      })
      .catch(() => {
        // resolveCachedUrl has internal error handling, but guard against edge cases
        if (!cancelled) setUrl(src);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  return url;
}