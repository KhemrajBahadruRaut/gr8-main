import { Metadata } from 'next';
import BlogsClient from './BlogsClient';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const params = await searchParams;
  let slug = params.slug;

  // If slug is an array, pick the first element
  if (Array.isArray(slug)) slug = slug[0];

  if (!slug || typeof slug !== 'string') {
    return {
      title: 'Blogs | GR8 Nepal',
      description: 'Explore our latest articles and insights on digital marketing, technology, and business growth.',
    };
  }

  try {
    const res = await fetch(
      // `http://localhost/gr8/api/blogs/get_blog.php?slug=${slug}`,
      `https://api.gr8.com.np/gr8/api/blogs/get_blog.php?slug=${slug}`,
      { cache: 'no-store' } // always fresh
    );
    const data = await res.json();

    if (data.success && data.blog) {
      const blog = data.blog;

      // Safe defaults
      const title = blog.title || 'Blog | GR8 Nepal';
      const description = blog.description || '';
      const image = blog.image || '/default-blog-image.jpg';
      const publishedTime = blog.date || blog.created_at || new Date().toISOString();

      return {
        title: `${title} | GR8 Nepal`,
        description,
        openGraph: {
          title,
          description,
          images: [image],
          type: 'article',
          publishedTime,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }

  return {
    title: 'Blog Not Found | GR8 Nepal',
    description: 'The requested blog post could not be found.',
  };
}

export default function BlogsPage() {
  return <BlogsClient />;
}
