"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { WorkRoute } from "@/lib/works-content";
import { getGr8ApiBase } from "@/lib/gr8-api";
import { ProjectVerificationGate, ProjectVisitTracker } from "./ProjectVerification";
import { WorksFrame, WorksLoading } from "./WorksShared";

export default function ProjectPageAccess({ category, children }: { category: WorkRoute; children: ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const checkAccess = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch(`${getGr8ApiBase()}/project-visitors/get_session.php`, {
        credentials: "include", cache: "no-store", signal,
      });
      const data = await response.json();
      if (!signal?.aborted) setVerified(response.ok && data.verified === true);
    } catch { if (!signal?.aborted) setVerified(false); }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    void checkAccess(controller.signal);
    return () => controller.abort();
  }, [checkAccess]);
  if (verified === null) return <WorksFrame><WorksLoading label="Checking project access" /></WorksFrame>;
  if (!verified) return <ProjectVerificationGate category={category} onVerified={() => void checkAccess()} />;
  return <><ProjectVisitTracker category={category} />{children}</>;
}
