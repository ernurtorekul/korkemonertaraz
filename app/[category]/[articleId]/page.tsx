import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/supabase/articles';
import ArticlePageContent from '@/components/pages/ArticlePageContent';

interface PageProps {
  params: Promise<{
    category: string;
    articleId: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;
  const article = await getArticle(articleId);

  if (!article || !article.published) {
    notFound();
  }

  return <ArticlePageContent article={article} />;
}
