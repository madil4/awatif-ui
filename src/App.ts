import van from "vanjs-core";
import { Model, Node } from "./App.types";
import { Viewer } from "./Viewer";

type AppType = {
  model?: Model;
  onParameterChange?: () => Model;
  parameters?: any;
  settings?: any;
};

function App({ model: modelDirect, onParameterChange }: AppType) {
  const modelOnChange = onParameterChange?.();

  const model = {
    nodes: van.state<Node[]>(modelDirect?.nodes ?? modelOnChange?.nodes ?? []),
  };

  // simulated user change
  setTimeout(() => {
    model.nodes.val = [...model.nodes.val.slice(0, 1), [0, 0, 0]];
  }, 500);

  // simulated user change
  setTimeout(() => {
    model.nodes.val = [...model.nodes.val.slice(0, 1), [0, 0, 5]];
  }, 1000);

  Viewer(model);
}

export const app = App;
