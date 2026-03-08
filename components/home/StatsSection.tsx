export default function StatsSection() {
  const stats = [
    { number: '500+', label: 'Оқушылар' },
    { number: '25+', label: 'Мұғалімдер' },
    { number: '30+', label: 'Жылдан астам тәжірибе' },
    { number: '1000+', label: 'Түлектер' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
