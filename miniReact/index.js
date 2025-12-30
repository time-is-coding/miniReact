import React from "./package/react";
import ReactDom from "./package/reactDom";
const rootDOM = document.getElementById("root");
const childrenElements = [
  React.createElement("li", { key: "A" }, "A"),
  React.createElement("li", { key: "B" }, "B"),
  React.createElement("li", { key: "C" }, "C"),
];
// const elementList = Array.from({ length: 30000 }, (_, i) => {
//   const key = `Item-${i}`;
//   return React.createElement("li", { key }, key);
// });
const element = React.createElement("h1", null, ...childrenElements);
ReactDom.render(element, rootDOM);
