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
  client_id: number | null;
  name: string;
  logo_kind: ClientLogoKind;
  logo_url: string;
  project_url: string;
  facebook_url: string;
  instagram_url: string;
  work_image_url: string;
  work_image_urls: string[];
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

export type HandleItem = { icon: string; title: string; description: string };
export type WorkStep = { number: string; title: string; description: string };

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

const HOME_PANELS: WorkPanel[] = [
  {
    tag: "01",
    title: "Digital Marketing",
    description: "",
    accent: "#e8823a",
    image_url: "",
    pattern: "marketing",
    route: "digital-marketing",
  },
  {
    tag: "02",
    title: "Web Development",
    description: "",
    accent: "#5aa9e6",
    image_url: "",
    pattern: "code",
    route: "web-development",
  },
  {
    tag: "03",
    title: "Virtual Assistance",
    description: "",
    accent: "#8fd3a0",
    image_url: "",
    pattern: "assistant",
    route: "virtual-assistance",
  },
];

export const EMPTY_WORKS_CONTENT: WorksContent = {
  home: {
    eyebrow: "Portfolio",
    title: "Our Works",
    description: "",
    panels: HOME_PANELS,
  },
  digital_marketing: { title: "", subtitle: "", clients: [] },
  web_development: { title: "", subtitle: "", projects: [] },
  virtual_assistance: {
    title: "",
    subtitle: "",
    clients: [],
    handle_title: "",
    handle_items: [],
    steps_title: "",
    steps: [],
  },
};

const text = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const normalizeClients = (value: unknown): WorkClient[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const client = record(item);
    const clientId = Number(client.client_id);
    const workImagesValue = client.work_image_urls;
    const hasSubmittedWorkImages = Array.isArray(workImagesValue);
    const submittedWorkImages = hasSubmittedWorkImages
      ? workImagesValue.filter(
          (url: unknown): url is string => typeof url === "string" && url.trim() !== "",
        )
      : [];
    const legacyWorkImage = text(client.work_image_url);
    const workImageUrls = hasSubmittedWorkImages
      ? submittedWorkImages
      : legacyWorkImage
        ? [legacyWorkImage]
        : [];

    return {
      client_id: Number.isInteger(clientId) && clientId > 0 ? clientId : null,
      name: text(client.name),
      logo_kind: text(client.logo_kind, "reliable") as ClientLogoKind,
      logo_url: text(client.logo_url),
      project_url: text(client.project_url),
      facebook_url: text(client.facebook_url),
      instagram_url: text(client.instagram_url),
      work_image_url: workImageUrls[0] || "",
      work_image_urls: workImageUrls,
      highlighted: Boolean(client.highlighted),
    };
  });
};

export function normalizeWorksContent(value: unknown): WorksContent {
  const source = record(value);
  const home = record(source.home);
  const digital = record(source.digital_marketing);
  const web = record(source.web_development);
  const virtual = record(source.virtual_assistance);
  const panelsSource = Array.isArray(home.panels) ? home.panels : [];

  const panels = HOME_PANELS.map((structure, index) => {
    const panel = record(panelsSource[index]);
    return {
      ...structure,
      tag: text(panel.tag, structure.tag),
      title: text(panel.title, structure.title),
      description: text(panel.description),
      accent: text(panel.accent, structure.accent),
      image_url: text(panel.image_url),
    };
  });

  const projects: WebProject[] = Array.isArray(web.projects)
    ? web.projects.map((item) => {
        const project = record(item);
        return {
          name: text(project.name),
          description: text(project.description),
          services: text(project.services),
          stack: text(project.stack),
          visual_kind: text(project.visual_kind, "photography") as ProjectVisualKind,
          image_url: text(project.image_url),
          website_url: text(project.website_url),
        };
      })
    : [];

  const handleItems: HandleItem[] = Array.isArray(virtual.handle_items)
    ? virtual.handle_items.map((item) => {
        const current = record(item);
        return {
          icon: text(current.icon),
          title: text(current.title),
          description: text(current.description),
        };
      })
    : [];

  const steps: WorkStep[] = Array.isArray(virtual.steps)
    ? virtual.steps.map((item, index) => {
        const current = record(item);
        return {
          number: text(current.number, String(index + 1).padStart(2, "0")),
          title: text(current.title),
          description: text(current.description),
        };
      })
    : [];

  return {
    home: {
      eyebrow: text(home.eyebrow, EMPTY_WORKS_CONTENT.home.eyebrow),
      title: text(home.title, EMPTY_WORKS_CONTENT.home.title),
      description: text(home.description),
      panels,
    },
    digital_marketing: {
      title: text(digital.title),
      subtitle: text(digital.subtitle),
      clients: normalizeClients(digital.clients),
    },
    web_development: {
      title: text(web.title),
      subtitle: text(web.subtitle),
      projects,
    },
    virtual_assistance: {
      title: text(virtual.title),
      subtitle: text(virtual.subtitle),
      clients: normalizeClients(virtual.clients),
      handle_title: text(virtual.handle_title),
      handle_items: handleItems,
      steps_title: text(virtual.steps_title),
      steps,
    },
  };
}
