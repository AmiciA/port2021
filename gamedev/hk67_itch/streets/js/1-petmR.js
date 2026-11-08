// --------------- RIOT BAR PROGRESS --------------- //
function petmRig () {
  var elem = document.getElementById("petmRigCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (petmRigCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (petmRigProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      petmRigCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && petmRigActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      petmRigCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && petmRigActn == true) { console.log("PETMr tear applied");
      petmRigProg = Math.max(petmRigProg - pushTG, 0); console.log('max: ' + petmRigProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && petmRigActn == true) {
      petmRigProg = Math.max(petmRigProg - pushBT, 0); console.log('max: ' + petmRigProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && petmRigActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      petmRigSpeed = pauseSpeed;
      petmRigPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!petmRigCompleted && petmRigPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      petmRigProg += petmRigSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.width = petmRigProg + "%";
    //console.log('PETM: ' + elem.style.width);

    if (petmRigActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      petmRigActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('petmRig').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!petmRigCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !petmRigCompleted)  { outline = hoverBarr; }
    if (queueTear && !petmRigCompleted)  { outline = hoverTear; }
    if (queueBaton && !petmRigCompleted) { outline = hoverBaton; }
    if (queueLive && !petmRigCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('petmRigCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#petmRig').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    petmRigActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    petmRigActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    petmRigActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    petmRigActn = true;
  }
});