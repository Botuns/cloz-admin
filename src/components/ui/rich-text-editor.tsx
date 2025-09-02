"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor as TipTapEditor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write a compelling brand description...",
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[160px] px-3 py-2 text-sm leading-6 focus:outline-none",
      },
    },
    onUpdate: ({ editor }: { editor: TipTapEditor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Keep editor content in sync if parent changes value
  React.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const promptForLink = () => {
    const url = window.prompt("Enter URL");
    if (!url) return;
    try {
      const u = new URL(url);
      editor.chain().focus().setLink({ href: u.toString() }).run();
    } catch {
      // ignore invalid URL
    }
  };

  const isActive = (name: string, attrs?: Record<string, unknown>) =>
    editor.isActive(name as any, attrs);

  return (
    <div
      className={cn(
        "rounded-md border bg-white",
        "focus-within:ring-2 focus-within:ring-stone-800/20",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 border-b px-2 py-1">
        <Button
          type="button"
          variant={isActive("bold") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>
        <Button
          type="button"
          variant={isActive("italic") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Button>
        <Button
          type="button"
          variant={isActive("strike") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </Button>
        <div className="mx-1 h-5 w-px bg-muted" />
        <Button
          type="button"
          variant={isActive("heading", { level: 2 }) ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          type="button"
          variant={isActive("heading", { level: 3 }) ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
        <div className="mx-1 h-5 w-px bg-muted" />
        <Button
          type="button"
          variant={isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Button>
        <Button
          type="button"
          variant={isActive("orderedList") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Button>
        <Button
          type="button"
          variant={isActive("blockquote") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </Button>
        <div className="mx-1 h-5 w-px bg-muted" />
        <Button
          type="button"
          variant={isActive("link") ? "default" : "ghost"}
          size="sm"
          className="h-8"
          onClick={promptForLink}
        >
          Link
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </Button>
        <div className="mx-1 h-5 w-px bg-muted" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 ml-auto"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          Clear
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          "px-2 py-1 text-sm leading-6",
          "[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_blockquote]:my-2",
          "[&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-6"
        )}
      />
    </div>
  );
}

export default RichTextEditor;
