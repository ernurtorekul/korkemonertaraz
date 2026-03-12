import { Block } from '@/types/article';
import { useLanguageState } from '@/lib/languageState';

interface LinkBlockProps {
  block: Block;
}

export default function LinkBlock({ block }: LinkBlockProps) {
  const [language] = useLanguageState();

  const content = language === 'kk' ? {
    visitLink: 'Сілтемеге өту',
    externalLink: 'Сыртқы сілтеме',
  } : {
    visitLink: 'Перейти по ссылке',
    externalLink: 'Внешняя ссылка',
  };

  return (
    <div className="my-6">
      <a
        href={block.content}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-trustBlue rounded-xl hover:bg-blue-800 transition-all duration-200 group max-w-md"
      >
        <svg className="w-6 h-6 text-vibrantGold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">
            {content.visitLink}
          </p>
          <p className="text-xs text-blue-200 truncate">
            {block.content}
          </p>
        </div>
        <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}
