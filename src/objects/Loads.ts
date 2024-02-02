import * as THREE from "three";
import { ProcessedAssignments, Node } from "../types";

export class Loads extends THREE.Group {
  constructor(private gridSize: number) {
    super();
  }

  update(Loads: ProcessedAssignments["loads"], nodes: Node[]) {
    this.children.forEach((o) => (o as THREE.ArrowHelper).dispose());
    this.clear();

    Loads.forEach((load, index) => {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(...load).normalize(),
        new THREE.Vector3(...nodes[index]),
        1,
        0xe6b800,
        0.3,
        0.3
      );

      const scale = 0.07 * this.gridSize;
      arrow.scale.set(scale, scale, scale);

      this.add(arrow);
    });
  }
}
