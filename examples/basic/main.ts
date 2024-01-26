import { app } from "../../src/App";
import { Model } from "../../src/types";

const model: Model = {
  nodes: [
    [0, 0, 0],
    [0, 10, 0],
    [10, 10, 0],
    [10, 0, 0],
  ],
  elements: [
    [0, 1],
    [1, 2],
    [2, 3],
  ],
  assignments: [
    { node: 0, support: [true, true, true] },
    { node: 3, support: [true, true, true] },
    { node: 2, load: [10, 0, 0] },
    { element: 0, area: 1.2, elasticity: 200 },
    { element: 1, area: 1.2, elasticity: 200 },
  ],
};

app({ model });
