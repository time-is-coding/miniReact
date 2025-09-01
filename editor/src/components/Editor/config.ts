export const mockData = [
  // 段落
  { type: "paragraph", children: [{ text: "普通段落" }] },

  // 标题
  { type: "heading", level: 1, children: [{ text: "一级标题" }] },

  // 列表
  [
    {
      type: "ul", // 无序列表根
      children: [
        {
          type: "li", // 一级 li
          children: [
            { text: "一级无序" }, // li 里的第一段文本
            {
              type: "ol", // ↓ 嵌套二级有序
              children: [
                {
                  type: "li",
                  children: [{ text: "二级有序" }],
                },
                {
                  type: "li",
                  children: [{ text: "二级有序" }],
                },
              ],
            },
          ],
        },
        {
          type: "li",
          children: [{ text: "一级无序" }],
        },
      ],
    },
  ],

  // 代码块
  { type: "code-block", language: "js", children: [{ text: "console.log(1)" }] },

  // 行内: 加粗 / 斜体 / 行内代码
  { text: "加粗", bold: true },
  { text: "行内代码", code: true },
];
