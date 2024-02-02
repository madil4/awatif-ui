import * as THREE from "three";
import { Node, Element } from "../types";
import { Text } from "./Text";

export class ElementsIndexes extends THREE.Group {
  constructor(private gridSize: number) {
    super();
  }

  update(elements: Element[], nodes: Node[]) {
    this.children.forEach((o) => (o as Text).dispose());
    this.clear();

    elements.forEach((element, index) => {
      const text = new Text(`${index}`, 0.05 * this.gridSize);

      text.position.set(...computeCenter(nodes[element[0]], nodes[element[1]]));

      this.add(text);
    });
  }
}

function computeCenter(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (v + point2[i]) * 0.5) as Node;
}
