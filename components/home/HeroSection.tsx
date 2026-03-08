export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Тараз қаласы балалар көркемөнер мектебі
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Бұл Тараз қаласының білім беру мекемесі, онда балаларға бейнелеу өнеріне үйретеді,
              олардың шығармашылық қабілеттерін дамытып, кәсіби педагогтардың жетекшілігімен
              көркемдік мәдениеттің негіздерімен таныстырады.
            </p>
            <a
              href="/байланыс"
              className="inline-block bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Бізбен байланысыңыз
            </a>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-8xl">🎨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
