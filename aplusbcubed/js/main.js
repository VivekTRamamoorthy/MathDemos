import * as THREE from './three.module.js';
        
import { OrbitControls } from './OrbitControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004568); // background color
// rgb(0, 69, 104)
// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-10,-10,+10)
var point = new THREE.Vector3( 2, 2, 2 );
camera.lookAt( point );

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Axes
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 5, 5, 5 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
// Light
const ambientLight = new THREE.AmbientLight( 0xffffff, .7 );
scene.add( ambientLight );

// constants
let blockWidth = 1;
let platformThickness = 1;
let blockSpacing = 2;
let platformWidth = blockWidth+2*blockSpacing;
let blockHeight = 5;
let noOfBlocks = 5;
let platformLength = blockWidth*noOfBlocks+blockSpacing*(noOfBlocks+1)

// constants
let a = 3;
let b = 1;
let blockDimensions=[
    [a,a,a],
    [a,a,b],
    [a,b,a],
    [b,a,a],
    [a,b,b],
    [b,a,b],
    [b,b,a],
    [b,b,b]
]

let blockPositions=[
    [0,0,0],
    [0,0,a],
    [0,a,0],
    [a,0,0],
    [0,a,a],
    [a,0,a],
    [a,a,0],
    [a,a,a]
]
let blockColors = [
    0xF1C40F, 0x1ABC9C, 0x1ABC9C, 0x1ABC9C, 0xE67E22 , 0xE67E22 , 0xE67E22 , 0xE74C3C
]

// block 1
// Base platform
let blocks = [];
for (let blockNo = 0; blockNo < blockDimensions.length; blockNo++) {
    const materialSteel = new THREE.MeshPhongMaterial( { color: blockColors[blockNo] } );
    const geometryBlock1 = new THREE.BoxGeometry(blockDimensions[blockNo][0],blockDimensions[blockNo][1],blockDimensions[blockNo][2]);
    const block = new THREE.Mesh( geometryBlock1, materialSteel );
    scene.add( block );
    block.position.x = blockPositions[blockNo][0] +blockDimensions[blockNo][0]/2 ;
    block.position.y = blockPositions[blockNo][1] +blockDimensions[blockNo][1]/2 ;
    block.position.z = blockPositions[blockNo][2] +blockDimensions[blockNo][2]/2 ;
    blocks[blockNo]=block;
    
}

// controls

let controls = new OrbitControls( camera, renderer.domElement );
// controls.listenToKeyEvents( window ); 
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;



renderer.render( scene, camera ); // t

const animate = function (timems) {
    requestAnimationFrame( animate );
    

    // block positions
    for (let blockNo = 0; blockNo < blockDimensions.length; blockNo++) {
        let block = blocks[blockNo];
        block.position.x = blockPositions[blockNo][0]*(1+0.5+0.5*Math.sin(timems/1000)) +blockDimensions[blockNo][0]/2  ;
        block.position.y = blockPositions[blockNo][1]*(1+0.5+0.5*Math.sin(timems/1000)) +blockDimensions[blockNo][1]/2  ;
        block.position.z = blockPositions[blockNo][2]*(1+0.5+0.5*Math.sin(timems/1000)) +blockDimensions[blockNo][2]/2  ;
    }


    // Update
    controls.update();

    // Render
    renderer.render( scene, camera ); 
};

animate();