'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Block } from '@/types/article';
import RichTextEditor from '@/components/editor/RichTextEditor';

const CATEGORIES = [
  'Әкімшілік',
  'Аннотация',
  'Оқу-әдістемелік жұмыстар',
  'Тәрбие жұмысы',
  'Біздің түлектер',
  'Ата-аналарға',
  'Жетістіктер',
  'Нормативтік құжаттар',
  'Байланыс',
  'Ақпарат',
  'Сабақ кестесі',
  'Оқушылар жетістігі',
  'Іс-шаралар',
  'Жемқорлыққа қарсы күрес',
  'Қамқоршылық кеңес',
  'Мемлекеттік қызмет',
];

type NewBlock = Omit<Block, 'id' | 'order'>;

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [blocks, setBlocks] = useState<NewBlock[]>([]);
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  const addBlock = (type: Block['type']) => {
    const newBlock: NewBlock = { type, content: '' };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setBlocks(newBlocks);
  };

  const updateBlock = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    if (!title || !category || blocks.length === 0) {
      alert('Тақырып, санат және кемінде бір блок қажет');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          blocks,
          published,
        }),
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        alert('Failed to create article');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        updateBlock(index, url);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to upload file';
        alert(`Файлды жүктеу сәтсіз аяқталды: ${errorMessage}`);
        console.error('Upload error:', errorData);
      }
    } catch (error) {
      alert(`Файлды жүктеу кезінде қате орын алды: ${error instanceof Error ? error.message : 'Белгісіз қате'}`);
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Жаңа мақала</h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Бас тарту
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тақырып
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Мақаланың тақырыбы"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Санат
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="">Санатты таңдаңыз</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Жариялау</span>
          </label>
        </div>

        {/* Blocks */}
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase">
                  {block.type === 'title' && 'Тақырып'}
                  {block.type === 'text' && 'Мәтін'}
                  {block.type === 'image' && 'Сурет'}
                  {block.type === 'file' && 'Файл'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeBlock(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    ×
                  </button>
                </div>
              </div>

              {block.type === 'title' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xl font-semibold text-gray-900"
                  placeholder="Тақырып мәтіні..."
                />
              )}

              {block.type === 'text' && (
                <RichTextEditor
                  content={block.content}
                  onChange={(content) => updateBlock(index, content)}
                  placeholder="Мәтін енгізіңіз..."
                />
              )}

              {block.type === 'image' && (
                <div>
                  {block.content ? (
                    <div className="relative">
                      <img src={block.content} alt="Uploaded" className="max-h-64 rounded-lg" />
                      <button
                        onClick={() => updateBlock(index, '')}
                        className="mt-2 text-sm text-red-600 hover:underline"
                      >
                        Өзгерту
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(index, file);
                      }}
                      className="w-full"
                    />
                  )}
                </div>
              )}

              {block.type === 'file' && (
                <div>
                  {block.content ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <a href={block.content} target="_blank" rel="noopener noreferrer" className="text-blue-900 truncate">
                        {block.content.split('/').pop()}
                      </a>
                      <button
                        onClick={() => updateBlock(index, '')}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Өзгерту
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(index, file);
                      }}
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Block Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => addBlock('title')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Тақырып
          </button>
          <button
            onClick={() => addBlock('text')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Мәтін
          </button>
          <button
            onClick={() => addBlock('image')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Сурет
          </button>
          <button
            onClick={() => addBlock('file')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            + Файл
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/dashboard"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Бас тарту
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {saving ? 'Сақтау...' : 'Сақтау'}
          </button>
        </div>
      </main>
    </div>
  );
}
