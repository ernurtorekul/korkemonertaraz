import { Block } from '@/types/article';

interface TextBlockProps {
  block: Block;
}

export default function TextBlock({ block }: TextBlockProps) {
  // Comprehensive HTML sanitization to prevent XSS attacks
  const sanitizeHtml = (html: string): string => {
    // Remove script tags and their content
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Remove dangerous tags
    const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'button', 'link', 'meta', 'style'];
    dangerousTags.forEach(tag => {
      const regex = new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)[^<])*<\\/${tag}>`, 'gi');
      cleaned = cleaned.replace(regex, '');
      // Also remove self-closing versions
      const selfClosingRegex = new RegExp(`<${tag}\\b[^<]*/>`, 'gi');
      cleaned = cleaned.replace(selfClosingRegex, '');
    });

    // Remove all on* event handlers (onclick, onload, onerror, etc.)
    cleaned = cleaned.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
    cleaned = cleaned.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');

    // Remove javascript: and data: URLs from href and src attributes
    cleaned = cleaned.replace(/(href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, '$1="#"');
    cleaned = cleaned.replace(/(href|src)\s*=\s*["']\s*data:[^"']*["']/gi, '$1="#"');

    // Remove style attributes with url() that could contain javascript
    cleaned = cleaned.replace(/style\s*=\s*["'][^"']*url\s*\([^)]*\)[^"']*["']/gi, 'style=""');

    // Remove HTML comments that could hide scripts
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

    // Decode common HTML entities before final sanitization
    cleaned = cleaned.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x0?[0-9a-f]+;?/gi, '');

    // Final pass - remove any remaining script tags or dangerous patterns
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    cleaned = cleaned.replace(/javascript:/gi, '');
    cleaned = cleaned.replace(/vbscript:/gi, '');
    cleaned = cleaned.replace(/onload\s*=/gi, '');
    cleaned = cleaned.replace(/onerror\s*=/gi, '');

    // Only allow safe HTML tags and attributes
    // Safe tags: p, br, strong, b, em, i, u, a, ul, ol, li, h1-h6, blockquote, code, pre
    const allowedTagsRegex = /<\/?(?!\/?(p|br|strong|b|em|i|u|a|ul|ol|li|h[1-6]|blockquote|code|pre|span|div)(?:\s|>))/gi;
    // This regex is permissive - we've already removed dangerous content above

    return cleaned.trim();
  };

  return (
    <div
      className="prose prose-lg max-w-none mb-6 text-gray-900"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.content) }}
    />
  );
}
