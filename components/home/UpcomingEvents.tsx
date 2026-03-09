import Link from 'next/link';
import { getArticles } from '@/lib/supabase/articles';

// Format date for display (e.g., "15 Наурыз 2026, 14:00")
function formatEventDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleDateString('kk-KZ', options);
  } catch {
    return '';
  }
}

// Get day name and day number (e.g., "15", "Сенбі")
function getCalendarDayInfo(dateString: string | null | undefined): { day: string; dayName: string } | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    const day = date.getDate().toString();
    const dayName = date.toLocaleDateString('kk-KZ', { weekday: 'long' });

    return { day, dayName };
  } catch {
    return null;
  }
}

// Get month name (e.g., "Наурыз")
function getMonthName(dateString: string | null | undefined): string | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString('kk-KZ', { month: 'long' });
  } catch {
    return null;
  }
}

export default async function UpcomingEvents() {
  // Get all published articles from Events category
  const events = await getArticles({ category: 'Іс-шаралар', published: true });

  // Filter events that have event_date and are in the future
  const now = new Date();
  const upcomingEvents = events
    .filter(article => article.event_date && new Date(article.event_date) >= now)
    .sort((a, b) => {
      const dateA = new Date(a.event_date!);
      const dateB = new Date(b.event_date!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3); // Get only 3 latest events

  if (upcomingEvents.length === 0) {
    return null;
  }

  const getCategorySlug = (category: string) => {
    const categoryToSlug: Record<string, string> = {
      'Іс-шаралар': 'events',
    };
    return categoryToSlug[category] || category.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-skyTint via-white to-skyTint">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-trustBlue mb-2">Алдағы іс-шаралар</h2>
          <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full"></div>
        </div>

        {/* Calendar-style Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => {
            const dayInfo = getCalendarDayInfo(event.event_date);
            const monthName = getMonthName(event.event_date);
            const categorySlug = getCategorySlug(event.category);
            const fullDate = formatEventDate(event.event_date);

            return (
              <Link
                key={event.id}
                href={`/${categorySlug}/${event.id}`}
                className="group"
              >
                <div className="card p-6 hover:shadow-lg transition-all duration-300">
                  {/* Calendar-style Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Calendar Date Box */}
                    <div className="flex-shrink-0">
                      <div className="bg-trustBlue text-white rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-xs font-medium opacity-90">{monthName}</div>
                        <div className="text-2xl md:text-3xl font-bold">{dayInfo?.day}</div>
                        <div className="text-xs opacity-75 truncate w-full">{dayInfo?.dayName}</div>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-trustBlue mb-2 line-clamp-2 group-hover:text-vibrantGold transition-colors">
                        {event.title}
                      </h3>
                      {fullDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <time className="truncate">{fullDate}</time>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-trustBlue group-hover:text-vibrantGold transition-colors text-sm font-medium">
                    <span>Толық оқу</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Events Link */}
        <div className="text-center mt-8">
          <Link
            href="/events"
            className="inline-flex items-center text-trustBlue hover:text-vibrantGold font-semibold transition-colors group"
          >
            <span>Барлық іс-шараларды көру</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
