import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; //모델링 불러오기
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //마우스컨트롤

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
const ambientLight = new THREE.AmbientLight(0x404040, 4); // 색상과 강도 설정
scene.add(ambientLight);

// DirectionalLight 추가 (특정 방향에서 오는 조명)
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5); // 위치 설정
scene.add(directionalLight);

// 카메라 위치 설정 (위에서 아래로 비스듬히 바라보도록)
camera.position.set(3, 2, 2); // 카메라를 모델에 더 가깝게 배치
camera.lookAt(0, 0, 0); // 씬의 중심을 바라보도록 설정

// OrbitControls 설정
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 감속 효과
controls.dampingFactor = 0.25;
controls.screenSpacePanning = true;
controls.minDistance = 2; //접근 최소길이
controls.maxDistance = 100; //접근 최대길이
controls.maxPolarAngle = Infinity; // 수직 각도 제한

// 씬의 중심을 타겟으로 설정
controls.target.set(0, 0, 0);

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
