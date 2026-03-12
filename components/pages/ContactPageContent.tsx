'use client';

import Link from "next/link";
import Image from "next/image";
import { useLanguageState } from '@/lib/languageState';

export default function ContactPageContent() {
  const [language] = useLanguageState();

  const content = language === 'kk' ? {
    title: 'Байланыс',
    subtitle: 'Бізбен хабарласыңыз',
    schoolName: 'Көркемөнер мектебі',
    cityName: 'Тараз қаласы',
    logoAlt: 'Көркемөнер мектебі логотипі',
    description: 'Жамбыл облысы әкімдігінің, білім басқармасы Тараз қаласының, білім бөлімінің, балалар көркемөнер мектебі',
    quickContact: 'Жедел байланыс',
    mobilePhone: 'Ұялы телефон',
    homePhone: 'Үй телефоны',
    email: 'Электрондық пошта',
    address: 'Мекен-жай',
    addressLabel: 'Адрес',
    addressText: 'Тараз қаласы, Астана мөлтек ауданы №32',
    postalCode: 'Пошта индексі: 080000',
    socialMedia: 'Әлеуметтік желі',
    sendMessage: 'Хабарлама жіберіңіз',
    nameLabel: 'Аты-жөніңіз *',
    namePlaceholder: 'Атыңызды енгізіңіз',
    phoneLabel: 'Телефон нөміріңіз *',
    emailLabel: 'Электрондық пошта',
    messageLabel: 'Хабарлама *',
    messagePlaceholder: 'Хабарламаңызды жазыңыз...',
    submitButton: 'Жіберу',
    requiredFields: '* міндетті өрістер',
    backToHome: 'Басты бетке оралу',
  } : {
    title: 'Контакты',
    subtitle: 'Свяжитесь с нами',
    schoolName: 'Художественная школа',
    cityName: 'г. Тараз',
    logoAlt: 'Логотип художественной школы',
    description: 'Детская художественная школа Управления образования г. Тараз, Жамбылской области',
    quickContact: 'Быстрая связь',
    mobilePhone: 'Мобильный телефон',
    homePhone: 'Домашний телефон',
    email: 'Электронная почта',
    address: 'Адрес',
    addressLabel: 'Адрес',
    addressText: 'г. Тараз, мкр. Астана, д. №32',
    postalCode: 'Почтовый индекс: 080000',
    socialMedia: 'Социальные сети',
    sendMessage: 'Отправить сообщение',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Введите ваше имя',
    phoneLabel: 'Номер телефона *',
    emailLabel: 'Электронная почта',
    messageLabel: 'Сообщение *',
    messagePlaceholder: 'Напишите ваше сообщение...',
    submitButton: 'Отправить',
    requiredFields: '* обязательные поля',
    backToHome: 'Вернуться на главную',
  };

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">
            {content.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{content.subtitle}</p>
          <div className="w-20 h-1 bg-vibrantGold mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Logo and School Info */}
            <div className="card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.jpeg"
                    alt={content.logoAlt}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-trustBlue">
                    {content.schoolName}
                  </h2>
                  <p className="text-sm text-gray-500">{content.cityName}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Quick Contact */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-trustBlue mb-6">
                {content.quickContact}
              </h3>

              {/* WhatsApp */}
              <a
                href="https://wa.me/77079772103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group mb-4"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    WhatsApp
                  </div>
                  <div className="text-sm text-gray-600">+7 707 977 21 03</div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-green-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              {/* Mobile Phone */}
              <a
                href="tel:+77079772103"
                className="flex items-center space-x-4 p-4 bg-skyTint rounded-xl hover:bg-blue-50 transition-colors group mb-4"
              >
                <div className="w-12 h-12 bg-trustBlue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-trustBlue transition-colors">
                    {content.mobilePhone}
                  </div>
                  <div className="text-sm text-gray-600">+7 707 977 21 03</div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-trustBlue transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>

              {/* Home Phone */}
              <a
                href="tel:54-25-92"
                className="flex items-center space-x-4 p-4 bg-skyTint rounded-xl hover:bg-blue-50 transition-colors group mb-4"
              >
                <div className="w-12 h-12 bg-trustBlue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-trustBlue transition-colors">
                    {content.homePhone}
                  </div>
                  <div className="text-sm text-gray-600">54-25-92</div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-trustBlue transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:ernurtorekul@gmail.com"
                className="flex items-center space-x-4 p-4 bg-skyTint rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-trustBlue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-trustBlue transition-colors">
                    {content.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    korkemonertaraz@mail.kz
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-trustBlue transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            {/* Address */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-trustBlue mb-4">
                {content.address}
              </h3>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-vibrantGold rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-trustBlue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{content.addressLabel}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {content.addressText}
                  </div>
                  <div className="text-sm text-gray-500">
                    {content.postalCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-trustBlue mb-4">
                {content.socialMedia}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/korkemoner.taraz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/14EnifhBcJ7/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCwm3sX3PCxuqaJiNHJXpG5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-xl font-bold text-trustBlue mb-6">
              {content.sendMessage}
            </h3>
            <form
              action="https://formspree.io/f/mvzwzklw"
              method="POST"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-vibrantGold focus:ring-2 focus:ring-vibrantGold/20 outline-none transition-all"
                  placeholder={content.namePlaceholder}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-vibrantGold focus:ring-2 focus:ring-vibrantGold/20 outline-none transition-all"
                  placeholder="+7 XXX XXX XX XX"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-vibrantGold focus:ring-2 focus:ring-vibrantGold/20 outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {content.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-vibrantGold focus:ring-2 focus:ring-vibrantGold/20 outline-none transition-all resize-none"
                  placeholder={content.messagePlaceholder}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-vibrantGold text-trustBlue font-semibold px-6 py-4 rounded-lg hover:bg-yellow-400 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {content.submitButton}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {content.requiredFields}
              </p>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-trustBlue hover:text-vibrantGold font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {content.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
