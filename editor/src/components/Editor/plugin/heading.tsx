import React from "react";
import type { SlatePlugin } from "./base";
import { Transforms } from "slate";

/**
 * 标题元素渲染组件
 */
const HeadingElement = ({ attributes, children, element }: any) => {
  const level = element.level || 1;
  const Tag = `h${level}`;
  // 使用React.createElement来避免JSX动态组件类型问题
  return React.createElement(Tag, attributes, children);
};

/**
 * 标题插件，处理标题的渲染、命令和快捷键
 */
export const headingPlugin: SlatePlugin = {
  key: "heading",
  priority: 20,
  renderElement: (props) => {
    const { element } = props;
    // 仅处理type为heading的元素
    if (element.type === "heading") {
      return <HeadingElement {...props} />;
    }
    // 默认返回null，让其他插件处理或使用默认渲染
    return null;
  },
  command: (editor, data) => {
    const level = data?.level || 1;
    Transforms.setNodes(editor, {
      type: "heading",
      level,
    });
  },
  onKeyDown: (event, editor) => {
    // 支持Markdown快捷键：# 标题
    if (
      event.key === " " &&
      event.metaKey &&
      /^[1-6]$/.test(event.code.slice(-1))
    ) {
      const level = parseInt(event.code.slice(-1));
      Transforms.setNodes(editor, {
        type: "heading",
        level,
      });
      return true;
    }
    return false;
  },
};
