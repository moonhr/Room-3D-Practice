import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Three.js scene, camera, renderer 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// AmbientLight 추가 (전반적인 조명)
const ambientLight = new THREE.AmbientLight(0x404040, 10); // 색상과 강도 설정
scene.add(ambientLight);

// DirectionalLight 추가 (특정 방향에서 오는 조명)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 5, 5); // 위치 설정
scene.add(directionalLight);

camera.position.z = 5;

// GLTF 모델 로더 설정
const loader = new GLTFLoader();
loader.load(
  // GLTF 파일 경로
  "/static/space-1-all",
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0); // 모델 위치 설정
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 애니메이션 루프 설정
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
