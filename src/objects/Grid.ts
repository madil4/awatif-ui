import * as THREE from "three";

export class Grid extends THREE.GridHelper {
  constructor(gridSize: number) {
    super(gridSize, 20, 0x404040, 0x404040);

    this.position.set(0.5 * gridSize, 0.5 * gridSize, 0);
    this.rotateX(Math.PI / 2);
    this.material.depthWrite = false;
  }
}
