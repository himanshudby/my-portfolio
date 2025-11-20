export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Interest {
  name: string;
  icon: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  /** The full markdown content of the blog post */
  content?: string;
  /** Optional: URL to a raw markdown file (e.g. from GitHub) to fetch content from */
  markdownUrl?: string;
}

export interface AboutMe {
  bio: string[];
  philosophy: string;
  interests: Interest[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    avatarUrl?: string;
    socials: SocialLink[];
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  aboutMe: AboutMe;
  blogPosts: BlogPost[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}