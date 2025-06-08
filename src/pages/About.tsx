
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Brain, Zap, Heart, Github, Link as LinkIcon } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: 'Feb 2025 - Present',
      title: 'Packaged App Development Intern',
      company: 'Accenture',
      description: 'Contributing to enterprise-scale app development projects, collaborating with cross-functional teams to build and optimize packaged applications.',
      technologies: ['Azure', 'Cybersecurity', 'AI Security']
    },
    {
      year: '2025',
      title: 'QuickQR',
      company: 'Personal Project',
      description: 'Developed a feature-rich QR utility app enabling users to generate and scan multiple QR formats with offline access and user history.',
      technologies: ['SwiftUI', 'SwiftData', 'AVFoundation', 'Firebase']
    },
    {
      year: '2024',
      title: 'Waller',
      company: 'Personal Project',
      description: 'Designed a modern wallpaper app with Pexels API integration, supporting search, likes, downloads, and persistent data storage.',
      technologies: ['SwiftUI', 'Pexels API', 'SwiftData', 'AppStorage']
    },
    {
      year: '2022',
      title: 'Google Cloud Facilitator Program',
      company: 'Google Cloud Edu',
      description: 'Completed 5 foundational GCP courses, gaining skills in cloud infrastructure, compute services, and deployment practices.',
      technologies: ['Google Cloud Platform', 'Cloud Functions', 'IAM', 'Compute Engine']
    },
    {
      year: '2021–2025',
      title: 'B.Tech in Computer Science and Engineering',
      company: 'Lovely Professional University',
      description: 'Specialized in software development and web technologies. Completed academic projects and participated in tech programs to expand practical skills.',
      technologies: ['Java', 'C++', 'HTML', 'CSS', 'JavaScript', 'DSA']
    },
    
  ];

  const funFacts = [
    {
      icon: Zap,
      title: 'Figuring It Out',
      description: 'I love starting from scratch, building features that feel good, and iterating until they just work.'
    },
    {
      icon: Heart,
      title: 'Heart Made of Art',
      description: 'Art in any form speaks to me, be it visuals, stories, emotions - I’m all in.'
    },
    {
      icon: Brain,
      title: 'Powered by Curiosity',
      description: 'Learning is my high, the kind that pushes me to build, break, and become.'
    }
  ];

  const skills = [
    'Swift', 'SwiftUI', 'SwitftData', 'AppStorage', 'Xcode', 'Firebase', 'GCP', 'GSAP',
    'HTML', 'CSS', 'JavaScript', 'REST APIs', 'TailwindCSS', 'Git & GitHub', 'CI/CD', 'Figma','Notion'
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <img
            src="/profile.png"
            alt="RB"
            className="w-32 h-32 rounded-full mx-auto mb-8 shadow-lg hover-lift"
            style={{ objectFit: 'cover', background: 'linear-gradient(to bottom right, #60c65a, #f2994a)' }}
          />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Hi, I'm Resham Bharti
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A passionate developer who enjoys turning ideas into clean, intuitive app experiences 
            and documenting the process. Welcome to my little corner of the internet!🌻
          </p>
        </div>

        {/* Fun Facts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">A Few Fun Things About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {funFacts.map((fact, index) => (
              <Card key={index} className="text-center hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <fact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{fact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{fact.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Technologies I Love Working With</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, index) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-sm py-2 px-4 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">My Journey So Far</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {item.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Status */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-ghibli-green/10 via-ghibli-sunset/10 to-ghibli-warm-brown/10 border-2">
            <CardHeader>
              <CardTitle className="text-center text-xl">What I'm Up To Now</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Polishing my iOS development skills, learning advanced Swift concepts, and building a portfolio of apps that reflect both design thinking and technical strength.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Last updated: June 2025
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">Let's Connect!</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I love meeting fellow developers, learners, and curious minds. 
            Feel free to reach out if you want to chat about tech, collaborate on projects, 
            or just say hello!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hover-lift">
              <a href="https://github.com/Reshamhere" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-lift">
              <a href="mailto:reshambharti145@gmail.com" target="_blank" rel="noopener noreferrer">
                <LinkIcon className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
