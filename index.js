import React from "./package/react";
import ReactDom from "./package/reactDom";
const rootDOM = document.getElementById("root");

function MyComponent(props) {
  const [count, setCount] = ReactDom.useState(0);
  const [count2, setCount2] = ReactDom.useState(0);

  const handleClick_1 = () => {
    setCount((c) => c + 1);
    console.log("handleClick_1 clicked:", count);
  };

  ReactDom.useEffect(() => {
    const timer = setTimeout(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick_2 = () => {
    setCount2((c) => c + 1);
    console.log("handleClick_2 clicked:", count2);
  };

  return React.createElement(
    "div",
    null,
    React.createElement("button", { onClick: handleClick_1 }, `Count, ${count}`),
    React.createElement("button", { onClick: handleClick_2 }, `Count2: ${count2}`),
    `hellow,${props.name}`
  );
}

// jsx语法实际上就是编译后调用createElement得到虚拟dom
const childrenElements = [
  React.createElement("li", { key: "A" }, "A"),
  React.createElement("li", { key: "B" }, "B"),
  React.createElement("li", { key: "C" }, "C"),
];
// const elementList = Array.from({ length: 30000 }, (_, i) => {
//   const key = `Item-${i}`;
//   return React.createElement("li", { key }, key);
// });
const element_0 = React.createElement("h1", null, ...childrenElements);
const element_1 = React.createElement(
  "h5",
  null,
  ...[
    ...childrenElements,
    ...[React.createElement("li", { key: "D" }, "D"), React.createElement("li", { key: "E" }, "E")],
  ]
);
const element_2 = React.createElement(
  "h3",
  null,
  ...[...childrenElements.slice(0, 2), React.createElement(MyComponent, { name: "World" })]
);
const renderArray = [element_0, element_1, element_2];

let renderCount = 0;
// 每隔2秒钟切换一次内容，用作fiber的观察和测试
// const timer = setInterval(() => {
//   if (renderCount > 2) {
//     clearInterval(timer);
//     return;
//   }
//   ReactDom.render(renderArray[renderCount], rootDOM);
//   renderCount++;
// }, 1000);

const element = React.createElement(MyComponent, { name: "World" });
ReactDom.render(element, rootDOM);
