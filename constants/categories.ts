import {
  Music,
  Mic,
  Trophy,
  BookOpen,
  Building,
  MoreHorizontal,
} from "lucide-react";
import React from "react";

interface Category {
  value: string;
  label: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { value: "1", label: "Music", icon: Music },
  { value: "2", label: "Seminar", icon: Mic },
  { value: "3", label: "Tournament", icon: Trophy },
  { value: "4", label: "Workshop", icon: BookOpen },
  { value: "5", label: "Expo", icon: Building },
  { value: "6", label: "Other", icon: MoreHorizontal },
];

export default categories;
