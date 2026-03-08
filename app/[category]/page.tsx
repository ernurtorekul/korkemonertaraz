import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TitleBlock, TextBlock, ImageBlock, FileBlock } from '@/components/blocks';
import { getArticles } from '@/lib/supabase/articles';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

interface Article {
  id: string;
  category: string;
  title: string;
  blocks: any[];
  created_at: string;
  published: boolean;
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

// Map URL slugs to category names
const slugToCategory: Record<string, string> = {
  'әкімшілік': 'Әкімшілік',
  'антнотация': 'Аннотация',
  'оқу-әдістемелік-жұмыстар': 'Оқу-әдістемелік жұмыстар',
  'тәрбие-жұмысы': 'Тәрбие жұмысы',
  'біздің-түлектер': 'Біздің түлектер',
  'ата-аналарға': 'Ата-аналарға',
  'жетістіктер': 'Жетістіктер',
  'нормативтік-құжаттар': 'Нормативтік құжаттар',
  'байланыс': 'Байланыс',
  'сабақ-кестесі': 'Сабақ кестесі',
  'оқушылар-жетістігі': 'Оқушылар жетістігі',
  'іс-шаралар': 'Іс-шаралар',
  'жемқорлыққа-қарсы-күрес': 'Жемқорлыққа қарсы күрес',
  'қамқоршылық-кеңес': 'Қамқоршылық кеңес',
  'мемлекеттік-қызмет': 'Мемлекеттік қызмет',
};

async function getArticlesByCategory(categorySlug: string): Promise<{ articles: Article[]; categoryName: string }> {
  // Decode the URL slug (handles Cyrillic characters properly)
  const decodedSlug = decodeURIComponent(categorySlug);
  let categoryName = slugToCategory[decodedSlug];

  // If not found in mapping, try to find a matching category in the database
  if (!categoryName) {
    const allArticles = await getArticles();
    const allCategories = new Set(allArticles.map(a => a.category));

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Әзірше бұл санат бойынша мақалалар жоқ
          </div>
        </div>
      </div>
    );
  }

  // If only one article, show it directly
  if (articles.length === 1) {
    const article = articles[0];
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-sm text-blue-900 font-semibold mb-2">
              {article.category}
            </div>

            {article.blocks.map((block) => {
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
    );
  }

  // If multiple articles, show list
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/${category}/${article.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="text-sm text-blue-900 font-semibold mb-2">
                  {formatDate(article.created_at)}
                </div>
                <h2 className="text-xl font-bold mb-3 line-clamp-2">
                  {article.title}
                </h2>
                {article.blocks.length > 0 && article.blocks[0].type === 'text' && (
                  <p className="text-gray-600 line-clamp-3">
                    {article.blocks[0].content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getCategories } = await import('@/lib/supabase/articles');
  const categories = await getCategories();

  return categories.map(category => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}
