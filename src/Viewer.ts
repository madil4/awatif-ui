import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import van from "vanjs-core";
import { ModelState, SettingsState } from "./App.types";
import { Nodes } from "./objects/Nodes";
import { Elements } from "./objects/Elements";
import { Grid } from "./objects/Grid";
import { Supports } from "./objects/Supports";

export function Viewer(model: ModelState, settings: SettingsState) {
  // init
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
  const nodes = new Nodes();
  const elements = new Elements();
  const supports = new Supports();

  // update
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  camera.position.set(20, 20, 20);
  controls.target.set(0, 0, 0);
  controls.update();

  scene.add(grid, nodes, elements, supports);

  renderer.render(scene, camera);

  nodes.visible = settings.val.nodes;
  elements.visible = settings.val.elements;
  supports.visible = settings.val.supports;

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
    nodes.update(model.nodes.val);
    elements.update(model.nodes.val, model.elements.val);
    supports.update(model.assignments.val.supports, model.nodes.val);

    renderer.render(scene, camera);
  });

  // on settings change
  van.derive(() => {
    nodes.visible = settings.val.nodes;
    elements.visible = settings.val.elements;
    supports.visible = settings.val.supports;

    renderer.render(scene, camera);
  });
}
