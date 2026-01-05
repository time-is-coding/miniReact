import { updateDom } from "./updateDom";
/**
 * commitWork 函数
 * 递归提交Fiber节点的DOM更新
 * @param {Object} fiber - 当前的Fiber节点
 */
export function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom; // 获取父DOM节点
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  }

  if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
    return;
  }

  commitWork(fiber.child); // 递归提交子节点
  commitWork(fiber.sibling); // 递归提交兄弟节点
}
