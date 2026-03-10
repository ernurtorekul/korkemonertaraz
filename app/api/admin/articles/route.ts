import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth-helpers';
import { getArticles, createArticle } from '@/lib/supabase/articles';

function serializeArticle(article: any) {
  return {
    ...article,
    created_at: article.created_at instanceof Date
      ? article.created_at.toISOString()
      : article.created_at,
  };
}

// GET /api/admin/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articles = await getArticles();
    const serializedArticles = articles.map(serializeArticle);
    return NextResponse.json(serializedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST /api/admin/articles - Create a new article
export async function POST(request: NextRequest) {
  try {
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const article = await createArticle(body);

    return NextResponse.json(serializeArticle(article), { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
