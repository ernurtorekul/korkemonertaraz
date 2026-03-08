import { Block } from '@/types/article';

interface TitleBlockProps {
  block: Block;
}

export default function TitleBlock({ block }: TitleBlockProps) {
  const isMainTitle = block.content.length < 50; // Heuristic: short content = main title

  if (isMainTitle) {
    return (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {block.content}
      </h1>
    );
  }

  return (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
      {block.content}
    </h2>
  );
}
