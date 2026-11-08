// Global variables
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    player = {
        x: 300,                     // sprite x pos
        y: canvas.height-224-36,    // sprite y pos
        w: 112,                     // sprite width
        h: 224,                     // sprite height
        sx: 0,                      // internal x position of sprite sheet
        counter: 0,                 // frame counter
        rate: 15,                   // sprite sheet frame rate
        speed: 200,                 // pixels/sec
        inventory: 0                // count items viewed
    };
    monster1 = {x: 020, y: 000};
    monster2 = {x: 128, y: 000};
    monster3 = {x: 368, y: 000};
    monster4 = {x: 636, y: 180};
    monster5 = {x: 892, y: 340};
    
    drone = {x: 25, y: 176, dir: 1};


var r = player.rate;                // short variable
var prompt = false;                 // prompt action when near monster
var isPaused = false;               // pause
var end = false;                    // dialog for ending the game
var prox1 = false;                  // #1 monster proximity
var prox2 = false;                  // #2 monster proximity
var prox3 = false;                  // #3 monster proximity
var prox4 = false;                  // #4 monster proximity
var prox5 = false;                  // #5 monster proximity
var collected1 = false;             // #1 monster check if already collected
var collected2 = false;             // #2 monster check if already collected
var collected3 = false;             // #3 monster check if already collected
var collected4 = false;             // #4 monster check if already collected
var collected5 = false;             // #5 monster check if already collected
var lastDir = 'right';              // last direction player was facing before stopping

var endmodalopen = false;           // whether the end modal is open

var startReady;
var start;
var bgReady;
var bg;
var characterReady;
var character;
var monsterReady1;
var monsterImage1;
var monsterBig1;
var monsterReady2;
var monsterImage2;
var monsterReady3;
var monsterImage3;
var monsterReady4;
var monsterImage4;
var monsterReady5;
var monsterImage5;

var up;

var arrowcounter = 0;
var arrowhide;


// Keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

// Load all images
function loadImages () {
    // Start screen background image
    startReady = false;
    start = new Image();
    start.onload = function () { startReady = true; };
    start.src = "images/start.png";
    start.width = 600;
    start.height = 450;
    
    // Background image
    bgReady = false;
    bg = new Image();
    bg.onload = function () { bgReady = true; };
    bg.src = "images/background.png";

    // Character image
    characterReady = false;
    character = new Image();
    character.onload = function () {characterReady = true; };
    character.src = 'images/hero-sprites.png';

    // 1st Monster image
    monsterReady1 = false;
    monsterImage1 = new Image();
    monsterImage1.onload = function () { monsterReady1 = true; };
    monsterImage1.src = "images/monster.png";
    monsterBig1 = new Image();
    monsterBig1.src = "images/monster1-big.png"
    
    // 2nd Monster image
    monsterReady2 = false;
    monsterImage2 = new Image();
    monsterImage2.onload = function() { monsterReady2 = true; }
    monsterImage2.src = "images/monster2.png";
    monsterBig2 = new Image();
    monsterBig2.src = "images/monster2-big.png"

    // 3rd Monster image
    monsterReady3 = false;
    monsterImage3 = new Image();
    monsterImage3.onload = function() { monsterReady3 = true; }
    monsterImage3.src = "images/monster3.png";
    monsterBig3 = new Image();
    monsterBig3.src = "images/monster3-big.png"

    // 4th Monster image
    monsterReady4 = false;
    monsterImage4 = new Image();
    monsterImage4.onload = function() { monsterReady4 = true; }
    monsterImage4.src = "images/monster4.png";
    monsterBig4 = new Image();
    monsterBig4.src = "images/monster4-big.png"

    // 5th Monster image
    monsterReady5 = false;
    monsterImage5 = new Image();
    monsterImage5.onload = function() { monsterReady5 = true; }
    monsterImage5.src = "images/monster5.png";
    monsterBig5 = new Image();
    monsterBig5.src = "images/monster5-big.png"
    
    // Drone image
    droneImage = new Image();
    droneImage.src = "images/drone.png";
    
    // Trash image
    trashImage = new Image();
    trashImage.src = "images/fores.png";
    
    // Arrow image
    arrowReady = false;
    arrowImage = new Image();
    arrowImage.onload = function() { arrowReady = true; }
    arrowImage.src = "images/arrowrec.png";
    
    
    // UI ELEMENTS
    //Up prompt
    up = new Image();
    up.src = "images/up.png";
    
    //Down prompt
    down = new Image();
    down.src = "images/down.png";
}