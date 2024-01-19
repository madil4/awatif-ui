import van from "vanjs-core";
import { Element, Model, ModelState, Node } from "./App.types";
import { Viewer } from "./Viewer";

type AppType = {
  model?: Model;
  onParameterChange?: () => Model;
  parameters?: any;
  settings?: any;
};

function App({ model: modelDirect, onParameterChange }: AppType) {
  const modelOnChange = onParameterChange?.();

  const model: ModelState = {
    nodes: van.state<Node[]>(modelDirect?.nodes ?? modelOnChange?.nodes ?? []),
    elements: van.state<Element[]>(
      modelDirect?.elements ?? modelOnChange?.elements ?? []
    ),
  };

  // simulated user change
  setTimeout(() => {
    model.nodes.val = [...model.nodes.val.slice(0, 2), [0, 0, 3]];
  }, 500);

  // simulated user change
  setTimeout(() => {
    model.nodes.val = [...model.nodes.val, [0, 0, 6]];
    model.elements.val = [...model.elements.val, [2, 3]];
  }, 1000);

  Viewer(model);
}

export const app = App;
