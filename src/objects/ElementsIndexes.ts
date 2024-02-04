import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { Text } from "./Text";
import { computeCenter } from "../utils/computeCenter";

export function ElementsIndexes(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val * 0.6;

  let displayScaleCache = displayScale.val;

  // on settings.elementsIndexes, model.elements, and model.nodes update: replace texts
  van.derive(() => {
    group.visible = settings.elementsIndexes.val;

    if (!settings.elementsIndexes.val) return;

    group.children.forEach((c) => (c as Text).dispose());
    group.clear();
    model.val.elements.forEach((element, index) => {
      const text = new Text(`${index}`, undefined, "#001219");

      text.position.set(
        ...computeCenter(
          model.val.nodes[element[0]],
          model.val.nodes[element[1]]
        )
      );
      text.updateScale(size * displayScaleCache);

      group.add(text);
    });
  });

  // on settings.elementsIndexes and setting.displayScale change
  van.derive(() => {
    if (!settings.elementsIndexes.val) return;

    group.children.forEach((c) =>
      (c as Text).updateScale(size * displayScale.val)
    );

    displayScaleCache = displayScale.val;
  });

  return group;
}
