import * as THREE from "three";

export function Grid() {
  const grid = new THREE.GridHelper(20, 20, 0x404040, 0x404040);

  return grid;
}
