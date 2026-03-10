'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useLanguageState } from '@/lib/languageState';
import type { Language } from '@/lib/translations';

const aboutSubmenuKk = [
  { name: 'Әкімшілік', href: '/administration' },
  { name: 'Аннотация', href: '/annotation' },
  { name: 'Оқу-әдістемелік жұмыстар', href: '/teaching-materials' },
  { name: 'Тәрбие жұмысы', href: '/educational-work' },
  { name: 'Біздің түлектер', href: '/graduates' },
  { name: 'Ата-аналарға', href: '/parents' },
  { name: 'Жетістіктер', href: '/achievements' },
  { name: 'Нормативтік құжаттар', href: '/documents' },
  { name: 'Байланыс', href: '/contact' },
];

const studentsSubmenuKk = [
  { name: 'Сабақ кестесі', href: '/schedule' },
  { name: 'Оқушылар жетістігі', href: '/student-achievements' },
];

const openSubmenuKk = [
  { name: 'Жемқорлыққа қарсы күрес', href: '/anti-corruption' },
  { name: 'Қамқоршылық кеңес', href: '/trustee-council' },
  { name: 'Мемлекеттік қызмет', href: '/public-services' },
];

const aboutSubmenuRu = [
  { name: 'Администрация', href: '/administration' },
  { name: 'Аннотация', href: '/annotation' },
  { name: 'Учебно-методическая работа', href: '/teaching-materials' },
  { name: 'Воспитательная работа', href: '/educational-work' },
  { name: 'Наши выпускники', href: '/graduates' },
  { name: 'Родителям', href: '/parents' },
  { name: 'Достижения', href: '/achievements' },
  { name: 'Нормативные документы', href: '/documents' },
  { name: 'Контакты', href: '/contact' },
];

const studentsSubmenuRu = [
  { name: 'Расписание', href: '/schedule' },
  { name: 'Достижения учеников', href: '/student-achievements' },
];

const openSubmenuRu = [
  { name: 'Борьба с коррупцией', href: '/anti-corruption' },
  { name: 'Попечительский совет', href: '/trustee-council' },
  { name: 'Государственные услуги', href: '/public-services' },
];

