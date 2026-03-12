'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = language === 'kk' ? {
    badge: '10 жылдан астам тәжірибе',
    titleLine1: 'Балалар көркемөнер мектебі',
    // titleLine1: 'Балалар көркемөнер мектебі Жамбыл облысы әкімдігінің, білім бөлімінің, балалар көркемөнер мектебі',
    titleLine2: 'Тараз қаласы',
    // description: 'Бұл Тараз қаласының білім беру мекемесі, онда балаларға бейнелеу өнеріне үйретеді, олардың шығармашылық қабілеттерін дамытып, кәсіби педагогтардың жетекшілігімен көркемдік мәдениеттің негіздерімен таныстырады.',
    description: 'Мектебіміздің негізгі мақсаты – балалардың эстетикалық талғамын қалыптастыру, бейнелеу өнерінің негіздерін ұлттық өнер арқылы меңгерту және олардың шығармашылық қабілеттерін арттыру.',
    contactButton: 'Бізбен байланысыңыз',
    learnMoreButton: 'Толық ақпарат',
    aboutLink: '/about',
    statsStudents: 'Оқушылар',
    statsTeachers: 'Мұғалімдер',
    statsYears: 'Жыл тәжірибе',
    alt: 'Көркемөнер мектебі',
  } : {
    badge: 'Более 10 лет опыта',
    titleLine1: 'Детская художественная школа',
    // titleLine1: 'Детская художественная школа отдела управления образования акимата Жамбылской области',
    titleLine2: 'г. Тараз',
    description: 'Основная цель нашей школы — формирование эстетического вкуса у детей, обучение основам изобразительного искусства через национальное искусство и развитие их творческих способностей.',
    contactButton: 'Свяжитесь с нами',
    learnMoreButton: 'Узнать больше',
    aboutLink: '/about',
    statsStudents: 'Ученики',
    statsTeachers: 'Учителя',
    statsYears: 'Лет опыта',
    alt: 'Художественная школа',
  };

  if (!mounted) {
    return (
      <section className="relative min-h-[550px] md:min-h-[600px] overflow-visible">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/main_pic.jpg"
            alt="Loading..."
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-trustBlue/95 via-trustBlue/80 to-trustBlue/40"></div>
        </div>
        <div className="section-container min-h-[550px] md:min-h-[600px] flex items-center py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-vibrantGold/20 backdrop-blur-sm border border-vibrantGold/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-vibrantGold rounded-full animate-pulse"></span>
              <span className="text-vibrantGold text-sm font-medium">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[550px] md:min-h-[600px] overflow-visible">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/main_pic.jpg"
          alt={content.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-trustBlue/95 via-trustBlue/80 to-trustBlue/40"></div>
      </div>

      <div className="section-container min-h-[550px] md:min-h-[600px] flex items-center py-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-vibrantGold/20 backdrop-blur-sm border border-vibrantGold/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-vibrantGold rounded-full animate-pulse"></span>
            <span className="text-vibrantGold text-sm font-medium">{content.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {content.titleLine1}<br />
            <span className="text-vibrantGold">{content.titleLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl">
            {content.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-vibrantGold text-trustBlue font-semibold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>{content.contactButton}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={content.aboutLink}
              className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              <span>{content.learnMoreButton}</span>
            </Link>
          </div>

          {/* Quick Stats - Compact Horizontal */}
          <div className="flex items-center space-x-6 md:space-x-10">
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-xs md:text-sm text-blue-200">{content.statsStudents}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-white">25+</div>
              <div className="text-xs md:text-sm text-blue-200">{content.statsTeachers}</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
              <div className="text-xs md:text-sm text-blue-200">{content.statsYears}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <svg className="w-full h-16 md:h-20 fill-skyTint" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
