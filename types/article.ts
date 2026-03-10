export type BlockType = 'title' | 'text' | 'image' | 'file';

export interface Block {
  id: string;
  article_id: string;
  type: BlockType;
  content: string;
  order_num: number;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  published: boolean;
  created_at: string;
  event_date?: string; // Optional ISO date string for events (e.g., "2026-03-15T14:00:00")
  blocks?: Block[];
}

export interface CreateArticleInput {
  category: string;
  title: string;
  published?: boolean;
  event_date?: string | null;
  created_at?: string | null;
  blocks: Omit<Block, 'id' | 'article_id'>[];
}

export interface UpdateArticleInput {
  id: string;
  category?: string;
  title?: string;
  published?: boolean;
  event_date?: string | null;
  created_at?: string | null;
  blocks?: Omit<Block, 'id' | 'article_id'>[];
}
