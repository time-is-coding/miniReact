import type { Descendant } from "slate";
import { Slate, Editable } from "slate-react";
import styles from "./styles.module.less";
import useEditor from "./hooks/useEditor";
import { mockData } from "./config/mock";
import { useCallback, useMemo } from "react";

/**
 * 编辑器组件的初始值，提供Markdown示例
 */
const initialValue: Descendant[] = mockData;

/**
 * 主编辑器组件
 */
const Editor = () => {
  const { editor, pluginManager } = useEditor();

  const plugins = useMemo(() => {
    return pluginManager?.getAll() || [];
  }, [pluginManager]);

  /**
   * 合并所有插件的renderElement函数
   */
  const renderElement = useCallback(
    (props: any) => {
      for (const plugin of plugins) {
        if (plugin.renderElement) {
          const result = plugin.renderElement(props);
          if (result) return result;
        }
      }
      // 默认渲染段落
      return <p {...props.attributes}>{props.children}</p>;
    },
    [plugins]
  );

  /**
   * 合并所有插件的renderLeaf函数
   */
  const renderLeaf = useCallback(
    (props: any) => {
      for (const plugin of plugins) {
        if (plugin.renderLeaf) {
          const result = plugin.renderLeaf(props);
          if (result) return result;
        }
      }
      // 默认渲染
      return <span {...props.attributes}>{props.children}</span>;
    },
    [plugins]
  );

  /**
   * 合并所有插件的onKeyDown函数
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      for (const plugin of plugins) {
        if (plugin.onKeyDown && plugin.onKeyDown(event, editor)) {
          return true;
        }
      }
      return false;
    },
    [plugins, editor]
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        className={styles.editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};
export default Editor;
