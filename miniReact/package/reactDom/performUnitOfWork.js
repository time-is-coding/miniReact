import { reconcileChildren } from "./render";
import { createDom } from "./createDom";

/**
 * performUnitOfWork 函数
 * 执行当前Fiber节点的工作，并返回下一个工作单元
 * @param {Object} fiber - 当前的Fiber节点
 * @returns {Object|null} - 下一个需要处理的Fiber节点
 */
export function performUnitOfWork(fiber) {
  // 1. 创建当前Fiber节点对应的DOM节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. 为当前Fiber节点的子元素创建Fiber节点
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

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
