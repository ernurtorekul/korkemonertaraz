import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-trustBlue text-white">
      <div className="section-container py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpeg"
                  alt="Көркемөнер мектебі логотипі"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-vibrantGold">Көркемөнер мектебі</h3>
                <p className="text-xs text-blue-200">Тараз қаласы</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-md">
              Жамбыл облысы әкімдігінің, білім басқармасы Тараз қаласының, білім
              бөлімінің, балалар көркемөнер мектебі
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/korkemoner.taraz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-vibrantGold hover:text-trustBlue transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCwm3sX3PCxuqaJiNHJXpG5A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-vibrantGold hover:text-trustBlue transition-all duration-200"
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-vibrantGold">Тез сілтемелер</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Басты бет
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Байланыс
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Жетістіктер
                </Link>
              </li>
              <li>
                <Link
                  href="/graduates"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Түлектер
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-vibrantGold">Байланыс</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-vibrantGold flex-shrink-0 mt-0.5"
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
                <span className="text-blue-100">
                  Тараз қаласы, Астана мөлтек ауданы №32
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-vibrantGold flex-shrink-0"
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
                <a
                  href="tel:54-25-92"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  54-25-92
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-vibrantGold flex-shrink-0"
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
                {/* <a href="mailto:korkemonertaraz@mail.kz" className="text-blue-100 hover:text-white transition-colors text-xs break-all">korkemonertaraz@mail.kz</a> */}
                <a
                  href="mailto:ernurtorekul@gmail.com"
                  className="text-blue-100 hover:text-white transition-colors text-xs break-all"
                >
                  ernurtorekul@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-vibrantGold flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <span className="text-blue-100">080000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm">
            <p className="text-blue-200 text-center md:text-left">
              &copy; {new Date().getFullYear()} Тараз қаласы балалар көркемөнер
              мектебі
            </p>
            {/* <div className="flex items-center space-x-4 text-blue-200">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors text-xs"
              >
                Жеке деректер
              </Link>
              <Link
                href="/documents"
                className="hover:text-white transition-colors text-xs"
              >
                Құжаттар
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
