import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import mouth from './mouth'
const TWEEN = require('@tweenjs/tween.js')

export default function init() {
	loadScene()
	//setUpAvatar();
}

var gltfLoader, model, controls, container, scene, camera, renderer, hemiLight, dirLight, focalPoint, lenMorphs
function loadScene() {
	container = document.getElementById("avatarCanvas");
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setClearColor( 0x00ffff, 0 )
	scene = new THREE.Scene();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	let newCanvas = renderer.domElement
	container.appendChild(newCanvas);
	window.addEventListener("resize", onWindowResize);
	camera = new THREE.PerspectiveCamera(
		35,
		container.clientWidth / container.clientHeight,
		0.01,
		100
	);
	scene.background = new THREE.Color('#2b3e50');

	hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
	hemiLight.position.set(0, 20, 0);
	scene.add(hemiLight);

	dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
	dirLight.position.set(3, 10, 10);
	dirLight.castShadow = false;
	scene.add(dirLight);
	
	loadIndividualGLTF();
}


var head
var spine
var neck
var leftEye
var rightEye
function loadIndividualGLTF() {

	gltfLoader = new GLTFLoader();
	gltfLoader.load("https://d1a370nemizbjq.cloudfront.net/e5ab801e-a8cb-4b4c-a3ff-a091886b7de5.glb", function(gltf) {
		model = gltf.scene;
    window.model = model;
		scene.add( model );
		let direction = new THREE.Vector3();
		let headPos;
		model.traverse(function(object) {
			if (object.name === "Head") {
				headPos = object.getWorldPosition(direction)
			}
      else if (object.name =="Wolf3D_Head") {
        console.log('MorphTargetDictionary:', object.morphTargetDictionary)
        head = object
				lenMorphs = head.morphTargetInfluences.length;
				window.head = head;
      } else if (object.name === "Spine") {
				spine = object;
      } else if (object.name === "Neck") {
				neck = object;
			} else if (object.name === "LeftEye") {
				leftEye = object;
			} else if (object.name === "RightEye") {
				rightEye = object;
			}
		})
		camera.position.set(0, headPos.y, 1)
		controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, headPos.y+0, 0);
		controls.update();
		focalPoint = camera.getWorldPosition(direction)
		animate()
		randomBlink();
		randomSway();
		randomNeckTurn();
	})
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.clientWidth, container.clientHeight);
}

///// Blink
const randomBlink = () => {
	blink()
	let randomDelay = 2000 + Math.random() * 5000
	setTimeout(function(){
		randomBlink()
	}, randomDelay)
}

const blink = () => {

		let blinkTo = new Array(lenMorphs).fill(0);
		let partKey = head.morphTargetDictionary.eyesClosed;
		blinkTo[partKey] = 1
		let blinking = new TWEEN.Tween(head.morphTargetInfluences).to(blinkTo, 100)
			.easing(TWEEN.Easing.Quadratic.Out)
			.yoyo(true)
			.repeat(1)
			.start()
}

const randomSway = (direction=1) => {
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.025 * direction;
	//if (c.p[who].states.speaking) {
		//randomDuration /= 2;
		//randomRotation *= 2;
	//}
	let sway = new TWEEN.Tween(spine.rotation).to({z: randomRotation}, randomDuration)
		.easing(TWEEN.Easing.Cubic.InOut)
		.start()
	setTimeout(function(){
		randomSway(direction*=-1)
	}, randomDuration)
}

const randomNeckTurn = (direction=1) => {
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.075 * direction;
	//if (c.p[who].states.speaking) {
		//randomDuration /= 2;
		//randomRotation *= 2;
	//}
	let turn = new TWEEN.Tween(neck.rotation).to({y: randomRotation}, randomDuration)
		.easing(TWEEN.Easing.Cubic.InOut)
		.start()
	turn.onUpdate(function (object) {
		leftEye.lookAt(focalPoint)
		rightEye.lookAt(focalPoint)
	})
	setTimeout(function(){
		randomNeckTurn(direction*=-1)
	}, randomDuration)
}

function animate() {
  TWEEN.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

export { lenMorphs, head }
