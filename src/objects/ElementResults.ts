import * as THREE from "three";
import van from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";
import { getTransformationMatrix } from "../utils/getTransformationMatrix";
import { Text } from "./Text";

export function ElementResults(
  model: ModelState,
  settings: SettingsState
): THREE.Group {
  // init
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val;

  // on settings.elementResults, model.elements, and model.nodes update
  van.derive(() => {
    group.visible = settings.elementResults.val != "none";

    if (settings.elementResults.val == "none") return;

    group.children.forEach((c) => (c as THREE.Mesh).geometry.dispose());
    group.clear();

    model.analysisResults.val["normals"].forEach((result, index) => {
      const element = model.elements.val[index];
      const node1 = new THREE.Vector3(...model.nodes.val[element[0]]);
      const node2 = new THREE.Vector3(...model.nodes.val[element[1]]);
      const length = node2.distanceTo(node1);
      const resultMax = Math.max(
        ...[...model.analysisResults.val["normals"].values()].map((v) =>
          Math.abs(v?.[0] ?? 0)
        )
      );
      const resultValue = result?.[0] ?? 0;
      const resultNormalized = (resultValue / resultMax) * size;

      const shape = new THREE.Shape()
        .moveTo(0, 0)
        .lineTo(0, resultNormalized)
        .lineTo(length, resultNormalized)
        .lineTo(length, 0)
        .lineTo(0, 0);

      // mesh
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: resultValue > 0 ? 0x005f73 : 0xae2012,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(...node1.toArray());
      const rotation = getTransformationMatrix(
        node1.toArray(),
        node2.toArray()
      );
      mesh.rotation.setFromRotationMatrix(rotation);
      mesh.rotateX(Math.PI / 2);

      group.add(mesh);

      // lines
      const points = shape.getPoints();
      const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
      const lines = new THREE.Line(
        geometryPoints,
        new THREE.LineBasicMaterial({ color: "white" })
      );
      lines.material.depthTest = false; // don't know why but is solves the rendering order issue
      lines.position.set(...node1.toArray());
      lines.rotation.setFromRotationMatrix(rotation);
      lines.rotateX(Math.PI / 2);

      group.add(lines);

      // text
      const text = new Text(`${roundTo5(resultValue)}`);

      text.position.set(
        ...computeCenter(
          model.nodes.val[element[0]],
          model.nodes.val[element[1]]
        )
      );
      text.updateScale(size * 0.6);

      group.add(text);
    });
  });

  return group;
}

function computeCenter(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (v + point2[i]) * 0.5) as Node;
}

function roundTo5(number: number): number {
  return Math.round(number * 10000) / 10000;
}
