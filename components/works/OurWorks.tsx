"use client"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  DEFAULT_WORKS_CONTENT,
  normalizeWorksContent,
  type WebProject,
  type WorksContent,
} from "@/lib/works-content";
import TrustedBySection from "../banner/Banner";
import StartProjectSection from "./StartProjectSection";

/* Design tokens                                                     */
const BG = "#12141c";
const CARD = "#1a1d27";
const CARD_BORDER = "rgba(255,255,255,0.07)";
const ACCENT = "#e8823a";
const TEXT_DIM = "rgba(255,255,255,0.6)";
const TEXT_FAINT = "rgba(255,255,255,0.4)";

type Route = "home" | "digital-marketing" | "web-development" | "virtual-assistance";

const WORKS_API_BASE = `${
  process.env.NEXT_PUBLIC_GR8_API_URL || "https://api.gr8.com.np/gr8/api"
}/works`;

const SECTION_QUERY_KEY = "section";
const SECTION_ROUTES: Route[] = [
  "digital-marketing",
  "web-development",
  "virtual-assistance",
];

function routeFromUrl(): Route {
  if (typeof window === "undefined") return "home";
  const section = new URL(window.location.href).searchParams.get(SECTION_QUERY_KEY);
  return SECTION_ROUTES.includes(section as Route) ? (section as Route) : "home";
}

/* ---------------------------------------------------------------- */
/* Shared bits                                                       */
/* ---------------------------------------------------------------- */

function LoadingImage({
  src,
  alt,
  className = "",
  style,
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fit?: CSSProperties["objectFit"];
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`works-image ${className}`.trim()}
      style={style}
      aria-busy={!loaded && !failed}
    >
      {!loaded && !failed && (
        <div className="works-image-loader" role="status" aria-label="Loading image">
          <span className="works-image-spinner" />
        </div>
      )}
      {failed && <div className="works-image-error">Image unavailable</div>}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={(event) => {
            const image = event.currentTarget;
            if (typeof image.decode === "function") {
              void image.decode().catch(() => undefined).finally(() => setLoaded(true));
            } else {
              setLoaded(true);
            }
          }}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: fit,
            opacity: loaded ? 1 : 0,
            transition: "opacity 220ms ease",
          }}
        />
      )}
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  onBack,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  onBack: () => void;
}) {
  return (
    <div style={{ textAlign: "center", position: "relative", marginBottom: 48 }}>
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          left: 0,
          top: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.8)",
          fontSize: 14,
          cursor: "pointer",
          padding: "6px 4px",
        }}
      >
        <span style={{ fontSize: 16 }}>←</span> Back
      </button>
      <p
        style={{
          color: ACCENT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          margin: "0 0 12px",
        }}
      >
        {eyebrow}
      </p>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, margin: "0 0 12px" }}>
        {title}
      </h1>
      <p style={{ color: TEXT_DIM, fontSize: 14.5, lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
        {subtitle}
      </p>
    </div>
  );
}

