import { NextResponse } from 'next/server';
import { getLatestNews } from '@/lib/supabase/articles';

export async function GET() {
  try {
    const articles = await getLatestNews(3);

    // Serialize dates to strings for JSON response
    const serializedArticles = articles.map(article => ({
      ...article,
      created_at: article.created_at,
    }));

    return NextResponse.json(serializedArticles);
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
