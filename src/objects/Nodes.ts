import * as THREE from "three";
import { Node } from "../App.types";

export class Nodes extends THREE.Points<
  THREE.BufferGeometry,
  THREE.PointsMaterial
> {
  constructor() {
    super(new THREE.BufferGeometry(), new THREE.PointsMaterial());
  }

  update(nodes: Node[]) {
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodes.flat(), 3)
    );
  }
}
