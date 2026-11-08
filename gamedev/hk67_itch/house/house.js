/* ------------------------------------------- */
/* ---------------- GAME PREP ---------------- */
/* ------------------------------------------- */

// --------------- RENDER INITIAL SCENE --------------- //
$(document).ready(function() {
  pullMasterScore();
  musicInitialCheck();
  updateLocalScore();
  guessArray = document.getElementsByClassName("guess");
  objsArray = document.getElementsByTagName("area");
});



/* ------------------------------------------------ */
/* ----------------- INTRO SLIDES ----------------- */
/* ------------------------------------------------ */

// --------------- SWAP BETWEEN INTRO & HOW-TO-PLAY SLIDES --------------- //
sldBtnNxtHouse = document.getElementById("btnNxt");
sldBtnBckHouse = document.getElementById("btnBck");
sldBtnHntHouse = document.getElementById("btnHint");
sldBtnNxtHouse.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='house/assets/scene/house-intro-2.png'>";
  sldBtnNxtHouse.style = "display: none";
  sldBtnBckHouse.style = "display: block";
});
sldBtnBckHouse.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='house/assets/scene/house-intro-1.png'>";
  sldBtnBckHouse.style = "display: none";
  sldBtnNxtHouse.style = "display: block";
});

// --------------- TOGGLE HINT SLIDE --------------- //
var hintUp = false;
var hintImg = document.getElementById("slideAnsHint");
sldBtnHntHouse.addEventListener("click", function() {
  if (!hintUp) {
    hintImg.classList.remove("hidden");
    hintUp = true;
  }
  else {
    hintImg.classList.add("hidden");
    hintUp = false;
  }
});

// --------------- HIDE HINT BUTTON & SLIDE ON START --------------- //
function hideHints() {
  sldBtnHntHouse.classList.add('hidden');
  hintImg.classList.add('hidden');
}







/* --------------------------------------------------- */
/* ---------------- GUESSING GAMEPLAY ---------------- */
/* --------------------------------------------------- */

// --------------- GUESSING PARAMETERS --------------- //
var guessedCheckArray = [];  // array of all guesses made (previously set as ["0", "1"])
var correctCheckArray = [];  // array of correct guesses made
var guessArray;              // array of dots in guess holder
var objsArray;               // array of imagemap areas
var guessCount = 0;          // counter for total number of guesses

// --------------- SHOW DESCRIPTION ON OBJECT HOVER --------------- //
var descTxt = document.getElementById("desc");
function writeText(txt) { descTxt.innerHTML = txt; }

// --------------- START GAMEPLAY --------------- //
$('#btnStartMinigame').on('click', function ()  {
  hideSlide();
  hideHints();
  activateObjs();
  gameflow();
  playing = true;
});

// --------------- ADD CLICK LISTENER TO ALL GUESSABLE OBJECTS --------------- //
function activateObjs() {
  var i;
  for (i = 2; i < objsArray.length - 1; i++) {          // exclude first 2 & last 1 (bkg, window, shelf)
    objsArray[i].addEventListener("click", function(e) {
      addGuess(this.id, e);
    });
  }
  descTxt.style = "color: #faf3e2;";
}

// --------------- CLICKING AN OBJECT --------------- //
function addGuess(guessedObj, e) {
  
  // Guesses remain
  if (guessCount < guessArray.length) {
    
    // Create new flash element on each valid click
    if (playing && flashReloaded) {
      flashDiv = document.createElement("flashDiv");
        flashDiv.id = "camflash" + flashCount; 
        flashDiv.classList.add('camflash');
        flashDiv.style.top = e.clientY - 48 - 0 + "px";
        flashDiv.style.left = e.clientX - 48 + 0 + "px";
      document.getElementsByTagName('BODY')[0].appendChild(flashDiv);
      flashReloaded = false;
      animateFlash();
      sndFlash.play();
    }

    // Object has not been guessed before
    if (guessedCheckArray.indexOf(guessedObj) < 0) {

      // Check if guess is correct, add to array
      if (guessedObj == "3"  || // calligraphy
          guessedObj == "12" || // propaganda poster
          guessedObj == "13" || // gun
          guessedObj == "14" || // firstaid
          guessedObj == "21" || // red book
          guessedObj == "25" || // mango
          guessedObj == "30" || // dictionary
          guessedObj == "35" || // molly
          guessedObj == "36" || // mao pic
          guessedObj == "39"    // fish bomb
         ) {
        correctCheckArray.push(guessedObj);
        console.log('correct');
      }

      // Met win condition (no indicators)
      if (correctCheckArray.length > scoreLocalThresh) { console.log('win condition met'); }

      // Prevent multiple guesses of same object
      guessedCheckArray.push(guessedObj);
      guessArray[guessCount].classList.add("guessed");
      guessCount++;
    }

    // Already been guessed
    else { console.log('already guessed this object');}
  }

  // Out of guesses
  else {
    sndFlashErr.play();
    console.log('out of guesses');
  }
}

