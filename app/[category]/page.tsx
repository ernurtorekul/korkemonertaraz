import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/supabase/articles';
import type { Article } from '@/types/article';
import CategoryPageContent from '@/components/pages/CategoryPageContent';
import CategoryPageHeader from '@/components/pages/CategoryPageHeader';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

// Map English URL slugs to Kazakh category names
// Note: 'contact' is excluded as it has its own dedicated page at /contact
const slugToCategory: Record<string, string> = {
  'administration': 'Әкімшілік',
  'annotation': 'Аннотация',
  'teaching-materials': 'Оқу-әдістемелік жұмыстар',
  'educational-work': 'Тәрбие жұмысы',
  'graduates': 'Біздің түлектер',
  'parents': 'Ата-аналарға',
  'achievements': 'Жетістіктер',
  'documents': 'Нормативтік құжаттар',
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const { articles, categoryName } = await getArticlesByCategory(category);

  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-skyTint py-16">
        <div className="section-container">
          <CategoryPageHeader categoryName={categoryName} isEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        <CategoryPageHeader categoryName={categoryName} />
        <CategoryPageContent articles={articles} categorySlug={categorySlug} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Return all category slugs for static generation
  // Note: 'contact' and 'annotation' are excluded as they have their own dedicated pages
  return [
    { category: 'administration' },
    { category: 'teaching-materials' },
    { category: 'educational-work' },
    { category: 'graduates' },
    { category: 'parents' },
    { category: 'achievements' },
    { category: 'documents' },
    { category: 'schedule' },
    { category: 'student-achievements' },
    { category: 'events' },
    { category: 'anti-corruption' },
    { category: 'trustee-council' },
    { category: 'public-services' },
  ];
}
