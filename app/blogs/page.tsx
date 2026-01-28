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
  const slug = params.slug;

  if (!slug || typeof slug !== 'string') {
    return {
      title: 'Blogs | GR8 Nepal',
      description: 'Explore our latest articles and insights on digital marketing, technology, and business growth.',
    };
  }

  // Fetch blog data for SEO
  try {
    const res = await fetch(`http://localhost/gr8/api/blogs/get_blog.php?slug=${slug}`);
    const data = await res.json();

    if (data.success && data.blog) {
      return {
        title: `${data.blog.title} | GR8 Nepal`,
        description: data.blog.description,
        openGraph: {
          title: data.blog.title,
          description: data.blog.description,
          images: [data.blog.image],
          type: 'article',
          publishedTime: data.blog.date,
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
