import { Block } from '@/types/article';

interface TextBlockProps {
  block: Block;
}

export default function TextBlock({ block }: TextBlockProps) {
  // Simple HTML sanitization - only allow basic formatting tags
  const sanitizeHtml = (html: string) => {
    // Remove script tags and on* attributes
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    cleaned = cleaned.replace(/on\w+="[^"]*"/gi, '');
    cleaned = cleaned.replace(/on\w+='[^']*'/gi, '');
    return cleaned;
  };

  return (
    <div
      className="prose prose-lg max-w-none mb-6 text-gray-900"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.content) }}
    />
  );
}
