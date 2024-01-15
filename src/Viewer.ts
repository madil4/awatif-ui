import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import van, { State } from "vanjs-core";
import { Node } from "./App.types";
import { Points } from "./objects/Points";

export function Viewer(model: { nodes: State<Node[]> }) {
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

  const grid = new THREE.GridHelper(20, 20, 0x404040, 0x404040);
  const points = new Points();

  // update
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  camera.position.set(20, 20, 20);
  controls.target.set(0, 0, 0);
  controls.update();

  scene.add(grid, points);

  renderer.render(scene, camera);

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

  // on nodes change
  van.derive(() => {
    points.update(model.nodes.val);
    renderer.render(scene, camera);
  });
}
