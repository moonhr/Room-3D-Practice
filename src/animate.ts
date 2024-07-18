import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function animate(
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls // 명시적으로 OrbitControls 타입 지정
): void {
  function render() {
    requestAnimationFrame(render);
    controls.update(); // OrbitControls 업데이트
    renderer.render(scene, camera);
  }
  render();
}
