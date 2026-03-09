import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TitleBlock, TextBlock, ImageBlock, FileBlock } from '@/components/blocks';
import { getArticle } from '@/lib/supabase/articles';
import type { Article } from '@/types/article';

interface PageProps {
  params: Promise<{
    category: string;
    articleId: string;
  }>;
}

// Map Kazakh category names to English URL slugs
const categoryToSlug: Record<string, string> = {
  'Әкімшілік': 'administration',
  'Аннотация': 'annotation',
  'Оқу-әдістемелік жұмыстар': 'teaching-materials',
  'Тәрбие жұмысы': 'educational-work',
  'Біздің түлектер': 'graduates',
  'Ата-аналарға': 'parents',
  'Жетістіктер': 'achievements',
  'Нормативтік құжаттар': 'documents',
  'Байланыс': 'contact',
  'Сабақ кестесі': 'schedule',
  'Оқушылар жетістігі': 'student-achievements',
  'Іс-шаралар': 'events',
  'Жемқорлыққа қарсы күрес': 'anti-corruption',
  'Қамқоршылық кеңес': 'trustee-council',
  'Мемлекеттік қызмет': 'public-services',
};

// Safe date parsing function
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return '';
  }
}

// Format event date with time (e.g., "15 Наурыз 2026, 14:30")
function formatEventDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleDateString('kk-KZ', options);
  } catch {
    return '';
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;
  const article = await getArticle(articleId);

  if (!article || !article.published) {
    notFound();
  }

  // Use the mapped English slug instead of generating from category name
  const categorySlug = categoryToSlug[article.category] || article.category.toLowerCase().replace(/\s+/g, '-');
  const isEvent = article.category === 'Іс-шаралар';

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center text-trustBlue hover:text-vibrantGold mb-6 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Артқа қайту
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="text-sm text-trustBlue font-semibold mb-2">
              {article.category}
            </div>

            {/* Show event date prominently for events */}
            {isEvent && article.event_date ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{formatEventDate(article.event_date)}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(article.created_at)}
              </div>
            )}

            {article.blocks?.map((block) => {
              switch (block.type) {
                case 'title':
                  return <TitleBlock key={block.id} block={block} />;
                case 'text':
                  return <TextBlock key={block.id} block={block} />;
                case 'image':
                  return <ImageBlock key={block.id} block={block} />;
                case 'file':
                  return <FileBlock key={block.id} block={block} />;
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