// --------------- CAMERA FLASH ON CLICK --------------- //
var flashDiv;                                                // the div to be created for each flash
var flashCount = 0;                                          // iterate multiple flashs (likely redundant now)
var flashReloaded = true;                                    // block new flashs when clicking faster than once/sec
var flashSpriteAnim;                                         // interval animating through sprite sheet
var sndFlash = document.getElementById('sndCamera');         // flash sound
var sndFlashErr = document.getElementById('sndCameraError'); // no more photos sound

// Animate through sprite sheet
function animateFlash() {
  var position = 0;     // sprite sheet start position
  const interval = 20;  // speed of animation (setInterval() interval)
  const diff = 96;      // position offset (width of one frame)

  flashSpriteAnim = setInterval(() => {
    document.getElementById("camflash" + flashCount).style.backgroundPosition = `-${position}px 0px`; // ES6 template literal to insert the variable "position"
    if (position < 480 - diff) {
      position = position + diff;
    }
    else {
      flashReloaded = true;
      flashCount++;
      clearInterval(flashSpriteAnim);
      flashDiv.remove(); }
  }, interval);
}



/* ------------------------------------------- */
/* ---------------- GAME FLOW ---------------- */
/* ------------------------------------------- */

// --------------- TIMING PARAMETERS --------------- //
var playing = false;                          // Whether actual gameplay is ongoing
var gameLength = 10;                          // Rounds (time in seconds) for the game to run
var loopSpeed = 1000;                         // Interval length of outer game loop - 1 SEC, DO NOT CHANGE
var gameSpeed = 65;                           // Interval length of inner bar loops (higher = slower)
var gameTimer = 0;                            // Current time in the game
var timerInterval = 100 / (gameLength + 1);   // Determine total length of countup bar
var timerCurrent;                             // Current length of countup bar

// --------------- SCORING PARAMETERS --------------- //
scoreLocalThresh = 5;                         // Amount of correct objects found needed to win
var gameID = "h";                             // Code to indicate which game has been completed

// --------------- UPDATE TIMER BAR --------------- //
function updateTime () {
  timerCurrent = (gameTimer + 1) * timerInterval;
  document.getElementById("timerTime").style.width = timerCurrent + "%";
  gameTimer++;
}

// --------------- FLOW & END OF GAME --------------- //
function gameflow() {
  var intI = setInterval (frame, loopSpeed);
  function frame () {
    
    // End game
    if (gameTimer >= gameLength) {
      playing = false;
      showFoundPhotos();
      clearInterval(intI);
      convertGuessToScore();
      updateLocalScore();
      showSlide();
      descTxt.style = "color: #07112D;";
    }
    
    console.log('timer' + gameTimer);
    updateTime();
  }
}

function convertGuessToScore() {
  scoreRiotLocal = 10 - correctCheckArray.length;
  scorePublLocal = correctCheckArray.length;
}

// --------------- SHOW CORRECT PHOTOS ON END SCREEN --------------- //
function showFoundPhotos() {
  // Show 'undeveloped' photos background
  hintImg.classList.remove('hidden');
  
  // Show correct photos overtop
  var i;
  for (i = 0; i < correctCheckArray.length; i++) {
    document.getElementById('slideAns' + correctCheckArray[i]).classList.remove('hidden');
  } 
}