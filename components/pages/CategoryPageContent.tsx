'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';
import type { Article } from '@/types/article';

interface CategoryPageContentProps {
  articles: Article[];
  categorySlug: string;
}

export default function CategoryPageContent({ articles, categorySlug }: CategoryPageContentProps) {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-skyTint py-12">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  const content = language === 'kk' ? {
    noArticles: 'Әзірше бұл санат бойынша мақалалар жоқ',
    readMore: 'Толық оқу',
    logoAlt: 'Көркемөнер мектебі',
  } : {
    noArticles: 'Пока нет статей в этой категории',
    readMore: 'Читать далее',
    logoAlt: 'Художественная школа',
  };

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

  const getFirstImageUrl = (blocks: any[] | undefined): string | null => {
    if (!blocks) return null;
    const imageBlock = blocks.find(block => block.type === 'image');
    return imageBlock?.content || null;
  };

  // Check if this is the events category
  const isEventCategory = articles.length > 0 && articles[0].category === 'Іс-шаралар';

  const getEventDayInfo = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;

      const day = date.getDate();
      const monthIndex = date.getMonth();
      const dayIndex = date.getDay();

      const monthsKk = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
                        'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
      const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      const daysKk = ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'];
      const daysRu = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

      return {
        day: day.toString(),
        month: language === 'kk' ? monthsKk[monthIndex] : monthsRu[monthIndex],
        dayName: language === 'kk' ? daysKk[dayIndex] : daysRu[dayIndex],
      };
    } catch {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const imageUrl = getFirstImageUrl(article.blocks);
            const eventInfo = isEventCategory ? getEventDayInfo(article.event_date) : null;

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
                        alt={content.logoAlt}
                        fill
                        className="object-contain p-6 bg-white/90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-trustBlue/60 to-transparent"></div>
                    </>
                  )}

                  {/* Date Badge - different style for events */}
                  {eventInfo ? (
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
                  {isEventCategory && article.event_date && (
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
                    <span>{content.readMore}</span>
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
