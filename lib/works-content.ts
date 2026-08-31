export type WorkRoute =
  | "digital-marketing"
  | "web-development"
  | "virtual-assistance";

export type WorkPattern = "marketing" | "code" | "assistant";
export type ClientLogoKind =
  | "suvekchya"
  | "reliable"
  | "united"
  | "joy"
  | "precision"
  | "parijat"
  | "delivery"
  | "rtcs";
export type ProjectVisualKind = "photography" | "food" | "travel" | "delivery";

export type WorkPanel = {
  tag: string;
  title: string;
  description: string;
  accent: string;
  image_url: string;
  pattern: WorkPattern;
  route: WorkRoute;
};

export type WorkClient = {
  name: string;
  logo_kind: ClientLogoKind;
  logo_url: string;
  project_url: string;
  highlighted?: boolean;
};

export type WebProject = {
  name: string;
  description: string;
  services: string;
  stack: string;
  visual_kind: ProjectVisualKind;
  image_url: string;
  website_url: string;
};

export type HandleItem = {
  icon: string;
  title: string;
  description: string;
};

export type WorkStep = {
  number: string;
  title: string;
  description: string;
};

export type WorksContent = {
  home: {
    eyebrow: string;
    title: string;
    description: string;
    panels: WorkPanel[];
  };
  digital_marketing: {
    title: string;
    subtitle: string;
    clients: WorkClient[];
  };
  web_development: {
    title: string;
    subtitle: string;
    projects: WebProject[];
  };
  virtual_assistance: {
    title: string;
    subtitle: string;
    clients: WorkClient[];
    handle_title: string;
    handle_items: HandleItem[];
    steps_title: string;
    steps: WorkStep[];
  };
};

