import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";

export function Loads(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const gridSize = settings.gridSize.val;

  let displayScaleCache = displayScale.val;

  // on settings.loads, model.assignment, and model.nodes update: replace arrows
  van.derive(() => {
    group.visible = settings.loads.val;

    if (!settings.loads.val) return;

    group.children.forEach((o) => (o as THREE.ArrowHelper).dispose());
    group.clear();
    model.assignments.val.loads.forEach((load, index) => {
      const arrow = new THREE.ArrowHelper(
        new THREE.Vector3(...load).normalize(),
        new THREE.Vector3(...model.nodes.val[index]),
        1,
        0xe6b800,
        0.3,
        0.3
      );

      const scale = 0.07 * gridSize * displayScaleCache;
      arrow.scale.set(scale, scale, scale);

      group.add(arrow);
    });
  });

  // on settings.loads and setting.displayScale change: change scale
  van.derive(() => {
    if (!settings.loads.val) return;

    const scale = 0.07 * gridSize * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
