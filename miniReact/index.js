import React from "./package/react";
import ReactDom from "./package/reactDom";
const rootDOM = document.getElementById("root");
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
const element_1 = React.createElement("h5", null, ...childrenElements);
const element_2 = React.createElement("h3", null, ...childrenElements);
const renderArray = [element_0, element_1, element_2];

let renderCount = 0;
// 每隔2秒钟切换一次内容，用作fiber的观察和测试
const timer = setInterval(() => {
  if (renderCount > 2) {
    clearInterval(timer);
    return;
  }
  ReactDom.render(renderArray[renderCount], rootDOM);
  renderCount++;
}, 1000);
