export function commitDeletion(fiber, domParent) {
  // 找不到dom，继续向下寻找
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}
