import { PARAGRAPH } from "./const";
export const mockData = [
  {
    type: PARAGRAPH,
    children: [{ text: "欢迎使用Markdown编辑器！" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "尝试使用Markdown语法：" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "# 一级标题" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "- 无序列表项" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "**粗体文本**" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "*斜体文本*" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "`行内代码`" }],
  },
  {
    type: PARAGRAPH,
    children: [{ text: "```代码块```" }],
  },
];
