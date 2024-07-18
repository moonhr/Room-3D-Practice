import * as THREE from "three";

export function setupLighting(scene: THREE.Scene): void {
  const ambientLight = new THREE.AmbientLight(0x404040, 5); // 색상과 강도 설정
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(5, 5, 5); // 위치 설정
  scene.add(directionalLight);
}
