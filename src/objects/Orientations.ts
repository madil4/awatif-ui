import * as THREE from "three";
import van, { State } from "vanjs-core";
import { ModelState, SettingsState } from "../types";
import { getTransformationMatrix } from "../utils/getTransformationMatrix";
import { compute5thFromFirstPoint } from "../utils/compute5thFromFirstPoint";

export function Orientations(
  model: ModelState,
  settings: SettingsState,
  displayScale: State<number>
): THREE.Group {
  // init
  const group = new THREE.Group();
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  const size = 0.05 * settings.gridSize.val * 0.75;

  let displayScaleCache = displayScale.val;

  // update
  const o = [0, 0, 0];
  const x = [1, 0, 0];
  const y = [0, 1, 0];
  const z = [0, 0, 1];
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([...o, ...x, ...o, ...y, ...o, ...z], 3)
  );

  const xColor = [255, 0, 0];
  const yColor = [0, 255, 0];
  const zColor = [0, 0, 255];
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(
      [...xColor, ...xColor, ...yColor, ...yColor, ...zColor, ...zColor],
      3
    )
  );

  // on settings.orientations, model.elements, and model.nodes update
  van.derive(() => {
    group.visible = settings.orientations.val;

    if (!settings.orientations.val) return;

    group.clear();
    model.val.elements.forEach((element) => {
      const axes = new THREE.LineSegments(geometry, material);
      const node1 = model.val.nodes[element[0]];
      const node2 = model.val.nodes[element[1]];

      axes.position.set(...compute5thFromFirstPoint(node1, node2));
      axes.rotation.setFromRotationMatrix(
        getTransformationMatrix(node1, node2)
      );

      const scale = size * displayScaleCache;
      axes.scale.set(scale, scale, scale);

      group.add(axes);
    });
  });

  // on settings.orientations and setting.displayScale change
  van.derive(() => {
    if (!settings.orientations.val) return;

    const scale = size * displayScale.val;
    group.children.forEach((c) => c.scale.set(scale, scale, scale));

    displayScaleCache = displayScale.val;
  });

  return group;
}
