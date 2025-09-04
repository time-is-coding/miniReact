import type { Editor } from "slate";

/**
 * Slate插件接口定义
 */
export interface SlatePlugin<T = unknown> {
  key: string; // 插件唯一标识
  priority?: number; // 优先级，用于排序
  command?: (editor: Editor, data?: T) => void; // 插件命令
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement>,
    editor: Editor
  ) => boolean | void; // 键盘事件处理
  renderElement?: (props: {
    attributes: Record<string, unknown>;
    children: React.ReactNode;
    element: Record<string, unknown>;
  }) => React.ReactElement | null; // 元素渲染函数
  renderLeaf?: (props: {
    attributes: Record<string, unknown>;
    children: React.ReactNode;
    leaf: Record<string, unknown>;
  }) => React.ReactElement | null; // 叶子节点渲染函数
}

/**
 * 插件管理器类，负责插件的注册、管理和调用
 */
export class PluginManager {
  private plugins: SlatePlugin[] = [];

  /**
   * 注册单个插件
   */
  register(plugin: SlatePlugin): void {
    this.plugins.push(plugin);
    // 按优先级排序，优先级高的排在前面
    this.plugins.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * 批量注册插件
   */
  registerMany(plugins: SlatePlugin[]): void {
    plugins.forEach((plugin) => this.register(plugin));
  }

  /**
   * 获取所有插件
   */
  getAll(): SlatePlugin[] {
    return this.plugins;
  }

  /**
   * 根据key获取插件
   */
  get(key: string): SlatePlugin | undefined {
    return this.plugins.find((plugin) => plugin.key === key);
  }

  /**
   * 执行插件命令
   */
  executeCommand<T>(editor: Editor, key: string, data?: T): boolean {
    const plugin = this.get(key);
    if (plugin && plugin.command) {
      plugin.command(editor, data);
      return true;
    }
    return false;
  }
}
