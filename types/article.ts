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
  blocks?: Block[];
}

export interface CreateArticleInput {
  category: string;
  title: string;
  published?: boolean;
  blocks: Omit<Block, 'id' | 'article_id'>[];
}

export interface UpdateArticleInput {
  id: string;
  category?: string;
  title?: string;
  published?: boolean;
  blocks?: Omit<Block, 'id' | 'article_id'>[];
}
