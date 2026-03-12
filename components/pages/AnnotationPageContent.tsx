'use client';

import Link from 'next/link';
import { TitleBlock, TextBlock, ImageBlock, FileBlock, LinkBlock } from '@/components/blocks';
import { useLanguageState } from '@/lib/languageState';
import { useEffect, useState } from 'react';
import type { Article } from '@/types/article';

interface AnnotationPageContentProps {
  article: Article | null;
}

export default function AnnotationPageContent({ article }: AnnotationPageContentProps) {
  const [language] = useLanguageState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-skyTint py-12">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const content = language === 'kk' ? {
    pageTitle: 'Аннотация',
    noArticles: 'Әзірше ақпарат жоқ',
  } : {
    pageTitle: 'Аннотация',
    noArticles: 'Пока нет информации',
  };

  // Show "no articles" message if no article exists
  if (!article) {
    return (
      <div className="min-h-screen bg-skyTint py-16">
        <div className="section-container">
          <div className="text-center py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-trustBlue mb-4">{content.pageTitle}</h1>
            <div className="w-16 h-1 bg-vibrantGold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg">{content.noArticles}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skyTint py-12">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            {/* No date displayed for annotation page */}

            {article.blocks?.map((block) => {
              switch (block.type) {
                case 'title':
                  return <TitleBlock key={block.id} block={block} />;
                case 'text':
                  return <TextBlock key={block.id} block={block} />;
                case 'image':
                  return <ImageBlock key={block.id} block={block} />;
                case 'file':
                  return <FileBlock key={block.id} block={block} />;
                case 'link':
                  return <LinkBlock key={block.id} block={block} />;
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
