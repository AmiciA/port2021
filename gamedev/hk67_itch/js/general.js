/* ----------------------------------------- */
/* ----------------- AUDIO ----------------- */
/* ----------------------------------------- */
var sndClick = document.getElementById('sndClick');
var bgmSplash = document.getElementById('sndBGMMain');
var bgmMap = document.getElementById('sndBGMMap');
var bgmCurr = bgmSplash; // current scene's background music
var sndStatus = true;    // assume true, as sound can autoplay in itch.io embed
/*var sndStatus;    // assume true, as sound can autoplay in itch.io embed

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlSound = urlParams.get('soundon');
console.log(urlSound);
if (urlSound == 'false')     { sndStatus = false;  console.log('safs');}
else if (urlSound == 'true') { sndStatus = true;  }
else                          { sndStatus = true;  }
musicControl();*/

// The issue with the music is that musicChange only swaps between index.html splash and map music and can't handle minigame music?
// All BGM isBMGRiot, so need to change to be generic

// Enabling/Muting all sounds via the audio button in top right
$('#btnAudio').on('click', function () { musicControl(); });
function musicControl () {
  if (!sndStatus) {
    bgmCurr.play();
    sndStatus = true;
    sndClick.muted = false;
  }
  else {
    bgmCurr.pause();
    sndStatus = false;
    sndClick.muted = true;
  }
  if(window.location.href.indexOf("index.html") > -1) { pushScoresToLinks(); }
}

// Enable/Mute all sounds upon starting a minigame
function musicInitialCheck () {
  // sndStatus is set 'backwards', as the control button is being programmatically 'clicked' after sndStatus is set
  if (sndActive === "true") { sndStatus = false; } 
  else                      { sndStatus = true; 
    // Mute STREETS sound effects 
    if (window.location.href.indexOf("streets.html") > -1) {
      document.getElementById('sndStreetsGun').muted = true;
      document.getElementById('sndStreetsTG').muted = true;
      document.getElementById('sndStreetsBar').muted = true;
    }
    // Mute BOMBING sound effects 
    if (window.location.href.indexOf("bombing.html") > -1) {
      document.getElementById('sndCntdwn').muted = true;
      document.getElementById('sndCorrect').muted = true;
      document.getElementById('sndExplode').muted = true;
      document.getElementById('sndAnnoyed').muted = true;
      document.getElementById('sndBombingTurn').muted = true;
    }
    // Mute MILITIA sound effects
    if (window.location.href.indexOf("militia.html") > -1) {
      document.getElementById('sndMilitiaTG').muted = true;
      document.getElementById('sndMilitiaShtRcht').muted = true;
      document.getElementById('sndMilitiaAPCStrt').muted = true;
      document.getElementById('sndMilitiaAPCDmg').muted = true;
      document.getElementById('sndMilitiaRescue').muted = true;
    }
                             
    // Mute HOUSE sound effects
    if (window.location.href.indexOf("house.html") > -1) {
      document.getElementById('sndCamera').muted = true;
      document.getElementById('sndCameraError').muted = true;
    }                         
  }
  musicControl();
}

// Swap music between splash and map (if audio enabled)
function musicChange () {
  if (sndStatus && onSplash) {
    bgmSplash.pause();
    bgmMap.play();
  }
  else if (sndStatus && !onSplash) {
    bgmMap.pause();
    bgmSplash.play();
  }
}

// Make click sound when hovering buttons
function PlaySound(soundobj) { document.getElementById(soundobj).play(); }
function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}





/* ----------------------------------------- */
/* --------- SPLASH & NEWS PARAMS ---------- */
/* ----------------------------------------- */
var onSplash     = true;

var btnStrtGame  = document.getElementById("btnStartGame");
//var btnStrtMusic = document.getElementById("btnStartMusic");
var btnMusic     = document.getElementById("btnAudio");
var btnRetrn     = document.getElementById("btnReturn");

var intrHide     = document.getElementById("introHider");
var intrActn     = document.getElementById("introAction");
var intrTitl     = document.getElementById("introTitle");
var scoreHold    = document.getElementById("scoreHolder");

// Newspaper slides
var nH = document.getElementById("newsHolder");
var n1 = document.getElementById("news1");
var n2 = document.getElementById("news2");
var n3 = document.getElementById("news3");
var n4 = document.getElementById("news4");
var n5 = document.getElementById("news5");
var n6 = document.getElementById("news6");
var n7 = document.getElementById("news7");
var n8 = document.getElementById("news8");




