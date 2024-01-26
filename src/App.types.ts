import { State } from "vanjs-core";

export type App = {
  model?: Model;
  onParameterChange?: (p: Parameters) => Model;
  parameters?: Parameters;
  settings?: Settings;
};

export type Parameters = Record<
  string,
  {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
  }
>;

export type Settings = {
  gridSize?: number;
  displayScale?: number;
  nodes?: boolean;
  elements?: boolean;
  nodesIndices?: boolean;
  elementsIndices?: boolean;
  supports?: boolean;
  loads?: boolean;
  deformedShape?: boolean;
  elementResults?: string;
  nodeResults?: string;
};

export type SettingsState = State<Required<Settings>>;

// model
export type Model = {
  nodes?: Node[];
  elements?: Element[];
  assignments?: Assignment[];
  analysisResults?: AnalysisResults;
};

export type ModelState = {
  nodes: State<Node[]>;
  elements: State<Element[]>;
};

export type Node = [number, number, number];
export type Element = [number, number];

// assignments
export type Assignment =
  | SupportAssignment
  | LoadAssignment
  | PropertyAssignment
  | DistributedLoadAssignment;

type SupportAssignment = {
  node: number;
  support:
    | [boolean, boolean, boolean]
    | [boolean, boolean, boolean, boolean, boolean, boolean];
};
type LoadAssignment = {
  node: number;
  load:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
type PropertyAssignment = {
  element: number;
  elasticity: number;
  shearModulus?: number;
  area?: number;
  momentOfInertiaZ?: number;
  momentOfInertiaY?: number;
  torsionalConstant?: number;
};
type DistributedLoadAssignment = {
  element: number;
  distributedLoad: [number, number];
};

// results
export type AnalysisResults = Record<
  string,
  (DeformationResult | ReactionResult | ElementResult)[]
>;
type DeformationResult = {
  node: number;
  deformation:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
type ReactionResult = {
  node: number;
  reaction:
    | [number, number, number]
    | [number, number, number, number, number, number];
};
type ElementResult = {
  element: number;
  normal?: [number, number];
  shearY?: [number, number];
  shearZ?: [number, number];
  torsion?: [number, number];
  bendingY?: [number, number];
  bendingZ?: [number, number];
};
