'use client';

import { useLanguageState } from '@/lib/languageState';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPageContent() {
  const [language] = useLanguageState();

  const content = language === 'kk' ? {
    pageTitle: 'Біз туралы',
    missionTitle: 'Миссия',
    missionText: 'Балалардың эстетикалық талғамын қалыптастыру, бейнелеу өнерінің негіздерін ұлттық өнер арқылы шығармашылық қабілеттерін арттыру.',
    visionTitle: 'Көзқарас',
    visionText: 'Балалардың шығармашылық әлеуетін дамытатын, ұлттық мәдениетті құрметтейтін және бейнелеу өнері саласында сапалы білім беретін жетекші көркемөнер мектебі болу.',
    staffTitle: 'Біздің ұжым',
    staffDescription: 'Біздің мектеп - бұл кәсіби педагогтардың ұжымы, олар балаларға бейнелеу өнерінің ғажайып әлеміне саяхаттауға көмектеседі.',
    backToHome: 'Басты бетке оралу',
    schoolAlt: 'Көркемөнер мектебінің ғимараты',
    staffAlt: 'Мектеп ұжымы',
    mainPicAlt: 'Көркемөнер мектебі',
  } : {
    pageTitle: 'О нас',
    missionTitle: 'Миссия',
    missionText: 'Формирование эстетического вкуса у детей, обучение основам изобразительного искусства через национальное искусство и развитие их творческих способностей.',
    visionTitle: 'Видение',
    visionText: 'Стать ведущей художественной школой, воспитывающей уважение к национальной культуре и обеспечивающей качественное образование в области изобразительного искусства.',
    staffTitle: 'Наша команда',
    staffDescription: 'Наша школа — это команда профессиональных педагогов, которые помогают детям открыть для себя чудесный мир изобразительного искусства.',
    backToHome: 'Вернуться на главную',
    schoolAlt: 'Здание художественной школы',
    staffAlt: 'Команда школы',
    mainPicAlt: 'Художественная школа',
  };

  return (
    <div className="min-h-screen bg-skyTint">
      {/* Hero Section */}
      <section className="relative h-[200px] md:h-[250px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/school.jpeg"
            alt={content.schoolAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-trustBlue/90 via-trustBlue/70 to-trustBlue/50"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="section-container">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {content.pageTitle}
              </h1>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 fill-skyTint" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              {/* Image Background */}
              <div className="absolute inset-0">
                <Image
                  src="/yellow.jpg"
                  alt={content.mainPicAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/50 via-yellow-600/40 to-yellow-700/50 transition-opacity duration-500 group-hover:from-amber-600/60 group-hover:via-yellow-600/50 group-hover:to-yellow-700/60"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 transition-transform duration-500 group-hover:translate-y-1">
                <div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <svg className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-105" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)' }}>{content.missionTitle}</h2>
                  <div className="w-16 h-1 bg-white rounded-full mb-6 transition-all duration-300 group-hover:w-24"></div>
                </div>
                <p className="text-white text-lg leading-relaxed transition-transform duration-300 group-hover:translate-x-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4)' }}>
                  {content.missionText}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              {/* Image Background */}
              <div className="absolute inset-0">
                <Image
                  src="/blue.jpeg"
                  alt={content.mainPicAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-trustBlue/50 via-trustBlue/40 to-blue-800/50 transition-opacity duration-500 group-hover:from-trustBlue/60 group-hover:via-trustBlue/50 group-hover:to-blue-800/60"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 transition-transform duration-500 group-hover:translate-y-1">
                <div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <svg className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-105" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)' }}>{content.visionTitle}</h2>
                  <div className="w-16 h-1 bg-white rounded-full mb-6 transition-all duration-300 group-hover:w-24"></div>
                </div>
                <p className="text-white text-lg leading-relaxed transition-transform duration-300 group-hover:translate-x-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4)' }}>
                  {content.visionText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">{content.staffTitle}</h2>
            <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
              {content.staffDescription}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/staff.jpeg"
                alt={content.staffAlt}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12">
        <div className="section-container">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-trustBlue hover:text-vibrantGold font-semibold transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {content.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
