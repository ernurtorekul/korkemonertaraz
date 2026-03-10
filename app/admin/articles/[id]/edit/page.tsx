'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Block } from '@/types/article';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { useLanguageState } from '@/lib/languageState';

const CATEGORIES_KK = [
  'Әкімшілік',
  'Аннотация',
  'Оқу-әдістемелік жұмыстар',
  'Тәрбие жұмысы',
  'Біздің түлектер',
  'Ата-аналарға',
  'Жетістіктер',
  'Нормативтік құжаттар',
  'Байланыс',
  'Ақпарат',
  'Сабақ кестесі',
  'Оқушылар жетістігі',
  'Іс-шаралар',
  'Жемқорлыққа қарсы күрес',
  'Қамқоршылық кеңес',
  'Мемлекеттік қызмет',
];

const CATEGORIES_RU: Record<string, string> = {
  'Әкімшілік': 'Администрация',
  'Аннотация': 'Аннотация',
  'Оқу-әдістемелік жұмыстар': 'Учебно-методическая работа',
  'Тәрбие жұмысы': 'Воспитательная работа',
  'Біздің түлектер': 'Наши выпускники',
  'Ата-аналарға': 'Родителям',
  'Жетістіктер': 'Достижения',
  'Нормативтік құжаттар': 'Нормативные документы',
  'Байланыс': 'Контакты',
  'Ақпарат': 'Информация',
  'Сабақ кестесі': 'Расписание',
  'Оқушылар жетістігі': 'Достижения учеников',
  'Іс-шаралар': 'Мероприятия',
  'Жемқорлыққа қарсы күрес': 'Борьба с коррупцией',
  'Қамқоршылық кеңес': 'Попечительский совет',
  'Мемлекеттік қызмет': 'Государственные услуги',
};

