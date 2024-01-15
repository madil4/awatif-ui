import { Node } from "./App.types";
import { Viewer } from "./Viewer";
import { Grid } from "./objects/Grid";
import { Nodes } from "./objects/Nodes";

function App(nodes: Node[]) {
  Viewer(Grid(), Nodes(nodes));
}

export const app = App;
