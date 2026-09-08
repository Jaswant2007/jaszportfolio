/**
 * Central content configuration.
 * Edit everything about the portfolio from this single file.
 */

import portraitAsset from "@/assets/jaswant-portrait.webp.asset.json";

export const profile = {
  name: "Jaswant Yuvarajan",
  fullName: "Jaswant Yuvarajan",
  avatar: "/profile.jpg",
  role: "B.Tech Computer Science & Engineering student at Amrita Vishwa Vidyapeetham, Chennai",
  jobTitle: "Full-Stack Developer",
  headline: "Full-Stack Developer & CSE Student",
  seoDescription:
    "Jaswant Yuvarajan is a B.Tech Computer Science & Engineering student at Amrita Vishwa Vidyapeetham, Chennai, working as a full-stack developer building practical web applications and strengthening Data Structures & Algorithms.",
  identity:
    "B.Tech Computer Science & Engineering student at Amrita Vishwa Vidyapeetham, Chennai. Full-Stack Developer focused on building practical web applications, strengthening Data Structures and Algorithms, and learning modern software development.",
  tagline:"Translating core Data Structures, OOP, and modern software principles into responsive web applications.",
  intro:
    "I'm Jaswant Yuvarajan, a Computer Science and Engineering undergraduate at Amrita Vishwa Vidyapeetham, Chennai, and a full-stack developer in the making. I enjoy turning ideas into working software — from small C programs to complete web apps — and I'm currently deep into Python, JavaScript and Data Structures & Algorithms.",
  location: "Chennai, India",
  email: "jas22happy@gmail.com", // ← replace with your real email
  resumeUrl: "", // optional: link to a hosted resume PDF
  photo: portraitAsset.url,

};

export const socials = [
  { label: "GitHub", href: "https://github.com/Jaswant2007", handle: "@Jaswant2007" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "https://www.linkedin.com/in/jaswant-yuvarajan-6bb443383/" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
];

export const codingProfiles = [
  { label: "GitHub", href: "https://github.com/Jaswant2007", note: "Code & Projects", stat: "" },
  { label: "LeetCode", href: "https://leetcode.com/u/Jas22wanty/", note: "Problem Solving / DSA", stat: "" },
  /*{ label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/", note: "Problem solving", stat: "" },
  { label: "CodeChef", href: "https://www.codechef.com/", note: "Contests", stat: "" },
  { label: "HackerRank", href: "https://www.hackerrank.com/", note: "Skill badges", stat: "" },
  { label: "Codeforces", href: "https://codeforces.com/", note: "Competitive", stat: "" },
  */
];

/** LeetCode username used to fetch live public stats. Change it here only. */
export const leetcodeUsername = "Jas22wanty";


export const education = [
  {
    period: "2025 — 2029",
    title: "B.Tech, Computer Science & Engineering",
    org: "Amrita Vishwa Vidyapeetham, Chennai",
    detail:
      "Core coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management, and Software Engineering. Actively applying CS fundamentals to design real-world software and web applications.",
    status: "Current",
  },
  {
    period: "Completed",
    title: "Higher Secondary Education",
    org: "Narayana Group of Schools",
    detail: "Specialized in Physics, Chemistry, Mathematics, and Computer Science (PCM-CS). Developed strong foundations in analytical problem solving and basic programming.",
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
  /*{
    title: "Web Development",
    detail: "HTML, CSS and JavaScript fundamentals with modern interactive UI patterns.",
    progress: "Exploring",
  },
  */
  {
    title: "Problem Solving",
    detail: "Daily practice on LeetCode to build consistency.",
    progress: "Making it Habituated",
  },
];

export const certificates = [
  {
    title: "System Siege Hackthon",
    org: "Amrita Vishwa Vidyapeetham",
    date: "18-07-2026",
    credentialUrl:"https://unstop.com/certificate-preview/e5347b8e-7cad-4301-b7df-52f28059ad1f",
  },
  {
    title:"HACK-A-RUCKUS 2.0",
    org: "Amrita Vishwa Vidyapeetham",
    date: "22-12-2025",
    credentialUrl:"https://unstop.com/certificate-preview/621f8dce-39f2-4790-a2bc-d9f79f58ca8d"

  }
];

export const skillGroups = [
  { group: "Languages", items: ["Python", "C", "Java", "JavaScript", "SQL (basics)"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive UI"] },
  { group: "Backend", items: ["Python scripting", "Java OOP", "REST APIs (learning)"] },
  { group: "Databases", items: ["MySQL (coursework)", "Relational modelling"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel"] },
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
    title: "LearnSphere",
    description:"LearnSphere is a fully responsive student productivity platform featuring a study planner, progress dashboard, Pomodoro timer, and notes system — built from scratch with HTML, CSS, and JavaScript.",
    category: "Web",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Font Awesome"],
    github: "https://github.com/Jaswant2007/trackingsystem.git",
    demo: "https://trackingsystem-eosin.vercel.app/",
  },
  /*{
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
  */
];

export const projectCategories = ["All", "Web", "DSA", "Hardware", "Other"] as const;

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
  //{ label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
] as const;