type EditBlock = Block;

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [blocks, setBlocks] = useState<EditBlock[]>([]);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [articleDate, setArticleDate] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    return CATEGORIES_KK.map(cat => ({
      value: cat,
      label: language === 'kk' ? cat : CATEGORIES_RU[cat]
    }));
  }, [language]);

  const content = language === 'kk' ? {
    pageTitle: 'Мақаланы өңдеу',
    cancel: 'Бас тарту',
    titleLabel: 'Тақырып',
    titlePlaceholder: 'Мақаланың тақырыбы',
    categoryLabel: 'Санат',
    categoryPlaceholder: 'Санатты таңдаңыз',
    eventDateLabel: 'Іс-шараның күні мен уақыты',
    eventDateHint: 'Іс-шара күні мен уақытын енгізіңіз (мысалы: 15.03.2026 14:30)',
    articleDateLabel: 'Мақала күні',
    articleDateHint: 'Мақаланың жарияланған күні',
    useTodayButton: 'Бүгін',
    publishLabel: 'Жарияланған',
    blockTypeTitle: 'Тақырып',
    blockTypeText: 'Мәтін',
    blockTypeImage: 'Сурет',
    blockTypeFile: 'Файл',
    change: 'Өзгерту',
    addTitle: '+ Тақырып',
    addText: '+ Мәтін',
    addImage: '+ Сурет',
    addFile: '+ Файл',
    saveButton: 'Сақтау',
    saveButtonLoading: 'Сақтау...',
    titlePlaceholder2: 'Тақырып мәтіні...',
    textPlaceholder: 'Мәтін енгізіңіз...',
    validationError: 'Тақырып, санат және кемінде бір блок қажет',
    fetchFailed: 'Мақаланы алу мүмкін емес',
    fetchError: 'Қате орын алды',
  } : {
    pageTitle: 'Редактировать статью',
    cancel: 'Отмена',
    titleLabel: 'Заголовок',
    titlePlaceholder: 'Заголовок статьи',
    categoryLabel: 'Категория',
    categoryPlaceholder: 'Выберите категорию',
    eventDateLabel: 'Дата и время мероприятия',
    eventDateHint: 'Введите дату и время мероприятия (например: 15.03.2026 14:30)',
    articleDateLabel: 'Дата статьи',
    articleDateHint: 'Дата публикации статьи',
    useTodayButton: 'Сегодня',
    publishLabel: 'Опубликовано',
    blockTypeTitle: 'Заголовок',
    blockTypeText: 'Текст',
    blockTypeImage: 'Изображение',
    blockTypeFile: 'Файл',
    change: 'Изменить',
    addTitle: '+ Заголовок',
    addText: '+ Текст',
    addImage: '+ Изображение',
    addFile: '+ Файл',
    saveButton: 'Сохранить',
    saveButtonLoading: 'Сохранение...',
    titlePlaceholder2: 'Текст заголовка...',
    textPlaceholder: 'Введите текст...',
    validationError: 'Необходим заголовок, категория и хотя бы один блок',
    fetchFailed: 'Не удалось получить статью',
    fetchError: 'Произошла ошибка',
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/admin/articles/${articleId}`);

        if (response.ok) {
          const article = await response.json();
          setTitle(article.title);
          setCategory(article.category);
          setBlocks(article.blocks);
          setPublished(article.published);

          // Set article date
          if (article.created_at) {
            const date = new Date(article.created_at);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setArticleDate(`${year}-${month}-${day}`);
          }

          if (article.event_date) {
            const date = new Date(article.event_date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            setEventDate(`${year}-${month}-${day}T${hours}:${minutes}`);
          } else {
            setEventDate('');
          }
        } else {
          alert(language === 'kk' ? 'Мақаланы алу мүмкін емес' : 'Не удалось получить статью');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        alert(language === 'kk' ? 'Қате орын алды' : 'Произошла ошибка');
        router.push('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [articleId, router]);

  const addBlock = (type: Block['type']) => {
    const newBlock: EditBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      article_id: articleId,
      type,
      content: '',
      order_num: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setBlocks(newBlocks);
  };

  const updateBlock = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Format article date (if provided) to ISO string
      let formattedArticleDate = undefined;
      if (articleDate) {
        const date = new Date(articleDate);
        formattedArticleDate = date.toISOString();
      }

      let formattedEventDate = null;
      if (category === 'Іс-шаралар' && eventDate) {
        const date = new Date(eventDate);
        formattedEventDate = date.toISOString();
      }

      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          category,
          blocks,
          published,
          created_at: formattedArticleDate,
          event_date: formattedEventDate,
        }),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to update article');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        updateBlock(index, url);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to upload file';
        alert(`File upload failed: ${errorMessage}`);
        console.error('Upload error:', errorData);
      }
    } catch (error) {
      alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Upload error:', error);
    }
  };

  const getBlockTypeLabel = (type: Block['type']) => {
    switch (type) {
      case 'title': return content.blockTypeTitle;
      case 'text': return content.blockTypeText;
      case 'image': return content.blockTypeImage;
      case 'file': return content.blockTypeFile;
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{content.pageTitle}</h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.cancel}
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.titleLabel}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder={content.titlePlaceholder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">{content.categoryPlaceholder}</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Article Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {content.articleDateLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={articleDate}
                onChange={(e) => setArticleDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  const year = today.getFullYear();
                  const month = String(today.getMonth() + 1).padStart(2, '0');
                  const day = String(today.getDate()).padStart(2, '0');
                  setArticleDate(`${year}-${month}-${day}`);
                }}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
              >
                {content.useTodayButton}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {content.articleDateHint}
            </p>
          </div>

          {/* Event Date - Only show for Events category */}
          {category === 'Іс-шаралар' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {content.eventDateLabel}
              </label>
              <input
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vibrantGold text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.eventDateHint}
              </p>
            </div>
          )}

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">{content.publishLabel}</span>
          </label>
        </div>

        {/* Blocks */}
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase">
                  {getBlockTypeLabel(block.type)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeBlock(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    ×
                  </button>
                </div>
              </div>

              {block.type === 'title' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xl font-semibold text-gray-900"
                  placeholder={content.titlePlaceholder2}
                />
              )}

              {block.type === 'text' && (
                <RichTextEditor
                  content={block.content}
                  onChange={(content) => updateBlock(index, content)}
                  placeholder={content.textPlaceholder}
                />
              )}

              {block.type === 'image' && (
                <div>
                  {block.content ? (
                    <div className="relative">
                      <img src={block.content} alt="Uploaded" className="max-h-64 rounded-lg" />
                      <button
                        onClick={() => updateBlock(index, '')}
                        className="mt-2 text-sm text-red-600 hover:underline"
                      >
                        {content.change}
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(index, file);
                      }}
                      className="w-full"
                    />
                  )}
                </div>
              )}

              {block.type === 'file' && (
                <div>
                  {block.content ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <a href={block.content} target="_blank" rel="noopener noreferrer" className="text-blue-900 truncate">
                        {block.content.split('/').pop()}
                      </a>
                      <button
                        onClick={() => updateBlock(index, '')}
                        className="text-sm text-red-600 hover:underline"
                      >
                        {content.change}
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(index, file);
                      }}
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Block Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => addBlock('title')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.addTitle}
          </button>
          <button
            onClick={() => addBlock('text')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.addText}
          </button>
          <button
            onClick={() => addBlock('image')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.addImage}
          </button>
          <button
            onClick={() => addBlock('file')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.addFile}
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/dashboard"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {content.cancel}
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {saving ? content.saveButtonLoading : content.saveButton}
          </button>
        </div>
      </main>
    </div>
  );
}