export default function Navbar() {
  const [language, setLanguage] = useLanguageState();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const studentsRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLDivElement>(null);

  // Get navigation items based on language
  const navigation = language === 'kk' ? {
    'Ақпарат': '/',
    'Біз туралы': '#about',
    'Оқушыларға': '#students',
    'Іс-шаралар': '/events',
    'Ашық орган': '#open',
  } : {
    'Главная': '/',
    'О нас': '#about',
    'Ученикам': '#students',
    'Мероприятия': '/events',
    'Открытые органы': '#open',
  };

  const aboutSubmenu = language === 'kk' ? aboutSubmenuKk : aboutSubmenuRu;
  const studentsSubmenu = language === 'kk' ? studentsSubmenuKk : studentsSubmenuRu;
  const openSubmenu = language === 'kk' ? openSubmenuKk : openSubmenuRu;

  const aboutLabel = language === 'kk' ? 'Біз туралы' : 'О нас';
  const studentsLabel = language === 'kk' ? 'Оқушыларға' : 'Ученикам';
  const openLabel = language === 'kk' ? 'Ашық орган' : 'Открытые органы';
  const adminLabel = language === 'kk' ? 'Администратор' : 'Администратор';
  const schoolName = language === 'kk' ? 'Көркемөнер мектебі' : 'Художественная школа';
  const cityName = language === 'kk' ? 'Тараз қаласы' : 'г. Тараз';
  const logoAlt = language === 'kk' ? 'Көркемөнер мектебі логотипі' : 'Логотип художественной школы';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
      if (studentsRef.current && !studentsRef.current.contains(event.target as Node)) {
        setStudentsOpen(false);
      }
      if (openRef.current && !openRef.current.contains(event.target as Node)) {
        setOpenOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (menu: 'about' | 'students' | 'open') => {
    if (menu === 'about') {
      setAboutOpen(!aboutOpen);
      setStudentsOpen(false);
      setOpenOpen(false);
    } else if (menu === 'students') {
      setStudentsOpen(!studentsOpen);
      setAboutOpen(false);
      setOpenOpen(false);
    } else if (menu === 'open') {
      setOpenOpen(!openOpen);
      setAboutOpen(false);
      setStudentsOpen(false);
    }
  };

  const DropdownMenu = ({ items, isOpen, onClose }: { items: typeof aboutSubmenu; isOpen: boolean; onClose: () => void }) => (
    <div
      className={`absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
        isOpen
          ? 'opacity-100 translate-y-0 visible'
          : 'opacity-0 -translate-y-2 invisible'
      }`}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-trustBlue hover:bg-skyTint hover:text-vibrantGold transition-colors"
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-skyTint rounded-lg p-1">
      <button
        onClick={() => setLanguage('kk')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'kk'
            ? 'bg-white text-trustBlue shadow-sm'
            : 'text-gray-600 hover:text-trustBlue'
        }`}
      >
        ҚАЗ
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
          language === 'ru'
            ? 'bg-white text-trustBlue shadow-sm'
            : 'text-gray-600 hover:text-trustBlue'
        }`}
      >
        РУС
      </button>
    </div>
  );

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="border-b border-vibrantGold">
        <div className="section-container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpeg"
                  alt={logoAlt}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-trustBlue leading-tight">{schoolName}</span>
                <span className="block text-xs text-gray-500">{cityName}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {Object.entries(navigation).map(([name, href]) => {
                const isAbout = name === aboutLabel;
                const isStudents = name === studentsLabel;
                const isOpen = isAbout ? aboutOpen : isStudents ? studentsOpen : openOpen;

                return (
                  <div key={name} className="relative" ref={
                  isAbout ? aboutRef :
                  isStudents ? studentsRef :
                  name === openLabel ? openRef : null
                }>
                  {href === '/' || href === '/events' ? (
                    <Link href={href} className="px-4 py-2 rounded-lg text-sm font-medium text-trustBlue hover:bg-skyTint hover:text-vibrantGold transition-all duration-200">
                      {name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (isAbout) toggleMenu('about');
                          else if (isStudents) toggleMenu('students');
                          else if (name === openLabel) toggleMenu('open');
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-trustBlue hover:bg-skyTint hover:text-vibrantGold transition-all duration-200 flex items-center gap-1"
                      >
                        {name}
                        <svg className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isAbout && (
                        <DropdownMenu
                          items={aboutSubmenu}
                          isOpen={aboutOpen}
                          onClose={() => setAboutOpen(false)}
                        />
                      )}

                      {isStudents && (
                        <DropdownMenu
                          items={studentsSubmenu}
                          isOpen={studentsOpen}
                          onClose={() => setStudentsOpen(false)}
                        />
                      )}

                      {name === openLabel && (
                        <DropdownMenu
                          items={openSubmenu}
                          isOpen={openOpen}
                          onClose={() => setOpenOpen(false)}
                        />
                      )}
                    </>
                  )}
                </div>
              );
              })}
            </div>

            {/* Language Switcher & Admin */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSwitcher />
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg text-sm font-medium text-trustBlue hover:bg-skyTint hover:text-vibrantGold transition-all duration-200"
              >
                {adminLabel}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-skyTint transition-colors"
            >
              <svg className="h-6 w-6 text-trustBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="section-container py-4 space-y-2">
              <div className="flex justify-center mb-4">
                <LanguageSwitcher />
              </div>
              {Object.entries(navigation).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-trustBlue hover:bg-skyTint transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}
              <Link
                href="/admin"
                className="block px-4 py-3 rounded-lg text-base font-medium bg-skyTint text-trustBlue hover:bg-blue-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {adminLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
