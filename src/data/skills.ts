export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Svelte", "Tailwind CSS"],
  },
  {
    category: "Mobile",
    skills: ["Flutter", "Dart"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "REST API", "JWT Auth"],
  },
  {
    category: "Bahasa & Lainnya",
    skills: ["TypeScript", "Python", "Git", "Vercel", "Figma"],
  },
];
