
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Clock, Tag } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts = [
    {
      id: 1,
      title: "Building a React Component Library",
      excerpt: "A comprehensive guide to creating reusable components with TypeScript, Storybook, and proper testing strategies.",
      category: "Projects",
      date: "2024-06-01",
      readTime: "8 min read",
      tags: ["React", "TypeScript", "Storybook", "Testing"]
    },
    {
      id: 2,
      title: "Understanding React Server Components",
      excerpt: "Exploring the new paradigm of server-side rendering in React 18 and how it changes the way we think about component architecture.",
      category: "Learning Logs",
      date: "2024-05-28",
      readTime: "12 min read",
      tags: ["React", "SSR", "Next.js", "Architecture"]
    },
    {
      id: 3,
      title: "Docker Best Practices for Developers",
      excerpt: "Essential tips and tricks for containerizing your applications efficiently, from multi-stage builds to security considerations.",
      category: "Tutorials",
      date: "2024-05-25",
      readTime: "15 min read",
      tags: ["Docker", "DevOps", "Containers", "Security"]
    },
    {
      id: 4,
      title: "GraphQL vs REST: A Practical Comparison",
      excerpt: "When to use GraphQL over REST APIs, with real-world examples and performance considerations.",
      category: "Notes",
      date: "2024-05-22",
      readTime: "10 min read",
      tags: ["GraphQL", "REST", "API", "Performance"]
    },
    {
      id: 5,
      title: "Building a Personal Website with Astro",
      excerpt: "My journey creating a lightning-fast static site with Astro, including lessons learned and performance optimizations.",
      category: "Projects",
      date: "2024-05-20",
      readTime: "7 min read",
      tags: ["Astro", "Static Sites", "Performance", "Web Development"]
    },
    {
      id: 6,
      title: "Learning Rust: First Impressions",
      excerpt: "Initial thoughts on Rust after coming from JavaScript and Python backgrounds, including the ownership model and tooling.",
      category: "Learning Logs",
      date: "2024-05-18",
      readTime: "6 min read",
      tags: ["Rust", "Systems Programming", "Learning", "Comparison"]
    }
  ];

  const categories = ['All', 'Learning Logs', 'Projects', 'Tutorials', 'Notes'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Blog Posts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and discoveries from my journey in tech. 
            Use the search and filters below to find what interests you most.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search posts, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="hover-lift"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="hover-lift cursor-pointer group border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <CardTitle className="group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
