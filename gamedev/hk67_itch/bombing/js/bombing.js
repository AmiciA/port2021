// --------------- LOCAL SCORING THRESHOLD --------------- //
var scoreLocalThresh = 2;
var gameID = "b";



// --------------- AUDIO --------------- //
var sndXpld = document.getElementById('sndExplode');
var sndWinr = document.getElementById('sndCorrect');
var sndAnoy = document.getElementById('sndAnnoyed');



// --------------- RENDER INITIAL SCENE & CARRY SCORING IN --------------- //
$(document).ready(function() { 
  pullMasterScore();
  musicInitialCheck();
  updateLocalScore();
  //pushMasterScore();
    
  $('#btnStartMinigame').on('click', function ()  {
    hideSlide();
    distributeBombs();
    allocateImages();
    bomb1Flow();
    bomb2Flow();
    bomb3Flow();
    bomb4Flow();
    bomb5Flow();
  });
});



// --------------- SWAP BETWEEN INTRO & HOW-TO-PLAY SLIDES --------------- //
sldBtnNxtBomb = document.getElementById("btnNxt");
sldBtnBckBomb = document.getElementById("btnBck");
sldBtnNxtBomb.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='bombing/assets/bomb-intro-2.png'>";
  sldBtnNxtBomb.style = "display: none";
  sldBtnBckBomb.style = "display: block";
});
sldBtnBckBomb.addEventListener("click", function() {
  sldIntro.innerHTML = "<img src='bombing/assets/bomb-intro-1.png'>";
  sldBtnBckBomb.style = "display: none";
  sldBtnNxtBomb.style = "display: block";
});




// --------------- DETERMINE WHICH BOMBS ARE REAL & FAKE --------------- //
var bomb1Real, bomb2Real, bomb3Real, bomb4Real, bomb5Real;
var bombsReal = new Array();

function distributeBombs () {    
  // Add all bombs to the array
  for (var i = 1; i <= 5; i++) { bombsReal.push(eval("bomb" + i + "Real")); }

  // Set bomb boolean values
  var trues = 0;
  for (var j = 0; j < bombsReal.length; j++) {
    // Choose new random number each loop, keep track of trues
    var rand = getRandomInt(2);
    console.log("trues: " + trues + "; " + "rand: " + rand);
    
    // If all 4 previous bombs are fake, set the last one to real
    if (j == 4 && trues == 0) {
      bombsReal[j] = true;
      console.log("If all 4 previous bombs are fake, set the last one to real");
    }
    
    // set up to 2 total bombs to real
    else if (rand == 1 && trues < 2) {
      trues++;
      bombsReal[j] = true;
      console.log("set up to 2 total bombs to real");
    }
    // Set the rest of the bombs to false
    else {
      bombsReal[j] = false;
      console.log("Set the rest of the bombs to false");
    }
    console.log(bombsReal);
  }
}


// --------------- BOMB TIMING PARAMETERS --------------- //
var bombSpeed = 250;
var alertTime = 20; // percentage at which icon switches to alert icon
  


// --------------- BOMB PROPERTIES --------------- //
var bomb1Bar = document.getElementById("bomb1Timer");
var bomb1Img = document.getElementById("bomb1Img");
var bomb1Prog = 100;
var bomb1Stat = true;
var bomb1Defu = false;
var bomb1DetailFront;
var bomb1DetailBack;
var bomb1DetailUnder;

var bomb2Bar = document.getElementById("bomb2Timer");
var bomb2Img = document.getElementById("bomb2Img");
var bomb2Prog = 100;
var bomb2Stat = true;
var bomb2Defu = false;
var bomb2DetailFront;
var bomb2DetailBack;
var bomb2DetailUnder;

var bomb3Bar = document.getElementById("bomb3Timer");
var bomb3Img = document.getElementById("bomb3Img");
var bomb3Prog = 100;
var bomb3Stat = true;
var bomb3Defu = false;
var bomb3DetailFront;
var bomb3DetailBack;
var bomb3DetailUnder;

