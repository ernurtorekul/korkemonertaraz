import Link from 'next/link';
import { getLatestNews } from '@/lib/supabase/articles';

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

export default async function NewsPreview() {
  // Fetch articles on the server side
  const articles = await getLatestNews(3);

  const getCategorySlug = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Соңғы жаңалықтар</h2>
          <Link href="/" className="text-blue-900 hover:text-blue-700 font-semibold">
            Барлығын көру →
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Әзірше жаңалықтар жоқ
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/${getCategorySlug(article.category)}/${article.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="text-sm text-blue-900 font-semibold mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4">
                    {formatDate(article.created_at)}
                  </div>
                  {article.blocks.length > 0 && article.blocks[0].type === 'text' && (
                    <p className="text-gray-600 line-clamp-3">
                      {stripHtml(article.blocks[0].content)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
