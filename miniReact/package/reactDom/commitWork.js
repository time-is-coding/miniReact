import { updateDom } from "./updateDom";
import { commitDeletion } from "./commitDeletion";
/**
 * commitWork 函数
 * 递归提交Fiber节点的DOM更新
 * @param {Object} fiber - 当前的Fiber节点
 */
export function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // 函数组件本身没有dom属性，需要向上寻找
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.dom; // 获取父DOM节点
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  }

  if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
    return;
  }

  commitWork(fiber.child); // 递归提交子节点
  commitWork(fiber.sibling); // 递归提交兄弟节点
}
