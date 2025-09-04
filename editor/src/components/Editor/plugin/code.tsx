import CodeBlockElement from "../ui/element/CodeBlockElement";
import CodeLeaf from "../ui/leaf/CodeLeaf";
import type { SlatePlugin } from "./base";
import { Transforms, Editor } from "slate";

/**
 * 代码插件，处理代码块和行内代码的渲染、命令和快捷键
 */
export const codePlugin: SlatePlugin = {
  key: "code",
  priority: 40,
  renderElement: (props) => {
    const { element } = props;
    if (element.type === "code-block") {
      return <CodeBlockElement {...props} />;
    }
    return null;
  },
  renderLeaf: (props) => {
    const { leaf } = props;
    if (leaf.code) {
      return <CodeLeaf {...props} />;
    }
    return null;
  },
  command: (editor, data: { block?: boolean; language?: string }) => {
    if (data?.block) {
      Transforms.setNodes(editor, {
        type: "code-block",
        language: data.language || "plaintext",
      });
    } else {
      Transforms.setNodes(
        editor,
        { code: true },
        {
          match: (n) =>
            !Editor.isInline(editor, n) && !Editor.isVoid(editor, n),
          split: true,
        }
      );
    }
  },
  onKeyDown: (event, editor) => {
    // 支持Markdown快捷键：``` 代码块, ` 行内代码
    if (event.key === "`" && event.target instanceof HTMLElement) {
      console.log("我进来了===============");
      const text = event.target.textContent || "";
      const charCount = (text.match(/`/g) || []).length;

      if (charCount === 2 && event.shiftKey) {
        // 行内代码
        Transforms.setNodes(
          editor,
          { code: true },
          {
            match: (n) =>
              !Editor.isInline(editor, n) && !Editor.isVoid(editor, n),
            split: true,
          }
        );
        return true;
      } else if (charCount === 2) {
        // 代码块
        Transforms.setNodes(editor, {
          type: "code-block",
          language: "plaintext",
        });
        return true;
      }
    }
    return false;
  },
};
