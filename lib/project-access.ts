import type { WorkRoute } from "./works-content";

export const PROJECT_CATEGORIES: Record<WorkRoute, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "virtual-assistance": "Virtual Assistance",
};

export function isProjectCategory(value: unknown): value is WorkRoute {
  return typeof value === "string" && Object.hasOwn(PROJECT_CATEGORIES, value);
}

export type ProjectVisitor = {
  id: string;
  name: string;
  email: string;
  verified_at: string;
  last_visited_at: string | null;
  visit_count: number;
  categories: WorkRoute[];
};
