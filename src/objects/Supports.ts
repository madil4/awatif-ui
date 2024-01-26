import * as THREE from "three";
import { ProcessedAssignments, Node } from "../App.types";

export class Supports extends THREE.Group {
  private geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  private material = new THREE.MeshBasicMaterial({ color: "red" });

  constructor() {
    super();
  }

  update(supports: ProcessedAssignments["supports"], nodes: Node[]) {
    this.clear();

    supports.forEach((_, index) => {
      const sphere = new THREE.Mesh(this.geometry, this.material);

      sphere.position.set(...nodes[index]);

      this.add(sphere);
    });
  }
}
