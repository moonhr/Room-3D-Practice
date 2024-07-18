import * as THREE from "three";

export function setupCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 5); // 카메라를 모델에 더 가깝게 배치
  camera.lookAt(0, 0, 0); // 씬의 중심을 바라보도록 설정
  return camera;
}
