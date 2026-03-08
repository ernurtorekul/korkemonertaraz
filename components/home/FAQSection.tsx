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
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Жиі қойылатын сұрақтар
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
