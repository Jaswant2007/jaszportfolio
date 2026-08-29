/**
 * Central content configuration.
 * Edit everything about the portfolio from this single file.
 */

export const profile = {
  name: "Jaswant",
  fullName: "Jaswant Yuvarajan",
  role: "B.Tech CSE Student & Developer",
  tagline: "Building thoughtful software while learning Python, DSA and everything in between.",
  intro:
    "I'm a Computer Science and Engineering undergraduate at Amrita Vishwa Vidyapeetham, Chennai. I enjoy turning ideas into working software — from small C programs to web apps — and I'm currently deep into Python and Data Structures & Algorithms.",
  location: "Chennai, India",
  email: "jaswant@example.com", // ← replace with your real email
  resumeUrl: "", // optional: link to a hosted resume PDF
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Jaswant2007", handle: "@Jaswant2007" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "Add your LinkedIn URL" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
];

export const codingProfiles = [
  { label: "GitHub", href: "https://github.com/Jaswant2007", note: "Code & projects", stat: "" },
  { label: "LeetCode", href: "https://leetcode.com/", note: "DSA practice", stat: "" },
  { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/", note: "Problem solving", stat: "" },
  { label: "CodeChef", href: "https://www.codechef.com/", note: "Contests", stat: "" },
  { label: "HackerRank", href: "https://www.hackerrank.com/", note: "Skill badges", stat: "" },
  { label: "Codeforces", href: "https://codeforces.com/", note: "Competitive", stat: "" },
];

/** Stats stay empty until you fill in real numbers — no fabricated data. */
export const leetcodeStats: { label: string; value: string }[] = [
  { label: "Problems solved", value: "—" },
  { label: "Current streak", value: "—" },
  { label: "Global ranking", value: "—" },
];

export const education = [
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    org: "Amrita Vishwa Vidyapeetham, Chennai",
    detail:
      "Core coursework in programming, data structures, computer organisation, mathematics and software engineering.",
    status: "Current",
  },
  {
    period: "Completed",
    title: "Higher Secondary Education",
    org: "Add your school name",
    detail: "Science stream with Computer Science.",
    status: "Done",
  },
];

export const currentlyLearning = [
  {
    title: "Python",
    detail: "Core language, OOP, file handling and building small automation scripts.",
    progress: "In progress",
  },
  {
    title: "Data Structures & Algorithms",
    detail: "Arrays, strings, linked lists, recursion and complexity analysis.",
    progress: "In progress",
  },
  {
    title: "Web Development",
    detail: "HTML, CSS and JavaScript fundamentals with modern interactive UI patterns.",
    progress: "Exploring",
  },
  {
    title: "Problem Solving",
    detail: "Daily practice on LeetCode and GeeksforGeeks to build consistency.",
    progress: "Daily",
  },
];

export const certificates = [
  {
    title: "Add your certificate title",
    org: "Issuing organisation",
    date: "2025",
    credentialUrl: "",
  },
];

export const skillGroups = [
  { group: "Programming", items: ["Python", "C", "Java", "JavaScript"] },
  { group: "Web", items: ["HTML", "CSS", "JavaScript", "Responsive UI"] },
  { group: "AI / ML", items: ["NumPy", "Pandas", "ML basics"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Linux"] },
];

export type Project = {
  title: string;
  description: string;
  category: "Web" | "AI/ML" | "C" | "Java" | "Hardware" | "Other";
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "This interactive portfolio — 3D hero, particle field, scroll-driven motion and a fully responsive light UI.",
    category: "Web",
    tech: ["JavaScript", "Three.js", "Framer Motion", "CSS"],
    github: "https://github.com/Jaswant2007",
    demo: "",
  },
  {
    title: "Python Practice Toolkit",
    description:
      "A growing collection of Python scripts and DSA solutions written while learning — clean, commented and tested.",
    category: "AI/ML",
    tech: ["Python", "Algorithms"],
    github: "https://github.com/Jaswant2007",
  },
  {
    title: "C Programming Lab Work",
    description:
      "Structured C programs covering pointers, arrays, structures and file handling from coursework.",
    category: "C",
    tech: ["C", "GCC"],
    github: "https://github.com/Jaswant2007",
  },
  {
    title: "Java Mini Projects",
    description: "Object-oriented Java exercises and small console applications.",
    category: "Java",
    tech: ["Java", "OOP"],
    github: "https://github.com/Jaswant2007",
  },
];

export const projectCategories = ["All", "Web", "AI/ML", "C", "Java", "Hardware", "Other"] as const;

export const articles = [
  {
    title: "Starting DSA the right way",
    description:
      "How I structure daily problem solving, track patterns and avoid tutorial loops as a first-year CSE student.",
    category: "DSA",
    date: "2026",
    readingTime: "5 min read",
    tags: ["DSA", "Learning", "Consistency"],
    url: "",
  },
  {
    title: "Why Python clicked for me",
    description:
      "Notes on moving from C to Python, what felt easier, what felt strange, and the mental model that helped.",
    category: "Python",
    date: "2026",
    readingTime: "4 min read",
    tags: ["Python", "Beginner"],
    url: "",
  },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
] as const;
