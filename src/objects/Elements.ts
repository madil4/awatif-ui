import * as THREE from "three";
import van from "vanjs-core";
import { ModelState, SettingsState } from "../types";

export function Elements(
  model: ModelState,
  settings: SettingsState
): THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> {
  const lines = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );

  lines.frustumCulled = false;

  // on settings.elements, model.elements, and model.nodes update
  van.derive(() => {
    lines.visible = settings.elements.val;

    if (!settings.elements.val) return;

    const buffer = model.elements.val
      .map((e) => [...model.nodes.val[e[0]], ...model.nodes.val[e[1]]])
      .flat();

    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buffer, 3)
    );
  });

  return lines;
}
