"use client";
import { useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImageIcon,
  Video, Undo, Redo, RemoveFormatting, FileCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Editor } from '@tiptap/react';

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor, isSourceMode, toggleSourceMode }: { editor: Editor | null, isSourceMode: boolean, toggleSourceMode: () => void }) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/50">
      {/* Source Toggle */}
      <Toggle size="sm" pressed={isSourceMode} onPressedChange={toggleSourceMode} className="h-8 px-2" title="HTML Source Code">
        <FileCode className="h-4 w-4 mr-2" />
        <span className="text-xs font-semibold">Source</span>
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* History */}
      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="h-8 w-8 p-0">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="h-8 w-8 p-0">
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Basic Formatting */}
      <Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()} className="h-8 w-8 p-0">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()} className="h-8 w-8 p-0">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('underline')} onPressedChange={() => editor.chain().focus().toggleUnderline().run()} className="h-8 w-8 p-0">
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('strike')} onPressedChange={() => editor.chain().focus().toggleStrike().run()} className="h-8 w-8 p-0">
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Sub/Super script */}
      <Toggle size="sm" pressed={editor.isActive('subscript')} onPressedChange={() => editor.chain().focus().toggleSubscript().run()} className="h-8 w-8 p-0">
        <SubscriptIcon className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('superscript')} onPressedChange={() => editor.chain().focus().toggleSuperscript().run()} className="h-8 w-8 p-0">
        <SuperscriptIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'left' })} onPressedChange={() => editor.chain().focus().setTextAlign('left').run()} className="h-8 w-8 p-0">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'center' })} onPressedChange={() => editor.chain().focus().setTextAlign('center').run()} className="h-8 w-8 p-0">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'right' })} onPressedChange={() => editor.chain().focus().setTextAlign('right').run()} className="h-8 w-8 p-0">
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive({ textAlign: 'justify' })} onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()} className="h-8 w-8 p-0">
        <AlignJustify className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists / Blockquote / Code */}
      <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()} className="h-8 w-8 p-0">
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} className="h-8 w-8 p-0">
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('blockquote')} onPressedChange={() => editor.chain().focus().toggleBlockquote().run()} className="h-8 w-8 p-0">
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" pressed={editor.isActive('codeBlock')} onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()} className="h-8 w-8 p-0">
        <Code className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Media / Links */}
      <Toggle size="sm" pressed={editor.isActive('link')} onPressedChange={addLink} className="h-8 w-8 p-0">
        <LinkIcon className="h-4 w-4" />
      </Toggle>
      <Button variant="ghost" size="sm" onClick={addImage} className="h-8 w-8 p-0">
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={addYoutubeVideo} className="h-8 w-8 p-0">
        <Video className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Clear Formatting */}
      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="h-8 w-8 p-0" title="Clear Formatting">
        <RemoveFormatting className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [isSourceMode, setIsSourceMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        controls: false,
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onChange(val);
    editor?.commands.setContent(val, { emitUpdate: false });
  };

  return (
    <div className="flex flex-col border rounded-md overflow-hidden bg-background">
      <MenuBar editor={editor} isSourceMode={isSourceMode} toggleSourceMode={() => setIsSourceMode(!isSourceMode)} />
      <div className="overflow-y-auto w-full">
        {isSourceMode ? (
          <textarea
            className="w-full min-h-[200px] p-4 font-mono text-sm bg-muted/50 focus:outline-none resize-y"
            value={editor?.getHTML() || ''}
            onChange={handleSourceChange}
            placeholder="<html>..."
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
