// 用于存储根节点的事件监听器，每种事件类型对应一个 Map，Map 的键是 DOM 元素，值是监听器函数，结构是
// {
//   eventType: Map {
//     domElement: listenerFunction
//   }
// }
const rootEventListeners = new Map();

/**
 * 添加事件监听器到指定的 DOM 元素，并确保事件委托到根节点
 * @param {HTMLElement} dom - 需要绑定事件的 DOM 元素
 * @param {string} eventType - 事件类型（例如 'click'）
 * @param {Function} listener - 事件触发时执行的回调函数
 */
export function addEventListener(dom, eventType, listener) {
  const root = document.getElementById("root"); // 假设根节点的 ID 为 'root'

  // 如果当前事件类型还没有在根节点上绑定监听器，则进行绑定
  if (!rootEventListeners.has(eventType)) {
    root.addEventListener(eventType, dispatchEvent); // 将事件委托到根节点
    rootEventListeners.set(eventType, new Map()); // 初始化该事件类型的监听器 Map
  }

  // 将当前 DOM 元素和对应的监听器存储到事件类型的 Map 中
  rootEventListeners.get(eventType).set(dom, listener);
}

/**
 * 从指定的 DOM 元素移除事件监听器
 * @param {HTMLElement} dom - 需要移除事件的 DOM 元素
 * @param {string} eventType - 事件类型（例如 'click'）
 */
export function removeEventListener(dom, eventType) {
  if (rootEventListeners.has(eventType)) {
    // 从事件类型的 Map 中删除指定 DOM 元素的监听器
    rootEventListeners.get(eventType).delete(dom);

    // 如果该事件类型的监听器 Map 已为空，则移除根节点上的事件委托
    if (rootEventListeners.get(eventType).size === 0) {
      const root = document.getElementById("root");
      root.removeEventListener(eventType, dispatchEvent); // 移除根节点上的事件监听器
      rootEventListeners.delete(eventType); // 删除该事件类型的 Map
    }
  }
}

/**
 * 分发事件到对应的监听器
 * @param {Event} nativeEvent - 浏览器原生事件对象
 */
export function dispatchEvent(nativeEvent) {
  const { type, target } = nativeEvent; // 获取事件类型和触发事件的目标元素
  const syntheticEvent = createSyntheticEvent(nativeEvent); // 创建合成事件对象
  let currentTarget = target; // 从事件目标元素开始

  // 遍历目标元素及其祖先元素，查找并执行对应的事件监听器
  while (currentTarget) {
    const listeners = rootEventListeners.get(type);
    if (listeners && listeners.has(currentTarget)) {
      listeners.get(currentTarget)(syntheticEvent);
    }
    currentTarget = currentTarget.parentNode;
  }
}

/**
 * 创建一个合成事件对象，包装原生事件对象
 * @param {Event} nativeEvent - 浏览器原生事件对象
 * @returns {Object} - 合成事件对象，包含原生事件的所有属性和方法
 */
function createSyntheticEvent(nativeEvent) {
  const syntheticEvent = { ...nativeEvent, isDefaultPrevented: false }; // 克隆原生事件对象，并添加一个标记属性

  // 重写 preventDefault 方法，添加标记逻辑
  syntheticEvent.preventDefault = () => {
    syntheticEvent.isDefaultPrevented = true; // 标记事件默认行为已被阻止
    nativeEvent.preventDefault(); // 调用原生的 preventDefault 方法
  };

  return syntheticEvent; // 返回合成事件对象
}
