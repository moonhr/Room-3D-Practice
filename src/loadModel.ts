import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function loadModel(
  scene: THREE.Scene,
  objects: THREE.Mesh[],
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls, // Import and use OrbitControls type
  dragControls: DragControls
): void {
  const loader = new GLTFLoader();
  loader.load(
    "/static/space-1-all",
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      model.position.set(0, 0, 0); // 모델 위치 설정
      model.scale.set(2, 2, 2); // 모델 크기를 2배로 조정

      model.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          objects.push(child as THREE.Mesh);
        }
      });

      setupDragControls(objects, camera, renderer, controls);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function setupDragControls(
  objects: THREE.Mesh[],
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls // Import and use OrbitControls type
): void {
  const dragControls = new DragControls(objects, camera, renderer.domElement);
  dragControls.addEventListener("dragstart", function (event) {
    controls.enabled = false; // 드래그 중에는 OrbitControls 비활성화
  });
  dragControls.addEventListener("dragend", function (event) {
    controls.enabled = true; // 드래그 종료 후에는 OrbitControls 활성화
  });
}
