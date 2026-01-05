import { updateDom } from "./updateDom";

/**
 * createDom 函数
 * 根据Fiber节点创建对应的DOM节点
 * @param {Object} fiber - 当前的Fiber节点
 * @returns {HTMLElement|Text} - 创建的DOM节点
 */
export function createDom(fiber) {
  const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}
