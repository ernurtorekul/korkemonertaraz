"use client";

import { useState, useEffect } from "react";
import { useLanguageState } from "@/lib/languageState";

const faqsKk = [
  {
    question: "Мектепке қалай қатысуға болады?",
    answer:
      "Мектепке қатысу үшін ата-аналарымен бірге келіп, құжаттарды тапсыру керек. Қабылдау сыныптар бойынша жүргізіледі.",
  },
  {
    question: "Оқу қанша уақытты алады?",
    answer:
      "Оқу бағдарламасы 4 жылды қамтиды. Сабақтар аптасына 3-4 рет өтеді, әр сабақ 2-3 сағаттан.",
  },
  {
    question: "Қандай пәндер оқытылады?",
    answer:
      "Біз компьютерлік графика, ⁠мүсін, ⁠кескіндеме,⁠ өнер тарихы, ⁠қолданбалы композиция, станоктық композиция, сурет пәндерін оқытамыз.",
  },
  {
    question: "Оқу ақылы ма?",
    answer: "Жоқ, оқу тегін!",
  },
  {
    question: "Сыныптар қандай жастағы балаларға арналған?",
    answer: "Мектепке 5-16 жас аралығындағы балалар қабылданады.",
  },
  {
    question: "Қосымша сынақтар өткізіле ме?",
    answer:
      "Иә, оқу аяқталғаннан кейін оқушылар дипломдық жұмыстарын қорғайды. Оқуды сәтті аяқтаған түлектерге оқуды бітіргенін растайтын арнайы сертификат беріледі.",
  },
];

const faqsRu = [
  {
    question: "Как поступить в школу?",
    answer:
      "Для поступления в школу нужно прийти с родителями и подать документы. Прием проводится по классам.",
  },
  {
    question: "Сколько длится обучение?",
    answer:
      "Образовательная программа рассчитана на 4 года. Занятия проходят 3–4 раза в неделю, каждое занятие длится 2–3 часа.",
  },
  {
    question: "Какие предметы преподаются?",
    answer:
      "Мы преподаём компьютерную графику, скульптуру, живопись, историю искусства, прикладную композицию, станковую композицию и рисунок.",
  },
  {
    question: "Обучение платное?",
    answer: "Нет, обучение бесплатное!",
  },
  {
    question: "Для какого возраста предназначены занятия?",
    answer: "В школу принимаются дети в возрасте от 5 до 16 лет.",
  },
  {
    question: "Проводятся ли дополнительные экзамены?",
    answer:
      "Да, по окончании обучения учащиеся защищают дипломную работу, после чего им выдается специальный сертификат, подтверждающий завершение обучения.",
  },
];

export default function FAQSection() {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="section-padding bg-skyTint">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">
              Loading...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  const content =
    language === "kk"
      ? {
          title: "Жиі қойылатын сұрақтар",
          description: "Сұрақтар мен жауаптар",
          contactQuestion: "Басқа сұрақтарыңыз бар ма?",
          contactButton: "Бізбен хабарласыңыз",
        }
      : {
          title: "Часто задаваемые вопросы",
          description: "Вопросы и ответы",
          contactQuestion: "Есть ли у вас другие вопросы?",
          contactButton: "Свяжитесь с нами",
        };

  const faqs = language === "kk" ? faqsKk : faqsRu;

  return (
    <section className="section-padding bg-skyTint">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">
            {content.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
          <div className="w-20 h-1 bg-vibrantGold mx-auto mt-6 rounded-full"></div>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card overflow-hidden transition-all duration-300 ${
                openIndex === index ? "ring-2 ring-vibrantGold" : ""
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-skyTint/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-trustBlue pr-8">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-vibrantGold text-trustBlue rotate-180"
                      : "bg-skyTint text-trustBlue"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
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
          <p className="text-gray-600 mb-4">{content.contactQuestion}</p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-trustBlue text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <span>{content.contactButton}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
