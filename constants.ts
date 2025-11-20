import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Himanshu Dubey",
    title: "Solutions Manager | Cybersecurity Expert",
    email: "himanshu.dubey@example.com", // Placeholder
    phone: "", // Placeholder
    location: "Atlanta, Georgia, United States",
    summary: "Cybersecurity Expert | Driving SOAR & Threat Intelligence Solutions at Cyware | Former Security Consultant | Splunk & SIEM Specialist",
    // LINKING THE IMAGE HERE:
    avatarUrl: "profile.jpg", 
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/himanshu-dubey-2ab62062/", icon: "Linkedin" }
    ]
  },
  experience: [
    {
      company: "Cyware",
      role: "Solutions Manager",
      period: "Mar 2023 - Present",
      location: "Atlanta, Georgia, United States",
      description: [
        "Oversee the implementation and management of Cyware Security solutions, ensuring SecOps teams have the tools to effectively detect, investigate, and respond to threats.",
        "Drive the adoption of security automation and orchestration (SOAR) technologies within the organization.",
        "Identify areas where automation can streamline security processes and implement solutions to automate common tasks and workflows.",
        "Work closely with security teams to understand requirements and challenges, delivering solutions that improve efficiency and effectiveness."
      ]
    },
    {
      company: "Cyware",
      role: "Solutions Architect",
      period: "May 2021 - Mar 2023",
      location: "Bengaluru, Karnataka, India",
      description: [
        "Designed and implemented robust security programs leveraging both custom-built and industry-standard solutions.",
        "Collaborated across teams to integrate cybersecurity solutions and strengthen the security posture of organizations.",
        "Conducted threat analysis and advised on best practices for cyber risk management.",
        "Delivered solutions that help organizations stay ahead of evolving cyber threats."
      ]
    },
    {
      company: "Optiv Inc",
      role: "Senior Security Consultant",
      period: "Jan 2019 - May 2021",
      location: "Bangalore, India",
      description: [
        "Provided expert security consulting services to diverse clients.",
        "Specialized in incident response, proactive threat monitoring, and complex security challenges.",
        "Collaborated with clients to fortify their organization's defenses."
      ]
    },
    {
      company: "Cognizant",
      role: "Cyber Security Analyst",
      period: "Oct 2017 - Dec 2018",
      location: "Bengaluru, India",
      description: [
        "Built Splunk based Solutions for requirements related to BI / IT Ops / Security.",
        "Understood and deployed data collection requirements.",
        "Used Splunk to query, visualize data, and build productized dashboards.",
        "Administered and supported Splunk deployments."
      ]
    },
    {
      company: "Capgemini",
      role: "Cyber Security Analyst",
      period: "Nov 2014 - Oct 2017",
      location: "Mumbai, India",
      description: [
        "SIEM experience on RSA SA and Qualys vulnerability assessment.",
        "Performed vulnerability scans on all server and network devices using Qualys.",
        "Handled RSA Security Analytics implementation & administration.",
        "Managed event source integration with SIEM and created Rules, Reports, and Dashboards to detect threats.",
        "Configured correlations and alerts on SIEM and handled Security Incident Investigation till closure.",
        "Exposure to HP Tipping Point IPS/IDS."
      ]
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Technology",
      period: "2010 - 2014",
      details: "Computer Science & Engineering"
    }
  ],
  skills: [
    {
      category: "Security Operations",
      items: ["SOAR", "Cyber Threat Intelligence (CTI)", "SIEM", "Incident Response", "Vulnerability Assessment"]
    },
    {
      category: "Tools & Platforms",
      items: ["Cyware", "Splunk", "RSA Security Analytics", "Qualys", "HP Tipping Point"]
    },
    {
      category: "Core Competencies",
      items: ["Threat Analysis", "Security Architecture", "Risk Management", "Security Consulting", "Automation"]
    }
  ],
  projects: [
    {
      name: "Interactive Resume",
      description: "A personalized portfolio website.",
      technologies: ["React", "Tailwind CSS"]
    }
  ],
  aboutMe: {
    bio: [
      "Experienced in the cybersecurity field, I specialize in threat intelligence, cyber risk management, and security solutions architecture. My journey has led me to work with leading organizations, including Cyware, Optiv Inc., Cognizant, and Capgemini, where I have delivered solutions that help organizations stay ahead of evolving cyber threats.",
      "I have a strong foundation in security consulting, incident response, and proactive threat monitoring, combined with the technical expertise and strategic insight needed to address complex security challenges.",
      "My roles have involved collaborating across teams to design and implement robust security programs, leveraging both custom-built and industry-standard solutions. From conducting threat analysis to advising on best practices and integrating cybersecurity solutions, my goal has always been to strengthen the security posture of the organizations I work with."
    ],
    philosophy: "Strengthening security posture through proactive threat monitoring, strategic automation, and robust architecture.",
    interests: [
      { name: "Threat Intelligence", icon: "Shield", description: "Analyzing evolving cyber threats." },
      { name: "Automation (SOAR)", icon: "Cpu", description: "Streamlining security operations." },
      { name: "Security Strategy", icon: "Lock", description: "Fortifying organizational defenses." }
    ]
  },

  /** 
   * =========================================================
   * BLOG POSTS SECTION
   * =========================================================
   * 
   * HOW TO ADD A NEW BLOG POST:
   * 1. Upload your .md file to your GitHub repository (e.g., in a 'posts' folder).
   * 2. Click on the file in GitHub, then click "Raw" to get the raw URL.
   * 3. Copy the object below and paste it into the `blogPosts` array.
   * 
   * TEMPLATE:
   * {
   *   id: "unique-id-here",
   *   title: "Your Blog Title",
   *   excerpt: "A short summary...",
   *   date: "Month Day, Year",
   *   readTime: "5 min read",
   *   tags: ["Tag1", "Tag2"],
   *   markdownUrl: "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/posts/your-file.md"
   * }
   */
  blogPosts: [
    {
      id: "1",
      title: "How to Manage Your Blog Content",
      excerpt: "This sample post explains how to add new cybersecurity articles to your portfolio using GitHub.",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "2 min read",
      tags: ["Guide", "GitHub", "Markdown"],
      // Use the 'content' field for short text, OR 'markdownUrl' for long files hosted on GitHub
      content: `
# Managing Your Cybersecurity Blog

This platform is designed to let you share your expertise in Threat Intelligence, SOAR, and Security Architecture.

## Adding New Posts

You can host your blog content directly on GitHub, making it easy to write in Markdown and publish instantly.

### Step 1: Write your content
Create a \`.md\` file for your article. For example, \`threat-intel-101.md\`.

### Step 2: Host it
Upload this file to a GitHub repository (e.g., \`your-username/my-portfolio/posts\`).

### Step 3: Link it
In \`constants.ts\`, add a new entry to the \`blogPosts\` array using the **Raw** URL of your file:

\`\`\`typescript
{
  id: "2",
  title: "The Future of SOAR",
  excerpt: "Exploring the impact of automation on modern SOCs...",
  date: "Nov 15, 2023",
  readTime: "5 min read",
  tags: ["SOAR", "Automation"],
  markdownUrl: "https://raw.githubusercontent.com/yourusername/my-portfolio/main/posts/future-of-soar.md"
}
\`\`\`
      `
    }
  ]
};
