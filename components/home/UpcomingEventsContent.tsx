'use client';

import Link from 'next/link';
import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';

interface UpcomingEventsContentProps {
  events: any[];
}

export default function UpcomingEventsContent({ events }: UpcomingEventsContentProps) {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || events.length === 0) {
    return null;
  }

  const content = language === 'kk' ? {
    title: 'Алдағы іс-шаралар',
    readMore: 'Толық оқу',
    viewAllEvents: 'Барлық іс-шараларды көру',
  } : {
    title: 'Предстоящие мероприятия',
    readMore: 'Подробнее',
    viewAllEvents: 'Посмотреть все мероприятия',
  };

  const categoryToSlug: Record<string, string> = {
    'Іс-шаралар': 'events',
    'Events': 'events',
    'Мероприятия': 'events',
  };

  const getCategorySlug = (category: string) => {
    return categoryToSlug[category] || category.toLowerCase().replace(/\s+/g, '-');
  };

  // Check if article has an external link block
  const getExternalLink = (blocks: any[] | undefined): string | null => {
    if (!blocks) return null;
    const linkBlock = blocks.find(block => block.type === 'link');
    return linkBlock?.content || null;
  };

  // Format date for display (e.g., "15 Наурыз 2026, 14:00")
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
        return `${day} ${monthsKk[monthIndex]} ${year} ж., ${hours}:${minutes}`;
      } else {
        const monthsRu = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                          'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${day} ${monthsRu[monthIndex]} ${year} г., ${hours}:${minutes}`;
      }
    } catch {
      return '';
    }
  };

  // Get day name and day number (e.g., "15", "Сенбі")
  const getCalendarDayInfo = (dateString: string | null | undefined): { day: string; dayName: string } | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;

      const day = date.getDate().toString();
      const dayIndex = date.getDay();

      const daysKk = ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі'];
      const daysRu = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

      return {
        day,
        dayName: language === 'kk' ? daysKk[dayIndex] : daysRu[dayIndex]
      };
    } catch {
      return null;
    }
  };

  // Get month name (e.g., "Наурыз")
  const getMonthName = (dateString: string | null | undefined): string | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;

      const monthIndex = date.getMonth();

      const monthsKk = ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
                        'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'];
      const monthsRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

      return language === 'kk' ? monthsKk[monthIndex] : monthsRu[monthIndex];
    } catch {
      return null;
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-skyTint via-white to-skyTint">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-trustBlue mb-2">{content.title}</h2>
          <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
        </div>

        {/* Calendar-style Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const dayInfo = getCalendarDayInfo(event.event_date);
            const monthName = getMonthName(event.event_date);
            const categorySlug = getCategorySlug(event.category);
            const fullDate = formatEventDate(event.event_date);
            const externalLink = getExternalLink(event.blocks);

            // If article has external link, render as <a> tag, otherwise as Next.js Link
            const CardWrapper = externalLink ? 'a' : Link;
            const cardProps = externalLink
              ? { href: externalLink, target: '_blank', rel: 'noopener noreferrer' }
              : { href: `/${categorySlug}/${event.id}` };

            return (
              <CardWrapper
                key={event.id}
                {...cardProps}
                className="group"
              >
                <div className="card p-6 hover:shadow-lg transition-all duration-300">
                  {/* Calendar-style Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Calendar Date Box */}
                    <div className="flex-shrink-0">
                      <div className="bg-trustBlue text-white rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-xs font-medium opacity-90">{monthName}</div>
                        <div className="text-2xl md:text-3xl font-bold">{dayInfo?.day}</div>
                        <div className="text-xs opacity-75 truncate w-full">{dayInfo?.dayName}</div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-trustBlue mb-2 line-clamp-2 group-hover:text-vibrantGold transition-colors">
                        {event.title}
                      </h3>
                      {fullDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <time className="truncate">{fullDate}</time>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-trustBlue group-hover:text-vibrantGold transition-colors text-sm font-medium">
                    <span>{externalLink ? (language === 'kk' ? 'Ашу' : 'Открыть') : content.readMore}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* View All Events Link */}
        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center text-trustBlue hover:text-vibrantGold font-semibold transition-colors group"
          >
            <span>{content.viewAllEvents}</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
