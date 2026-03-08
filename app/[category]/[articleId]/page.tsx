import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TitleBlock, TextBlock, ImageBlock, FileBlock } from '@/components/blocks';
import { getArticle } from '@/lib/supabase/articles';

interface PageProps {
  params: Promise<{
    category: string;
    articleId: string;
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

async function getArticleById(articleId: string): Promise<Article | null> {
  return getArticle(articleId);
}

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;
  const article = await getArticleById(articleId);

  if (!article || !article.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href={`/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6"
        >
          ← Артықа қайту
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-sm text-blue-900 font-semibold mb-2">
            {article.category}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {formatDate(article.created_at)}
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
