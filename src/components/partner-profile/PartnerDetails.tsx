"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextBolder, TextItalic, TextUnderline } from "phosphor-react";
import React from "react";

const PartnerDetails = ({ onChange, content }: any) => {
  const handleChange = (content: string) => {
    onChange(content);
  };

  const editor = useEditor({
    content,
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "h-40 px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="mb-6">
      <label htmlFor="details">Se descreva para seu paciente</label>
      <div className="mt-4 border border-gray-300 bg-white rounded-md ">
        <div className="flex pt-1 ml-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBold().run();
            }}
            className="richTextBtn"
          >
            <TextBolder size={16} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleItalic().run();
            }}
            className="richTextBtn"
          >
            <TextItalic size={16} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleUnderline().run();
            }}
            className="richTextBtn"
          >
            <TextUnderline size={16} />
          </button>
        </div>
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
      <small className="text-xs text-gray-800">
        Formate o texto para aparecer no seu perfil
      </small>
    </div>
  );
};

export default PartnerDetails;
