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
    2 * 1e6 // supported view till 1e6
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  const gridSize = settings.gridSize.val;
  const displayScale = van.derive(() =>
    settings.displayScale.val === 0
      ? 1
      : settings.displayScale.val > 0
      ? settings.displayScale.val
      : -1 / settings.displayScale.val
  );

  // update
  scene.add(
    Grid(gridSize),
    Axes(gridSize),
    Nodes(model, settings, displayScale),
    Elements(model, settings),
    NodesIndexes(model, settings, displayScale),
    ElementsIndexes(model, settings, displayScale),
    Supports(model, settings, displayScale),
    Loads(model, settings, displayScale)
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  const z2fit = gridSize * 0.5 + (gridSize * 0.5) / Math.tan(45 * 0.5);
  camera.position.set(0.5 * gridSize, 0.8 * -z2fit, 0.5 * gridSize);
  controls.target.set(0.5 * gridSize, 0.5 * gridSize, 0);
  controls.minDistance = 1;
  controls.maxDistance = z2fit * 1.5;
  controls.zoomSpeed = 20;
  controls.update();

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

  // on settings or model change: render
  van.derive(() => {
    model.nodes.val;
    model.elements.val;
    model.assignments.val;

    settings.displayScale.val;
    settings.nodes.val;
    settings.elements.val;
    settings.nodesIndexes.val;
    settings.elementsIndexes.val;
    settings.supports.val;
    settings.loads.val;
    settings.elementResults.val;

    renderer.render(scene, camera);
  });
}
