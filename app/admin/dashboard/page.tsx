'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/types/article';
import { useLanguageState } from '@/lib/languageState';

export default function AdminDashboard() {
  const router = useRouter();
  const [language] = useLanguageState();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const content = useMemo(() => language === 'kk' ? {
    adminPanel: 'Админ панель',
    newArticle: 'Жаңа мақала',
    logout: 'Шығу',
    articles: 'Мақалалар',
    noArticles: 'Әзірше мақалалар жоқ',
    published: 'Жарияланған',
    unpublished: 'Жарияланбаған',
    edit: 'Өңдеу',
    delete: 'Өшіру',
    deleteConfirm: 'Бұл мақаланы өшіруді қалайсыз ба?',
    fetchError: 'Мақаларды алу мүмкін емес',
    errorOccurred: 'Қате орын алды',
    deleteFailed: 'Мақаланы өшу мүмкін емес',
    loadingText: 'Жүктелуде...',
  } : {
    adminPanel: 'Панель администратора',
    newArticle: 'Новая статья',
    logout: 'Выйти',
    articles: 'Статьи',
    noArticles: 'Пока нет статей',
    published: 'Опубликовано',
    unpublished: 'Не опубликовано',
    edit: 'Редактировать',
    delete: 'Удалить',
    deleteConfirm: 'Вы уверены, что хотите удалить эту статью?',
    fetchError: 'Не удалось получить статьи',
    errorOccurred: 'Произошла ошибка',
    deleteFailed: 'Не удалось удалить статью',
    loadingText: 'Загрузка...',
  }, [language]);

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';

      const day = date.getDate();
      const year = date.getFullYear();
      const monthIndex = date.getMonth();

      if (language === 'kk') {
        const monthsKk = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
                          'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
        return `${day} ${monthsKk[monthIndex]} ${year} ж.`;
      } else {
        const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${day} ${monthsRu[monthIndex]} ${year} г.`;
      }
    } catch {
      return '';
    }
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/admin/articles');

        if (response.status === 401) {
          router.push('/admin');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          setError(content.fetchError);
        }
      } catch (err) {
        setError(content.errorOccurred);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [router, content]);

  const handleDelete = async (id: string) => {
    if (!confirm(content.deleteConfirm)) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArticles(articles.filter(a => a.id !== id));
      } else {
        alert(content.deleteFailed);
      }
    } catch (err) {
      alert(content.errorOccurred);
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{content.adminPanel}</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/articles/new"
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              {content.newArticle}
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {content.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Articles List */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{content.articles}</h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            </div>
          ) : error ? (
            <div className="px-6 py-12 text-center text-red-600">{error}</div>
          ) : articles.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              {content.noArticles}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {articles.map((article) => (
                <div key={article.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-900">
                        {article.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        article.published
                          ? 'bg-green-100 text-green-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {article.published ? content.published : content.unpublished}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(article.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      {content.edit}
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50"
                    >
                      {content.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