export const DEFAULT_WORKS_CONTENT: WorksContent = {
  home: {
    eyebrow: "Portfolio",
    title: "Our Works",
    description:
      "Digital experiences, marketing campaigns, and business support designed to move brands forward.",
    panels: [
      {
        tag: "01",
        title: "Digital Marketing",
        description:
          "Creative campaigns and digital strategies that help brands get noticed, engage audiences, and grow.",
        accent: "#e8823a",
        image_url: "",
        pattern: "marketing",
        route: "digital-marketing",
      },
      {
        tag: "02",
        title: "Web Development",
        description:
          "Custom-built websites and applications engineered for speed, scale, and clean, maintainable code.",
        accent: "#5aa9e6",
        image_url: "",
        pattern: "code",
        route: "web-development",
      },
      {
        tag: "03",
        title: "Virtual Assistant",
        description:
          "Reliable remote support that keeps your inbox, calendar, and day-to-day operations running smoothly.",
        accent: "#8fd3a0",
        image_url: "",
        pattern: "assistant",
        route: "virtual-assistance",
      },
    ],
  },
  digital_marketing: {
    title: "Digital Marketing",
    subtitle:
      "Creative campaigns and digital strategies that help brands get noticed, engage audiences, and grow.",
    clients: [
      { name: "Suvekchya International Hospital", logo_kind: "suvekchya", logo_url: "", project_url: "" },
      { name: "Reliable Care", logo_kind: "reliable", logo_url: "", project_url: "" },
      { name: "United Supreme", logo_kind: "united", logo_url: "", project_url: "" },
      { name: "Joy Travel and Tours", logo_kind: "joy", logo_url: "", project_url: "" },
      { name: "Precision Diagnostics", logo_kind: "precision", logo_url: "", project_url: "" },
      { name: "Parijat Clinic", logo_kind: "parijat", logo_url: "", project_url: "" },
      { name: "Delivery Mart", logo_kind: "delivery", logo_url: "", project_url: "" },
    ],
  },
  web_development: {
    title: "Web Development",
    subtitle:
      "From high-converting business websites to custom e-commerce platforms, we design and develop digital experiences around real business needs.",
    projects: [
      {
        name: "RTCS Photography",
        description:
          "From high-converting business websites to custom e-commerce platforms, we design and develop digital experiences around real business needs.",
        services: "UI/UX, Backend, Frontend",
        stack: "React Js, PHP, My SQL",
        visual_kind: "photography",
        image_url: "",
        website_url: "",
      },
      {
        name: "Himalayan Thakali",
        description:
          "A warm, appetite-driving landing experience for a Himalayan Thakali restaurant, built to turn browsers into bookings.",
        services: "UI/UX, Backend, Frontend",
        stack: "React js, PHP, My Sql",
        visual_kind: "food",
        image_url: "",
        website_url: "",
      },
      {
        name: "Himalayan Thakali",
        description:
          "A booking-first travel microsite pairing bold typography with full-bleed imagery to move visitors toward reservations.",
        services: "UI/UX, Backend, Frontend",
        stack: "React js, PHP, My Sql",
        visual_kind: "travel",
        image_url: "",
        website_url: "",
      },
      {
        name: "Himalayan Thakali",
        description:
          "A conversion-tuned food-delivery landing page with a single clear call to action and mouth-watering hero imagery.",
        services: "UI/UX, Backend, Frontend",
        stack: "React js, PHP, My Sql",
        visual_kind: "delivery",
        image_url: "",
        website_url: "",
      },
    ],
  },
  virtual_assistance: {
    title: "Virtual Assistance",
    subtitle: "The work behind the scenes that keeps business moving.",
    clients: [
      { name: "RTCS Photography", logo_kind: "rtcs", logo_url: "", project_url: "" },
      { name: "Reliable Care", logo_kind: "reliable", logo_url: "", project_url: "" },
      { name: "United Supreme", logo_kind: "united", logo_url: "", project_url: "" },
      { name: "Joy Travel and Tours", logo_kind: "joy", logo_url: "", project_url: "" },
      { name: "Precision Diagnostics", logo_kind: "precision", logo_url: "", project_url: "" },
      {
        name: "Parijat Clinic",
        logo_kind: "parijat",
        logo_url: "",
        project_url: "",
        highlighted: true,
      },
      { name: "Delivery Mart", logo_kind: "delivery", logo_url: "", project_url: "" },
    ],
    handle_title: "What we handle",
    handle_items: [
      {
        icon: "✉",
        title: "Inbox & scheduling",
        description:
          "Sorted, answered, and booked — a calendar that fills itself around your priorities, not your gaps.",
      },
      {
        icon: "☎",
        title: "Customer support",
        description:
          "First-reply and follow-through on chats, emails, and reviews, in your voice, on your hours.",
      },
      {
        icon: "▤",
        title: "Data entry & CRM",
        description:
          "Leads logged, records updated, spreadsheets that stay true to what actually happened.",
      },
      {
        icon: "📈",
        title: "Research & reports",
        description: "Competitor scans, weekly summaries, briefing docs — ready before you ask for them.",
      },
      {
        icon: "📞",
        title: "Call handling",
        description:
          "A real person answers, screens, and routes — so calls stop landing in your pocket mid-meeting.",
      },
    ],
    steps_title: "How to Get Started",
    steps: [
      {
        number: "01",
        title: "Tell us the load",
        description:
          "A 20-minute intake call about what's actually eating your week — the tools you use, the tasks you dread, the hours you're missing.",
      },
      {
        number: "02",
        title: "Meet your match",
        description:
          "A vetted assistant paired to your workflow and software, introduced within days — not weeks of interviews.",
      },
      {
        number: "03",
        title: "Hand it off",
        description:
          "Tasks move to their inbox. You get a short daily log of what got done — no check-in meetings required.",
      },
    ],
  },
};

const text = (value: unknown, fallback: string) =>
  typeof value === "string" ? value : fallback;

const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

