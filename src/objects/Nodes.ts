import * as THREE from "three";
import { Node } from "../types";

export class Nodes extends THREE.Points<
  THREE.BufferGeometry,
  THREE.PointsMaterial
> {
  constructor(private gridSize: number) {
    super(new THREE.BufferGeometry(), new THREE.PointsMaterial());

    this.frustumCulled = false;
    this.material.size = 0.04 * this.gridSize;
  }

  update(nodes: Node[]) {
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodes.flat(), 3)
    );
  }
}
