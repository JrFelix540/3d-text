import { Mesh, MeshMatcapMaterial, PerspectiveCamera, Scene, TextureLoader, TorusGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";


const canvas = document.getElementById("webgl");

const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// Scene

const scene = new Scene();

const textureLoader = new TextureLoader()
const matcapTexture = textureLoader.load("/matcaps/1.png")
const material = new MeshMatcapMaterial({matcap: matcapTexture});


// Text Geometry

const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      "The Weeknd",
      {
        font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelSize: 0.02,
        bevelThickness: 0.03,
        bevelSegments: 4
      }
    );
    textGeometry.center()
    const text = new Mesh(textGeometry, material);
    scene.add(text);
  }
);

// Donuts

const donutGeometry = new TorusGeometry(0.3, 0.2, 20, 25);


for (let i = 0; i < 100; i++){

  const donut = new Mesh(donutGeometry, material);

  donut.position.x = (Math.random()  - 0.5) * 10;
  donut.position.y = (Math.random() - 0.5) * 10;
  donut.position.z = (Math.random() - 0.5) * 10;

  donut.rotation.x = Math.random();
  donut.rotation.y = Math.random();


  const scale = Math.random();
  donut.scale.set(scale, scale);
  scene.add(donut);

}

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 2)
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();


  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})



const tick = () => {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}


tick();
