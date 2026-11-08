// --------------- RIOT BAR PROGRESS --------------- //
function arnaTop () {
  var elem = document.getElementById("arnaTopCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (arnaTopCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (arnaTopProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      arnaTopCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && arnaTopActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      arnaTopCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && arnaTopActn == true) {
      arnaTopProg = Math.max(arnaTopProg - pushTG, 0); console.log('max: ' + arnaTopProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && arnaTopActn == true) {
      arnaTopProg = Math.max(arnaTopProg - pushBT, 0); console.log('max: ' + arnaTopProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && arnaTopActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      arnaTopSpeed = pauseSpeed;
      arnaTopPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!arnaTopCompleted && arnaTopPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      arnaTopProg += arnaTopSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = arnaTopProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (arnaTopActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      arnaTopActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('arnaTop').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!arnaTopCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !arnaTopCompleted)  { outline = hoverBarr; }
    if (queueTear && !arnaTopCompleted)  { outline = hoverTear; }
    if (queueBaton && !arnaTopCompleted) { outline = hoverBaton; }
    if (queueLive && !arnaTopCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('arnaTopCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#arnaTop').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    arnaTopActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    arnaTopActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    arnaTopActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    arnaTopActn = true;
  }
});