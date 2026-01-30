
export enum UserRole {
  USER = 'user',
  PRODUCER = 'producer',
  ANALYST = 'analyst',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: UserRole;
  notificationsEnabled: boolean;
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  description?: string;
  genre: string;
  category: 'Tamil' | 'English' | 'K-Drama' | 'Animation';
  cast: string;
  director: string;
  hero: string;
  heroine: string;
  vibe: string;
  releaseType: 'Theatre' | 'OTT';
  rating: number;
}

export interface Feedback {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AppState {
  currentUser: User | null;
  movies: Movie[];
  feedback: Feedback[];
  notifications: Notification[];
}
