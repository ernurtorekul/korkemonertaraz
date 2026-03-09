'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Мектепке қалай қатысуға болады?',
    answer: 'Мектепке қатысу үшін ата-аналарымен бірге келіп, құжаттарды тапсыру керек. Қабылдау сыныптар бойынша жүргізіледі.'
  },
  {
    question: 'Оқу қанша уақытты алады?',
    answer: 'Оқу бағдарламасы 4 жылды қамтиды. Сабақтар аптасына 3 рет өтеді, әр сабақ 2 сағаттан.'
  },
  {
    question: 'Қандай пәндер оқытылады?',
    answer: 'Біз бейнелеу өнері, графика, композиция, сурет өнері тарихы және декоративті-қолданбалы өнер пәндерін оқытамыз.'
  },
  {
    question: 'Оқу ақысы ма?',
    answer: 'Иә, оқу ақылы. Толық ақпаратты мектеп әкімшілігінен алуға болады.'
  },
  {
    question: 'Сыныптар қандай жастағы балаларға арналған?',
    answer: 'Мектепке 7-17 жас аралығындағы балалар қабылданады.'
  },
  {
    question: 'Қосымша сынақтар өткізіле ме?',
    answer: 'Иә, жылына бірнеше рет көркемдік сынактар мен көрмелер өткізіледі, онда оқушылар өз жұмыстарын көрсете алады.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-skyTint">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">Жиі қойылатын сұрақтар</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Бізге көбірек сұрақ жіберіңіз</p>
          <div className="w-20 h-1 bg-vibrantGold mx-auto mt-6 rounded-full"></div>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'ring-2 ring-vibrantGold' : ''
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-skyTint/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-trustBlue pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-vibrantGold text-trustBlue rotate-180'
                    : 'bg-skyTint text-trustBlue'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <div className="pt-4 border-t border-gray-100 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Басқа сұрақтарыңыз бар ма?</p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-trustBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <span>Бізбен хабарласыңыз</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
