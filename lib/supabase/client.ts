import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on the schema
export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          category: string;
          title: string;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title: string;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          published?: boolean;
          created_at?: string;
        };
      };
      blocks: {
        Row: {
          id: string;
          article_id: string;
          type: 'title' | 'text' | 'image' | 'file';
          content: string;
          order: number;
        };
        Insert: {
          id?: string;
          article_id: string;
          type: 'title' | 'text' | 'image' | 'file';
          content: string;
          order: number;
        };
        Update: {
          id?: string;
          article_id?: string;
          type?: 'title' | 'text' | 'image' | 'file';
          content?: string;
          order?: number;
        };
      };
    };
  };
}
