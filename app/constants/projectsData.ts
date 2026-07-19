import { experienceDataType } from '../types/experienceData'

export const projectsData: experienceDataType[] = [
  {
    windowTitle: 'school-project',
    defaultPosition: { x: 80, y: 60 },
    size: { width: 700, height: 450 },
    title: 'Savy: AI-Powered Interview Practice Mobile Application',
    company: 'University Capstone Project - Central Philippine University',
    description: [
      'Collaborated in a 2-person team using Agile scrum to design, build, and test a mobile Android app that simulates personalized job interviews through AI-driven question generation and performance feedback.',
      'Developed core features: resume and job-description parsing with AI question generation (GPT-4o), a virtual interviewer with voice interaction (Amazon Polly TTS, Whisper STT), and multi-metric feedback — relevance, estimated eye contact via dlib, grammar, speaking pace, and filler words — based on IELTS Speaking descriptors.',
      'Integrated a FastAPI backend with Supabase (PostgreSQL), Clerk authentication, and progress tracking.',
      'Delivered the final product with full SDLC documentation, including entity-relationship diagrams, use cases, and activity diagrams.',
    ],
    badge: 'March 2024 - January 2025',
    techStack: [
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Expo',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg',
        style: { filter: 'invert(100%) sepia(100%) grayscale(100%)' },
      },
      {
        name: 'FastAPI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
      },
      {
        name: 'Supabase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
      },
      {
        name: 'OpenAI',
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg',
        style: { filter: 'invert(100%) sepia(100%) grayscale(100%)' },
      },
      {
        name: 'Github',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        style: { filter: 'invert(100%) sepia(100%) grayscale(100%)' },
      },
    ],
  },
  {
    windowTitle: 'school-project',
    defaultPosition: { x: 750, y: 380 },
    size: { width: 640, height: 357 },
    title: 'Crowdfunding & Content Management Platform for Global Shapers - Iloilo',
    company: 'University Project - Central Philippine University',
    description: [
      'Designed and implemented a cloud-hosted relational database, including its schema and deployment.',
      'Developed backend request handlers with end-to-end type safety for efficient frontend-backend communication.',
      'Ensured robust data handling and seamless integration with the frontend.',
      'Collaborated with team members on code reviews, task coordination, and system integration.',
      'Worked closely with the client to gather requirements and tailor solutions.',
    ],
    badge: 'September 2023 - October 2024',
    techStack: [
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      },
      {
        name: 'tRPC',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg',
      },
      {
        name: 'Prisma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'Github',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
        style: { filter: 'invert(100%) sepia(100%) grayscale(100%)' },
      },
    ],
  },
  {
    windowTitle: 'freelance-project',
    defaultPosition: { x: 100, y: 520 },
    size: { width: 570, height: 295 },
    title: 'Client Data Explorer Tool',
    company: 'Freelance - Self-employed',
    description: [
      'Delivered on schedule a client-facing web tool for exploring an existing database.',
      'Built RESTful C# API endpoints and a Next.js frontend rendering a dynamic, filterable, sortable, paginated table.',
    ],
    badge: 'March 2025',
    techStack: [
      {
        name: 'C#',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
    ],
  },
]
