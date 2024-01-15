import * as THREE from "three";
import { Node } from "../App.types";

export class Points extends THREE.Points<
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
    this.geometry.getAttribute("position").needsUpdate = true;
  }
}
