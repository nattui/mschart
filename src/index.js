import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

/**
 * Creates a box mesh
 * @param {number} x - the position on the x-axis
 * @param {number} z - the position on the z-axis
 * @param {THREE.BoxGeometry} geometry - geometry
 * @param {THREE.MeshLambertMaterial} material - the material
 * @return {THREE.Mesh} the mesh
 */
const createBox = (x, z, geometry, material) => {
  const box = new THREE.Mesh(geometry, material);
  box.position.set(x, box.geometry.parameters.height / 2, z);
  return box;
}

// Setup ------------------------------------------------ /
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xced4da);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
// camera.lookAt(new THREE.Vector3(20.0, 0.0, 2.0));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
controls.enableDamping = true;
// controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.minDistance = 8;
controls.maxDistance = 64;
// controls.target = (new THREE.Vector3(2, 0, 2));
controls.update();

// Meshes
const box1 = createBox(-2, -2, new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xcFFCC00 }));
const box2 = createBox(2, 2, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0xcFF0000 }));
scene.add(box1);
scene.add(box2);

//
let geometry = new THREE.CircleGeometry(5, 64);
let material = new THREE.MeshBasicMaterial({ color: 0xdee2e6 });
const circle = new THREE.Mesh(geometry, material);
circle.lookAt(new THREE.Vector3(0, 1, 0));
scene.add(circle);

// Light
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(25, 10, 25);
scene.add(light);

// Animate ---------------------------------------------- /
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate();

// Resize ----------------------------------------------- /
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
