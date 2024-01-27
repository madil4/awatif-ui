import * as THREE from "three";
import van from "vanjs-core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ModelState, SettingsState } from "./types";
import { Nodes } from "./objects/Nodes";
import { Elements } from "./objects/Elements";
import { Grid } from "./objects/Grid";
import { Supports } from "./objects/Supports";
import { Loads } from "./objects/Loads";
import { NodesIndexes } from "./objects/NodesIndexes";
import { ElementsIndexes } from "./objects/ElementsIndexes";
import { Axes } from "./objects/Axes";

export function Viewer(model: ModelState, settings: SettingsState) {
  // init
  THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  const grid = new Grid();
  const axes = new Axes();
  const nodes = new Nodes();
  const elements = new Elements();
  const supports = new Supports();
  const loads = new Loads();
  const nodesIndexes = new NodesIndexes();
  const elementsIndexes = new ElementsIndexes();

  // update
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  camera.position.set(0, -25, 10);
  controls.update();

  scene.add(
    grid,
    axes,
    nodes,
    elements,
    supports,
    loads,
    nodesIndexes,
    elementsIndexes
  );

  renderer.render(scene, camera);

  nodes.visible = settings.val.nodes;
  elements.visible = settings.val.elements;
  supports.visible = settings.val.supports;
  loads.visible = settings.val.loads;
  nodesIndexes.visible = settings.val.nodesIndexes;
  elementsIndexes.visible = settings.val.elementsIndexes;

  // on windows resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });

  // on controls change
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });

  // on model change
  van.derive(() => {
    // since the model is updated as a whole at each parameter change
    // there is no point in updating the sub-components separately
    if (settings.val.nodes) nodes.update(model.nodes.val);
    if (settings.val.elements)
      elements.update(model.nodes.val, model.elements.val);
    if (settings.val.supports)
      supports.update(model.assignments.val.supports, model.nodes.val);
    if (settings.val.loads)
      loads.update(model.assignments.val.loads, model.nodes.val);
    if (settings.val.nodesIndexes) nodesIndexes.update(model.nodes.val);
    if (settings.val.elementsIndexes)
      elementsIndexes.update(model.elements.val, model.nodes.val);

    renderer.render(scene, camera);
  });

  // on settings change
  van.derive(() => {
    nodes.visible = settings.val.nodes;
    elements.visible = settings.val.elements;
    supports.visible = settings.val.supports;
    loads.visible = settings.val.loads;
    nodesIndexes.visible = settings.val.nodesIndexes;
    elementsIndexes.visible = settings.val.elementsIndexes;

    renderer.render(scene, camera);
  });
}