var bomb4Bar = document.getElementById("bomb4Timer");
var bomb4Img = document.getElementById("bomb4Img");
var bomb4Prog = 100;
var bomb4Stat = true;
var bomb4Defu = false;
var bomb4DetailFront;
var bomb4DetailBack;
var bomb4DetailUnder;

var bomb5Bar = document.getElementById("bomb5Timer");
var bomb5Img = document.getElementById("bomb5Img");
var bomb5Prog = 100;
var bomb5Stat = true;
var bomb5Defu = false;
var bomb5DetailFront;
var bomb5DetailBack;
var bomb5DetailUnder;



// --------------- BOMB CURRENT STATUS --------------- //
// If bomb has gone through defusal process, pull status out
function defusalstatus () {
  if (bombCurrNum == 0) { bomb1Defu = true;
                          bomb1Stat = false; }
  if (bombCurrNum == 1) { bomb2Defu = true;
                          bomb2Stat = false; }
  if (bombCurrNum == 2) { bomb3Defu = true;
                          bomb3Stat = false; }
  if (bombCurrNum == 3) { bomb4Defu = true;
                          bomb4Stat = false; }
  if (bombCurrNum == 4) { bomb5Defu = true;
                          bomb5Stat = false; }
}

// If bomb has been ignored, pull status out
function ignorestatus () {
  if (bombCurrNum == 0) { bomb1Stat = false; }
  if (bombCurrNum == 1) { bomb2Stat = false; }
  if (bombCurrNum == 2) { bomb3Stat = false; }
  if (bombCurrNum == 3) { bomb4Stat = false; }
  if (bombCurrNum == 4) { bomb5Stat = false; }
}



// --------------- END GAME --------------- //
function endGameBombing () {
  if (bomb1Stat == false && bomb2Stat == false && bomb3Stat == false && bomb4Stat == false && bomb5Stat == false) {
    setTimeout(function(){ showSlide(); }, 750);
  }
}



// --------------- DEFUSAL MODAL PARAMETERS --------------- //
// Defusal buttons & timer process variables
var modalOpen = false;
var btnDefuse = document.getElementById("btnBombReal");        // Defuse button 
var btnIgnore = document.getElementById("btnBombFake");        // Ignore button
var defProg = document.getElementById("defusalProgress");      // Wrapper for defusal timer
var defTimer = document.getElementById("defusalBarCurr");      // Background bar
var defTimerActive = false;                                    // true = a defusal is in-progress
var defVal;                                                    // Full width of the animated defusal bar
var countSpeed   = 5;                                          // Speed at which defusal and ignore processes are run
var defSuccDelay = 2;                                          // Amount of time to display success message after defusal timer reaches 0
var defIgnrDelay = 2;                                          // Amount of time to display ignore result message
var bombCurrNum;                                               // The number (in the array) of the bomb passed into the openModal function
var bombCurrReal;                                              // Whether or not the passed-in bomb is real or fake

// Track which bomb's modal window has been opened
var modal1Open = false;
var modal2Open = false;
var modal3Open = false;
var modal4Open = false;
var modal5Open = false;

function closeModals () {
  modal1Open = false;
  modal2Open = false;
  modal3Open = false;
  modal4Open = false;
  modal5Open = false;
}

// Open the modal and ID the clicked bomb
function openModal (bombXNum, bombXReal) {
  modalOpen = true;
  document.getElementById("modal").style = "display: block";
  document.getElementById("modalhider").classList.add('mhvisible');
  
  // Set bomb identifiers as global variables
  console.log("bom X numm: " + bombXNum);
  bombCurrNum = bombXNum;
  bombCurrReal = bombXReal;
  console.log("bom cur numm: " + bombCurrNum);
  
  // Mark which bomb's modal is currently open
  if (bombCurrNum == 0) { modal1Open = true; }
  if (bombCurrNum == 1) { modal2Open = true; }
  if (bombCurrNum == 2) { modal3Open = true; }
  if (bombCurrNum == 3) { modal4Open = true; }
  if (bombCurrNum == 4) { modal5Open = true; }
}



