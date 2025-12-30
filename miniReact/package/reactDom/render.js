let nextUnitOfWork = null;
let wipRoot = null;

export function render(element, container) {
  // 初始化 Fiber 树
  wipRoot = {
    dom: container,
    props: { children: [element] },
    alternate: null, // 用于保存上一次的 Fiber 树
  };
  nextUnitOfWork = wipRoot;
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 如果时间不足，暂停工作
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // 提交更新
  }

  requestIdleCallback(workLoop); // 继续下一次工作
}

function performUnitOfWork(fiber) {
  // 1. 创建 DOM 节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 2. 为子节点创建 Fiber
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
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

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  if (fiber.dom) {
    domParent.appendChild(fiber.dom);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(fiber) {
  const dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

requestIdleCallback(workLoop);

export default render;
