import { app } from "../../src/App";
import { Assignment, Element, Node } from "../../src/App.types";

function onParameterChange() {
  const nodes: Node[] = [
    [8, 12.5, 0],
    [15, 12.5, 0],
    [8, 12.5, 8],
  ];
  const elements: Element[] = [
    [0, 1],
    [1, 2],
  ];
  const assignments: Assignment[] = [
    {
      node: 0,
      support: [true, true, true],
    },
    {
      node: 2,
      support: [true, true, true],
    },
    {
      node: 1,
      load: [0, 0, -10],
    },
    {
      element: 0,
      area: 1.2,
      elasticity: 200,
    },
    {
      element: 1,
      area: 1.2,
      elasticity: 200,
    },
  ];

  return { nodes, elements, assignments };
}

app({ onParameterChange });
