import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";

export function Supports(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const gridSize = settings.gridSize.val;

  let displayScaleCache = displayScale.val;

  // on settings.support, model.assignment, and model.nodes update
  van.derive(() => {
    group.visible = settings.supports.val;

    if (!settings.supports.val) return;

    group.clear();
    model.assignments.val.supports.forEach((_, index) => {
      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.set(...model.nodes.val[index]);
      const scale = 0.04 * gridSize * displayScaleCache;
      sphere.scale.set(scale, scale, scale);

      group.add(sphere);
    });
  });

  // on settings.support and setting.displayScale change
  van.derive(() => {
    if (!settings.supports.val) return;

    const scale = 0.04 * gridSize * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