function ClientLogo({ id }: { id: string }) {
  const common = { width: "100%", height: 46, overflow: "visible" as const };
  switch (id) {
    case "suvekchya":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <g transform="translate(0,4)">
            <path d="M6 19 L16 6 L20 14 L28 4 L24 19 L32 19 L18 34 Z" fill="#f0722e" />
          </g>
          <text x="40" y="20" fill="#4fb8b0" fontSize="15" fontWeight="700" fontFamily="Georgia, serif">
            Suvekchya
          </text>
          <text x="40" y="34" fill="#e7e7e7" fontSize="11" fontFamily="Georgia, serif">
            International Hospital
          </text>
        </svg>
      );
    case "reliable":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <text x="0" y="27" fill="#4fb8a8" fontSize="17" fontFamily="Georgia, serif" fontStyle="italic">
            Reliable
          </text>
          <g transform="translate(112,6)">
            <path d="M9 9 C2 2, -4 8, 4 12 C-4 16, 2 22, 9 15 C16 22, 22 16, 14 12 C22 8, 16 2, 9 9 Z" fill="#eef0e6" />
          </g>
          <text x="132" y="27" fill="#eef0e6" fontSize="17" fontFamily="Georgia, serif" fontStyle="italic">
            Care
          </text>
        </svg>
      );
    case "united":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <path d="M4 6 L26 6 L20 15 L26 24 L4 24 Z" fill="#e0483f" />
          <path d="M4 6 L26 6 L20 15 L26 24 L4 24 Z" fill="url(#g1)" opacity="0.7" />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3a63d8" />
              <stop offset="100%" stopColor="#e0483f" />
            </linearGradient>
          </defs>
          <text x="36" y="18" fill="#3a63d8" fontSize="14" fontWeight="800" letterSpacing="1">
            UNITED
          </text>
          <text x="36" y="34" fill="#d9483f" fontSize="14" fontWeight="800" letterSpacing="1">
            SUPREME
          </text>
        </svg>
      );
    case "joy":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <g transform="translate(4,0)">
            <circle cx="16" cy="14" r="7" fill="#f4b23a" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={16 + Math.cos((a * Math.PI) / 180) * 10}
                y1={14 + Math.sin((a * Math.PI) / 180) * 10}
                x2={16 + Math.cos((a * Math.PI) / 180) * 14}
                y2={14 + Math.sin((a * Math.PI) / 180) * 14}
                stroke="#f4b23a"
                strokeWidth="1.6"
              />
            ))}
            <path d="M2 24 Q16 12 30 24" fill="none" stroke="#3aa15c" strokeWidth="2.4" />
            <path d="M2 28 Q16 18 30 28" fill="none" stroke="#3a63d8" strokeWidth="2.4" />
          </g>
          <text x="42" y="16" fill="#3aa15c" fontSize="12" fontWeight="700">
            Joy Travel and
          </text>
          <text x="42" y="29" fill="#3aa15c" fontSize="12" fontWeight="700">
            Tours Pvt. Ltd.
          </text>
        </svg>
      );
    case "precision":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <circle cx="16" cy="16" r="12" fill="none" stroke="#3f8fd6" strokeWidth="2" />
          <circle cx="16" cy="16" r="4" fill="#3f8fd6" />
          <line x1="16" y1="0" x2="16" y2="6" stroke="#3f8fd6" strokeWidth="2" />
          <line x1="16" y1="26" x2="16" y2="32" stroke="#3f8fd6" strokeWidth="2" />
          <text x="36" y="16" fill="#3f8fd6" fontSize="13" fontWeight="800" letterSpacing="0.5">
            PRECISION
          </text>
          <text x="36" y="30" fill="#8fb8dd" fontSize="10" fontWeight="700" letterSpacing="1">
            DIAGNOSTICS
          </text>
        </svg>
      );
    case "parijat":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <g transform="translate(4,4)">
            {["#c65fd6", "#f4c23a", "#3aa15c"].map((c, i) => (
              <ellipse
                key={c}
                cx={12 + Math.cos((i * 120 * Math.PI) / 180) * 5}
                cy={12 + Math.sin((i * 120 * Math.PI) / 180) * 5}
                rx="6"
                ry="4"
                fill={c}
                transform={`rotate(${i * 120} ${12 + Math.cos((i * 120 * Math.PI) / 180) * 5} ${
                  12 + Math.sin((i * 120 * Math.PI) / 180) * 5
                })`}
              />
            ))}
          </g>
          <text x="40" y="18" fill="#c65fd6" fontSize="14" fontWeight="700" fontStyle="italic">
            Parijat Clinic
          </text>
          <text x="40" y="30" fill="#f4c23a" fontSize="8.5" letterSpacing="1">
            OUR SPECIALITY IS YOU
          </text>
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 220 46" {...common}>
          <g transform="translate(2,6)">
            <path d="M2 2 h4 l3 16 h14 l3 -12 h-18" fill="none" stroke="#3aa15c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="24" r="2.4" fill="#3aa15c" />
            <circle cx="21" cy="24" r="2.4" fill="#3aa15c" />
          </g>
          <text x="34" y="18" fill="#3aa15c" fontSize="15" fontWeight="800">
            Delivery
          </text>
          <text x="34" y="32" fill="#e0483f" fontSize="15" fontWeight="800" letterSpacing="1">
            mart
          </text>
        </svg>
      );
    case "rtcs":
      return (
        <svg viewBox="0 0 220 30" {...common} height={26}>
          <rect x="0" y="6" width="16" height="12" rx="2" fill="none" stroke="#dcdcdc" strokeWidth="1.6" />
          <circle cx="8" cy="12" r="3.6" fill="none" stroke="#dcdcdc" strokeWidth="1.4" />
          <text x="22" y="17" fill="#dcdcdc" fontSize="13" fontWeight="800" letterSpacing="1.5">
            RTCS
          </text>
          <text x="66" y="17" fill="#9a9a9a" fontSize="9.5" letterSpacing="1.5">
            PHOTOGRAPHY
          </text>
        </svg>
      );
    default:
      return null;
  }
}

