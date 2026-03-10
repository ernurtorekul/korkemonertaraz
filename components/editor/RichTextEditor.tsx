'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useMemo } from 'react';
import { useLanguageState } from '@/lib/languageState';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [language] = useLanguageState();

  const contentText = useMemo(() => language === 'kk' ? {
    loading: 'Жүктелуде...',
    bold: 'Жуан (Bold)',
    italic: 'Көлбеу (Italic)',
    strike: 'Сызылған (Strike through)',
    bulletList: 'Тізім (Bullet list)',
    numberedList: 'Нөмірленген тізім (Numbered list)',
    heading1: 'Тақырып 1',
    heading2: 'Тақырып 2',
    paragraph: 'Параграф',
    inlineCode: 'Ішкі код (Inline code)',
    codeBlock: 'Код блогы (Code block)',
    clearFormatting: 'Форматты алып тастау',
    undo: 'Болдырмау (Undo)',
    redo: 'Қайтару (Redo)',
    placeholder: placeholder || 'Мәтін енгізіңіз...',
  } : {
    loading: 'Загрузка...',
    bold: 'Жирный (Bold)',
    italic: 'Курсив (Italic)',
    strike: 'Зачеркнутый (Strike through)',
    bulletList: 'Маркированный список (Bullet list)',
    numberedList: 'Нумерованный список (Numbered list)',
    heading1: 'Заголовок 1',
    heading2: 'Заголовок 2',
    paragraph: 'Параграф',
    inlineCode: 'Встроенный код (Inline code)',
    codeBlock: 'Блок кода (Code block)',
    clearFormatting: 'Убрать форматирование',
    undo: 'Отменить (Undo)',
    redo: 'Повторить (Redo)',
    placeholder: placeholder || 'Введите текст...',
  }, [language, placeholder]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[150px] px-4 py-3 text-gray-900',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="w-full border border-gray-300 rounded-lg">
        <div className="w-full px-4 py-3 min-h-[150px] text-gray-400">
          {contentText.loading}
        </div>
      </div>
    );
  }

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title={contentText.bold}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title={contentText.italic}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 4h10M4 20h10M9 4l6 16"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title={contentText.strike}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12h18M4 8a4 4 0 014-4h6M16 16a4 4 0 01-4 4h-2M4 16a4 4 0 014-4"
            />
          </svg>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title={contentText.bulletList}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title={contentText.numberedList}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01"
            />
          </svg>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title={contentText.heading1}
        >
          <span className="font-bold text-lg">H1</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title={contentText.heading2}
        >
          <span className="font-bold text-base">H2</span>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
          title={contentText.paragraph}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h10"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          title={contentText.inlineCode}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title={contentText.codeBlock}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title={contentText.clearFormatting}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title={contentText.undo}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title={contentText.redo}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
            />
          </svg>
        </ToolbarButton>
      </div>

      <div className="relative">
        <EditorContent editor={editor} />
        {editor.isEmpty && (
          <div className="absolute top-3 left-4 pointer-events-none text-gray-400">
            {contentText.placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
