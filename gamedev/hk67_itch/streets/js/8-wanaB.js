// --------------- RIOT BAR PROGRESS --------------- //
function wanaBot () {
  var elem = document.getElementById("wanaBotCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (wanaBotCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (wanaBotProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      wanaBotCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && wanaBotActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      wanaBotCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && wanaBotActn == true) {
      wanaBotProg = Math.max(wanaBotProg - pushTG, 0); console.log('max: ' + wanaBotProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && wanaBotActn == true) {
      //wanaBotProg -= 30;
      wanaBotProg = Math.max(wanaBotProg - pushBT, 0); console.log('max: ' + wanaBotProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && wanaBotActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      wanaBotSpeed = pauseSpeed;
      wanaBotPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!wanaBotCompleted && wanaBotPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      wanaBotProg += wanaBotSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = wanaBotProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (wanaBotActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      wanaBotActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('wanaBot').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!wanaBotCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !wanaBotCompleted)  { outline = hoverBarr; }
    if (queueTear && !wanaBotCompleted)  { outline = hoverTear; }
    if (queueBaton && !wanaBotCompleted) { outline = hoverBaton; }
    if (queueLive && !wanaBotCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('wanaBotCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#wanaBot').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    wanaBotActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    wanaBotActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    wanaBotActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    wanaBotActn = true;
  }
});