import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function Viewer(...objects: THREE.Object3D[]) {
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

  // update
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.body.style.margin = "0";

  camera.position.set(5, 5, 5);
  controls.target.set(0, 0, 0);
  controls.update();

  objects.forEach((o) => scene.add(o));

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
}
