import type { Descendant, Editor } from "slate";

export type ParagraphElement = { type: string; children: Descendant[] };
export type HeadingElement = { type: string; level: number; children: Descendant[] };
export type ListElement = { type: string; children: Descendant[] };

export type CommandFn = (editor: Editor, data?: Record<string, any>) => void;
type BasePlugin = {
  key: string;
  priority?: number; // 优先级越高 在越外层
  command?: CommandFn;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => boolean | void;
};
