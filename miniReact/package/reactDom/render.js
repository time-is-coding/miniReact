// 全局变量
// nextUnitOfWork: 下一个需要处理的工作单元（Fiber节点）
let nextUnitOfWork = null;
// wipRoot: 当前正在构建的Fiber树的根节点
let wipRoot = null;

/**
 * render 函数
 * 用于初始化Fiber树并设置根节点的属性
 * @param {Object} element - React元素对象
 * @param {HTMLElement} container - 容器DOM节点
 */
export function render(element, container) {
  wipRoot = {
    dom: container, // 容器DOM节点
    props: { children: [element] }, // 根节点的子元素
    alternate: null, // 保存上一次的Fiber树，用于比较
  };
  console.log("wipRoot:", wipRoot);
  nextUnitOfWork = wipRoot; // 设置下一个工作单元为根节点
}

/**
 * workLoop 函数
 * 浏览器空闲时执行的主循环，用于协调Fiber树的构建
 * @param {IdleDeadline} deadline - 浏览器提供的空闲时间对象
 */
function workLoop(deadline) {
  let shouldYield = false; // 是否需要暂停工作
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 执行当前工作单元
    shouldYield = deadline.timeRemaining() < 1; // 如果剩余时间不足，暂停工作
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // 如果没有工作单元且Fiber树构建完成，提交更新
  }

  requestIdleCallback(workLoop); // 继续下一次工作
}

/**
 * performUnitOfWork 函数
 * 执行当前Fiber节点的工作，并返回下一个工作单元
 * @param {Object} fiber - 当前的Fiber节点
 * @returns {Object|null} - 下一个需要处理的Fiber节点
 */
function performUnitOfWork(fiber) {
  // 1. 创建当前Fiber节点对应的DOM节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. 为当前Fiber节点的子元素创建Fiber节点
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type, // 元素类型
      props: element.props, // 元素属性
      parent: fiber, // 父Fiber节点
      dom: null, // 对应的DOM节点
    };

    if (index === 0) {
      fiber.child = newFiber; // 第一个子节点作为child
    } else {
      prevSibling.sibling = newFiber; // 其他子节点作为sibling
    }

    prevSibling = newFiber;
    index++;
  }

  // 3. 返回下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

/**
 * commitRoot 函数
 * 提交Fiber树的更新到DOM
 */
function commitRoot() {
  commitWork(wipRoot.child); // 提交根节点的子节点
  wipRoot = null; // 清空根节点
  console.log("commitRoot finished");
}

/**
 * commitWork 函数
 * 递归提交Fiber节点的DOM更新
 * @param {Object} fiber - 当前的Fiber节点
 */
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom; // 获取父DOM节点
  if (fiber.dom) {
    domParent.appendChild(fiber.dom); // 将当前DOM节点添加到父节点
  }

  commitWork(fiber.child); // 递归提交子节点
  commitWork(fiber.sibling); // 递归提交兄弟节点
}

/**
 * createDom 函数
 * 根据Fiber节点创建对应的DOM节点
 * @param {Object} fiber - 当前的Fiber节点
 * @returns {HTMLElement|Text} - 创建的DOM节点
 */
function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("") // 创建文本节点
      : document.createElement(fiber.type); // 创建元素节点

  // 设置DOM属性
  Object.keys(fiber.props)
    .filter((key) => key !== "children") // 过滤掉children属性
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

// 启动Fiber树的构建循环
requestIdleCallback(workLoop);

export default render;
