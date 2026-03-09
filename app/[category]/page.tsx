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
  const articles = await getArticles({ category: categoryName, published: true });

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
              Арттқа қайту
            </Link>

            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div className="text-sm text-trustBlue font-semibold mb-2">
                {article.category}
              </div>
              <div className="text-sm text-gray-500 mb-6 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(article.created_at)}
              </div>

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
                      {formatDate(article.created_at)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-trustBlue mb-3 line-clamp-2 group-hover:text-vibrantGold transition-colors">
                    {article.title}
                  </h3>

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
  const { getCategories } = await import('@/lib/supabase/articles');
  const categories = await getCategories();

  // Return both English slugs and Kazakh slugs for backward compatibility
  const slugs = categories.map(category => {
    const kazakhSlug = category.toLowerCase().replace(/\s+/g, '-');
    // Map Kazakh category names to English slugs
    const englishSlugMap: Record<string, string> = {
      'әкімшілік': 'administration',
      'антнотация': 'annotation',
      'оқу-әдістемелік-жұмыстар': 'teaching-materials',
      'тәрбие-жұмысы': 'educational-work',
      'біздің-түлектер': 'graduates',
      'ата-аналарға': 'parents',
      'жетістіктер': 'achievements',
      'нормативтік-құжаттар': 'documents',
      'сабақ-кестесі': 'schedule',
      'оқушылар-жетістігі': 'student-achievements',
      'іс-шаралар': 'events',
      'жемқорлыққа-қарсы-күрес': 'anti-corruption',
      'қамқоршылық-кеңес': 'trustee-council',
      'мемлекеттік-қызмет': 'public-services',
    };

    return {
      category: englishSlugMap[kazakhSlug] || kazakhSlug,
    };
  });

  // Also include common English routes directly
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
