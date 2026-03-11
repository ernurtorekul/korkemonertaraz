import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/supabase/articles';
import type { Article } from '@/types/article';

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

// Strip HTML tags (server-side safe)
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '').substring(0, 150);
};

// Get the first image URL from blocks, or return null
const getFirstImageUrl = (blocks: any[] | undefined): string | null => {
  if (!blocks) return null;
  const imageBlock = blocks.find(block => block.type === 'image');
  return imageBlock?.content || null;
};

// Map Kazakh category names to English slugs
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
  // Get all published articles sorted by created_at (newest first)
  const articles = await getArticles({ published: true });

  const getCategorySlug = (category: string) => {
    return categoryToSlug[category] || category.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">Барлық жаңалықтар</h1>
          <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Мектептің соңғы жаңалықтары мен хабарландырулары
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-sm">
              <svg className="w-10 h-10 text-trustBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Әзірше жаңалықтар жоқ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const imageUrl = getFirstImageUrl(article.blocks);
              const categorySlug = getCategorySlug(article.category);

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
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-vibrantGold text-trustBlue text-xs font-bold px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-trustBlue mb-3 line-clamp-2 group-hover:text-vibrantGold transition-colors">
                      {article.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time>{formatDate(article.created_at)}</time>
                    </div>

                    {article.blocks && article.blocks.length > 0 && article.blocks[0].type === 'text' && (
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-1">
                        {stripHtml(article.blocks[0].content)}
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
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-trustBlue hover:text-vibrantGold font-semibold transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Басты бетке оралу
          </Link>
        </div>
      </div>
    </div>
  );
}
