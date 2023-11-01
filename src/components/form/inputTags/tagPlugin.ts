import { Editor } from "slate";

export const withTags = (editor: Editor) => {
    const { isInline, isVoid } = editor;

    editor.insertBreak = () => {
        return;
    }

    editor.isInline = element => {
        return element.type === 'tag' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'tag' ? true : isVoid(element)
    }

    return editor
}
