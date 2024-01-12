import { app } from "../../src/main";

const nodes = [
  [8, 12.5, 0],
  [15, 12.5, 0],
  [8, 12.5, 8],
];
const elements = [
  [0, 1],
  [1, 2],
];
const assignments = [
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

app(nodes, elements, assignments);
