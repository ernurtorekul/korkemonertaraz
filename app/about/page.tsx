import { useLanguageState } from '@/lib/languageState';
import AboutPageContent from '@/components/pages/AboutPageContent';

export const revalidate = 3600; // Revalidate every hour

export default function AboutPage() {
  return <AboutPageContent />;
}
