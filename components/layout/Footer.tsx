import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Көркемөнер мектебі</h3>
            <p className="text-gray-400 text-sm">
              Жамбыл облысы әкімдігінің, білім басқармасы Тараз қаласының,
              білім бөлімінің, балалар көркемөнер мектебі
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Байланыс</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Мекен-жай: Тараз қаласы, Астана мөлтек ауданы №32</li>
              <li>Телефон: 54-25-92</li>
              <li>Email: korkemonertaraz@mail.kz</li>
              <li>Пошта индексі: 080000</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Әлеуметтік желі</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/korkemoner.taraz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCwm3sX3PCxuqaJiNHJXpG5A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Тараз қаласы балалар көркемөнер мектебі</p>
        </div>
      </div>
    </footer>
  );
}
