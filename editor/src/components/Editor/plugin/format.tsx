import type { SlatePlugin } from "./base";
import { Transforms } from "slate";

/**
 * 文本格式渲染组件
 * 注意：此组件可以正确处理多种格式属性同时存在的情况
 */
const FormatLeaf = ({ attributes, children, leaf }: any) => {
  // 创建一个函数来递归应用所有格式属性
  const applyFormats = (
    content: React.ReactNode,
    currentLeaf: any
  ): React.ReactNode => {
    // 应用粗体格式
    if (currentLeaf.bold) {
      content = <strong>{content}</strong>;
    }

    // 应用斜体格式
    if (currentLeaf.italic) {
      content = <em>{content}</em>;
    }

    // 这里可以继续添加其他格式处理
    // 例如：下划线、删除线等

    return content;
  };

  // 应用所有格式并返回最终结果
  const formattedChildren = applyFormats(children, leaf);

  return <span {...attributes}>{formattedChildren}</span>;
};

/**
 * 文本格式插件，处理文本格式的渲染、命令和快捷键
 */
export const formatPlugin: SlatePlugin = {
  key: "format",
  priority: 50,
  renderLeaf: (props) => {
    return <FormatLeaf {...props} />;
  },
  command: (editor, data) => {
    if (data?.bold !== undefined) {
      Transforms.setNodes(
        editor,
        { bold: data.bold },
        { match: (n) => !editor.isInline(n) && !editor.isVoid(n), split: true }
      );
    }

    if (data?.italic !== undefined) {
      Transforms.setNodes(
        editor,
        { italic: data.italic },
        { match: (n) => !editor.isInline(n) && !editor.isVoid(n), split: true }
      );
    }
  },
  onKeyDown: (event, editor) => {
    // 支持Markdown快捷键：**粗体**, *斜体*
    if (
      (event.key === "*" || event.key === "_") &&
      event.target instanceof HTMLElement
    ) {
      const text = event.target.textContent || "";
      const charCount = (text.match(new RegExp(event.key, "g")) || []).length;

      if (charCount === 1 && event.key === "*") {
        // 斜体
        Transforms.setNodes(
          editor,
          { italic: true },
          {
            match: (n) => !editor.isInline(n) && !editor.isVoid(n),
            split: true,
          }
        );
        return true;
      } else if (charCount === 1 && event.shiftKey && event.key === "*") {
        // 粗体
        Transforms.setNodes(
          editor,
          { bold: true },
          {
            match: (n) => !editor.isInline(n) && !editor.isVoid(n),
            split: true,
          }
        );
        return true;
      }
    }
    return false;
  },
};
