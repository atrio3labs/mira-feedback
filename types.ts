export enum FeedbackStatus {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  OPEN = 'Open'
}

export enum FeedbackCategory {
  FEATURE = 'Feature',
  BUG = 'Bug',
  IMPROVEMENT = 'Improvement'
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  status: FeedbackStatus;
  category: FeedbackCategory;
  votes: number;
  comments: Comment[];
  createdAt: string;
  attachments?: Attachment[];
}

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  tags: string[];
  highlights?: string[];
  features?: string[];
  bugFixes?: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
}