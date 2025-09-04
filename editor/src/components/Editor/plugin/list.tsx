import React from "react";
import type { SlatePlugin } from "./base";
import { Transforms, Editor } from "slate";

/**
 * 列表元素渲染组件
 */
const ListElement = ({ attributes, children, element }: any) => {
  const isOrdered = element.type === "ol";
  const Tag = isOrdered ? "ol" : "ul";
  // 明确指定为HTML标签字符串
  return React.createElement(Tag, attributes, children);
};

/**
 * 列表项元素渲染组件
 */
const ListItemElement = ({ attributes, children }: any) => {
  return <li {...attributes}>{children}</li>;
};

/**
 * 列表插件，处理有序列表和无序列表的渲染、命令和快捷键
 */
export const listPlugin: SlatePlugin = {
  key: "list",
  priority: 30,
  renderElement: (props) => {
    const { element } = props;
    if (element.type === "ul" || element.type === "ol") {
      return <ListElement {...props} />;
    }
    if (element.type === "li") {
      return <ListItemElement {...props} />;
    }
    return null;
  },
  command: (editor, data) => {
    const type = data?.ordered ? "ol" : "ul";
    Transforms.wrapNodes(editor, {
      type,
      children: [],
    });
  },
  onKeyDown: (event, editor) => {
    // 支持Markdown快捷键：- 无序列表，1. 有序列表
    if (event.key === " " && event.target instanceof HTMLElement) {
      const text = event.target.textContent || "";
      const lastChar = text.slice(-2);

      if (lastChar === "- ") {
        // 获取当前选择的位置
        const { selection } = editor;
        if (selection) {
          // 删除Markdown标记
          Transforms.delete(editor, {
            at: Editor.start(editor, selection.anchor.path)
          });
          // 包装成无序列表
          Transforms.wrapNodes(editor, {
            type: "ul",
            children: [],
          });
          return true;
        }
      } else if (lastChar.match(/\d\. /)) {
        // 获取当前选择的位置
        const { selection } = editor;
        if (selection) {
          // 删除Markdown标记
          Transforms.delete(editor, {
            at: Editor.start(editor, selection.anchor.path)
          });
          // 包装成有序列表
          Transforms.wrapNodes(editor, {
            type: "ol",
            children: [],
          });
          return true;
        }
      }
    }
    return false;
  },
};
