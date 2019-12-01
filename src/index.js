import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import data from './data.json';

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

/**
 * Creates a line
 * @param {THREE.Vector3} endPosition - ending position to create a line
 * @return {THREE.Line} the mesh
 */
const createLine = endPosition => {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-1, 0, -1), endPosition);
  return new THREE.Line(geometry, material);
}


// Setup ------------------------------------------------ /
console.log('data');
// console.log(data);
// console.log(data[count]['name'], '-', data[count]['race'], data[count]['age'] / 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xced4da);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
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
let box, colorValue;
let count = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (j === 0) colorValue = 0xff6b6b;
    if (j === 1) colorValue = 0x845ef7;
    if (j === 2) colorValue = 0x339af0;
    if (j === 3) colorValue = 0x51cf66;
    box = createBox(i * 2, j * 2, new THREE.BoxGeometry(1, data[count]['age'] / 10, 1), new THREE.MeshLambertMaterial({ color: colorValue }));
    scene.add(box);
    count++;
  }
}

// Circle
const disk = new THREE.Mesh(new THREE.CircleGeometry(7, 64), new THREE.MeshBasicMaterial({ color: 0xdee2e6 }));
disk.position.set(3, 0, 3);
disk.lookAt(new THREE.Vector3(3, 3, 3));
scene.add(disk);

// Line
const yAxis = createLine(new THREE.Vector3(-1, 6, -1));
const xAxis = createLine(new THREE.Vector3(8, 0, -1));
const zAxis = createLine(new THREE.Vector3(-1, 0, 8));
scene.add(yAxis);
scene.add(xAxis);
scene.add(zAxis);

// Light
const light1 = new THREE.PointLight(0xFFFFFF, 1, 500);
const light2 = new THREE.PointLight(0xFFFFFF, 1, 500);
light1.position.set(25, 10, 25);
light2.position.set(-25, 10, -25);
scene.add(light1);
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
