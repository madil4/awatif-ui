import * as THREE from "three";
import { Text } from "./Text";

export class Axes extends THREE.Group {
  constructor(private gridSize: number) {
    super();

    // init
    const size = 0.07 * this.gridSize;
    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1.5,
      0x666666,
      0.3,
      0.3
    );
    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      1.5,
      0x666666,
      0.3,
      0.3
    );
    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      1.5,
      0x666666,
      0.3,
      0.3
    );
    const xText = new Text("X", 0.5 * size, "red", "transparent");
    const yText = new Text("Y", 0.5 * size, "green", "transparent");
    const zText = new Text("Z", 0.5 * size, "blue", "transparent");

    // update
    this.add(xArrow, yArrow, zArrow, xText, yText, zText);

    const textOffset = 1.8 * size;
    xText.position.set(textOffset, 0, 0);
    yText.position.set(0, textOffset, 0);
    zText.position.set(0, 0, textOffset);

    xArrow.scale.set(size, size, size);
    yArrow.scale.set(size, size, size);
    zArrow.scale.set(size, size, size);
  }
}
