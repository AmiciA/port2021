// --------------- RIOT BAR PROGRESS --------------- //
function arnaBot () {
  var elem = document.getElementById("arnaBotCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (arnaBotCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (arnaBotProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      arnaBotCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && arnaBotActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      arnaBotCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && arnaBotActn == true) {
      arnaBotProg = Math.max(arnaBotProg - pushTG, 0); console.log('max: ' + arnaBotProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && arnaBotActn == true) {
      //arnaBotProg -= 30;
      arnaBotProg = Math.max(arnaBotProg - pushBT, 0); console.log('max: ' + arnaBotProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && arnaBotActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      arnaBotSpeed = pauseSpeed;
      arnaBotPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!arnaBotCompleted && arnaBotPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      arnaBotProg += arnaBotSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = arnaBotProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (arnaBotActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      arnaBotActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('arnaBot').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!arnaBotCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !arnaBotCompleted)  { outline = hoverBarr; }
    if (queueTear && !arnaBotCompleted)  { outline = hoverTear; }
    if (queueBaton && !arnaBotCompleted) { outline = hoverBaton; }
    if (queueLive && !arnaBotCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('arnaBotCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#arnaBot').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    arnaBotActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    arnaBotActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    arnaBotActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    arnaBotActn = true;
  }
});