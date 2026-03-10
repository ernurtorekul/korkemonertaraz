'use client';

import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';

interface CategoryPageHeaderProps {
  categoryName: string;
  isEmpty?: boolean;
}

export default function CategoryPageHeader({ categoryName, isEmpty }: CategoryPageHeaderProps) {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">Loading...</h1>
      </div>
    );
  }

  // Translate category names to Russian
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

  const translatedName = categoryTranslations[categoryName]?.[language] || categoryName;

  const content = language === 'kk' ? {
    noArticles: 'Әзірше бұл санат бойынша мақалалар жоқ',
  } : {
    noArticles: 'Пока нет статей в этой категории',
  };

  if (isEmpty) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">{translatedName}</h1>
        <div className="w-16 h-1 bg-vibrantGold mx-auto mb-8 rounded-full"></div>
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg">{content.noArticles}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">{translatedName}</h1>
      <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
    </div>
  );
}
