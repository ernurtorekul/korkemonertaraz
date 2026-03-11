import { getArticles } from '@/lib/supabase/articles';
import AnnotationPageContent from '@/components/pages/AnnotationPageContent';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AnnotationPage() {
  // Get the latest article from "Аннотация" category
  const articles = await getArticles({ category: 'Аннотация', published: true });

  // Sort by created_at descending to get the latest
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB.getTime() - dateA.getTime();
  });

  const latestArticle = sortedArticles[0] || null;

  return <AnnotationPageContent article={latestArticle} />;
}
