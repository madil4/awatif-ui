import van from "vanjs-core";
import { Node } from "./App.types";
import { Viewer } from "./Viewer";

type AppType = {
  nodes?: Node[];
  onParameterChange?: () => { nodes: Node[] };
};

function App({ onParameterChange, nodes }: AppType) {
  const model = {
    nodes: van.state<Node[]>([]),
  };

  if (!nodes && onParameterChange) {
    let { nodes: nodes2 } = onParameterChange();
    nodes = nodes2;
  }

  model.nodes.val = nodes || [];

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
