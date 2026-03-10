import Link from 'next/link';
import { getArticles } from '@/lib/supabase/articles';
import UpcomingEventsContent from './UpcomingEventsContent';

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

  return <UpcomingEventsContent events={upcomingEvents} />;
}
