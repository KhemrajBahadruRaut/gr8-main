"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2, MailCheck, ShieldCheck, X } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/project-access";
import type { WorkRoute } from "@/lib/works-content";
import { getGr8ApiBase } from "@/lib/gr8-api";
import { WorksFrame } from "./WorksShared";
import styles from "./project-verification.module.css";

async function accessRequest(endpoint: string, body?: Record<string, string>) {
  const response = await fetch(`${getGr8ApiBase()}/project-visitors/${endpoint}.php`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || "Unable to verify your email. Please try again.");
    throw Object.assign(error, { retryAfter: data.retry_after });
  }
  return data;
}

export function ProjectVerificationDialog({ category, onClose, onVerified }: {
  category: WorkRoute; onClose: () => void; onVerified: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"details" | "code">("details");
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const pending = useRef(false);
  const onVerifiedRef = useRef(onVerified);
  onVerifiedRef.current = onVerified;

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let disposed = false;
    accessRequest("get_session").then((data) => {
      if (!disposed && data.verified) onVerifiedRef.current();
    }).catch(() => {
      // The form remains available if an initial session check fails.
    }).finally(() => { if (!disposed) setChecking(false); });
    return () => {
      disposed = true;
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!checking) dialogRef.current?.querySelector<HTMLInputElement>(step === "code" ? "#project-code" : "#project-name")?.focus();
  }, [checking, step]);

  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function sendCode() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const data = await accessRequest("request_code", { name: name.trim(), email: email.trim(), category });
      setEmail(data.email);
      setCode("");
      setStep("code");
      setCooldown(data.retry_after || 60);
      setNotice("Verification code sent. Check your inbox and spam folder.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send the code. Please try again.");
      if (err && typeof err === "object" && "retryAfter" in err && typeof err.retryAfter === "number") setCooldown(err.retryAfter);
    } finally { pending.current = false; setBusy(false); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === "details") { await sendCode(); return; }
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      await accessRequest("verify", { code });
      onVerifiedRef.current();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify the code. Please try again.");
    } finally { pending.current = false; setBusy(false); }
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="project-verification-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close verification"><X size={20} /></button>
        <div className={styles.icon}>{step === "code" ? <MailCheck size={30} /> : <ShieldCheck size={30} />}</div>
        <p className={styles.eyebrow}>{PROJECT_CATEGORIES[category]}</p>
        <h2 id="project-verification-title">{step === "code" ? "Check your email" : "Explore our projects"}</h2>
        <p className={styles.description}>{step === "code"
          ? <>Enter the six-digit code sent to <strong>{email}</strong>. Your code expires in 10 minutes.</>
          : "Tell us a little about yourself. Verify your email to explore our work."}</p>
        {checking ? <div className={styles.checking} role="status"><Loader2 className={styles.spinner} size={22} /> Checking project access…</div> : (
          <form onSubmit={submit} className={styles.form}>
            {step === "details" ? <>
              <label htmlFor="project-name">Full name</label>
              <input id="project-name" name="name" autoComplete="name" required minLength={2} maxLength={100}
                value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" disabled={busy} />
              <label htmlFor="project-email">Email address</label>
              <input id="project-email" name="email" type="email" autoComplete="email" required maxLength={254}
                value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" disabled={busy} />
            </> : <>
              <label htmlFor="project-code">Verification code</label>
              <input id="project-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code"
                pattern="[0-9]{6}" maxLength={6} required className={styles.code}
                value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000" disabled={busy} />
            </>}
            {error && <p className={styles.error} role="alert">{error}</p>}
            {notice && <p className={styles.notice} role="status">{notice}</p>}
            <button type="submit" className={styles.submit} disabled={busy || (step === "details" && cooldown > 0)}>
              {busy ? <><Loader2 size={18} className={styles.spinner} /> {step === "code" ? "Verifying…" : "Sending code…"}</>
                : <>{step === "code" ? "Verify & view projects" : cooldown > 0 ? `Try again in ${cooldown}s` : "Send verification code"}<ArrowRight size={18} /></>}
            </button>
            {step === "code" && <div className={styles.actions}>
              <button type="button" disabled={busy || cooldown > 0} onClick={() => void sendCode()}>
                {cooldown ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
              <button type="button" disabled={busy} onClick={() => { setStep("details"); setCode(""); setError(""); setNotice(""); }}>Change email</button>
            </div>}
            <p className={styles.privacy}>We save your name and verified email with the projects you visit so our team can follow up. <Link href="/privacy/">Privacy policy</Link></p>
          </form>
        )}
      </div>
    </dialog>
  );
}

export function ProjectVerificationGate({ category, onVerified }: { category: WorkRoute; onVerified: () => void }) {
  const router = useRouter();
  const close = useCallback(() => router.push("/projects/"), [router]);
  return <WorksFrame>
    <div className={styles.locked}>
      <ShieldCheck size={42} />
      <h1>{PROJECT_CATEGORIES[category]}</h1>
      <p>Verify your email to view our projects.</p>
      <Link href="/projects/">Back to projects</Link>
    </div>
    <ProjectVerificationDialog category={category} onClose={close} onVerified={onVerified} />
  </WorksFrame>;
}

export function ProjectVisitTracker({ category }: { category: WorkRoute }) {
  const visitId = useRef<string | null>(null);
  useEffect(() => {
    visitId.current ||= typeof crypto.randomUUID === "function" ? crypto.randomUUID()
      : Array.from(crypto.getRandomValues(new Uint8Array(18)), (value) => value.toString(16).padStart(2, "0")).join("");
    let disposed = false;
    let timer: number | undefined;
    const record = async () => {
      try {
        const response = await fetch(`${getGr8ApiBase()}/project-visitors/record_visit.php`, {
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({ category, visit_id: visitId.current }), keepalive: true,
        });
        if (!response.ok) throw new Error("Visit could not be recorded.");
      } catch { if (!disposed) timer = window.setTimeout(() => void record(), 10000); }
    };
    void record();
    return () => { disposed = true; if (timer) window.clearTimeout(timer); };
  }, [category]);
  return null;
}