/* ----------------------------------------- */
/* --------- SPLASH TO NEWS SWITCH --------- */
/* ----------------------------------------- */
var currPpr = 0;
$('#btnStartGame').on('click', function ()  {

  // Move from paper 1 to 2
  if (currPpr == 1) {
    n1.classList.add("newsexit");
    n1.classList.remove("newsenter");
    n2.classList.remove("hidden");
    n2.classList.add("newsenter");
  }

  // Move from paper 2 to 3
  else if (currPpr == 2) {
    n2.classList.add("newsexit");
    n2.classList.remove("newsenter");
    n3.classList.remove("hidden");
    n3.classList.add("newsenter");
  }

  // Move from paper 3 to 4
  else if (currPpr == 3) {
    n3.classList.add("newsexit");
    n3.classList.remove("newsenter");
    n4.classList.remove("hidden");
    n4.classList.add("newsenter");
  }

  // Move from paper 4 to 5
  else if (currPpr == 4) {
    n4.classList.add("newsexit");
    n4.classList.remove("newsenter"); 
    n5.classList.remove("hidden");
    n5.classList.add("newsenter");

    btnStrtGame.innerHTML = 'Begin ↓';
  }

  // Move from paper 5 to the main map screen
  else if (currPpr > 4) {
    n5.classList.add("newsexit");
    n5.classList.remove("newsenter");  
    intrHide.classList.add("hidden");
    intrHide.style = "pointer-events: none";
    btnStrtGame.classList.add("hidden");
    scoreHold.classList.remove("hidden");
  }

  // Move from game splash to first newspaper
  else {
    bgmCurr = bgmMap;
    musicChange();
    onSplash = false;
    //btnStrtMusic.classList.add("hidden");
    intrActn.classList.add("hidden");
    intrTitl.classList.add("hidden");

    // Give splash time to fade out before animating in first newspaper
    setTimeout(function frame () { 
      n1.classList.remove("hidden");
      n1.classList.add("newsenter");

      //btnMusic.classList.remove("hidden");
      btnRetrn.classList.remove("hidden");
      btnStrtGame.classList.add("btnNewsNext");
      btnStrtGame.classList.add("btnDark");
      btnStrtGame.classList.remove("btnLite");
      btnStrtGame.classList.remove("btnBig");
      btnStrtGame.innerHTML = 'Next →';
    }, 300);
  }
  currPpr++;  
});





/* ----------------------------------------- */
/* ---------- MAP <-> SPLASH SWAP ---------- */
/* ----------------------------------------- */

/* -------------- Skip to map -------------- */
// If returning from minigame
pullMasterScore();
if(gameActive == 'active' && window.location.href.indexOf("index.html") > -1) { showMap(); }

// Hide all the splash and newspaper elements
function showMap() {
  bgmCurr = bgmMap;
  musicChange();
  onSplash = false;
  //currPpr = 0;
  //btnStrtMusic.classList.add("hidden");
  intrActn.classList.add("hidden");
  intrTitl.classList.add("hidden");
  scoreHold.classList.remove("hidden");
  
  nH.classList.add('hidden');
  n1.classList.remove("hidden");
  n1.classList.add("newsenter");
  n1.classList.add("newsexit");
  n2.classList.remove("hidden");
  n2.classList.add("newsenter");
  n2.classList.add("newsexit");
  n3.classList.remove("hidden");
  n3.classList.add("newsenter");
  n3.classList.add("newsexit");
  n4.classList.remove("hidden");
  n4.classList.add("newsenter");
  n4.classList.add("newsexit");
  n5.classList.remove("hidden");
  n5.classList.add("newsenter");
  n5.classList.add("newsexit");
  
  //btnMusic.classList.remove("hidden");
  btnRetrn.classList.remove("hidden");
  btnStrtGame.classList.add("btnNewsNext");
  btnStrtGame.classList.add("btnDark");
  btnStrtGame.classList.remove("btnLite");
  btnStrtGame.classList.remove("btnBig");
  btnStrtGame.innerHTML = 'Play game';
  
  intrHide.classList.add("hidden");
  intrHide.style = "pointer-events: none";
  btnStrtGame.classList.add("hidden");
}

/* -------------- Return to splash -------------- */
// When clicking back arrow
$('#btnReturn').on('click', function () { showSplash(); });

// Un-hide all the splash items 
function showSplash() {
  bgmCurr = bgmSplash;
  musicChange();
  onSplash = true;
  currPpr = 0;
  //btnStrtMusic.classList.remove("hidden");
  intrActn.classList.remove("hidden");
  intrTitl.classList.remove("hidden");
  scoreHold.classList.add("hidden");

  nH.classList.remove('hidden');
  n1.classList.add("hidden");
  n1.classList.remove("newsenter");
  n1.classList.remove("newsexit");
  n2.classList.add("hidden");
  n2.classList.remove("newsenter");
  n2.classList.remove("newsexit");
  n3.classList.add("hidden");
  n3.classList.remove("newsenter");
  n3.classList.remove("newsexit");
  n4.classList.add("hidden");
  n4.classList.remove("newsenter");
  n4.classList.remove("newsexit");
  n5.classList.add("hidden");
  n5.classList.remove("newsenter");
  n5.classList.remove("newsexit");

  //btnMusic.classList.add("hidden");
  btnRetrn.classList.add("hidden");
  btnStrtGame.classList.remove("btnNewsNext");
  btnStrtGame.classList.remove("btnDark");
  btnStrtGame.classList.add("btnLite");
  btnStrtGame.classList.add("btnBig");
  btnStrtGame.innerHTML = 'Play game';

  intrHide.classList.remove("hidden");
  intrHide.style = "pointer-events: all";
  btnStrtGame.classList.remove("hidden");
}












