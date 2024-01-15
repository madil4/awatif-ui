import * as THREE from "three";
import { Node } from "../App.types";

export function Nodes(nodes: Node[]) {
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial()
  );

  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes.flat(), 3)
  );

  return points;
}
