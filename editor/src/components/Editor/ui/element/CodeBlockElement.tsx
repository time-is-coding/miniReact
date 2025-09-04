/**
 * 代码块元素渲染组件
 */
const CodeBlockElement = ({ attributes, children }: any) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlockElement;
