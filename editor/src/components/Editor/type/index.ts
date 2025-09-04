import type { Descendant, Editor } from "slate";

/**
 * 段落元素类型
 */
export type ParagraphElement = { type: string; children: Descendant[] };

/**
 * 标题元素类型
 */
export type HeadingElement = { type: string; level: number; children: Descendant[] };

/**
 * 列表元素类型
 */
export type ListElement = { type: string; children: Descendant[] };

/**
 * 代码块元素类型
 */
export type CodeBlockElement = { type: string; language?: string; children: Descendant[] };

/**
 * 自定义元素类型联合
 */
export type CustomElement = ParagraphElement | HeadingElement | ListElement | CodeBlockElement;

/**
 * 自定义文本类型，支持各种文本格式
 */
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  [key: string]: any;
};

/**
 * 命令函数类型
 */
export type CommandFn = (editor: Editor, data?: Record<string, any>) => void;

// 类型定义已在plugin/base.ts中定义
