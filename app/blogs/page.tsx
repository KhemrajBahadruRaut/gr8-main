import { Metadata } from 'next';
import BlogsClient from './BlogsClient';

export const dynamic = 'force-dynamic';
const DEFAULT_OG_IMAGE = 'https://gr8.com.np/mainlogo/GR8-Nepal-Private-Limited-Logo.webp';

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
      openGraph: {
        title: 'Blogs | GR8 Nepal',
        description: 'Explore our latest articles and insights on digital marketing, technology, and business growth.',
        url: 'https://gr8.com.np/blogs/',
        type: 'website',
        images: [
          {
            url: DEFAULT_OG_IMAGE,
            alt: 'GR8 Nepal Blogs',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Blogs | GR8 Nepal',
        description: 'Explore our latest articles and insights on digital marketing, technology, and business growth.',
        images: [DEFAULT_OG_IMAGE],
      },
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
      const image = blog.image || DEFAULT_OG_IMAGE;
      const publishedTime = blog.date || blog.created_at || new Date().toISOString();

      return {
        title: `${title} | GR8 Nepal`,
        description,
        alternates: {
          canonical: `https://gr8.com.np/blogs/?slug=${encodeURIComponent(slug)}`,
        },
        openGraph: {
          title,
          description,
          images: [
            {
              url: image,
              alt: title,
            },
          ],
          url: `https://gr8.com.np/blogs?slug=${slug}`,
          type: 'article',
          publishedTime,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [image],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
  }

  return {
    title: 'Blog Not Found | GR8 Nepal',
    description: 'The requested blog post could not be found.',
    openGraph: {
      title: 'Blog Not Found | GR8 Nepal',
      description: 'The requested blog post could not be found.',
      url: 'https://gr8.com.np/blogs/',
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: 'GR8 Nepal Blogs',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog Not Found | GR8 Nepal',
      description: 'The requested blog post could not be found.',
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function BlogsPage() {
  return <BlogsClient />;
}
