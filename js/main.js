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
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;

// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),

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

// add to the scene
scene.add(pointLight);
  var stage = new createjs.Stage("demoCanvas")
  //var background = new createjs.Bitmap("fractal.jpg")
  //stage.addChild(background);
  var circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0,0,50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setFPS(60);
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
    drawtick();
    // Drawing code goes here
}
function logictick() {
    if (pressed[37]) {circle.x=circle.x-3};
    if (pressed[39]) {circle.x=circle.x+3};
    if (pressed[38]) {circle.y=circle.y-3};
    if (pressed[40]) {circle.y=circle.y+3};
    if (circle.x >stage.canvas.width+50) {circle.x=-50;}
    if (circle.x <-50) {circle.x=stage.canvas.width+50;}
    if (circle.y >stage.canvas.height+50) {circle.y=-50;}
    if (circle.y <-50) {circle.y=stage.canvas.height+50;}
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
    renderer.render(scene, camera);
}