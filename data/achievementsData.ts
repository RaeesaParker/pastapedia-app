import { Achievement } from "../types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_pasta",
    title: "First Steps",
    description: "Make your first pasta shape",
    emoji: "🎉",
    requirement: { type: "count", target: 1 },
  },
  {
    id: "five_shapes",
    title: "Pasta Apprentice",
    description: "Make 5 different pasta shapes",
    emoji: "👨‍🍳",
    requirement: { type: "count", target: 5 },
  },
  {
    id: "ten_shapes",
    title: "Pasta Master",
    description: "Make all 10 pasta shapes",
    emoji: "👑",
    requirement: { type: "count", target: 10 },
  },
  {
    id: "emilia_romagna",
    title: "Emilia-Romagna Expert",
    description: "Make all pasta shapes from Emilia-Romagna",
    emoji: "🍝",
    requirement: { type: "region", target: "Emilia-Romagna" },
  },
  {
    id: "all_beginners",
    title: "Beginner Graduate",
    description: "Complete all beginner pasta shapes",
    emoji: "🎓",
    requirement: { type: "difficulty", target: "beginner" },
  },
  {
    id: "advanced_shapes",
    title: "Advanced Artisan",
    description: "Make all advanced pasta shapes",
    emoji: "🏆",
    requirement: { type: "difficulty", target: "advanced" },
  },
  {
    id: "filled_master",
    title: "Filled Pasta Master",
    description: "Make all filled pasta shapes",
    emoji: "🥟",
    requirement: { type: "type", target: "filled" },
  },
  {
    id: "long_pasta",
    title: "Long Pasta Pro",
    description: "Make all long pasta shapes",
    emoji: "📏",
    requirement: { type: "type", target: "long" },
  },

  {
    id: "explorer",
    title: "Regional Explorer",
    description: "Make pasta from 5 different regions",
    emoji: "🗺️",
    requirement: { type: "region", target: 5 },
  },
];
