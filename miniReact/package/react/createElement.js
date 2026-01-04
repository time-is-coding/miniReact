export const createElement = (type, props, ...children) => {
  const element = {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === "object" ? child : createTextElement(child))),
    },
  };
  console.log("createElement:", element);
  return element;
};

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
