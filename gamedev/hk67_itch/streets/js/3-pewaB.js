// --------------- RIOT BAR PROGRESS --------------- //
function pewaBot () {
  var elem = document.getElementById("pewaBotCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (pewaBotCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (pewaBotProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      pewaBotCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && pewaBotActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      pewaBotCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && pewaBotActn == true) {
      pewaBotProg = Math.max(pewaBotProg - pushTG, 0); console.log('max: ' + pewaBotProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && pewaBotActn == true) {
      pewaBotProg = Math.max(pewaBotProg - pushBT, 0); console.log('max: ' + pewaBotProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && pewaBotActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      pewaBotSpeed = pauseSpeed;
      pewaBotPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!pewaBotCompleted && pewaBotPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      pewaBotProg += pewaBotSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = pewaBotProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (pewaBotActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      pewaBotActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('pewaBot').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!pewaBotCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !pewaBotCompleted)  { outline = hoverBarr; }
    if (queueTear && !pewaBotCompleted)  { outline = hoverTear; }
    if (queueBaton && !pewaBotCompleted) { outline = hoverBaton; }
    if (queueLive && !pewaBotCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('pewaBotCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#pewaBot').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    pewaBotActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    pewaBotActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    pewaBotActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    pewaBotActn = true;
  }
});