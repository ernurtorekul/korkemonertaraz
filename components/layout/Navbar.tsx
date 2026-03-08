'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const navigation = {
  'Ақпарат': '/',
  'Біз туралы': '#about',
  'Оқушыларға': '#students',
  'Іс-шаралар': '/іс-шаралар',
  'Ашық орган': '#open',
};

const aboutSubmenu = [
  { name: 'Әкімшілік', href: '/әкімшілік' },
  { name: 'Аннотация', href: '/антнотация' },
  { name: 'Оқу-әдістемелік жұмыстар', href: '/оқу-әдістемелік-жұмыстар' },
  { name: 'Тәрбие жұмысы', href: '/тәрбие-жұмысы' },
  { name: 'Біздің түлектер', href: '/біздің-түлектер' },
  { name: 'Ата-аналарға', href: '/ата-аналарға' },
  { name: 'Жетістіктер', href: '/жетістіктер' },
  { name: 'Нормативтік құжаттар', href: '/нормативтік-құжаттар' },
  { name: 'Байланыс', href: '/байланыс' },
];

const studentsSubmenu = [
  { name: 'Сабақ кестесі', href: '/сабақ-кестесі' },
  { name: 'Оқушылар жетістігі', href: '/оқушылар-жетістігі' },
];

const openSubmenu = [
  { name: 'Жемқорлыққа қарсы күрес', href: '/жемқорлыққа-қарсы-күрес' },
  { name: 'Қамқоршылық кеңес', href: '/қамқоршылық-кеңес' },
  { name: 'Мемлекеттік қызмет', href: '/мемлекеттік-қызмет' },
];

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const studentsRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
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
    // Close other menus when opening one
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
      className={`absolute left-0 mt-2 w-56 bg-white text-gray-900 rounded-md shadow-lg py-1 transition-all duration-200 ${
        isOpen
          ? 'opacity-100 translate-y-0 visible'
          : 'opacity-0 -translate-y-2 invisible'
      }`}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-sm hover:bg-blue-50"
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">К</span>
            </div>
            <span className="font-bold text-lg">Көркемөнер мектебі</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {Object.entries(navigation).map(([name, href]) => (
              <div key={name} className="relative" ref={
                name === 'Біз туралы' ? aboutRef :
                name === 'Оқушыларға' ? studentsRef :
                name === 'Ашық орган' ? openRef : null
              }>
                {/* Ақпарат and Іс-шаралар - simple links without dropdown */}
                {name === 'Ақпарат' || name === 'Іс-шаралар' ? (
                  <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                    {name}
                  </Link>
                ) : (
                  <>
                    {/* Біз туралы, Оқушыларға, Ашық орган - buttons with dropdown */}
                    <button
                      onClick={() => {
                        if (name === 'Біз туралы') toggleMenu('about');
                        if (name === 'Оқушыларға') toggleMenu('students');
                        if (name === 'Ашық орган') toggleMenu('open');
                      }}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-1"
                    >
                      {name}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${
                        (name === 'Біз туралы' && aboutOpen) ||
                        (name === 'Оқушыларға' && studentsOpen) ||
                        (name === 'Ашық орган' && openOpen)
                          ? 'rotate-180'
                          : ''
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menus */}
                    {name === 'Біз туралы' && (
                      <DropdownMenu
                        items={aboutSubmenu}
                        isOpen={aboutOpen}
                        onClose={() => setAboutOpen(false)}
                      />
                    )}

                    {name === 'Оқушыларға' && (
                      <DropdownMenu
                        items={studentsSubmenu}
                        isOpen={studentsOpen}
                        onClose={() => setStudentsOpen(false)}
                      />
                    )}

                    {name === 'Ашық орган' && (
                      <DropdownMenu
                        items={openSubmenu}
                        isOpen={openOpen}
                        onClose={() => setOpenOpen(false)}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="hidden md:block px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-600 transition-colors"
          >
            Администратор
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-800"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.entries(navigation).map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-700 hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Администратор
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
