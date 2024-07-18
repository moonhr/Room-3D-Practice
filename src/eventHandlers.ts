import * as THREE from "three";

export function addEventListeners(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  objects: THREE.Mesh[]
): void {
  window.addEventListener("resize", () => onWindowResize(camera, renderer));
  window.addEventListener("click", (event) => onMouseClick(event, camera, objects), false);
}

function onWindowResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event: MouseEvent, camera: THREE.PerspectiveCamera, objects: THREE.Mesh[]): void {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    const selectedObject = intersects[0].object as THREE.Mesh;
    const randomColor = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    );
    (selectedObject.material as THREE.MeshStandardMaterial).color.set(randomColor);
  }
}
