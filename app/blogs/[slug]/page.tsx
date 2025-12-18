import { Metadata } from 'next';
import BlogDetailPage from '../blogdetails/BlogDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/gr8';
  
  try {
    const res = await fetch(`${API_URL}/api/blogs/get_blog.php?slug=${slug}`, {
      next: { revalidate: 3600 }
    });
    const data = await res.json();

    if (data.success && data.blog) {
      const blog = data.blog;
      return {
        title: `${blog.title} | GR8 Nepal`,
        description: blog.description,
        openGraph: {
          title: blog.title,
          description: blog.description,
          images: [blog.image],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Blog | GR8 Nepal',
    description: 'Read our latest blog posts',
  };
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/gr8';
  
  try {
    const res = await fetch(`${API_URL}/api/blogs/get_blog.php`, {
      next: { revalidate: 3600 }
    });
    const data = await res.json();

    if (!data.success) return [];

    return data.blogs.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}