import type { MetadataRoute } from "next";

const BASE_URL = "https://gr8.com.np";
const BLOG_API_URL = "https://api.gr8.com.np/gr8/api/blogs/get_blog.php";

type BlogApiItem = {
  slug?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
};

const getValidDate = (value?: string): Date => {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const getStaticEntries = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blogs/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/portfolio/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/merchendise/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/resources/help-center/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/services/web-development/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/seo-services/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/social-media-marketing/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/graphics-designing/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/content-writing/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/email-marketing/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/ppc/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/mobile-app-development/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/printing-publishing/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs/digital-presence-2025/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blogs/future-digital-marketing/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blogs/online-presence-growth/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-condition/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
};

const getApiBlogEntries = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const response = await fetch(BLOG_API_URL, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!data?.success || !Array.isArray(data.blogs)) {
      return [];
    }

    return (data.blogs as BlogApiItem[])
      .filter((blog) => typeof blog.slug === "string" && blog.slug.trim())
      .map((blog) => ({
        url: `${BASE_URL}/blogs/${encodeURIComponent(blog.slug!.trim())}/`,
        lastModified: getValidDate(blog.updated_at || blog.created_at || blog.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error("Error building sitemap blog entries:", error);
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = [...getStaticEntries(), ...(await getApiBlogEntries())];

  // De-duplicate URLs when static and API slugs overlap.
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    deduped.set(entry.url, entry);
  }

  return Array.from(deduped.values());
}
