import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function setupControls(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 부드러운 감속 효과
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 2;
  controls.maxDistance = 100;
  controls.maxPolarAngle = Math.PI / 2; // 수직 각도 제한
  return controls;
}
