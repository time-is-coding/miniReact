import { useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import {
  codePlugin,
  formatPlugin,
  headingPlugin,
  listPlugin,
  paragraphPlugin,
  PluginManager,
} from "../plugin/index";

/**
 * 自定义编辑器hook，创建并配置编辑器实例
 */
const useEditor: any = () => {
  // 创建插件管理器实例
  const pluginManager = useMemo(() => {
    const pluginManager = new PluginManager();

    // 注册所有插件
    pluginManager.registerMany([
      paragraphPlugin,
      headingPlugin,
      listPlugin,
      codePlugin,
      formatPlugin,
    ]);

    return pluginManager;
  }, []);

  const editor = useMemo(() => {
    // 创建基础编辑器
    let baseEditor = withReact(createEditor());
    // 添加历史记录功能
    baseEditor = withHistory(baseEditor);

    // 扩展编辑器以支持插件命令执行
    const customEditor = {
      ...baseEditor,
      executeCommand: (key: string, data?: any) => {
        return pluginManager.executeCommand(customEditor, key, data);
      },
    };

    return customEditor;
  }, []);
  return { editor, pluginManager };
};

export default useEditor;
