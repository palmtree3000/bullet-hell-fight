var renderer;
var scene;
var camera;
var sphere;

function init() {
    // set the scene size
  var WIDTH = 800,
    HEIGHT = 600;

  // set some camera attributes
  var VIEW_ANGLE = 45, // probably not what we want
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  // get the DOM element to attach to
  // - assume we've got jQuery to hand
  var $container = $('#container');

  // create a WebGL renderer, camera
  // and a scene
  renderer = new THREE.WebGLRenderer({antialias:true});
  camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

  scene = new THREE.Scene();

  // add the camera to the scene
  scene.add(camera);

  // the camera starts at 0,0,0
  // so pull it back
  camera.position.z = 300;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  $container.append(renderer.domElement);

  // create the sphere's material
  var sphereColor = 0xCC0000;
  var sphereMaterial =
    new THREE.MeshLambertMaterial(
      {
        color: sphereColor,
        ambient: sphereColor
      });

  // create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      50,
      16,
      16),
    sphereMaterial);

  // add the sphere to the scene
  scene.add(sphere);

  // create a point light
  var pointLight =
    new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  scene.add(pointLight);

  var ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  pressed = {};
  bullets = [];

// set key handling
// in the future we may want to store the time the key was pressed so we can do increasing effects
  document.onkeydown = function(e){pressed[e.keyCode]=true;}
  document.onkeyup= function(e){ delete pressed[e.keyCode];}

  bulletCounter=0;
  tick();
}


function tick() {
    requestAnimationFrame(tick);
    logictick();
    renderer.render(scene, camera);
    // Drawing code goes here
}
function logictick() {
    if (pressed[37]) {sphere.position.x=sphere.position.x-3};
    if (pressed[39]) {sphere.position.x=sphere.position.x+3};
    if (pressed[40]) {sphere.position.y=sphere.position.y-3};
    if (pressed[38]) {sphere.position.y=sphere.position.y+3};
    // if (circle.x >stage.canvas.width+50) {circle.x=-50;}
    // if (circle.x <-50) {circle.x=stage.canvas.width+50;}
    // if (circle.y >stage.canvas.height+50) {circle.y=-50;}
    // if (circle.y <-50) {circle.y=stage.canvas.height+50;}
    /*
    bulletCounter=(bulletCounter+1)%10;
    if (bulletCounter==0) {
      newBullet=new createjs.Shape();
      newBullet.graphics.beginFill("green").drawCircle(0,0,5);
      newBullet.x=circle.x;
      newBullet.y=circle.y;
      stage.addChild(newBullet);
      bullets.push(newBullet);
    }
    for (var i=bullets.length-1; i>=0; i--){
      var bullet=bullets[i];
      if (bullet.x<0) {
        stage.removeChild(bullet);
        delete bullet;
        bullets.splice(i,1);
      }
      else {
        bullet.x=bullet.x-7;
      }
    }
    */
    //console.log(pressed)
}
init();