import { commitWork } from "./commitWork";
import { performUnitOfWork } from "./performUnitOfWork";

// 全局变量
// nextUnitOfWork: 下一个需要处理的工作单元（Fiber节点）
let nextUnitOfWork = null;
// wipRoot: 当前正在构建的Fiber树的根节点
let wipRoot = null;
//  currentRoot: 上一次提交到DOM的Fiber树的根节点
let currentRoot = null;
let deletions = null;

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
    alternate: currentRoot, // 保存上一次的Fiber树，用于比较
  };
  console.log("wipRoot:", wipRoot);
  deletions = [];
  nextUnitOfWork = wipRoot; // 设置下一个工作单元为根节点
}

/**
 * commitRoot 函数
 * 提交Fiber树的更新到DOM
 */
export function commitRoot() {
  // 优先进行删除操作
  deletions.forEach(commitWork);
  commitWork(wipRoot.child); // 提交根节点的子节点
  currentRoot = wipRoot; // 更新当前根节点
  wipRoot = null; // 清空根节点
  console.log("commitRoot finished");
}

export function reconcileChildren(wipFiber, elements) {
  // TODO 调和变更
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  // TODO 思考：为什么不能用 oldFiber !== null
  // oldFiber一直为undefined，会造成死循环
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    // 更新
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    // 重新创建
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    // 删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    // 同时遍历旧fiber树
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 父fiber的child指向第一个子fiber
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      /* 当oldFiber != null时，需要判断element存在才设置sibling */
      // 如果存在兄弟节点，通过sibling关联
      prevSibling.sibling = newFiber;
    }

    // 暂存上一个兄弟节点
    prevSibling = newFiber;
    index++;
  }
}

/**
 * workLoop 函数
 * 浏览器空闲时执行的主循环，用于协调Fiber树的构建
 * @param {IdleDeadline} deadline - 浏览器提供的空闲时间对象
 */
export function workLoop(deadline) {
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

// 启动Fiber树的构建循环
requestIdleCallback(workLoop);

export default render;