function ClientCard({
  name,
  logoUrl,
  projectUrl,
  priority = false,
  highlighted = false,
}: {
  name: string;
  logoUrl?: string;
  projectUrl?: string;
  priority?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: highlighted ? "1.5px solid #4d9fe8" : `1px solid ${CARD_BORDER}`,
        borderRadius: 12,
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        minHeight: 150,
        boxShadow: highlighted ? "0 0 0 4px rgba(77,159,232,0.15)" : "none",
        transition: "border-color 200ms ease, transform 200ms ease",
      }}
    >
      <div
        style={{
          border: highlighted ? "1.5px dashed rgba(77,159,232,0.6)" : "none",
          borderRadius: 6,
          padding: highlighted ? "4px 6px" : 0,
        }}
      >
        <LoadingImage
          src={logoUrl || ""}
          alt={`${name} logo`}
          fit="contain"
          priority={priority}
          style={{ width: "100%", height: 46 }}
        />
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 10, lineHeight: 1.35 }}>
          {name}
        </div>
        <a
          href={projectUrl || "#"}
          onClick={(e) => {
            if (!projectUrl) e.preventDefault();
          }}
          target={projectUrl ? "_blank" : undefined}
          rel={projectUrl ? "noreferrer" : undefined}
          style={{ color: ACCENT, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
        >
          View Projects →
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* HOME — rotating "Our Works" panels                                 */
/* ---------------------------------------------------------------- */

const CYCLE_MS = 4200;

function MarketingArt() {
  return (
    <svg viewBox="0 0 400 300" className="art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mkBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2f3d" />
          <stop offset="100%" stopColor="#171a22" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#mkBg)" />
      <g stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" fill="none">
        <rect x="30" y="40" width="46" height="34" rx="4" />
        <circle cx="53" cy="57" r="10" />
        <path d="M43 57 h20 M53 47 v20" strokeWidth="1" />
        <rect x="110" y="30" width="40" height="30" rx="4" />
        <path d="M110 30 l20 16 20 -16" />
        <rect x="200" y="150" width="60" height="42" rx="5" />
        <path d="M212 178 l14 -16 10 8 18 -20" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="320" cy="70" r="16" />
        <path d="M320 62 v16 l10 6" strokeWidth="1" />
        <path d="M250 220 l130 -40" strokeDasharray="4 5" />
      </g>
      <text x="30" y="270" fill="rgba(255,255,255,0.12)" fontSize="12" fontFamily="monospace">
        reach · engage · convert
      </text>
    </svg>
  );
}

function CodeArt() {
  const lines = [60, 90, 40, 75, 55, 85, 35, 65];
  return (
    <svg viewBox="0 0 400 300" className="art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cdBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141721" />
          <stop offset="100%" stopColor="#0c0e14" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#cdBg)" />
      <rect x="40" y="30" width="230" height="170" rx="6" fill="#0a0c11" stroke="rgba(255,255,255,0.08)" />
      <circle cx="55" cy="45" r="3.5" fill="#e05a4f" />
      <circle cx="67" cy="45" r="3.5" fill="#e8b23a" />
      <circle cx="79" cy="45" r="3.5" fill="#5ac97a" />
      {lines.map((w, i) => (
        <rect
          key={i}
          x={54 + (i % 3) * 6}
          y={62 + i * 16}
          width={w}
          height={6}
          rx={3}
          fill={i % 4 === 0 ? "#5aa9e6" : i % 4 === 1 ? "#8fd3a0" : "rgba(255,255,255,0.22)"}
        />
      ))}
      <g stroke="rgba(90,169,230,0.35)" strokeWidth="1.3" fill="none">
        <path d="M300 60 l30 30 -30 30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M340 210 l30 -30 -30 -30" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="300" y="150" fill="rgba(255,255,255,0.14)" fontSize="11" fontFamily="monospace">
        &lt;/&gt;
      </text>
    </svg>
  );
}

function AssistantArt() {
  return (
    <svg viewBox="0 0 400 300" className="art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="asBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#20262b" />
          <stop offset="100%" stopColor="#12161a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#asBg)" />
      <g fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4">
        <rect x="50" y="60" width="90" height="60" rx="10" />
        <path d="M75 120 l-10 16 M115 120 l10 16" strokeLinecap="round" />
        <rect x="230" y="40" width="70" height="46" rx="8" />
        <path d="M255 86 l-14 16 M275 86 l14 16" strokeLinecap="round" />
        <circle cx="200" cy="200" r="26" />
        <path d="M186 200 h28 M200 186 v28" strokeWidth="1" />
      </g>
      <text x="60" y="220" fill="rgba(255,255,255,0.12)" fontSize="12" fontFamily="monospace">
        inbox · calendar · calls
      </text>
    </svg>
  );
}

function Art({
  imageUrl,
  title,
  priority,
}: {
  imageUrl: string;
  title: string;
  priority: boolean;
}) {
  return (
    <LoadingImage
      src={imageUrl}
      alt={`${title} portfolio`}
      className="art"
      priority={priority}
    />
  );
}

function Home({
  content,
  onNavigate,
}: {
  content: WorksContent["home"];
  onNavigate: (r: Route) => void;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion.current) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % content.panels.length);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, active, content.panels.length]);

  return (
    <div className="pt-20">
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: ACCENT,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 14px",
          }}
        >
          {content.eyebrow}
        </p>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 46px)", fontWeight: 700, margin: "0 0 14px" }}>
          {content.title}
        </h2>
        <p style={{ color: TEXT_DIM, fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
          {content.description}
        </p>
      </div>

      <div
        className="row"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {content.panels.map((panel, i) => {
          const isActive = i === active;
          return (
            <div
              key={panel.route}
              className={`panel${isActive ? " is-active" : ""}`}
              style={{ flexBasis: isActive ? "56%" : "22%", flexGrow: 0 }}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`Show ${panel.title} details`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <Art
                imageUrl={panel.image_url}
                title={panel.title}
                priority={isActive}
              />
              <div className="overlay" />
              <div className="content">
                <div className="tag">{panel.tag}</div>
                <h3 className="title">{panel.title}</h3>
                <p className="desc">{panel.description}</p>
                <span
                  className="explore"
                  style={{ color: panel.accent }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(panel.route);
                  }}
                >
                  Explore →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dots">
        {content.panels.map((panel, i) => (
          <button
            key={panel.route}
            className={`dot${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to ${panel.title}`}
          >
            <span className="fill" key={i === active ? `${i}-${Date.now()}` : i} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* DIGITAL MARKETING page                                            */
/* ---------------------------------------------------------------- */

function DigitalMarketingPage({
  content,
  eyebrow,
  onBack,
}: {
  content: WorksContent["digital_marketing"];
  eyebrow: string;
  onBack: () => void;
}) {
  return (
    <div className="pt-10">
      <PageHeader
        eyebrow={eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        onBack={onBack}
      />
      <div className="client-grid">
        {content.clients.map((client, index) => (
          <ClientCard
            key={`${client.name}-${index}`}
            name={client.name}
            logoUrl={client.logo_url}
            projectUrl={client.project_url}
            priority={index < 4}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* WEB DEVELOPMENT page                                              */
/* ---------------------------------------------------------------- */

function WebsiteMock({ kind }: { kind: WebProject["visual_kind"] }) {
  if (kind === "photography") {
    return (
      <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a38" />
            <stop offset="100%" stopColor="#0e0e0d" />
          </linearGradient>
        </defs>
        <rect width="500" height="300" fill="url(#pg)" />
        <rect x="0" y="0" width="500" height="34" fill="rgba(0,0,0,0.35)" />
        <text x="20" y="22" fill="#e8e8e8" fontSize="11" fontWeight="700" letterSpacing="1">
          PHOTOGRAPHY
        </text>
        {["Home", "Services", "Portfolio", "Blog", "Contact"].map((t, i) => (
          <text key={t} x={230 + i * 55} y="22" fill="rgba(255,255,255,0.6)" fontSize="9">
            {t}
          </text>
        ))}
        <rect x="0" y="90" width="220" height="130" fill="rgba(255,255,255,0.03)" />
        <path d="M0 220 L120 150 L220 190 L500 90 V300 H0 Z" fill="rgba(255,255,255,0.05)" />
        <text x="30" y="150" fill="#fff" fontSize="24" fontWeight="700">
          Visual
        </text>
        <text x="115" y="150" fill="#e8b23a" fontSize="24" fontWeight="700">
          Authority
        </text>
        <text x="30" y="180" fill="#fff" fontSize="17">
          Where Purpose Meets
        </text>
        <text x="30" y="204" fill="#e8b23a" fontSize="17" fontStyle="italic">
          Precision
        </text>
        <rect x="30" y="222" width="120" height="26" rx="3" fill="#e8b23a" />
        <text x="45" y="239" fill="#000" fontSize="10" fontWeight="700">
          Book Now
        </text>
      </svg>
    );
  }
  if (kind === "food") {
    return (
      <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="fg" cx="70%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#3a2415" />
            <stop offset="100%" stopColor="#161009" />
          </radialGradient>
        </defs>
        <rect width="500" height="300" fill="url(#fg)" />
        <circle cx="360" cy="150" r="110" fill="#7a3a1c" />
        <circle cx="360" cy="150" r="95" fill="#c98a4b" />
        <circle cx="330" cy="130" r="22" fill="#e8d18a" />
        <circle cx="390" cy="120" r="16" fill="#5a8a4a" />
        <circle cx="400" cy="170" r="18" fill="#9a3a2a" />
        <circle cx="330" cy="180" r="14" fill="#3a6a3a" />
        <text x="30" y="120" fill="#fff" fontSize="24" fontWeight="700">
          Authentic Thakali
        </text>
        <text x="30" y="150" fill="#e8b23a" fontSize="24" fontWeight="700" fontStyle="italic">
          Taste Awaits You
        </text>
        <rect x="30" y="180" width="80" height="24" rx="3" fill="#e05a3a" />
        <text x="42" y="196" fill="#fff" fontSize="9" fontWeight="700">
          ORDER NOW
        </text>
        <rect x="120" y="180" width="70" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.5)" />
        <text x="132" y="196" fill="#fff" fontSize="9">
          View Menu
        </text>
      </svg>
    );
  }
  if (kind === "travel") {
    return (
      <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a90c9" />
            <stop offset="55%" stopColor="#2a6a9c" />
            <stop offset="55%" stopColor="#123a52" />
            <stop offset="100%" stopColor="#0a222f" />
          </linearGradient>
        </defs>
        <rect width="500" height="300" fill="url(#tg)" />
        <circle cx="420" cy="60" r="26" fill="#f4d87a" opacity="0.9" />
        <rect x="150" y="90" width="60" height="130" fill="#e8e8e8" opacity="0.85" />
        <polygon points="150,90 180,60 210,90" fill="#d8d8d8" opacity="0.85" />
        <rect x="120" y="150" width="60" height="70" fill="#d0d0d0" opacity="0.75" />
        <rect x="180" y="130" width="50" height="90" fill="#c8c8c8" opacity="0.8" />
        <rect x="140" y="110" width="220" height="80" rx="4" fill="rgba(10,20,30,0.55)" />
        <text x="160" y="145" fill="#fff" fontSize="22" fontWeight="700" fontStyle="italic">
          Book Globally,
        </text>
        <text x="160" y="172" fill="#fff" fontSize="22" fontWeight="700" fontStyle="italic">
          Travel Freely.
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 500 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="300" fill="#f3f1ec" />
      <rect x="0" y="0" width="500" height="42" fill="#e05a3a" />
      <text x="20" y="27" fill="#fff" fontSize="14" fontWeight="800">
        FoodExpress
      </text>
      <text x="30" y="110" fill="#1c1c1c" fontSize="26" fontWeight="800">
        Craving Something
      </text>
      <text x="30" y="142" fill="#e05a3a" fontSize="26" fontWeight="800">
        Delicious?
      </text>
      <text x="30" y="168" fill="#6a6a6a" fontSize="11">
        Fresh, fast, and ready when you are.
      </text>
      <rect x="30" y="188" width="100" height="26" rx="4" fill="#e05a3a" />
      <text x="46" y="205" fill="#fff" fontSize="10" fontWeight="700">
        Order Now
      </text>
      <circle cx="400" cy="160" r="90" fill="#2a2a2a" />
      <circle cx="400" cy="160" r="70" fill="#1c1c1c" />
      <circle cx="370" cy="140" r="10" fill="#e8b23a" />
      <circle cx="420" cy="130" r="8" fill="#5a8a4a" />
      <circle cx="410" cy="180" r="9" fill="#c94a3a" />
    </svg>
  );
}

function ProjectVisual({
  project,
  priority = false,
}: {
  project: WebProject;
  priority?: boolean;
}) {
  return (
    <LoadingImage
      src={project.image_url}
      alt={`${project.name} project preview`}
      priority={priority}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function WebDevelopmentPage({
  content,
  eyebrow,
  onBack,
}: {
  content: WorksContent["web_development"];
  eyebrow: string;
  onBack: () => void;
}) {
  const [featured, setFeatured] = useState(0);
  const project = content.projects[featured] || content.projects[0];
  const others = content.projects
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== featured);

  useEffect(() => {
    if (content.projects.length > 0 && featured >= content.projects.length) {
      setFeatured(0);
    }
  }, [content.projects.length, featured]);

  const cycle = (dir: 1 | -1) => {
    if (content.projects.length === 0) return;
    setFeatured((prev) =>
      (prev + dir + content.projects.length) % content.projects.length,
    );
  };

  return (
    <div className="pt-10">
      <PageHeader
        eyebrow={eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        onBack={onBack}
      />

      {project && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
        <button className="nav-arrow" onClick={() => cycle(-1)} aria-label="Previous project">
          ←
        </button>

        <div className="featured-card">
          <div className="featured-image">
            <ProjectVisual project={project} priority />
          </div>
          <div className="featured-info">
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px" }}>{project.name}</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: TEXT_DIM, margin: "0 0 18px" }}>
              {project.description}
            </p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: ACCENT, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                Services
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{project.services}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: ACCENT, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                Tech stack
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{project.stack}</div>
            </div>
            <a
              className="view-website-btn"
              href={project.website_url || "#"}
              onClick={(event) => {
                if (!project.website_url) event.preventDefault();
              }}
              target={project.website_url ? "_blank" : undefined}
              rel={project.website_url ? "noreferrer" : undefined}
            >
              View Website →
            </a>
          </div>
        </div>

        <button className="nav-arrow" onClick={() => cycle(1)} aria-label="Next project">
          →
        </button>
          </div>

          <div className="project-grid">
            {others.map(({ item: projectItem, index: realIndex }) => {
              return (
                <div
                  key={`${projectItem.name}-${realIndex}`}
                  className="project-card"
                  onClick={() => setFeatured(realIndex)}
                >
                  <div className="project-thumb">
                    <ProjectVisual project={projectItem} />
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14.5, fontWeight: 700 }}>{projectItem.name}</span>
                      <span
                        style={{
                          fontSize: 10.5,
                          color: "rgba(255,255,255,0.7)",
                          background: "rgba(255,255,255,0.08)",
                          borderRadius: 20,
                          padding: "3px 9px",
                        }}
                      >
                        {projectItem.services}
                      </span>
                    </div>
                    <div style={{ color: ACCENT, fontSize: 11, fontWeight: 700, marginBottom: 2 }}>
                      Tech stack
                    </div>
                    <div style={{ fontSize: 12.5, color: TEXT_DIM, marginBottom: 12 }}>
                      {projectItem.stack}
                    </div>
                    <a
                      href={projectItem.website_url || "#"}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (!projectItem.website_url) event.preventDefault();
                      }}
                      target={projectItem.website_url ? "_blank" : undefined}
                      rel={projectItem.website_url ? "noreferrer" : undefined}
                      style={{ color: "#fff", fontSize: 12.5, fontWeight: 600, textDecoration: "none" }}
                    >
                      View Website →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* VIRTUAL ASSISTANCE page                                           */
/* ---------------------------------------------------------------- */

function VirtualAssistancePage({
  content,
  eyebrow,
  onBack,
}: {
  content: WorksContent["virtual_assistance"];
  eyebrow: string;
  onBack: () => void;
}) {
  return (
    <div className="pt-10">
      <PageHeader
        eyebrow={eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        onBack={onBack}
      />

      <div className="client-grid" style={{ marginBottom: 64 }}>
        {content.clients.map((client, index) => (
          <ClientCard
            key={`${client.name}-${index}`}
            name={client.name}
            logoUrl={client.logo_url}
            projectUrl={client.project_url}
            priority={index < 4}
            highlighted={client.highlighted}
          />
        ))}
      </div>

      <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, margin: "0 0 32px" }}>
        {content.handle_title}
      </h2>
      <div className="handle-grid">
        {content.handle_items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="handle-card">
            <div className="handle-icon">{item.icon}</div>
            <div style={{ fontSize: 14.5, fontWeight: 700, margin: "12px 0 8px" }}>{item.title}</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.55, color: TEXT_DIM, margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, margin: "72px 0 8px" }}>
        {content.steps_title}
      </h2>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${CARD_BORDER}`, marginTop: 24 }} />
        {content.steps.map((step, index) => (
          <div key={`${step.number}-${index}`}>
            <div style={{ display: "flex", gap: 20, padding: "28px 0" }}>
              <div style={{ fontSize: 12, color: TEXT_FAINT, paddingTop: 3, minWidth: 20 }}>
                {step.number}
              </div>
              <div>
                <div style={{ color: ACCENT, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: TEXT_DIM, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </div>
            {index < content.steps.length - 1 && (
              <div style={{ borderTop: `1px solid ${CARD_BORDER}` }} />
            )}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${CARD_BORDER}` }} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* ROOT                                                               */
/* ---------------------------------------------------------------- */

export default function PortfolioSite() {
  const [route, setRoute] = useState<Route>("home");
  const [content, setContent] = useState<WorksContent>(DEFAULT_WORKS_CONTENT);

  const navigate = useCallback((nextRoute: Route) => {
    setRoute(nextRoute);

    const url = new URL(window.location.href);
    if (nextRoute === "home") {
      url.searchParams.delete(SECTION_QUERY_KEY);
    } else {
      url.searchParams.set(SECTION_QUERY_KEY, nextRoute);
    }

    window.history.pushState({}, "", url);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const syncRouteFromUrl = () => {
      setRoute(routeFromUrl());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    syncRouteFromUrl();
    window.addEventListener("popstate", syncRouteFromUrl);
    return () => window.removeEventListener("popstate", syncRouteFromUrl);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let refreshing = false;

    const refreshContent = async () => {
      if (refreshing || controller.signal.aborted) return;
      refreshing = true;
      try {
        const response = await fetch(`${WORKS_API_BASE}/get_works.php?_=${Date.now()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load Our Works content");
        const data = await response.json();
        if (data.success && data.content) {
          setContent(normalizeWorksContent(data.content));
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Unable to refresh Our Works content:", error);
        }
      } finally {
        refreshing = false;
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "gr8_works_updated") void refreshContent();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void refreshContent();
    };
    const channel =
      typeof BroadcastChannel !== "undefined"
        ? new BroadcastChannel("gr8_works")
        : null;

    void refreshContent();
    const interval = window.setInterval(refreshContent, 30000);
    channel?.addEventListener("message", refreshContent);
    window.addEventListener("gr8:works-updated", refreshContent);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", refreshContent);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      channel?.removeEventListener("message", refreshContent);
      channel?.close();
      window.removeEventListener("gr8:works-updated", refreshContent);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", refreshContent);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const imageUrls = [
      ...content.home.panels.map((panel) => panel.image_url),
      ...content.digital_marketing.clients.map((client) => client.logo_url),
      ...content.web_development.projects.map((project) => project.image_url),
      ...content.virtual_assistance.clients.map((client) => client.logo_url),
    ].filter(Boolean);

    const timer = window.setTimeout(() => {
      imageUrls.forEach((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [content]);

  return (
    <section
      style={{
        background: BG,
        minHeight: "100vh",
        padding: "72px 24px 96px",
        boxSizing: "border-box",
        overflowX: "clip",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#fff",
      }}
    >
      <style>{`
        .works-image {
          position: relative;
          overflow: hidden;
          background: #151821;
        }
        .works-image-loader,
        .works-image-error {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.48);
          background: linear-gradient(110deg, #171a23 25%, #20242f 45%, #171a23 65%);
          background-size: 220% 100%;
          animation: works-image-shimmer 1.15s linear infinite;
          font-size: 11px;
        }
        .works-image-spinner {
          width: 22px;
          height: 22px;
          border: 2px solid rgba(255,255,255,0.16);
          border-top-color: ${ACCENT};
          border-radius: 50%;
          animation: works-image-spin 700ms linear infinite;
        }
        .works-image-error { animation: none; }
        @keyframes works-image-spin { to { transform: rotate(360deg); } }
        @keyframes works-image-shimmer { to { background-position: -220% 0; } }

        .row {
          display: flex;
          gap: 16px;
          max-width: 1120px;
          margin: 48px auto 0;
          height: 460px;
        }
        .panel {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: flex-basis 750ms cubic-bezier(0.65, 0, 0.35, 1);
          outline: none;
        }
        .panel:focus-visible { box-shadow: 0 0 0 3px rgba(232,130,58,0.6); }
        .art { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform 900ms ease; }
        .panel.is-active .art { transform: scale(1.04); }
        .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,9,13,0.92) 0%, rgba(8,9,13,0.35) 45%, rgba(8,9,13,0.05) 70%);
        }
        .content { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px; }
        .tag { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 8px; font-variant-numeric: tabular-nums; }
        .title { font-size: 20px; font-weight: 700; margin: 0 0 10px; white-space: nowrap; }
        .desc {
          font-size: 13.5px; line-height: 1.55; color: rgba(255,255,255,0.72); max-width: 360px;
          max-height: 0; opacity: 0; overflow: hidden; transition: max-height 500ms ease, opacity 400ms ease;
        }
        .panel.is-active .desc { max-height: 100px; opacity: 1; transition: max-height 500ms ease 150ms, opacity 500ms ease 150ms; }
        .explore {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 13px; font-weight: 600;
          color: #fff; opacity: 0; transform: translateY(6px); transition: opacity 400ms ease 250ms, transform 400ms ease 250ms;
          cursor: pointer;
        }
        .panel.is-active .explore { opacity: 1; transform: translateY(0); }
        .dots { display: flex; gap: 8px; justify-content: center; margin-top: 28px; }
        .dot {
          width: 22px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.2);
          border: none; cursor: pointer; padding: 0; overflow: hidden; position: relative;
        }
        .dot .fill { position: absolute; inset: 0; background: ${ACCENT}; transform-origin: left; transform: scaleX(0); }
        .dot.is-active .fill { transform: scaleX(1); transition: transform ${CYCLE_MS}ms linear; }

        .client-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 900px) { .client-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .client-grid { grid-template-columns: 1fr; } }

        .nav-arrow {
          flex-shrink: 0;
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid ${CARD_BORDER};
          background: ${CARD};
          color: #fff; font-size: 16px; cursor: pointer;
        }
        .nav-arrow:hover { border-color: rgba(255,255,255,0.25); }

        .featured-card {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0;
          background: ${CARD};
          border: 1px solid ${CARD_BORDER};
          border-radius: 12px;
          overflow: hidden;
          max-width: 1000px;
          margin: 0 auto;
        }
        .featured-image { position: relative; min-height: 280px; background: #000; }
        .featured-info { min-width: 0; padding: 28px 30px; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 760px) {
          .featured-card { grid-template-columns: 1fr; }
          .featured-image { min-height: 200px; }
        }

        .view-website-btn {
          align-self: flex-start;
          background: #fff; color: #12141c; border: none;
          padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer;
          text-decoration: none;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 900px) { .project-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .project-grid { grid-template-columns: 1fr; } }
        .project-card {
          background: ${CARD};
          border: 1px solid ${CARD_BORDER};
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 200ms ease;
        }
        .project-card:hover { border-color: rgba(255,255,255,0.25); }
        .project-thumb { height: 150px; position: relative; }

        .handle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 700px) { .handle-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .handle-grid { grid-template-columns: 1fr; } }
        .handle-card {
          background: ${CARD};
          border: 1px solid ${CARD_BORDER};
          border-radius: 12px;
          padding: 20px;
        }
        .handle-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(232,130,58,0.12); color: ${ACCENT};
          display: flex; align-items: center; justify-content: center; font-size: 15px;
        }

        @media (prefers-reduced-motion: reduce) {
          .panel, .art, .desc, .explore { transition: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {route === "home" && <Home content={content.home} onNavigate={navigate} />}
        {route === "digital-marketing" && (
          <DigitalMarketingPage
            content={content.digital_marketing}
            eyebrow={content.home.eyebrow}
            onBack={() => navigate("home")}
          />
        )}
        {route === "web-development" && (
          <WebDevelopmentPage
            content={content.web_development}
            eyebrow={content.home.eyebrow}
            onBack={() => navigate("home")}
          />
        )}
        {route === "virtual-assistance" && (
          <VirtualAssistancePage
            content={content.virtual_assistance}
            eyebrow={content.home.eyebrow}
            onBack={() => navigate("home")}
          />
        )}
      </div>
      <div>
        <TrustedBySection/>
        <StartProjectSection/>
      </div>
    </section>
  );
}
