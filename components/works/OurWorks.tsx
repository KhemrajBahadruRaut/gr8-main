"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type CSSProperties } from "react";
import {
  LoadingImage,
  WorksFrame,
  WorksLoading,
  styles,
  useWorksContent,
} from "./WorksShared";
import type { WorkRoute } from "@/lib/works-content";

const DETAIL_ROUTES: WorkRoute[] = [
  "digital-marketing",
  "web-development",
  "virtual-assistance",
];

export default function OurWorks() {
  const router = useRouter();
  const content = useWorksContent();

  useEffect(() => {
    const section = new URL(window.location.href).searchParams.get("section") as WorkRoute | null;
    if (section && DETAIL_ROUTES.includes(section)) {
      router.replace(`/works/${section}/`);
    }
  }, [router]);

  return (
    <WorksFrame>
      {!content ? (
        <WorksLoading />
      ) : (
        <>
          <header className={styles.homeHeader}>
            {content.home.eyebrow && <p className={styles.eyebrow}>{content.home.eyebrow}</p>}
            <h1>{content.home.title}</h1>
            {content.home.description && (
              <p className={styles.homeDescription}>{content.home.description}</p>
            )}
          </header>

          <div className={styles.panelGrid}>
            {content.home.panels.map((panel, index) => (
              <Link
                key={panel.route}
                href={`/works/${panel.route}/`}
                className={styles.panel}
                style={{ "--panel-accent": panel.accent } as CSSProperties}
              >
                <LoadingImage
                  src={panel.image_url}
                  alt={panel.title}
                  className={styles.panelImage}
                  priority={index === 0}
                />
                <span className={styles.panelOverlay} />
                <span className={styles.panelContent}>
                  <span className={styles.panelTag}>{panel.tag}</span>
                  <h2>{panel.title}</h2>
                  {panel.description && <p>{panel.description}</p>}
                  <span className={styles.panelAction}>Explore →</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </WorksFrame>
  );
}
