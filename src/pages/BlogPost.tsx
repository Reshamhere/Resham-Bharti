
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { calculateReadTime } from '../../myblog/plugins/read-time';

interface SanityPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags?: string[];
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          excerpt,
          content,
          category,
          date,
          readTime,
          tags,
          mainImage
        }`;

        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (err) {
        setError('Failed to load post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-12">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Button>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Post Header */}
        <header className="mb-12">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {post.readTime
                  ? post.readTime
                  : calculateReadTime(post.content)}
              </span>
            </div>
          </div>

          {post.mainImage && (
            <div className="rounded-lg overflow-hidden mb-8">
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {/* <PortableText value={post.content} /> */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content ?? ""}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <footer className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </footer>
        )}
      </article>
    </div>
  );
};

export default BlogPost;