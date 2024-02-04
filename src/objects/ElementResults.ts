import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { getTransformationMatrix } from "../utils/getTransformationMatrix";
import { ConstantResult } from "./resultsObjects/ConstantResult";
import { IResultObject } from "./resultsObjects/IResultObject";

export function ElementResults(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const size = 0.05 * settings.gridSize.val;

  let displayScaleCache = displayScale.val;

  // on settings.elementResults, model.elements, and model.nodes update
  van.derive(() => {
    group.visible = settings.elementResults.val != "none";

    if (settings.elementResults.val == "none") return;

    group.children.forEach((c) => (c as IResultObject).dispose());
    group.clear();

    model.val.analysisResults["normals"].forEach((result, index) => {
      const element = model.val.elements[index];
      const node1 = model.val.nodes[element[0]];
      const node2 = model.val.nodes[element[1]];
      const length = new THREE.Vector3(...node2).distanceTo(
        new THREE.Vector3(...node1)
      );
      const maxResult = Math.max(
        ...[...model.val.analysisResults["normals"].values()]
          .flat()
          .map((n) => Math.abs(n ?? 0))
      );
      const normalizedResult = result?.map((n) => n / maxResult);
      const rotation = getTransformationMatrix(node1, node2);
      const resultObject = new ConstantResult(
        node1,
        node2,
        length,
        rotation,
        result ?? [0, 0],
        normalizedResult ?? [0, 0]
      );

      resultObject.updateScale(size * displayScaleCache);

      group.add(resultObject);
    });
  });

  // on settings.support and setting.displayScale change
  van.derive(() => {
    if (settings.elementResults.val == "none") return;

    group.children.forEach((c) =>
      (c as IResultObject).updateScale(size * displayScale.val)
    );

    displayScaleCache = displayScale.val;
  });

  return group;
}