export function normalizeWorksContent(value: unknown): WorksContent {
  const source = record(value);
  const home = record(source.home);
  const digital = record(source.digital_marketing);
  const web = record(source.web_development);
  const virtual = record(source.virtual_assistance);

  const panelsSource = Array.isArray(home.panels) ? home.panels : [];
  const panels = DEFAULT_WORKS_CONTENT.home.panels.map((fallback, index) => {
    const panel = record(panelsSource[index]);
    return {
      ...fallback,
      tag: text(panel.tag, fallback.tag),
      title: text(panel.title, fallback.title),
      description: text(panel.description, fallback.description),
      accent: text(panel.accent, fallback.accent),
      image_url: text(panel.image_url, fallback.image_url),
    };
  });

  const normalizeClients = (value: unknown, fallback: WorkClient[]): WorkClient[] => {
    if (!Array.isArray(value)) return fallback;
    return value.map((item, index) => {
      const client = record(item);
      const base = fallback[index] || fallback[0];
      return {
        name: text(client.name, base?.name || "Client"),
        logo_kind: text(client.logo_kind, base?.logo_kind || "reliable") as ClientLogoKind,
        logo_url: text(client.logo_url, ""),
        project_url: text(client.project_url, ""),
        highlighted: Boolean(client.highlighted),
      };
    });
  };

  const projectSource = Array.isArray(web.projects) ? web.projects : null;
  const projects = projectSource
    ? projectSource.map((item, index) => {
        const project = record(item);
        const base =
          DEFAULT_WORKS_CONTENT.web_development.projects[index] ||
          DEFAULT_WORKS_CONTENT.web_development.projects[0];
        return {
          name: text(project.name, base.name),
          description: text(project.description, base.description),
          services: text(project.services, base.services),
          stack: text(project.stack, base.stack),
          visual_kind: text(project.visual_kind, base.visual_kind) as ProjectVisualKind,
          image_url: text(project.image_url, ""),
          website_url: text(project.website_url, ""),
        };
      })
    : DEFAULT_WORKS_CONTENT.web_development.projects;

  const handleSource = Array.isArray(virtual.handle_items) ? virtual.handle_items : null;
  const handleItems = handleSource
    ? handleSource.map((item, index) => {
        const current = record(item);
        const base =
          DEFAULT_WORKS_CONTENT.virtual_assistance.handle_items[index] ||
          DEFAULT_WORKS_CONTENT.virtual_assistance.handle_items[0];
        return {
          icon: text(current.icon, base.icon),
          title: text(current.title, base.title),
          description: text(current.description, base.description),
        };
      })
    : DEFAULT_WORKS_CONTENT.virtual_assistance.handle_items;

  const stepsSource = Array.isArray(virtual.steps) ? virtual.steps : null;
  const steps = stepsSource
    ? stepsSource.map((item, index) => {
        const current = record(item);
        const base =
          DEFAULT_WORKS_CONTENT.virtual_assistance.steps[index] ||
          DEFAULT_WORKS_CONTENT.virtual_assistance.steps[0];
        return {
          number: text(current.number, String(index + 1).padStart(2, "0")),
          title: text(current.title, base.title),
          description: text(current.description, base.description),
        };
      })
    : DEFAULT_WORKS_CONTENT.virtual_assistance.steps;

  return {
    home: {
      eyebrow: text(home.eyebrow, DEFAULT_WORKS_CONTENT.home.eyebrow),
      title: text(home.title, DEFAULT_WORKS_CONTENT.home.title),
      description: text(home.description, DEFAULT_WORKS_CONTENT.home.description),
      panels,
    },
    digital_marketing: {
      title: text(digital.title, DEFAULT_WORKS_CONTENT.digital_marketing.title),
      subtitle: text(digital.subtitle, DEFAULT_WORKS_CONTENT.digital_marketing.subtitle),
      clients: normalizeClients(
        digital.clients,
        DEFAULT_WORKS_CONTENT.digital_marketing.clients,
      ),
    },
    web_development: {
      title: text(web.title, DEFAULT_WORKS_CONTENT.web_development.title),
      subtitle: text(web.subtitle, DEFAULT_WORKS_CONTENT.web_development.subtitle),
      projects,
    },
    virtual_assistance: {
      title: text(virtual.title, DEFAULT_WORKS_CONTENT.virtual_assistance.title),
      subtitle: text(virtual.subtitle, DEFAULT_WORKS_CONTENT.virtual_assistance.subtitle),
      clients: normalizeClients(
        virtual.clients,
        DEFAULT_WORKS_CONTENT.virtual_assistance.clients,
      ),
      handle_title: text(
        virtual.handle_title,
        DEFAULT_WORKS_CONTENT.virtual_assistance.handle_title,
      ),
      handle_items: handleItems,
      steps_title: text(
        virtual.steps_title,
        DEFAULT_WORKS_CONTENT.virtual_assistance.steps_title,
      ),
      steps,
    },
  };
}
