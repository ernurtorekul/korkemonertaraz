import { Block } from '@/types/article';
import { useState } from 'react';
import { useLanguageState } from '@/lib/languageState';

interface FileBlockProps {
  block: Block;
}

export default function FileBlock({ block }: FileBlockProps) {
  const [language] = useLanguageState();
  const fileName = block.content.split('/').pop() || 'Файл';

  // More reliable PDF detection - check if URL or filename contains .pdf
  const isPdf = fileName.toLowerCase().includes('.pdf') || block.content.toLowerCase().includes('.pdf');

  // Check if it's a Word document (.doc or .docx)
  const isDoc = fileName.toLowerCase().includes('.doc') || block.content.toLowerCase().includes('.doc');

  // Use Google Docs Viewer for doc/docx files
  const docViewerUrl = isDoc ? `https://docs.google.com/viewer?url=${encodeURIComponent(block.content)}&embedded=true` : null;

  const content = language === 'kk' ? {
    pdfDocument: 'PDF құжат',
    openInNew: 'Жаңа терезеде ашу',
    wordDocument: 'Word құжат',
    download: 'Жүктеу',
    pdfError: 'PDF құжатын көру үшін сіздің браузеріңіз PDF көрсетуді қолдамайды.',
    wordError: 'Word құжатын көру үшін сіздің браузеріңіз қолдамайды.',
    downloadFile: 'файлын жүктеу',
  } : {
    pdfDocument: 'PDF документ',
    openInNew: 'Открыть в новом окне',
    wordDocument: 'Word документ',
    download: 'Скачать',
    pdfError: 'Ваш браузер не поддерживает просмотр PDF документов.',
    wordError: 'Ваш браузер не поддерживает просмотр Word документов.',
    downloadFile: 'файл для скачивания',
  };

  return (
    <div className="my-6">
      {isPdf ? (
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8v2h8v-2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">{fileName}</p>
                <p className="text-xs text-gray-500">{content.pdfDocument}</p>
              </div>
            </div>
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-900 hover:text-blue-700 font-medium"
            >
              {content.openInNew}
            </a>
          </div>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
            <iframe
              src={block.content}
              className="w-full border-0"
              style={{ minHeight: '800px' }}
              title={fileName}
            >
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-gray-600 mb-4">{content.pdfError}</p>
                <a
                  href={block.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:text-blue-700 font-medium underline"
                >
                  {fileName} {content.downloadFile}
                </a>
              </div>
            </iframe>
          </div>
        </div>
      ) : isDoc ? (
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path d="M14 2v6h6M16 13H8v2h8v-2z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-900">{fileName}</p>
                <p className="text-xs text-gray-500">{content.wordDocument}</p>
              </div>
            </div>
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-900 hover:text-blue-700 font-medium"
            >
              {content.download}
            </a>
          </div>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
            <iframe
              src={docViewerUrl || ''}
              className="w-full border-0"
              style={{ minHeight: '800px' }}
              title={fileName}
            >
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-gray-600 mb-4">{content.wordError}</p>
                <a
                  href={block.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:text-blue-700 font-medium underline"
                >
                  {fileName} {content.downloadFile}
                </a>
              </div>
            </iframe>
          </div>
        </div>
      ) : (
        <a
          href={block.content}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors max-w-md"
        >
          <svg className="w-8 h-8 text-blue-900 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </p>
            <p className="text-xs text-gray-500">Жүктеу үшін басыңыз</p>
          </div>
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      )}
    </div>
  );
}
