import * as THREE from "three";
import { setupScene } from "./setupScene";
import { setupCamera } from "./setupCamera";
import { setupRenderer } from "./setupRenderer";
import { setupLighting } from "./setupLighting";
import { setupControls } from "./setupControls";
import { loadModel } from "./loadModel";
import { addEventListeners } from "./eventHandlers";
import { animate } from "./animate";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let dragControls: DragControls;
let objects: THREE.Mesh[] = [];

init();

function init() {
  scene = setupScene();
  camera = setupCamera();
  renderer = setupRenderer();
  setupLighting(scene);
  controls = setupControls(camera, renderer);
  loadModel(scene, objects, camera, renderer, controls, dragControls);
  addEventListeners(camera, renderer, objects);
  animate(camera, scene, renderer, controls); // animate 함수 호출을 init 함수 마지막으로 이동
}
