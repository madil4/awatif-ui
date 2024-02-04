import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState, Node } from "../types";
import { Text } from "./Text";

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
    model.elements.val.forEach((element, index) => {
      const text = new Text(`${index}`, undefined, "#001219");

      text.position.set(
        ...computeCenter(
          model.nodes.val[element[0]],
          model.nodes.val[element[1]]
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

function computeCenter(point1: Node, point2: Node): Node {
  return point1?.map((v, i) => (v + point2[i]) * 0.5) as Node;
}
