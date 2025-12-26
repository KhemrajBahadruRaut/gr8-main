import BlogDetailPage from "../blogdetails/BlogDetail";

export const dynamic = 'force-dynamic'; 

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  // Await params because it's a Promise
  const { slug } = await params;

  // const API_URL = 'http://localhost/gr8/api/blogs/get_blog.php'; 
  const API_URL = 'https://ridimatuladhar.com.np/gr8/api/blogs/get_blog.php'; 

  try {
    const res = await fetch(`${API_URL}?slug=${slug}`, { cache: 'no-store' });
    const data = await res.json();

    if (!data.success || !data.blog) return <p>Blog not found</p>;

    return <BlogDetailPage slug={slug} blog={data.blog} />;
  } catch (error) {
    console.error(error);
    return <p>Error loading blog</p>;
  }
}
