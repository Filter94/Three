function rotateAboutWorldAxis(object, axis, angle) {
  var rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationAxis( axis.normalize(), angle );
  var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
  var newPos = currentPos.applyMatrix4(rotationMatrix);
  object.position.x = newPos.x;
  object.position.y = newPos.y;
  object.position.z = newPos.z;
}

// set the scene size
var WIDTH = 900,
    HEIGHT = 890;

// set some camera attributes
var VIEW_ANGLE = 1000001,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 100000000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('body');
var vShader = $('vertexshader');
var fShader = $('fragmentshader');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 200;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// create the sphere's material
//var sphereMaterial =
//    new THREE.MeshLambertMaterial(
//      {
//        color: 0xFFFFFF
//      });

//sphereMaterial.map = THREE.ImageUtils.loadTexture('img/texture.jpg')

var radius = 50,
    segments = 16,
    rings = 16;

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!

var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),

  shaderMaterial);

// set the geometry to dynamic
// so that it allow updates
sphere.geometry.dynamic = true;

// changes to the vertices
sphere.geometry.verticesNeedUpdate = true;

// changes to the normals
sphere.geometry.normalsNeedUpdate = true;

// add the sphere to the scene
scene.add(sphere);

// create a point light
var pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 16;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

scene.add( new THREE.AxisHelper( 1000 ) );

// draw!
setInterval("renderer.render(scene, camera)", 1000/60);

sphere.position.x = 10;
sphere.geometry = new THREE.SphereGeometry(
    radius,
    100,
    80);

//sphere.flipSided = true;
//sphere.doubleSided = false;

sphere.rotation.z = Math.PI;
sphere.rotation.y = Math.PI / 2;

xDelta = Math.PI / 300;
yDelta = Math.PI / 150;
zDelta = Math.PI / 100;

xAxis = new THREE.Vector3(1,0,0);
yAxis = new THREE.Vector3(0,1,0);
zAxis = new THREE.Vector3(0,0,1);

var rotate = function () {
  //sphere.rotation.z += (Math.PI) / 100;
  //sphere.rotation.z += (Math.PI) / 100;
  //sphere.rotation.y += zDelta;
  //sphere.rotation.x -= zDelta;
  //sphere.rotation.z += zDelta;
  //rotateAboutWorldAxis(sphere, zAxis, Math.PI / 3)
  sphere.rotateOnAxis(yAxis, zDelta)
  sphere.rotateOnAxis(xAxis, zDelta)
}

setInterval(rotate, 1000/60);


