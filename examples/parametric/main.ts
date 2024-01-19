import { app } from "../../src/App";
import { Model, Parameters } from "../../src/App.types";

const parameters: Parameters = {
  length: { value: 5 },
  height: { value: 5 },
};

function onParameterChange(parameters: Parameters) {
  const model: Model = {
    nodes: [
      [0, 0, 0],
      [parameters.length.value, 0, 0],
      [0, parameters.height.value, 0],
    ],
    elements: [
      [0, 1],
      [0, 2],
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

app({ onParameterChange, parameters });
