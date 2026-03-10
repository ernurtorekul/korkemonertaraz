'use client';

import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';

export default function StatsSection() {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-12 md:py-16 bg-white relative overflow-hidden">
        <div className="section-container relative">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-trustBlue mb-2">Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  const content = language === 'kk' ? {
    title: 'Біздің көрсеткіштер',
    description: 'Жылдар бойы жиналған тәжірибе және жетістіктер',
    labels: {
      students: 'Оқушылар',
      teachers: 'Мұғалімдер',
      experience: 'Жылдан астам тәжірибе',
      graduates: 'Түлектер',
    }
  } : {
    title: 'Наши показатели',
    description: 'Опыт и достижения, накопленные за годы',
    labels: {
      students: 'Ученики',
      teachers: 'Учителя',
      experience: 'Более 30 лет опыта',
      graduates: 'Выпускники',
    }
  };

  const stats = [
    {
      number: '500+',
      label: content.labels.students,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      number: '25+',
      label: content.labels.teachers,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '30+',
      label: content.labels.experience,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '1000+',
      label: content.labels.graduates,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #2B4592 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-trustBlue mb-2">{content.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{content.description}</p>
          <div className="w-16 h-1 bg-vibrantGold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card p-5 md:p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-skyTint rounded-xl mb-4 text-trustBlue group-hover:bg-vibrantGold group-hover:text-trustBlue transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-trustBlue mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
