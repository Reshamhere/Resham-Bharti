
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Book, Code, FileText, Github } from 'lucide-react';
import { client } from '@/lib/sanity';
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
}

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<SanityPost[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent posts (limit to 3)
        const postsQuery = `*[_type == "post"] | order(date desc)[0..2] {
          _id,
          title,
          excerpt,
          content,
          category,
          date,
          tags
        }`;
        const posts = await client.fetch(postsQuery);
        setRecentPosts(posts);

        // Fetch categories with counts
        const categoriesQuery = `*[_type == "post"] {
          category
        }`;
        const categoryData = await client.fetch(categoriesQuery);
        
        // Calculate category counts
        const categoryCounts = categoryData.reduce((acc, { category }) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        // Map to your category structure
        const mappedCategories = [
          { 
            name: "Learning Logs", 
            description: "Daily discoveries and insights",
            icon: Book,
            count: categoryCounts["Learning Logs"] || 0,
            color: "bg-ghibli-green/10 text-ghibli-green border-ghibli-green/20"
          },
          {
            name: "Projects",
            description: "Things I've built and lessons learned",
            icon: Code,
            count: categoryCounts["Projects"] || 0,
            color: "bg-ghibli-sunset/10 text-ghibli-sunset border-ghibli-sunset/20"
          },
          {
            name: "Tutorials",
            description: "Step-by-step guides and how-tos",
            icon: FileText,
            count: categoryCounts["Tutorials"] || 0,
            color: "bg-ghibli-warm-brown/10 text-ghibli-warm-brown border-ghibli-warm-brown/20"
          },
          {
            name: "Notes",
            description: "Quick thoughts and references",
            icon: FileText,
            count: categoryCounts["Notes"] || 0,
            color: "bg-ghibli-sky/10 text-ghibli-sky border-ghibli-sky/20"
          }
        ];

        setCategories(mappedCategories);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ghibli-cream via-background to-ghibli-green/5 dark:from-background dark:via-card dark:to-ghibli-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6">
              Welcome to my
              <br />
              Tech Journey
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A warm corner of the internet where I document my learning adventures, 
              share projects, and explore the wonderful world of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hover-lift">
                <Link to="/blog">
                  Explore Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-lift">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ghibli-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ghibli-sunset/10 rounded-full blur-3xl"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive into different aspects of my learning journey, from daily discoveries to major projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover-lift cursor-pointer group border-2 hover:border-primary/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    {category.count} {category.count === 1 ? 'post' : 'posts'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Posts</h2>
              <p className="text-lg text-muted-foreground">
                My latest thoughts, projects, and discoveries
              </p>
            </div>
            <Button asChild variant="outline" className="hover-lift">
              <Link to="/blog">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <Card key={post._id} className={`hover-lift cursor-pointer group border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {calculateReadTime(post.content)}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-ghibli-green/10 via-ghibli-sunset/10 to-ghibli-warm-brown/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect & Learn Together</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join me on this journey of continuous learning and growth. Follow along for regular updates, 
            insights, and the occasional bee-themed surprises!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hover-lift">
              <a href="https://github.com/Reshamhere" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Follow on GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <Link to="/about">
                Learn More About Me
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
