import van from "vanjs-core";

const { div } = van.tags;

export function app(nodes: any, elements: any, assignments: any) {
  van.add(document.body, div(nodes, elements, assignments));
}
