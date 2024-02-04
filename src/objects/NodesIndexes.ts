import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { Text } from "./Text";

export function NodesIndexes(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val * 0.6;

  let displayScaleCache = displayScale.val;

  // on settings.nodesIndexes, and model.nodes update: replace texts
  van.derive(() => {
    group.visible = settings.nodesIndexes.val;

    if (!settings.nodesIndexes.val) return;

    group.children.forEach((c) => (c as Text).dispose());
    group.clear();
    model.val.nodes.forEach((node, index) => {
      const text = new Text(`${index}`);

      text.position.set(...node);
      text.updateScale(size * displayScaleCache);

      group.add(text);
    });
  });

  // on settings.nodesIndexes and setting.displayScale change
  van.derive(() => {
    if (!settings.nodesIndexes.val) return;

    group.children.forEach((c) =>
      (c as Text).updateScale(size * displayScale.val)
    );

    displayScaleCache = displayScale.val;
  });

  return group;
}
