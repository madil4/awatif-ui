import * as THREE from "three";
import { Text } from "./Text";

export class Axes extends THREE.Group {
  constructor() {
    super();

    // init
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
    const xText = new Text("X", 0.5, "red", "transparent");
    const yText = new Text("Y", 0.5, "green", "transparent");
    const zText = new Text("Z", 0.5, "blue", "transparent");

    // update
    this.add(xArrow, yArrow, zArrow, xText, yText, zText);

    xText.position.set(1.8, 0, 0);
    yText.position.set(0, 1.8, 0);
    zText.position.set(0, 0, 1.8);

    this.position.set(-10, -10, 0);
  }
}