// --------------- INTRO & OUTRO INFORMATION SLIDES --------------- //
// Common elments
var sldHider    = document.getElementById("hider");         // Background overlay
var sldChar     = document.getElementById("slideChar");     // Left-side character, used in intro & outro 

// Intro elements
var sldIntro    = document.getElementById("slideIntro");
var sldBtnStart = document.getElementById("btnStartMinigame");
var sldBtnNext  = document.getElementById("btnNxt");
var sldBtnBack  = document.getElementById("btnBck");

// Outro elements
var sldOutroB   = document.getElementById("slideOutroB");
var sldOutroG   = document.getElementById("slideOutroG");
var carryParams = document.getElementById("linkEndMinigame");

var scorePublLocal = 0;
var scoreRiotLocal = 0;
var streetsScoring = false;

// Hide intro slides
function hideSlide () {  
  sldHider.classList.add('hidden');
  sldIntro.classList.add('hidden');
  sldChar.classList.add('hidden');
  sldBtnStart.classList.add('hidden');
  sldBtnNext.classList.add('hidden');
  sldBtnBack.classList.add('hidden');
}

//Show outro slides
function showSlide () {
  sldHider.classList.remove('hidden');
  sldChar.classList.remove('hidden');
  
  // Use different formula for streets minigame
  if(streetsScoring) { console.log('sS');
    // If local:riot score ration is below 2, show bad outro
    if (scorePublLocal <= 12)                   { $("#slideOutroL").removeClass('hidden');}
    else if (scoreRiotLocal >= scorePublLocal) { sldOutroB.classList.remove('hidden'); }
    else                                       { sldOutroG.classList.remove('hidden'); }
  }
  
  // Use for all other minigames
  else { console.log('not sS');
    // If riot score above the set threshold, show bad outro
    if (scoreRiotLocal > scoreLocalThresh) { sldOutroB.classList.remove('hidden'); }
    else                                   { sldOutroG.classList.remove('hidden'); }
  }
  
  // Hide the start button, show the return-to-map button
  sldBtnStart.style = 'display: none;';  
  carryParams.classList.remove('hidden');

  // Update the master score in the button value
  var scorePublCombined = +scorePubl + +scorePublLocal;
  var scoreRiotCombined = +scoreRiot + +scoreRiotLocal;
  var progCombined = gameProg += gameID;
  carryParams.href = "index.html?score_public="+scorePublCombined + "&score_riot="+scoreRiotCombined + "&game=active" + "&prog="+progCombined + "&soundon="+sndStatus;
}





/* ----------------------------------------- */
/* ------------ SCORING UPDATES ------------ */
/* ----------------------------------------- */
// --------------- LOCAL SCORING --------------- //
function updateLocalScore () {
  document.getElementById("scoreP").innerHTML = scorePublLocal;
  document.getElementById("scoreR").innerHTML = scoreRiotLocal;
}



// --------------- MASTER SCORING --------------- //
var scorePubl = 0;
var scoreRiot = 0;
var gameActive;
var gameProg = "0";
var sndActive;

function pullMasterScore () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  scorePubl = urlParams.get('score_public');
  scoreRiot = urlParams.get('score_riot');
  gameActive = urlParams.get('game');
  sndActive = urlParams.get('soundon');
  if(urlParams.get('prog') != null) { gameProg = urlParams.get('prog'); } // check for first play
}

function pushMasterScore () { // only used on map page, otherwise, only local scores shown in scorecard 
  document.getElementById("scoreP").innerHTML = +scorePubl + +scorePublLocal;
  document.getElementById("scoreR").innerHTML = +scoreRiot + +scoreRiotLocal;
}



// --------------- CUSTOM CURSORS --------------- //
var follower = $("#follower");
var offset = $('#gameHolder').offset();
var cursorSize = 48;
var dampening = 2;              // larger number = slower dampening
var mouseX = 0;                 // mouse X co-ordinate within gameHolder
var mouseY = 0;                 // mouse Y co-ordinate within gameHolder
var limitX = 816 - cursorSize;  // X limit of gameHolder
var limitY = 576 - cursorSize;  // Y limit of gameHolder
var xp = 0;                     // X position of cursor image
var yp = 0;                     // Y position of cursor image

// Motion dampening
var loop = setInterval (function() {
  xp += (mouseX - xp) / dampening;
  yp += (mouseY - yp) / dampening;
  follower.css({ left:xp, top:yp });
}, 30);

$(window).mousemove(function(e) {
  // Always hide default cursor
  document.body.style.cursor = 'none'; 

  // Calculate position of cursor relative to gameHolder
  mouseX = Math.min(e.pageX - offset.left - cursorSize/2, limitX);
  mouseY = Math.min(e.pageY - offset.top - cursorSize/2, limitY);
  
  // Constrain custom cursor to interior of gameHolder
  if (mouseX < 0) mouseX = 0;
  if (mouseY < 0) mouseY = 0;
});



// --------------- RNG --------------- //
function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }