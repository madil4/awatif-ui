import * as THREE from "three";
import { ProcessedAssignments, Node } from "../types";

export class Supports extends THREE.Group {
  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshBasicMaterial;

  constructor(private gridSize: number) {
    super();

    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    this.material = new THREE.MeshBasicMaterial({ color: "red" });
  }

  update(supports: ProcessedAssignments["supports"], nodes: Node[]) {
    this.clear();

    supports.forEach((_, index) => {
      const sphere = new THREE.Mesh(this.geometry, this.material);

      sphere.position.set(...nodes[index]);

      const scale = 0.04 * this.gridSize;
      sphere.scale.set(scale, scale, scale);

      this.add(sphere);
    });
  }
}
