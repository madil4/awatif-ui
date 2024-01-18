import { app } from "../../src/App";
import { Model } from "../../src/App.types";

function onParameterChange() {
  const model: Model = {
    nodes: [
      [8, 12.5, 0],
      [15, 12.5, 0],
      [8, 12.5, 8],
    ],
    elements: [
      [0, 1],
      [1, 2],
    ],
    assignments: [
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
    ],
  };

  return model;
}

app({ onParameterChange });
