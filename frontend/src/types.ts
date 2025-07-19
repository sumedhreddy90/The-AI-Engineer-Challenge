export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatRequest {
  developer_message: string;
  user_message: string;
  model: string;
  api_key: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export interface Settings {
  apiKey: string;
  model: string;
  developerMessage: string;
} 