// --------------- DEFUSAL PROCESS --------------- //
// As long as a defusal is not in-progress, start the defusal
btnDefuse.addEventListener("click", function() {
  if (!defTimerActive) { defuseCountdown(); }
});  
  
// Start the countdown
function defuseCountdown () {
  defVal = document.getElementById("defusalBarCurr").offsetWidth;
    
  // Defusal countdown timer process
  var intL = setInterval(function frame() {
    
    // Activate timer and run until 0
    if (defVal > 0) {
      defTimerActive = true;
      defProg.style = "visibility: visible";
      document.getElementById("cntdn").innerHTML = Math.round(defVal * 0.02041);
      document.getElementById("defusalBarCurr").style.width = defVal + 'px';
      defVal -= .49;
    }
    
    // Show a short success message once countdown complete
    else if (defVal < 0 && Math.round(defVal * 0.02041) > -defSuccDelay) {
      
      // Continue to run the timer during the success message
      defVal -= .49;
      
      // Change style of result message text
      document.getElementById("defusalTimeCurr").classList.add("succ");
      
      // Defused bomb is a real bomb
      if (bombCurrReal) {
        defProg.style.backgroundColor                      = "#2D8435";
        defProg.style.boxShadow                            = "0px 3px #17511A";
        document.getElementById("cntdn").innerHTML         = "Live bomb defused";
        document.getElementById("cntdnZH").style           = "display: none";
        document.getElementById("defusalBarCurr").style    = "display: none;";
        document.getElementById("defusalBarCurrBkg").style = "display: none;";
        
      }
    
      // Defused bomb is a fake bomb
      else if (!bombCurrReal) {
        defProg.style.backgroundColor                      = "#FF8F33";
        defProg.style.boxShadow                            = "0px 3px #C96411";
        document.getElementById("cntdn").innerHTML         = "Fake bomb neutralised";
        document.getElementById("cntdnZH").style           = "display: none";
        document.getElementById("defusalBarCurr").style    = "display: none;";
        document.getElementById("defusalBarCurrBkg").style = "display: none;";
      }
    }
    
    // End timer and close defusal modal
    else if (defVal < -defSuccDelay) {      
      console.log('defval: ' + defVal);
      defTimerActive = false;
      modalOpen = false;
      closeModals();
      defProg.style = "visibility: hidden";
      document.getElementById('modal').style             = "display: none";
      document.getElementById("modalhider").classList.remove('mhvisible');
      document.getElementById("defusalTimeCurr").classList.remove("succ");
      document.getElementById("cntdnZH").style           = "display: inline;";
      document.getElementById("defusalBarCurr").style    = "display: block;";
      document.getElementById("defusalBarCurrBkg").style = "display: block;";
      clearInterval(intL);
      updateLocalScore();
      endGameBombing();
    }
  },countSpeed);
  
  // Update which bomb was just defused based on bombCurrNum
  defusalstatus();
  defVal = 490;
}



// --------------- IGNORE PROCESS --------------- //
// As long as a defusal is not in-progress, ignore the bomb
btnIgnore.addEventListener("click", function() {
  if (!defTimerActive) { ignoreCountdown(); }
});

