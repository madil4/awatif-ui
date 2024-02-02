import * as THREE from "three";
import { Node } from "../types";
import { Text } from "./Text";

export class NodesIndexes extends THREE.Group {
  constructor(private girdSize: number) {
    super();
  }

  update(nodes: Node[]) {
    this.children.forEach((o) => (o as Text).dispose());
    this.clear();

    nodes.forEach((node, index) => {
      const text = new Text(`${index}`, 0.05 * this.girdSize);

      text.position.set(...node);

      this.add(text);
    });
  }
}
