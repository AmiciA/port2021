// --------------- LOCAL SCORING THRESHOLD --------------- //
var scoreLocalThresh = 5;
var streetsScoring = true;
var gameID = "s";



// --------------- RENDER INITIAL SCENE --------------- //
$(document).ready(function() {
  pullMasterScore();
  musicInitialCheck();
  updateLocalScore();
  
  $('#btnStartMinigame').on('click', function ()  {
    hideSlide();
    gameflow();  
  });
});



// --------------- SWAP BETWEEN INTRO & HOW-TO-PLAY SLIDES --------------- //
sldBtnNxtStreets = document.getElementById("btnNxt");
sldBtnBckStreets = document.getElementById("btnBck");
sldBtnNxtStreets.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='streets/assets/streets-intro-2.png'><img class='slideIntroHTP' src='streets/assets/streets-intro-htp.gif'>";
  sldBtnNxtStreets.style = "display: none";
  sldBtnBckStreets.style = "display: block";
});
sldBtnBckStreets.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='streets/assets/streets-intro-1.png'>";
  sldBtnBckStreets.style = "display: none";
  sldBtnNxtStreets.style = "display: block";
});



// --------------- GAME STATE PROPERTIES --------------- //
// Game timing
var gameLength = 25;                          // Rounds (time in seconds) for the game to run
var loopSpeed = 1000;                         // Interval length of outer game loop - 1 SEC, DO NOT CHANGE
var gameSpeed = 65;                           // Interval length of inner bar loops (higher = slower)
var gameTimer = 0;                            // Current time in the game
var timerInterval = 100 / (gameLength + 1);   // Determine total length of countup bar
var timerCurrent;                             // Current length of countup bar

// Riot bar speed constants
var normalSpeed = 1;                          // Speed an activated riot bar runs at
var inactiveSpeed = 0.1;                      // Speed all the other riot bars run at
var pauseSpeed = 0;                           // How fast the bar runs when barricaded
var pauseCount = 3;                           // How many rounds (seconds) a barricade should slow the bar



// --------------- ACTIONS --------------- //
// Action state flags
var actionApplied = false;                    // Trigger to apply one of the below actions to a yet-to-be-clicked bar 
var applyBarr = false;
var applyTear = false;
var applyBaton = false;
var applyLive = false;

// Tracking status of consumable actions
var readyBarr = 0;                            // Tracking how many barricades to add back into the ammo holder
var ammoBarr = 3;
var ammoLive = 3;

// Strength of pushback for non-consumable actions
var pushBT = 7;
var pushTG = 20;



// --------------- HOVER OUTLINE COLOURS --------------- //
var hoverGeneral = "6px solid rgb(187, 53, 35, .2)";
var hoverBarr = "6px solid rgb(187, 53, 35, .8)";
var hoverTear = "6px solid rgb(187, 53, 35, .8)";
var hoverBaton = "6px solid rgb(187, 53, 35, .8)";
var hoverLive = "6px solid rgb(187, 53, 35, .8)";



// --------------- BAR BACKGROUND STATE EFFECTS --------------- //
var bkgLive = "linear-gradient(45deg, #bb3523 25%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 50%, #bb3523 50%, #bb3523 75%, rgba(255,255,255,0) 75%, rgba(255,255,255,0) 100%)";
var bkgCplt = "#bb3523";
var bkgPaus = "#e8aaa7";
var bkgDflt = "#ea5d4a";



// --------------- BAR PROGRESS VALUES --------------- //
// Intersection A
// 0 - Prince Edward x Tong Mi BOTTOM
var petmBotProg = 0;                          // Current length of bar
var petmBotActn = false;                      // Trigger to apply action to bar 
var petmBotSpeed = 1;                         // Current speed of bar
var petmBotPauses = 0;                        // Currently-remaining rounds the bar is paused for
var petmBotCompleted = false;                 // Whether bar is moving or stopped

// 1 - Prince Edward x Tong Mi RIGHT
var petmRigProg = 0;
var petmRigActn = false;
var petmRigSpeed = 1;
var petmRigPauses = 0;
var petmRigCompleted = false;