var defIgnrCount = 0
function ignoreCountdown () {    
  // Defusal countdown timer process
  var intM = setInterval(function frame() {
    
    // Display result message for a short time
    if (defIgnrCount < defIgnrDelay) {
      defIgnrCount += 0.01;
      
      // Change style of result message text
      document.getElementById("defusalTimeCurr").classList.add("succ");
      
      // Show defusal bar without progress bar
      defProg.style = "visibility: visible";
      document.getElementById("defusalBarCurr").style.display = "none";
      document.getElementById("defusalBarCurrBkg").style.display = "none";
      
      // Ignored bomb is a real bomb
      if (bombCurrReal) {
        defProg.style.backgroundColor                      = "#CE2E45";
        defProg.style.boxShadow                            = "0px 3px #9d2334";
        document.getElementById("cntdnZH").innerHTML       = "拒絕成功　";
        document.getElementById("cntdn").innerHTML         = "Real bomb ignored!";
        document.getElementById("cntdnZH").style           = "display: none";
        document.getElementById("defusalBarCurr").style    = "display: none;";
        document.getElementById("defusalBarCurrBkg").style = "display: none;";
      }

      // Ignored bomb is a fake bomb
      else if (!bombCurrReal) {
        defProg.style.backgroundColor                      = "#2D8435";
        defProg.style.boxShadow                            = "0px 3px #17511A";
        document.getElementById("cntdnZH").innerHTML       = "假炸彈被中和　";
        document.getElementById("cntdn").innerHTML         = "Fake bomb ignored";
        document.getElementById("cntdnZH").style           = "display: none";
        document.getElementById("defusalBarCurr").style    = "display: none;";
        document.getElementById("defusalBarCurrBkg").style = "display: none;";
      }
    }
    
    // End timer and close defusal modal
    else {
      modalOpen = false;
      closeModals();
      defProg.style                                        = "visibility: hidden";
      document.getElementById('modal').style               = "display: none";
      document.getElementById("modalhider").classList.remove('mhvisible');
      document.getElementById("defusalTimeCurr").classList.remove("succ");
      document.getElementById("cntdnZH").style             = "display: inline;";
      document.getElementById("defusalBarCurr").style      = "display: block;";
      document.getElementById("defusalBarCurrBkg").style   = "display: block;";
      clearInterval(intM);
      updateLocalScore();
      endGameBombing();
    }
  },countSpeed);
  
  // Update which bomb was just defused based on bombCurrNum
  ignorestatus();
  defIgnrCount = 0
}



// --------------- CANCEL MODAL --------------- //
document.getElementById("modalClose").addEventListener("click", function() {
  modalOpen = false;
  closeModals();
  defProg.style = "visibility: hidden";
  document.getElementById('modal').style = "display: none";
  document.getElementById("modalhider").classList.remove('mhvisible');
  bombCurrNum = undefined;
  bombCurrReal = undefined;
});
    
  

// --------------- DEFUSAL MODAL SET-UP --------------- //
// Gallery objects
var selectedImg = document.getElementById('imageHolder');
var images = document.getElementById('imageList').getElementsByTagName('li');

// Arrow images
var ArrowL = document.getElementById("btnArrowLeft");
var ArrowM = document.getElementById("btnArrowMiddle");
var ArrowR = document.getElementById("btnArrowRight");

ArrowL.addEventListener('click', activateImage);
ArrowM.addEventListener('click', activateImage);
ArrowR.addEventListener('click', activateImage);

// Swap images
function activateImage(event) {
  // Set bomb image variables once <img>s have been assigned in bomb_.js files
  var bombBigFrontImg = document.getElementById("bombBigFront").innerHTML;
  var bombBigBackImg = document.getElementById("bombBigBack").innerHTML;
  var bombBigUnderImg = document.getElementById("bombBigUnder").innerHTML;
  
  // When clicking the side arrows, swap front and back images
  if (event.target.id == "btnArrowLeft" || event.target.id == "btnArrowRight") { 
    if      (selectedImg.innerHTML == bombBigBackImg) { selectedImg.innerHTML = bombBigFrontImg; }
    else if (selectedImg.innerHTML == bombBigFrontImg) { selectedImg.innerHTML = bombBigBackImg; }
  }
  // When clicking the middle arrow, swap between bottom and front images
  else if (event.target.id == "btnArrowMiddle") {
    if      (selectedImg.innerHTML == bombBigUnderImg)                                       { selectedImg.innerHTML = bombBigFrontImg; }
    else if (selectedImg.innerHTML == bombBigFrontImg || selectedImg.innerHTML == bombBigBackImg) { selectedImg.innerHTML = bombBigUnderImg; }
  }  
}


