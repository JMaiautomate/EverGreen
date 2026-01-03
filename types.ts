
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface LandscapingService {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export enum AppState {
  LANDING = 'LANDING',
  CHAT = 'CHAT',
  VISUALIZER = 'VISUALIZER'
}
