import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { TitleBlock, TextBlock, ImageBlock, FileBlock } from '@/components/blocks';
import { getArticles } from '@/lib/supabase/articles';
import type { Article } from '@/types/article';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

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

// Get the first image URL from blocks, or return null
const getFirstImageUrl = (blocks: any[] | undefined): string | null => {
  if (!blocks) return null;
  const imageBlock = blocks.find(block => block.type === 'image');
  return imageBlock?.content || null;
};

// Map English URL slugs to Kazakh category names
const slugToCategory: Record<string, string> = {
  'administration': 'Әкімшілік',
  'annotation': 'Аннотация',
  'teaching-materials': 'Оқу-әдістемелік жұмыстар',
  'educational-work': 'Тәрбие жұмысы',
  'graduates': 'Біздің түлектер',
  'parents': 'Ата-аналарға',
  'achievements': 'Жетістіктер',
  'documents': 'Нормативтік құжаттар',
  'contact': 'Байланыс',
  'schedule': 'Сабақ кестесі',
  'student-achievements': 'Оқушылар жетістігі',
  'events': 'Іс-шаралар',
  'anti-corruption': 'Жемқорлыққа қарсы күрес',
  'trustee-council': 'Қамқоршылық кеңес',
  'public-services': 'Мемлекеттік қызмет',
};

async function getArticlesByCategory(categorySlug: string): Promise<{ articles: Article[]; categoryName: string }> {
  // Decode the URL slug (handles Cyrillic characters properly)
  const decodedSlug = decodeURIComponent(categorySlug);
  let categoryName = slugToCategory[decodedSlug];

  // If not found in mapping, try to find a matching category in the database
  if (!categoryName) {
    const allArticles = await getArticles();
    const allCategories = Array.from(new Set(allArticles.map(a => a.category)));

    // Try to find a category that matches the slug (case-insensitive)
    for (const cat of allCategories) {
      const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
      if (catSlug === decodedSlug.toLowerCase()) {
        categoryName = cat;
        break;
      }
    }
  }

  if (!categoryName) {
    return { articles: [], categoryName: decodedSlug };
  }

  // Use the getArticles function with category and published filters
  let articles = await getArticles({ category: categoryName, published: true });

  // For events, sort by event_date instead of created_at
  // Show future events first, then past events
  if (categoryName === 'Іс-шаралар') {
    const now = new Date();
    articles = articles.sort((a, b) => {
      const dateA = a.event_date ? new Date(a.event_date) : new Date(a.created_at);
      const dateB = b.event_date ? new Date(b.event_date) : new Date(b.created_at);

      // Future events come first, sorted by date
      const aIsFuture = dateA >= now;
      const bIsFuture = dateB >= now;

      if (aIsFuture && !bIsFuture) return -1;
      if (!aIsFuture && bIsFuture) return 1;

      // Both are future or both are past, sort by date
      return dateA.getTime() - dateB.getTime();
    });
  }

  return { articles, categoryName };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const { articles, categoryName } = await getArticlesByCategory(category);

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-skyTint py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">{categoryName}</h1>
            <div className="w-16 h-1 bg-vibrantGold mx-auto mb-8 rounded-full"></div>
            <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-lg">Әзірше бұл санат бойынша мақалалар жоқ</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If only one article, show it directly
  if (articles.length === 1) {
    const article = articles[0];
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const isEvent = categoryName === 'Іс-шаралар';

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

  // If multiple articles, show list
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">{categoryName}</h1>
          <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const imageUrl = getFirstImageUrl(article.blocks);
            const isEvent = categoryName === 'Іс-шаралар';

            // For events, get calendar-style date info
            const getEventDayInfo = (dateString: string | null | undefined) => {
              if (!dateString) return null;
              try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return null;
                return {
                  day: date.getDate().toString(),
                  month: date.toLocaleDateString('kk-KZ', { month: 'long' }),
                  dayName: date.toLocaleDateString('kk-KZ', { weekday: 'long' }),
                };
              } catch {
                return null;
              }
            };

            const eventInfo = isEvent ? getEventDayInfo(article.event_date) : null;

            return (
              <Link
                key={article.id}
                href={`/${categorySlug}/${article.id}`}
                className="card group overflow-hidden flex flex-col"
              >
                {/* Card Image */}
                <div className="relative h-48 bg-gradient-to-br from-trustBlue to-blue-700 overflow-hidden flex-shrink-0">
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-trustBlue/60 to-transparent"></div>
                    </>
                  ) : (
                    <>
                      <Image
                        src="/logo.jpeg"
                        alt="Көркемөнер мектебі"
                        fill
                        className="object-contain p-6 bg-white/90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-trustBlue/60 to-transparent"></div>
                    </>
                  )}

                  {/* Date Badge - different style for events */}
                  {isEvent && eventInfo ? (
                    <div className="absolute top-3 right-3">
                      <div className="bg-vibrantGold text-trustBlue rounded-lg p-2 text-center shadow-lg min-w-[60px]">
                        <div className="text-xs font-medium opacity-90 leading-tight">{eventInfo.month}</div>
                        <div className="text-xl font-bold leading-none">{eventInfo.day}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-vibrantGold text-trustBlue text-xs font-bold px-3 py-1 rounded-full">
                        {formatDate(article.created_at)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-trustBlue mb-3 line-clamp-2 group-hover:text-vibrantGold transition-colors">
                    {article.title}
                  </h3>

                  {/* Event date/time display */}
                  {isEvent && article.event_date && (
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <time className="truncate">{formatEventDate(article.event_date)}</time>
                    </div>
                  )}

                  {article.blocks && article.blocks.length > 0 && article.blocks[0].type === 'text' && (
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-1">
                      {article.blocks[0].content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                  )}

                  {/* Read More */}
                  <div className="mt-4 flex items-center text-trustBlue font-semibold text-sm group-hover:text-vibrantGold transition-colors">
                    <span>Толық оқу</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Return all category slugs for static generation
  return [
    { category: 'administration' },
    { category: 'annotation' },
    { category: 'teaching-materials' },
    { category: 'educational-work' },
    { category: 'graduates' },
    { category: 'parents' },
    { category: 'achievements' },
    { category: 'documents' },
    { category: 'contact' },
    { category: 'schedule' },
    { category: 'student-achievements' },
    { category: 'events' },
    { category: 'anti-corruption' },
    { category: 'trustee-council' },
    { category: 'public-services' },
  ];
}
