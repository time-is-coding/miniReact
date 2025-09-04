/**
 * 行内代码渲染组件
 */
const CodeLeaf = ({ attributes, children }: any) => {
  return <code {...attributes}>{children}</code>;
};

export default CodeLeaf;