// Intersection B
// 2 - Prince Edward x Waterloo RIGHT
var pewaLefProg = 0;
var pewaLefActn = false;
var pewaLefSpeed = 1;
var pewaLefPauses = 0;
var pewaLefCompleted = false;

// 3 - Prince Edward x Waterloo BOTTOM
var pewaBotProg = 0;
var pewaBotActn = false;
var pewaBotSpeed = 1;
var pewaBotPauses = 0;
var pewaBotCompleted = false;

// Intersection C
// 4 - Argyle x Nathan TOP
var arnaTopProg = 0;
var arnaTopActn = false;
var arnaTopSpeed = 1;
var arnaTopPauses = 0;
var arnaTopCompleted = false;

// 5 - Argyle x Nathan RIGHT
var arnaRigProg = 0;
var arnaRigActn = false;
var arnaRigSpeed = 1;
var arnaRigPauses = 0;
var arnaRigCompleted = false;

// 6 - Argyle x Nathan BOTTOM
var arnaBotProg = 0;
var arnaBotActn = false;
var arnaBotSpeed = 1;
var arnaBotPauses = 0;
var arnaBotCompleted = false;

// Intersection D
// 7 - Waterloo x Nathan TOP
var wanaTopProg = 0;
var wanaTopActn = false;
var wanaTopSpeed = 1;
var wanaTopPauses = 0;
var wanaTopCompleted = false;

// 8 - Waterloo x Nathan BOTTOM
var wanaBotProg = 0;
var wanaBotActn = false;
var wanaBotSpeed = 1;
var wanaBotPauses = 0;
var wanaBotCompleted = false;



