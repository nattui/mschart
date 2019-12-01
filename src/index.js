import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';


/**
 * Creates a box mesh
 * @param {number} x - the position on the x-axis
 * @param {number} z - the position on the z-axis
 * @param {THREE.BoxGeometry} geometry - the geometry
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
controls.target = (new THREE.Vector3(3, 0, 3));
controls.update();

// Meshes
const box0_0 = createBox(0, 0, new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xff6b6b }));
const box0_1 = createBox(0, 2, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x845ef7 }));
const box0_2 = createBox(0, 4, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x339af0 }));
const box0_3 = createBox(0, 6, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x51cf66 }));
scene.add(box0_0);
scene.add(box0_1);
scene.add(box0_2);
scene.add(box0_3);

const box1_0 = createBox(2, 0, new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xff6b6b }));
const box1_1 = createBox(2, 2, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x845ef7 }));
const box1_2 = createBox(2, 4, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x339af0 }));
const box1_3 = createBox(2, 6, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x51cf66 }));
scene.add(box1_0);
scene.add(box1_1);
scene.add(box1_2);
scene.add(box1_3);

const box2_0 = createBox(4, 0, new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xff6b6b }));
const box2_1 = createBox(4, 2, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x845ef7 }));
const box2_2 = createBox(4, 4, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x339af0 }));
const box2_3 = createBox(4, 6, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x51cf66 }));
scene.add(box2_0);
scene.add(box2_1);
scene.add(box2_2);
scene.add(box2_3);

const box3_0 = createBox(6, 0, new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({ color: 0xff6b6b }));
const box3_1 = createBox(6, 2, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x845ef7 }));
const box3_2 = createBox(6, 4, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x339af0 }));
const box3_3 = createBox(6, 6, new THREE.BoxGeometry(1, 4, 1), new THREE.MeshLambertMaterial({ color: 0x51cf66 }));
scene.add(box3_0);
scene.add(box3_1);
scene.add(box3_2);
scene.add(box3_3);

// Circle
const disk = new THREE.Mesh(new THREE.CircleGeometry(7, 64), new THREE.MeshBasicMaterial({ color: 0xdee2e6 }));
disk.position.set(3, 0, 3);
disk.lookAt(new THREE.Vector3(3, 3, 3));
scene.add(disk);

// Light
const light1 = new THREE.PointLight(0xFFFFFF, 1, 500);
light1.position.set(25, 10, 25);
scene.add(light1);
const light2 = new THREE.PointLight(0xFFFFFF, 1, 500);
light2.position.set(-25, 10, -25);
scene.add(light2);


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
