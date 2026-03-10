import { getLatestNews } from '@/lib/supabase/articles';
import NewsPreviewContent from './NewsPreviewContent';

export default async function NewsPreview() {
  // Exclude events from latest news preview (they have their own section)
  const articles = await getLatestNews(3, ['Іс-шаралар']);

  return <NewsPreviewContent articles={articles} />;
}
