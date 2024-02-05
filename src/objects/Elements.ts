import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";

export function Elements(
  nodes: State<Node[]>,
  model: ModelState,
  settings: SettingsState
): THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );

  lines.frustumCulled = false;
  lines.material.depthTest = false; // don't know why but is solves the rendering order issue

  // on settings.elements, model.elements, and model.nodes update
  van.derive(() => {
    lines.visible = settings.elements.val;

    if (!settings.elements.val) return;

    const buffer = model.val.elements
      .map((e) => [...nodes.val[e[0]], ...nodes.val[e[1]]])
      .flat();

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
  });

  return lines;
}
