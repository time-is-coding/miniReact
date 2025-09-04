import type { SlatePlugin } from "./base";
import { PARAGRAPH } from "../config/const";
import { Editor, Transforms } from "slate";

/**
 * 段落元素渲染组件
 */
const ParagraphElement = ({ attributes, children }: any) => {
  return <p {...attributes}>{children}</p>;
};

/**
 * 段落插件，处理普通文本段落的渲染和命令
 */
export const paragraphPlugin: SlatePlugin = {
  key: "paragraph",
  priority: 10,
  renderElement: (props) => {
    const { element } = props;
    if (element.type === PARAGRAPH || !element.type) {
      return <ParagraphElement {...props} />;
    }
    return null;
  },
  command: (editor) => {
    Transforms.setNodes(editor, {
      type: PARAGRAPH,
    });
  },
  // 添加回车键处理逻辑
  onKeyDown: (event, editor) => {
    // 处理回车键，创建新段落
    if (event.key === "Enter") {
      debugger;
      // 分割当前节点并在下方创建一个新的段落节点
      Editor.insertBreak(editor);
      // 返回true表示事件已被处理
      return true;
    }
    return false;
  },
};
