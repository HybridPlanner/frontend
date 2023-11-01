import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

export type TagElement = {
    type: 'tag',
    value: string,
    children: CustomText[],
}

export type ParagraphElement = {
    type: 'paragraph',
    children: Descendant[],
}

export type CustomElement = TagElement | ParagraphElement;

export type CustomText = {
    text: string
}

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor & ReactEditor

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor,
        Element: CustomElement,
        Text: CustomText | EmptyText,
    }
}