// --------------- RANDOMLY ACTIVATE & CYCLE THROUGH BARS --------------- //
function gameflow() {
  var intI = setInterval (frame, loopSpeed);
  function frame () {
    updateLocalScore();
    refreshBarricade();
    cycledownPause();
    var rand = getRandomInt(9)
    
    // End game
    if (gameTimer >= gameLength) {
      completeGame();
      clearInterval(intI);
      showSlide();
    }
    
    // 0 = Prince Edward x Tong Mi BOT
    if (rand == 0) {
      if (petmBotPauses > 0) { petmBotSpeed = pauseSpeed; }
      else                   { petmBotSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      //petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }
    
    // 1 = Prince Edward x Tong Mi RIGHT
    if (rand == 1) {
      if (petmRigPauses > 0) { petmRigSpeed = pauseSpeed; }
      else                   { petmRigSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      //petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }
    
    // 2 = Prince Edward x Waterloo RIGHT
    if (rand == 2) {
      if (pewaLefPauses > 0) { pewaLefSpeed = pauseSpeed; }
      else                   { pewaLefSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      //pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }
    
    // 3 = Prince Edward x Waterloo BOTTOM
    if (rand == 3) {
      if (pewaBotPauses > 0) { pewaBotSpeed = pauseSpeed; }
      else                   { pewaBotSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      //pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }
    // 4 = Argyle x Nathan TOP
    else if (rand == 4) {
      // Modify speed if barricade used
      if (arnaTopPauses > 0) { arnaTopSpeed = pauseSpeed; }
      else                   { arnaTopSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      //arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }                       
    
    // 5 = Argyle x Nathan RIGHT
    else if (rand == 5) {
      // Modify speed if barricade used
      if (arnaRigPauses > 0) { arnaRigSpeed = pauseSpeed; }
      else                   { arnaRigSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      //arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }
    
    // 6 = Argyle x Nathan BOTTOM
    else if (rand == 6) {
      // Modify speed if barricade used
      if (arnaBotPauses > 0) { arnaBotSpeed = pauseSpeed; }
      else                   { arnaBotSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      //arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }                     
    
    // 7 = Waterloo x Nathan TOP
    else if (rand == 7) {
      // Modify speed if barricade used
      if (wanaTopPauses > 0) { wanaTopSpeed = pauseSpeed; }
      else                   { wanaTopSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      //wanaTopSpeed = inactiveSpeed;
      wanaBotSpeed = inactiveSpeed;
    }    
                     
    // 8 = Waterloo x Nathan BOTTOM
    else if (rand == 8) {
      // Modify speed if barricade used
      if (wanaBotPauses > 0) { wanaBotSpeed = pauseSpeed; }
      else                   { wanaBotSpeed = normalSpeed; }
      
      // Set speed of all other bars to inactive
      petmBotSpeed = inactiveSpeed;
      petmRigSpeed = inactiveSpeed;
      pewaLefSpeed = inactiveSpeed;
      pewaBotSpeed = inactiveSpeed;
      arnaTopSpeed = inactiveSpeed;
      arnaRigSpeed = inactiveSpeed;
      arnaBotSpeed = inactiveSpeed;
      wanaTopSpeed = inactiveSpeed;
      //wanaBotSpeed = inactiveSpeed;
    }                   
    
    console.log('timer' + gameTimer);
    updateTime();
  }
  petmBot();
  petmRig();
  pewaLef();
  pewaBot();
  arnaTop();
  arnaRig();
  arnaBot();
  wanaTop();
  wanaBot();
}



// --------------- UPDATE UI ELEMENTS --------------- //
// Update timer bar
function updateTime () {
  timerCurrent = (gameTimer + 1) * timerInterval;
  document.getElementById("timerTime").style.width = timerCurrent + "%";
  gameTimer++;
}



// --------------- QUEUE UP ACTIONS --------------- //
// Custom cursor parameters
var replaceCursor = document.getElementById('followerImg');
var path = "streets/assets/cursors/";
var pathreset = "streets/assets/cursors/cur-empty.png";

// Queue up barricades
var queueBarr = false;
$('#btnBarr').on('click', function ()  {
  if (queueBarr) {
    clearQueue ();
    replaceCursor.src = pathreset;
  }
  else {
    clearQueue ();
    queueBarr = true;
    replaceCursor.src = path + "cur-barricade.png";
  }
});

// Queue up tear smoke
var queueTear = false;
$('#btnTear').on('click', function ()  { 
  if (queueTear) {
    clearQueue ();
    replaceCursor.src = pathreset;
  }
  else {
    clearQueue ();
    queueTear = true;
    replaceCursor.src = path + "cur-tear.png";
    console.log ("button clicked, tear queued")
  }
});

// Queue up baton rounds
var queueBaton = false;
$('#btnBaton').on('click', function () {
  if (queueBaton) {
    clearQueue ();
    replaceCursor.src = pathreset;
  }
  else {
    clearQueue ();
    queueBaton = true;
    replaceCursor.src = path + "cur-baton.png";
  }
});

// Queue up live rounds
var queueLive = false;
$('#btnLive').on('click', function ()  {
  if (queueLive) {
    clearQueue ();
    replaceCursor.src = pathreset;
  }
  else {
    clearQueue ();
    queueLive = true;
    replaceCursor.src = path + "cur-live.png";
  }
});



// --------------- CLEAR PARAMETERS --------------- //
// Set all queue-able parameters to false
function clearQueue () {
  queueBarr = false;
  queueTear = false;
  queueBaton = false;
  queueLive = false;
}

// Set all apply-able parameters to false
function clearApply () {
  applyBarr = false;
  applyTear = false;
  applyBaton = false;
  applyLive = false;
}

// Remove the action cursor & reset to default hat
function clearVisuals () {
  replaceCursor.src = path + "cur-empty.png";
  document.getElementById("petmRigCurr").style.outline = 'none';
}



// --------------- HANDLE BARRICADE PAUSES --------------- //
function useBarricade () {
  // Remove a pip for each barricade used
  if (ammoBarr == 3) { document.getElementById("br1").style = 'background-color: transparent'; }
  if (ammoBarr == 2) { document.getElementById("br2").style = 'background-color: transparent'; }
  
  // If all barricades have been used up, disable the barricade button
  if (ammoBarr == 1) {
    document.getElementById("br3").style = 'background-color: transparent';
    document.getElementById("btnBarrImg").style = 'opacity: .5';
    document.getElementById("btnBarr").style = 'background-color: #07112d';
    document.getElementById("btnBarr").classList.remove('togglehover');
  }
  ammoBarr--;
}

function cycledownPause () { 
  // Cycle down one pause unit each round (second)
  if (petmBotPauses > 0) { petmBotPauses--; }
  if (petmRigPauses > 0) { petmRigPauses--; }
  if (pewaLefPauses > 0) { pewaLefPauses--; }
  if (pewaBotPauses > 0) { pewaBotPauses--; }
  if (arnaTopPauses > 0) { arnaTopPauses--; }
  if (arnaRigPauses > 0) { arnaRigPauses--; }
  if (arnaBotPauses > 0) { arnaBotPauses--; }
  if (wanaTopPauses > 0) { wanaTopPauses--; }
  if (wanaBotPauses > 0) { wanaBotPauses--; }
  
  // If barricade is about to run out (1 round/second left), indicate that its ammo should be refreshed
  if (petmBotPauses == 1) { readyBarr++; }
  if (petmRigPauses == 1) { readyBarr++; }
  if (pewaLefPauses == 1) { readyBarr++; }
  if (pewaBotPauses == 1) { readyBarr++; }
  if (arnaTopPauses == 1) { readyBarr++; }
  if (arnaRigPauses == 1) { readyBarr++; }
  if (arnaBotPauses == 1) { readyBarr++; }
  if (wanaTopPauses == 1) { readyBarr++; }
  if (wanaBotPauses == 1) { readyBarr++; }
}

function refreshBarricade () {
  // If there's one second/round left on a current barricade, add an ammo back to the ammo holder
  if (readyBarr > 0) { console.log ("READYBAR: " + readyBarr + "; AMMOBAR: " + ammoBarr);
    ammoBarr += readyBarr;
    readyBarr = 0;
   
    if (ammoBarr == 1) {
      document.getElementById("br1").style = 'background-color: transparent';
      document.getElementById("br2").style = 'background-color: transparent';
      document.getElementById("br3").style = 'background-color: #faf3e2';
      
      document.getElementById("btnBarrImg").style = 'opacity: 1';
      document.getElementById("btnBarr").style = 'background-color: #111F51';
      document.getElementById("btnBarr").classList.add('togglehover');
    }
    if (ammoBarr == 2) {
      document.getElementById("br1").style = 'background-color: transparent';
      document.getElementById("br2").style = 'background-color: #faf3e2';
      document.getElementById("br3").style = 'background-color: #faf3e2';
      
      document.getElementById("btnBarrImg").style = 'opacity: 1';
      document.getElementById("btnBarr").style = 'background-color: #111F51';
      document.getElementById("btnBarr").classList.add('togglehover');
    }
    if (ammoBarr == 3) {
      document.getElementById("br1").style = 'background-color: #faf3e2';
      document.getElementById("br2").style = 'background-color: #faf3e2';
      document.getElementById("br3").style = 'background-color: #faf3e2';
      document.getElementById("btnBarrImg").style = 'opacity: 1';
      document.getElementById("btnBarr").style = 'background-color: #111F51';
      document.getElementById("btnBarr").classList.add('togglehover');
    }
  }
}



// --------------- HANDLE LIVE AMMO --------------- //
function useLiveAmmo () {
  // Remove a pip for each round used
  if (ammoLive == 3) { document.getElementById("am1").style = 'background-color: transparent'; }
  if (ammoLive == 2) { document.getElementById("am2").style = 'background-color: transparent'; }

  // If all ammo has been used up, disable the button
  if (ammoLive == 1) {
    document.getElementById("am3").style = 'background-color: transparent';
    document.getElementById("btnLiveImg").style = 'opacity: .5';
    document.getElementById("btnLive").style = 'background-color: #07112d';
    document.getElementById("btnLive").classList.remove('togglehover');
  }
  ammoLive--;
}



// --------------- ACTION SOUNDS --------------- //
var sndGun = document.getElementById('sndStreetsGun');
var sndTG  = document.getElementById('sndStreetsTG');
var sndBar = document.getElementById('sndStreetsBar');



// --------------- COMPLETE GAME --------------- //
// When game is done, set all bars to complete, regardless of their current progress
function completeGame () {
  petmBotCompleted = true;
  petmRigCompleted = true;
  pewaLefCompleted = true;
  pewaBotCompleted = true;
  arnaTopCompleted = true;
  arnaRigCompleted = true;
  arnaBotCompleted = true;
  wanaTopCompleted = true;
  wanaBotCompleted = true;
}