// --------------- ALLOCATE <IMG>S --------------- //
function allocateImages () { console.log('alloimgs');
  var alloTrues = 0;
  var alloFalses = 0;

  var bRaF = '<img src="bombing/assets/bombs/bomb-Ra-F.png">';
  var bRaB = '<img src="bombing/assets/bombs/bomb-Ra-B.png">';
  var bRaU = '<img src="bombing/assets/bombs/bomb-Ra-U.png">';

  var bRbF = '<img src="bombing/assets/bombs/bomb-Rb-F.png">';
  var bRbB = '<img src="bombing/assets/bombs/bomb-Rb-B.png">';
  var bRbU = '<img src="bombing/assets/bombs/bomb-Rb-U.png">';

  var bFaF = '<img src="bombing/assets/bombs/bomb-Fa-F.png">';
  var bFaB = '<img src="bombing/assets/bombs/bomb-Fa-B.png">';
  var bFaU = '<img src="bombing/assets/bombs/bomb-Fa-U.png">';

  var bFbF = '<img src="bombing/assets/bombs/bomb-Fb-F.png">';
  var bFbB = '<img src="bombing/assets/bombs/bomb-Fb-B.png">';
  var bFbU = '<img src="bombing/assets/bombs/bomb-Fb-U.png">';

  var bFcF = '<img src="bombing/assets/bombs/bomb-Fc-F.png">';
  var bFcB = '<img src="bombing/assets/bombs/bomb-Fc-B.png">';
  var bFcU = '<img src="bombing/assets/bombs/bomb-Fc-U.png">';
  
  var bFdF = '<img src="bombing/assets/bombs/bomb-Fd-F.png">';
  var bFdB = '<img src="bombing/assets/bombs/bomb-Fd-B.png">';
  var bFdU = '<img src="bombing/assets/bombs/bomb-Fd-U.png">';

  // Bomb 1 allocation
  if (bombsReal[0] == true) { console.log('#1 true');
    if (alloTrues == 0) { console.log('#1 true, allotrues = ' + alloTrues);
      alloTrues++;
      bomb1DetailFront = bRaF;
      bomb1DetailBack  = bRaB;
      bomb1DetailUnder = bRaU;
    }
    else if (alloTrues == 1) {  console.log('#1 true, allotrues = ' + alloTrues);
      alloTrues++;
      bomb1DetailFront = bRbF;
      bomb1DetailBack  = bRbB;
      bomb1DetailUnder = bRbU;
    }
  }
  else if (bombsReal[0] == false) { console.log('#1 false');
    if (alloFalses == 0) { console.log('#1 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb1DetailFront = bFaF;
      bomb1DetailBack  = bFaB;
      bomb1DetailUnder = bFaU;
    }
    else if (alloFalses == 1) { console.log('#1 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb1DetailFront = bFbF;
      bomb1DetailBack  = bFbB;
      bomb1DetailUnder = bFbU;
    }
    else if (alloFalses == 2) { console.log('#1 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb1DetailFront = bFcF;
      bomb1DetailBack  = bFcB;
      bomb1DetailUnder = bFcU;
    }
  }

  // Bomb 2 allocation
  if (bombsReal[1] == true) { console.log('#2 true,');
    if (alloTrues == 0) { console.log('#2 true, allotrues = ' + alloTrues);
      alloTrues++;
      bomb2DetailFront = bRaF;
      bomb2DetailBack  = bRaB;
      bomb2DetailUnder = bRaU;
    }
    else if (alloTrues == 1) {
      alloTrues++;
      bomb2DetailFront = bRbF;
      bomb2DetailBack  = bRbB;
      bomb2DetailUnder = bRbU;
    }
  }
  else if (bombsReal[1] == false) {console.log('#2 false,');
    if (alloFalses == 0) {console.log('#2 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb2DetailFront = bFaF;
      bomb2DetailBack  = bFaB;
      bomb2DetailUnder = bFaU;
    }
    else if (alloFalses == 1) {console.log('#2 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb2DetailFront = bFbF;
      bomb2DetailBack  = bFbB;
      bomb2DetailUnder = bFbU;
    }
    else if (alloFalses == 2) {console.log('#2 false, allofalses = ' + alloFalses);
      alloFalses++;
      bomb2DetailFront = bFcF;
      bomb2DetailBack  = bFcB;
      bomb2DetailUnder = bFcU;
    }
  }

  // Bomb 3 allocation
  if (bombsReal[2] == true) {
    if (alloTrues == 0) {
      alloTrues++;
      bomb3DetailFront = bRaF;
      bomb3DetailBack  = bRaB;
      bomb3DetailUnder = bRaU;
    }
    else if (alloTrues == 1) {
      alloTrues++;
      bomb3DetailFront = bRbF;
      bomb3DetailBack  = bRbB;
      bomb3DetailUnder = bRbU;
    }
  }
  else if (bombsReal[2] == false) {
    if (alloFalses == 0) {
      alloFalses++;
      bomb3DetailFront = bFaF;
      bomb3DetailBack  = bFaB;
      bomb3DetailUnder = bFaU;
    }
    else if (alloFalses == 1) {
      alloFalses++;
      bomb3DetailFront = bFbF;
      bomb3DetailBack  = bFbB;
      bomb3DetailUnder = bFbU;
    }
    else if (alloFalses == 2) {
      alloFalses++;
      bomb3DetailFront = bFcF;
      bomb3DetailBack  = bFcB;
      bomb3DetailUnder = bFcU;
    }
  }

  // Bomb 4 allocation
  if (bombsReal[3] == true) {
    if (alloTrues == 0) {
      alloTrues++;
      bomb4DetailFront = bRaF;
      bomb4DetailBack  = bRaB;
      bomb4DetailUnder = bRaU;
    }
    else if (alloTrues == 1) {
      alloTrues++;
      bomb4DetailFront = bRbF;
      bomb4DetailBack  = bRbB;
      bomb4DetailUnder = bRbU;
    }
  }
  else if (bombsReal[3] == false) {
    if (alloFalses == 0) {
      alloFalses++;
      bomb4DetailFront = bFaF;
      bomb4DetailBack  = bFaB;
      bomb4DetailUnder = bFaU;
    }
    else if (alloFalses == 1) {
      alloFalses++;
      bomb4DetailFront = bFbF;
      bomb4DetailBack  = bFbB;
      bomb4DetailUnder = bFbU;
    }
    else if (alloFalses == 2) {
      alloFalses++;
      bomb4DetailFront = bFcF;
      bomb4DetailBack  = bFcB;
      bomb4DetailUnder = bFcU;
    }
    else if (alloFalses == 3) {
      alloFalses++;
      bomb4DetailFront = bFdF;
      bomb4DetailBack  = bFdB;
      bomb4DetailUnder = bFdU;
    }
  }

  // Bomb 5 allocation
  if (bombsReal[4] == true) {
    if (alloTrues == 0) {
      alloTrues++;
      bomb5DetailFront = bRaF;
      bomb5DetailBack  = bRaB;
      bomb5DetailUnder = bRaU;
    }
    else if (alloTrues == 1) {
      alloTrues++;
      bomb5DetailFront = bRbF;
      bomb5DetailBack  = bRbB;
      bomb5DetailUnder = bRbU;
    }
  }
  else if (bombsReal[4] == false) {
    if (alloFalses == 0) {
      alloFalses++;
      bomb5DetailFront = bFaF;
      bomb5DetailBack  = bFaB;
      bomb5DetailUnder = bFaU;
    }
    else if (alloFalses == 1) {
      alloFalses++;
      bomb5DetailFront = bFbF;
      bomb5DetailBack  = bFbB;
      bomb5DetailUnder = bFbU;
    }
    else if (alloFalses == 2) {
      alloFalses++;
      bomb5DetailFront = bFcF;
      bomb5DetailBack  = bFcB;
      bomb5DetailUnder = bFcU;
    }
    else if (alloFalses == 3) {
      alloFalses++;
      bomb5DetailFront = bFdF;
      bomb5DetailBack  = bFdB;
      bomb5DetailUnder = bFdU;
    }
  }
}