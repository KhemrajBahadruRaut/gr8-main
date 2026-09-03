"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { getGr8ApiBase, resolveGr8AssetUrl } from "@/lib/gr8-api";
import { normalizeWorksContent, type WorksContent } from "@/lib/works-content";
import TrustedBySection from "../banner/Banner";
import StartProjectSection from "./StartProjectSection";
import styles from "./works.module.css";

export function useWorksContent(): WorksContent | null {
  const [content, setContent] = useState<WorksContent | null>(null);

  useEffect(() => {
    let disposed = false;
    let refreshing = false;
    let retryTimer: number | null = null;
    let controller: AbortController | null = null;

    const schedule = (delay: number) => {
      if (disposed) return;
      if (retryTimer) window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => void refresh(), delay);
    };

    const refresh = async () => {
      if (disposed || refreshing) return;
      refreshing = true;
      controller = new AbortController();
      try {
        const response = await fetch(`${getGr8ApiBase()}/works/get_works.php?_=${Date.now()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load Our Works content");
        const data = await response.json();
        if (!data.success || !data.content) throw new Error("Our Works content is unavailable");
        if (!disposed) setContent(normalizeWorksContent(data.content));
        schedule(30000);
      } catch (error) {
        if (!disposed && (!(error instanceof Error) || error.name !== "AbortError")) {
          console.error("Unable to refresh Our Works content:", error);
          schedule(4000);
        }
      } finally {
        refreshing = false;
      }
    };

    const requestRefresh = () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      void refresh();
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "gr8_works_updated") requestRefresh();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") requestRefresh();
    };
    const channel = typeof BroadcastChannel !== "undefined"
      ? new BroadcastChannel("gr8_works")
      : null;

    void refresh();
    channel?.addEventListener("message", requestRefresh);
    window.addEventListener("gr8:works-updated", requestRefresh);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", requestRefresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      controller?.abort();
      if (retryTimer) window.clearTimeout(retryTimer);
      channel?.removeEventListener("message", requestRefresh);
      channel?.close();
      window.removeEventListener("gr8:works-updated", requestRefresh);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", requestRefresh);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return content;
}

export function LoadingImage({
  src,
  alt,
  className = "",
  style,
  fit = "cover",
  naturalSize = false,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fit?: CSSProperties["objectFit"];
  naturalSize?: boolean;
  priority?: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "missing">(
    src ? "loading" : "missing",
  );
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const nextSource = resolveGr8AssetUrl(src);
    setResolvedSrc(nextSource);
    setStatus(nextSource ? "loading" : "missing");
  }, [src]);

  useEffect(() => {
    if (!resolvedSrc) {
      setStatus("missing");
      return;
    }

    setStatus("loading");
    const image = imageRef.current;
    if (image?.complete) {
      setStatus(image.naturalWidth > 0 ? "loaded" : "missing");
    }
  }, [resolvedSrc]);

  return (
    <div
      className={`${styles.image} ${naturalSize && status === "missing" ? styles.naturalImageMissing : ""} ${className}`.trim()}
      style={style}
      aria-busy={status === "loading"}
    >
      {status === "loading" && (
        <div className={styles.imageLoader} role="status" aria-label="Loading image">
          <span className={styles.spinner} />
        </div>
      )}
      {status === "missing" && (
        <div className={styles.imageMissing} role="status">
          <span>No image available</span>
        </div>
      )}
      {resolvedSrc && (
        <img
          ref={imageRef}
          key={resolvedSrc}
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("missing")}
          style={{
            width: "100%",
            height: naturalSize ? "auto" : "100%",
            display: "block",
            objectFit: fit,
            opacity: status === "loaded" ? 1 : 0,
            transition: "opacity 220ms ease",
          }}
        />
      )}
    </div>
  );
}

export function WorksFrame({ children }: { children: ReactNode }) {
  return (
    <section className={styles.frame}>
      <div className={styles.shell}>{children}</div>
      <div className={styles.extras}>
        <TrustedBySection />
        <StartProjectSection />
      </div>
    </section>
  );
}

export function WorksLoading({ label = "Loading projects" }: { label?: string }) {
  return (
    <div className={styles.loading} role="status">
      <span className={styles.largeSpinner} />
      <span>{label}</span>
    </div>
  );
}

export function WorksEmpty({ label = "No image available" }: { label?: string }) {
  return (
    <div className={styles.emptyState} role="status">
      {label}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className={styles.pageHeader}>
      <Link href="/works/" className={styles.backLink}>← Back to works</Link>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {title && <h1>{title}</h1>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

export { styles };
