// --------------- RIOT BAR PROGRESS --------------- //
function wanaTop () {
  var elem = document.getElementById("wanaTopCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (wanaTopCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (wanaTopProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      wanaTopCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && wanaTopActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      wanaTopCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && wanaTopActn == true) {
      wanaTopProg = Math.max(wanaTopProg - pushTG, 0); console.log('max: ' + wanaTopProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && wanaTopActn == true) {
      //wanaTopProg -= 30;
      wanaTopProg = Math.max(wanaTopProg - pushBT, 0); console.log('max: ' + wanaTopProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && wanaTopActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      wanaTopSpeed = pauseSpeed;
      wanaTopPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!wanaTopCompleted && wanaTopPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      wanaTopProg += wanaTopSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = wanaTopProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (wanaTopActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      wanaTopActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('wanaTop').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!wanaTopCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !wanaTopCompleted)  { outline = hoverBarr; }
    if (queueTear && !wanaTopCompleted)  { outline = hoverTear; }
    if (queueBaton && !wanaTopCompleted) { outline = hoverBaton; }
    if (queueLive && !wanaTopCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('wanaTopCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#wanaTop').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    wanaTopActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    wanaTopActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    wanaTopActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    wanaTopActn = true;
  }
});