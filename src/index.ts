import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  dragControls: DragControls;
let objects: THREE.Mesh[] = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

init();
animate();

function init() {
  // Three.js scene, camera, renderer 설정
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // AmbientLight 추가 (전반적인 조명)
  const ambientLight = new THREE.AmbientLight(0x404040, 5); // 색상과 강도 설정
  scene.add(ambientLight);

  // DirectionalLight 추가 (특정 방향에서 오는 조명)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(5, 5, 5); // 위치 설정
  scene.add(directionalLight);

  // 카메라 위치 설정 (위에서 아래로 비스듬히 바라보도록)
  camera.position.set(0, 5, 5); // 카메라를 모델에 더 가깝게 배치
  camera.lookAt(0, 0, 0); // 씬의 중심을 바라보도록 설정

  // OrbitControls 설정
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 부드러운 감속 효과
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 2;
  controls.maxDistance = 100;
  controls.maxPolarAngle = Math.PI / 2; // 수직 각도 제한

  // GLTF 모델 로더 설정
  const loader = new GLTFLoader();
  loader.load(
    // GLTF 파일 경로
    "/static/space-1-all",
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      model.position.set(0, 0, 0); // 모델 위치 설정
      model.scale.set(2, 2, 2); // 모델 크기를 2배로 조정

      // 모든 메시 오브젝트를 objects 배열에 추가
      model.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          // Mesh 타입으로 캐스팅하여 isMesh 속성 사용
          objects.push(child as THREE.Mesh);
        }
      });

      // DragControls 설정
      dragControls = new DragControls(objects, camera, renderer.domElement);
      dragControls.addEventListener("dragstart", function (event) {
        controls.enabled = false; // 드래그 중에는 OrbitControls 비활성화
      });
      dragControls.addEventListener("dragend", function (event) {
        controls.enabled = true; // 드래그 종료 후에는 OrbitControls 활성화
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  // 클릭 이벤트 처리
  window.addEventListener("click", onMouseClick, false);

  // 윈도우 리사이즈 이벤트 처리
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // OrbitControls 업데이트
  renderer.render(scene, camera);
}

function onMouseClick(event: MouseEvent) {
  // 마우스 위치를 정규화된 장치 좌표(-1 ~ +1)로 변환
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycaster를 사용하여 마우스 위치에서 교차점 감지
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);

  // 교차점이 있는 경우 첫 번째 객체의 색상 변경
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object as THREE.Mesh;

    // 랜덤 색상 생성
    const randomColor = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );

    // 선택된 객체의 색상을 랜덤 색상으로 설정
    (selectedObject.material as THREE.MeshStandardMaterial).color.set(
      randomColor
    );
  }
}
