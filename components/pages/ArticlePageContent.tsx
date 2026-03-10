'use client';

import Link from 'next/link';
import { TitleBlock, TextBlock, ImageBlock, FileBlock } from '@/components/blocks';
import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';
import type { Article } from '@/types/article';
import { categoryToSlug } from '@/lib/categoryMappings';

interface ArticlePageContentProps {
  article: Article;
}

export default function ArticlePageContent({ article }: ArticlePageContentProps) {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-skyTint py-12">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryTranslations: Record<string, { kk: string; ru: string }> = {
    'Әкімшілік': { kk: 'Әкімшілік', ru: 'Администрация' },
    'Аннотация': { kk: 'Аннотация', ru: 'Аннотация' },
    'Оқу-әдістемелік жұмыстар': { kk: 'Оқу-әдістемелік жұмыстар', ru: 'Учебно-методическая работа' },
    'Тәрбие жұмысы': { kk: 'Тәрбие жұмысы', ru: 'Воспитательная работа' },
    'Біздің түлектер': { kk: 'Біздің түлектер', ru: 'Наши выпускники' },
    'Ата-аналарға': { kk: 'Ата-аналарға', ru: 'Родителям' },
    'Жетістіктер': { kk: 'Жетістіктер', ru: 'Достижения' },
    'Нормативтік құжаттар': { kk: 'Нормативтік құжаттар', ru: 'Нормативные документы' },
    'Байланыс': { kk: 'Байланыс', ru: 'Контакты' },
    'Сабақ кестесі': { kk: 'Сабақ кестесі', ru: 'Расписание' },
    'Оқушылар жетістігі': { kk: 'Оқушылар жетістігі', ru: 'Достижения учеников' },
    'Іс-шаралар': { kk: 'Іс-шаралар', ru: 'Мероприятия' },
    'Жемқорлыққа қарсы күрес': { kk: 'Жемқорлыққа қарсы күрес', ru: 'Борьба с коррупцией' },
    'Қамқоршылық кеңес': { kk: 'Қамқоршылық кеңес', ru: 'Попечительский совет' },
    'Мемлекеттік қызмет': { kk: 'Мемлекеттік қызмет', ru: 'Государственные услуги' },
  };

  const content = language === 'kk' ? {
    backText: 'Артқа қайту',
  } : {
    backText: 'Назад',
  };

  const translatedCategory = categoryTranslations[article.category]?.[language] || article.category;
  const categorySlug = categoryToSlug[article.category] || article.category.toLowerCase().replace(/\s+/g, '-');
  const isEvent = article.category === 'Іс-шаралар';

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

  const formatEventDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';

      const day = date.getDate();
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      if (language === 'kk') {
        const monthsKk = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
                          'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
        return `${day} ${monthsKk[monthIndex]} ${year} ж. ${hours}:${minutes}`;
      } else {
        const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${day} ${monthsRu[monthIndex]} ${year} г. ${hours}:${minutes}`;
      }
    } catch {
      return '';
    }
  };

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
            {content.backText}
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="text-sm text-trustBlue font-semibold mb-2">
              {translatedCategory}
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
