import * as THREE from "three";
import { Element, Node } from "../types";

export class Elements extends THREE.Line<
  THREE.BufferGeometry,
  THREE.LineBasicMaterial
> {
  constructor() {
    super(new THREE.BufferGeometry(), new THREE.LineBasicMaterial());

    this.frustumCulled = false;
  }

  update(nodes: Node[], elements: Element[]) {
    const buffer = elements.map((e) => [...nodes[e[0]], ...nodes[e[1]]]).flat();

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
  }
}
