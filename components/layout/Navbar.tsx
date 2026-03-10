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
    <>
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
      </div>
    </nav>

    {/* Mobile Navigation - separate from navbar */}
    {mobileMenuOpen && (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in menu from right */}
        <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden overflow-y-auto flex flex-col">
          {/* Close button */}
          <div className="px-4 py-4 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
            <span className="font-bold text-lg text-trustBlue">{schoolName}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-skyTint transition-colors"
            >
              <svg className="h-6 w-6 text-trustBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 py-4 space-y-1 flex-1 overflow-y-auto">
            <div className="mb-4">
              <LanguageSwitcher />
            </div>

            {Object.entries(navigation).map(([name, href]) => {
              const isAbout = name === aboutLabel;
              const isStudents = name === studentsLabel;
              const isOpenMenu = name === openLabel;

              // Determine which submenu state to use
              let isSubmenuOpen = false;
              let submenuItems: typeof aboutSubmenu = [];

              if (isAbout) {
                isSubmenuOpen = aboutOpen;
                submenuItems = aboutSubmenu;
              } else if (isStudents) {
                isSubmenuOpen = studentsOpen;
                submenuItems = studentsSubmenu;
              } else if (isOpenMenu) {
                isSubmenuOpen = openOpen;
                submenuItems = openSubmenu;
              }

              // Items with submenus - expandable
              if (submenuItems.length > 0) {
                return (
                  <div key={name} className="rounded-lg overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAbout) toggleMenu('about');
                        else if (isStudents) toggleMenu('students');
                        else if (isOpenMenu) toggleMenu('open');
                      }}
                      className="w-full px-4 py-3 text-base font-medium text-trustBlue hover:bg-skyTint transition-colors flex items-center justify-between cursor-pointer"
                    >
                      {name}
                      <svg className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                        isSubmenuOpen ? 'rotate-180' : ''
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isSubmenuOpen && (
                      <div className="bg-gray-50">
                        {submenuItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-6 py-2.5 text-base text-trustBlue hover:bg-skyTint hover:text-vibrantGold transition-colors border-l-2 border-transparent hover:border-vibrantGold cursor-pointer"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular links (no submenu)
              return (
                <a
                  key={name}
                  href={href}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-trustBlue hover:bg-skyTint transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {name}
                </a>
              );
            })}

            <a
              href="/admin"
              className="block px-4 py-3 rounded-lg text-base font-medium bg-skyTint text-trustBlue hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              {adminLabel}
            </a>
          </div>
        </div>
      </>
    )}
  </>
  );
}
