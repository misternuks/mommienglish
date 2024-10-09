// src/types/lesson.ts

export interface Lesson {
  id: number;
  href: string;
  heading: string;
  title: string;
  password: string;
  imageUrl: string;
  createdAt: string; // Use 'string' if dates are serialized as ISO strings
  updatedAt: string;
}
