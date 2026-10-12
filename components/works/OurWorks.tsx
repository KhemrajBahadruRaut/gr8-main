"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import {
  LoadingImage,
  WorksFrame,
  WorksLoading,
  styles,
  useWorksContent,
} from "./WorksShared";
import type { WorkRoute } from "@/lib/works-content";
import { ProjectVerificationDialog } from "./ProjectVerification";

const DETAIL_ROUTES: WorkRoute[] = [
  "digital-marketing",
  "web-development",
  "virtual-assistance",
];

export default function OurWorks() {
  const router = useRouter();
  const content = useWorksContent();
  const [requestedRoute, setRequestedRoute] = useState<WorkRoute | null>(null);

  useEffect(() => {
    const section = new URL(window.location.href).searchParams.get("section") as WorkRoute | null;
    if (section && DETAIL_ROUTES.includes(section)) {
      setRequestedRoute(section);
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
                href={`/projects/${panel.route}/`}
                prefetch={false}
                onClick={(event) => {
                  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  setRequestedRoute(panel.route);
                }}
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
      {requestedRoute && (
        <ProjectVerificationDialog
          key={requestedRoute}
          category={requestedRoute}
          onClose={() => setRequestedRoute(null)}
          onVerified={() => {
            router.push(`/projects/${requestedRoute}/`);
            setRequestedRoute(null);
          }}
        />
      )}
    </WorksFrame>
  );
}
