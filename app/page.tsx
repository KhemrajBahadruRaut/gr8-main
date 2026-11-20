import HomePageClient from "./HomePageClient";

export const revalidate = 300;

const BLOG_API_URL = "https://api.gr8.com.np/gr8/api/blogs/get_blog.php";

async function getLatestBlogs() {
  try {
    const response = await fetch(BLOG_API_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data?.success && Array.isArray(data.blogs)
      ? data.blogs.filter(Boolean).slice(0, 3)
      : [];
  } catch (error) {
    console.error("Error fetching latest blogs", error);
    return [];
  }
}

export default async function HomePage() {
  const blogs = await getLatestBlogs();

  return <HomePageClient blogs={blogs} />;
}
