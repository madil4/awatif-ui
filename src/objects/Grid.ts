import * as THREE from "three";

export class Grid extends THREE.GridHelper {
  constructor() {
    super(20, 20, 0x404040, 0x404040);

    this.rotateX(Math.PI / 2);
    this.material.depthWrite = false;
  }
}
