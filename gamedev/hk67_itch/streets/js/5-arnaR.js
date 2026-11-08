// --------------- RIOT BAR PROGRESS --------------- //
function arnaRig () {
  var elem = document.getElementById("arnaRigCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (arnaRigCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (arnaRigProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      arnaRigCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && arnaRigActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      arnaRigCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && arnaRigActn == true) {  console.log("priorARNA:" + arnaRigProg);
      arnaRigProg = Math.max(arnaRigProg - pushTG, 0);        console.log("maxARNA:" + arnaRigProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && arnaRigActn == true) {
      arnaRigProg = Math.max(arnaRigProg - pushBT, 0);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && arnaRigActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      arnaRigSpeed = pauseSpeed;
      arnaRigPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!arnaRigCompleted && arnaRigPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      arnaRigProg += arnaRigSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.width = arnaRigProg + "%";
    //console.log('ARNA: ' + elem.style.width);

    if (arnaRigActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      arnaRigActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('arnaRig').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
  var rectXorigin = barRect.x - $('#gameHolder').offset().left - 24;          // left-most X co-ordinate of bar, corrected to be measured from gameHolder origin and adjusted for 48px cursor
  var rectYorigin = barRect.y - $('#gameHolder').offset().top - 24;           // top-most Y co-ordinate of bar, corrected to be measured from gameHolder origin and adjusted for 48px cursor
  var rectXend = rectXorigin + barRect.width;                                 // right-most X co-ordinate of the bar, adjusted to account for extra bounding space on left
  var rectYend = rectYorigin + barRect.height;                                // bottom-most Y co-ordinate of the bar, adjusted to account for extra bounding space on top
  var outline;

  // Check if cursor is within bounds of riotBar (x: 226–492, y: 042–078)
  if (mouseX >= rectXorigin && 
      mouseX <= rectXend    &&
      mouseY >= rectYorigin &&
      mouseY <= rectYend) {

    // Show hover effect around riotBar
    if (!arnaRigCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !arnaRigCompleted)  { outline = hoverBarr; }
    if (queueTear && !arnaRigCompleted)  { outline = hoverTear; }
    if (queueBaton && !arnaRigCompleted) { outline = hoverBaton; }
    if (queueLive && !arnaRigCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('arnaRigCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#arnaRig').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    arnaRigActn = true;
  }
  else if (queueTear)  {
    applyTear = true; arnaRigActn = true;
  }
  else if (queueBaton) {
    applyBaton = true; arnaRigActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    arnaRigActn = true;
  }
});