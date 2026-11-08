// --------------- LOCAL SCORING THRESHOLD --------------- //
var scoreLocalThresh = 5;
var gameID = "m";



// --------------- MINIGAME --------------- //
window.onload = function() {                                             // Code will fail if not using this or put <script> at end of <body>
  $(document).ready(function() { 
    pullMasterScore();
    musicInitialCheck();
    //pushMasterScore();
    updateLocalScore();

    $('#btnStartMinigame').on('click', function ()  {
      hideSlide();
      playing = true;
      setTimeout(() => qtePrompt.style.visibility = "visible", 1000);    // Show button prompt 2s after click begin
      setTimeout(() => peep(), 5000);                                    // Start spawning militia 5s after click begin
      setTimeout(() => timeUp = true, timeOut);                          // Stop spawning militia after 1min
    });
  });

  // --------------- SWAP BETWEEN INTRO & HOW-TO-PLAY SLIDES --------------- //
  sldBtnNxtMilitia = document.getElementById("btnNxt");
  sldBtnBckMilitia = document.getElementById("btnBck");
  sldBtnNxtMilitia.addEventListener("click", function() {
    sldIntro.innerHTML = "<img src='militia/assets/ui/militia-intro-2.png'>";
    sldBtnNxtMilitia.style = "display: none";
    sldBtnBckMilitia.style = "display: block";
  });
  sldBtnBckMilitia.addEventListener("click", function() {
    sldIntro.innerHTML = "<img src='militia/assets/ui/militia-intro-1.png'>";
    sldBtnBckMilitia.style = "display: none";
    sldBtnNxtMilitia.style = "display: block";
  });



  // --------------- GAME STATE PROPERTIES --------------- //
  var playing = false;
  var timeUp = false;
  var timeOut = 65000; // Stop spawning new militia after 1 minute
  var qtePrompt = document.getElementById("qteCtrl");
  
  /*function updateLocalScore () {
    document.getElementById("scoreP").innerHTML = scorePublLocal;
    document.getElementById("scoreR").innerHTML = scoreRiotLocal;
  }  */
  
  /*function showSlide () {
    sldHider.classList.add('visible');
    sldHider.classList.remove('hidden');

    if (scoreRiotLocal > scoreLocalThresh) {
      sldOutroB.classList.add('visible');
      sldOutroB.classList.remove('hidden');
    }
    else {
      sldOutroG.classList.add('visible');
      sldOutroG.classList.remove('hidden');
    }
    sldBtnStart.style = 'display: none;';  
    carryParams.classList.add('visible');
    carryParams.classList.remove('hidden');
    carryParams.href = "index.html?score_public=" + scorePubl + "&score_riot=" + scoreRiot + "&game=active";
  }*/
  




  // --------------- BACKGROUND SKY MOVEMENT --------------- //
  // Movement parameters
  var advSky = true;  
  var elemSky = document.getElementById('sSky')
  var posSky = -408;

  // Move sky layer right until leftmost edge of image is at left edge of screen, then reverse  
  setInterval(function() {    
      if      (posSky == 0)    { advSky = false; }
      else if (posSky == -408) { advSky = true; }

      if      (advSky)         { posSky++; }
      else if (!advSky)        { posSky--; }  

      elemSky.style.left = posSky + "px";
  }, 50);



  // --------------- WHACK-A-MOLE PARAMETERS --------------- //
  var holes = document.querySelectorAll('.hole');
  var moles = document.querySelectorAll('.mole');
  var shots = document.querySelectorAll('.mole > img');
  var index;
  var lastIndex;

  // Select a random length of time
  function randomTime(min, max) { return Math.round(Math.random() * (max - min) + min); }



  // --------------- WHACK-A-MOLE POP MOLES UP --------------- //
  function peep() {
    var time = randomTime(1125, 2000);             // how long the mole should remain up
    var hole = randomHole(holes);                  // which random hole will show a mole
    var hitL = document.getElementById('apcHitL'); // bullet ricochet left
    var hitR = document.getElementById('apcHitR'); // bullet ricochet right
    var sndHit = document.getElementById('sndMilitiaShtRcht');

    // ID which moles pop up from below or in from the right
    if (index == 0 || index == 1 || index == 5) { hole.classList.add('left'); }
    else                                        { hole.classList.add('up'); }

    // The mole shoots .3s before it disappears
    setTimeout(() => {

      // Skip mole's shooting animation if mole has been hit
      if (holes[index].classList.contains('shot')) {
        holes[index].classList.remove('shot');
      }

      // Shooting animation & damage
      else {
        // Show muzzle flash on shooter & play sound
        shots[index].style.visibility = "visible";
        sndHit.play();

        // Show bullet ricochet on APC
        if (index == 0 || index == 1 || index == 2) {
          hitR.style.visibility = "visible";
          setTimeout(() => { hitR.style.visibility = "hidden"; }, 200);
        }
        else {
          hitL.style.visibility = "visible";
          setTimeout(() => { hitL.style.visibility = "hidden"; }, 200);
        }

        // Damage APC
        clearInterval(dmgCountdown); // Stop the healing countdown
        dmgLvl++;                    // Add to damage count
        calcDamage();                // Swap damage graphics
        healDamage();                // (Re)start healing countdown
        
        
        
        
        
        
        scoreRiotLocal++;
        updateLocalScore();
      }
    }, time-300);

    // If the mole has not been clicked within its time limit, send it away
    setTimeout(() => {
      hole.classList.remove('up');
      hole.classList.remove('left');
      shots[index].style.visibility = "hidden";

      // Continue game as long as still within time limit (TO BE REMOVED)
      if (!timeUp) { peep(); }
    }, time);
  }

  // Select a new, visible random hole
  function randomHole(holes) {

    // Get a random hole  
    index  = Math.floor(Math.random() * holes.length);
    var hole = holes[index];

    // Prevent same mole from appearing twice in a row
    if (index === lastIndex){ return randomHole(holes); }

    // Prevent moles from appearing when hidden behind APC
    else if (index == 1 && posAPC > -370 && posAPC < 50)  { return randomHole(holes); } // left door
    else if (index == 2 && posAPC > -200 && posAPC < 240) { return randomHole(holes); } // mid street
    else if (index == 5 && posAPC >   20 && posAPC < 450) { return randomHole(holes); } // right doors

    lastIndex = index; // allow to check for repeats on next loop
    return hole;
  }



  // --------------- WHACK-A-MOLE MOLE WHACK --------------- //
  moles.forEach(mole => mole.addEventListener('click', wack));
  function wack(e){
    
    
    
    scorePublLocal++;
    updateLocalScore();
    
    
    
    this.parentNode.classList.add('shot');
    this.parentNode.classList.remove('up');
    this.parentNode.classList.remove('left');
    //scoreBoardO.textContent = score;
  }



  // --------------- SMOKE PUFFS ON CLICK --------------- //
  var puffPrep = 0;                                       // don't show 'first' puff of clicking on start button
  var puffDiv;                                            // the div to be created for each puff
  var puffCount = 0;                                      // iterate multiple puffs (likely redundant now)
  var puffReloaded = true;                                // block new puffs when clicking faster than once/sec
  var puffSpriteAnim;                                     // interval animating through sprite sheet
  var sndPuff = document.getElementById('sndMilitiaTG');  // puff sound

  // Create new puff element
  $('body').click(function(e){
    if (playing && puffReloaded) {
      if (puffCount > 0) {
        puffDiv = document.createElement("puffDiv");
          puffDiv.id = "smokepuff" + puffCount; 
          puffDiv.classList.add('smokepuff');
          puffDiv.style.top = e.clientY - 96 - 12 + "px";
          puffDiv.style.left = e.clientX - 96 + 7 + "px";
        this.appendChild(puffDiv);

        puffReloaded = false;
        animatePuff();
        sndPuff.play();
      }
      else { puffCount++; }
    }
  });

  // Animate through sprite sheet
  function animatePuff() {
    var position = 0;     // sprite sheet start position
    const interval = 40;  // speed of animation (setInterval() interval)
    const diff = 191;     // position offset (width of one frame)

    puffSpriteAnim = setInterval(() => {
      document.getElementById("smokepuff" + puffCount).style.backgroundPosition = `-${position}px 0px`; // ES6 template literal to insert the variable "position"
      if (position < 1910 - diff) {
        position = position + diff;
      }
      else {
        puffReloaded = true;
        puffCount++;
        clearInterval(puffSpriteAnim);
        puffDiv.remove(); }
    }, interval);
  }



  // --------------- APC DAMAGE & RECOVERY --------------- //
  var dmgLvl = 0; 
  var dmgCountdown;
  var dmg1 = document.getElementById('apcDmg1');
  var dmg2 = document.getElementById('apcDmg2');
  var dmg3 = document.getElementById('apcDmg3');
  var sndAPCDmg = document.getElementById('sndMilitiaAPCDmg');

  function calcDamage() {
    if (dmgLvl == 0) {
      dmg1.style.opacity = "0";
      dmg2.style.opacity = "0";
      dmg3.style.opacity = "0";
      speedmultAPC = 1;
    }
    else if (dmgLvl == 1) { 
      dmg1.style.opacity = "1";
      dmg2.style.opacity = "0";
      dmg3.style.opacity = "0";
      speedmultAPC = .75;
    }
    else if (dmgLvl == 2) { 
      dmg1.style.opacity = "0";
      dmg2.style.opacity = "1";
      dmg3.style.opacity = "0";
      speedmultAPC = .5;
    }
    else if (dmgLvl >= 3) { 
      dmg1.style.opacity = "0";
      dmg2.style.opacity = "0";
      dmg3.style.opacity = "1";
      speedmultAPC = .25;
      sndAPCDmg.play();
    }
  }

  function healDamage() {
    dmgCountdown = setInterval(function() {
      if      (dmgLvl >= 3) { dmgLvl = 2; }
      else if (dmgLvl == 2) { dmgLvl = 1; }
      else if (dmgLvl == 1) { dmgLvl = 0; }
      else if (dmgLvl == 0) { clearInterval(dmgCountdown); }
      calcDamage();
    }, 3000);
  }



  // --------------- APC QTE LEFT-RIGHT CONTROLS --------------- //
  var keyCatchRig;
  var keyCatchLef;
  var sndAPCGo = document.getElementById('sndMilitiaAPCStrt');
  var seconds = .25; // Must click key faster than this to keep APC moving

  // Check for keypresses (keyup does not disturb browser shortcut combos)
  document.addEventListener("keyup", function(event) {
    if (playing) {

      // Moving the APC rightwards (reversing)
      if (event.code == "KeyD" || event.code == "ArrowRight") {

        // Allow APC to move rightwards on second keystroke (first keystroke creates keyCatchRig, second checks it)
        if (keyCatchRig) {
          if (!advAPC) { sndAPCGo.play(); }
          clearTimeout(keyCatchRig);
          keyCatchRig = null;
          advAPC = true;
          backAPC();
        }

        // Stops movement after specified timeout if this function has not been recreated
        keyCatchRig = setTimeout(function() {
          advAPC = false;
          stopAPC();
        }, seconds * 1000);
      }

      // Moving the APC leftwards (driving forward)
      else if (event.code == "KeyA" || event.code == "ArrowLeft") {

        // Allow APC to move leftwards on second keystroke
        if (keyCatchLef) {
          if (!retAPC) { sndAPCGo.play(); }
          clearTimeout(keyCatchLef);
          keyCatchLef = null;
          retAPC = true;
          foreAPC();
        }

        // Stops movement after specified timeout if this function has not been recreated
        keyCatchLef = setTimeout(function() { 
          retAPC = false;
          stopAPC();
        }, seconds * 1000);
      }
    }
  });

  // APC movement details; swapping parts out
  var wheelsForw = document.getElementById('apcWheelsFore');
  var wheelsStop = document.getElementById('apcWheelsStop');
  var wheelsBack = document.getElementById('apcWheelsBack');

  function stopAPC () {
    wheelsStop.style.opacity = "1";
    wheelsForw.style.opacity = "0";
    wheelsBack.style.opacity = "0";
  }

  function foreAPC () {
    wheelsStop.style.opacity = "0";
    wheelsForw.style.opacity = "1";
    wheelsBack.style.opacity = "0";
  }

  function backAPC () {
    wheelsStop.style.opacity = "0";
    wheelsForw.style.opacity = "0";
    wheelsBack.style.opacity = "1";
  }



  // --------------- APC MOVEMENT FUNCTIONALITY --------------- //
  var elemAPC = document.getElementById('apc'); // Base APC element
  var advAPC = false;                           // Set if QTE in-progress
  var retAPC = false;                           // Set if QTE in-progress
  var posAPC = -400;                            // Starting position of APC (make sure to align with CSS)
  var speedmultAPC = 1;                         // Will be reduce upon taking damage

  var timerAPC = setInterval(function() {

    // Move APC to the right or left, depending on key pressed
    if      (advAPC && posAPC <= 115) { posAPC += 1 * speedmultAPC; }
    else if (retAPC && posAPC <= 115) { posAPC -= 1 * speedmultAPC; }

    // When the APC arrives, play inureds-gathering animations
    else if (posAPC >= 115) {
      clearInterval(timerAPC);
      gatherInjureds();
    }

    // Adjust APC position
    elemAPC.style.left = posAPC + "px";
  }, 20);



  // --------------- MIDPOINT GURKHA PARAMETERS --------------- //
  var gurkhaAnimStage = 0;                                       // determine which gifs to show & hide
  var gurkhaAnimX = -120;                                        // gurkha X position
  var gurkhaAnimY = 90;                                          // gurkha Y position
  var gurkhaHoldAnimY = 0;                                       // animation holder & mask Y position, counterbalance so gurkha can be hidden in APC & still go down to ground level

  var gurkhaHold = document.getElementById('apcAnimHolder');     // holder for all gifs
  var gurkhaAnimRun = document.getElementById('apcAnimRun');     // 1: running out of the APC
  var gurkhaAnimGat = document.getElementById("apcAnimGat");     // 2: cloud to hide removal of injureds
  var gurkhaAnimRet = document.getElementById("apcAnimRet");     // 3: running back to APC with injureds
  var gurkhaAnimInj = document.getElementById("apcInjureds");    // the injureds being removed from the scene

  var doorManned = document.getElementById('apcDoorManned');     // door, interior, & sitting gurkha
  var doorEmpty = document.getElementById('apcDoorEmpty');       // door & interior; no sitting gurkha
  var doorClosed = document.getElementById('apcDoorClosed');     // closed door

  var qteBtnD = document.getElementById("qteD");                 // bottom-of-screen prompt to press D (right) button
  var qteBtnA = document.getElementById("qteA");                 // bottom-of-screen prompt to press A (left) button



  // --------------- SERIES OF INJUREDS-COLLECTING ANIMATIONS --------------- //
  function gatherInjureds () {
    timer = setInterval(function() {

      // 1: Exit APC & go to injureds
      if (gurkhaAnimX <= 50 && gurkhaAnimStage == 0) {
        document.getElementById('sndMilitiaRescue').play();

        // Hide gurkha sitting in APC & button prompt
        doorManned.style.opacity = "0";
        doorEmpty.style.opacity = "1";
        qteBtnD.style.display = "none";

        // Move gurkha from APC to ground level
        if (gurkhaAnimY < 120) {
          gurkhaAnimY-=1;
          gurkhaHoldAnimY+=1.3;
        }
        gurkhaAnimRun.style.top = gurkhaAnimY + "px";
        gurkhaHold.style.top = gurkhaHoldAnimY + "px";

        // Move gurkha forward
        gurkhaAnimX+=2;
        gurkhaAnimRun.style.left = gurkhaAnimX + "px";

        // Trigger scene change when gurkha is far enough right
        if (gurkhaAnimX == 50) {
          gurkhaAnimStage = 1;
        }
      }

      // 2: Hide gathering of injureds behind cloud
      else if (gurkhaAnimStage == 1) {

        // Swap graphics
        gurkhaAnimGat.style.visibility = "visible";
        gurkhaAnimRun.style.visibility = "hidden";
        gurkhaAnimInj.style.visibility = "hidden";

        // Trigger scene change after 1s
        setTimeout(function() { gurkhaAnimStage = 2; }, 1000);
      }

      // 3: Return to APC with injureds
      else if (gurkhaAnimStage == 2) {

        // Swap graphics
        gurkhaAnimGat.style.visibility = "hidden";
        gurkhaAnimRet.style.visibility = "visible";

        // Move gurkha & injureds backwards
        if (gurkhaAnimX >= -190) {

          // Move gurkha from ground level up to APC level
          if (gurkhaAnimY < 90) {
            gurkhaAnimY+=1;
            gurkhaHoldAnimY-=1.3;
          }
          gurkhaAnimRet.style.top = gurkhaAnimY + "px";
          gurkhaHold.style.top = gurkhaHoldAnimY + "px";

          // Move gurkha backwards towards APC
          gurkhaAnimX--;
          gurkhaAnimRet.style.left = gurkhaAnimX + "px";

          // Trigger allowing car to return
          if (gurkhaAnimX == -190) {
            gurkhaAnimStage = 3;
          }
        }
      }

      // 4: Allow car to return
      else if (gurkhaAnimStage == 3) {
        // Close APC door & show next control button
        doorEmpty.style.opacity = "0";
        doorClosed.style.opacity = "1";
        qteBtnA.style.display = "block";

        // Move APC to the right or left, depending on key pressed
        if (posAPC <= -450 || posAPC >= 750 ) { 
          qtePrompt.style.visibility = "hidden"
          showSlide();
          clearInterval(timer);
          playing = false;
          timeUp = true;
        }
        else {
          if (advAPC)      { posAPC += 1 * speedmultAPC; }
          else if (retAPC) { posAPC -= 1 * speedmultAPC; }
          elemAPC.style.left = posAPC + "px";
        }
      }
    }, 10);
  }
}