// --------------- RIOT BAR PROGRESS --------------- //
function petmBot () {
  var elem = document.getElementById("petmBotCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (petmBotCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (petmBotProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      petmBotCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && petmBotActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      petmBotCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && petmBotActn == true) {
      petmBotProg = Math.max(petmBotProg - pushTG, 0); console.log('max: ' + petmBotProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && petmBotActn == true) {
      petmBotProg = Math.max(petmBotProg - pushBT, 0); console.log('max: ' + petmBotProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && petmBotActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      petmBotSpeed = pauseSpeed;
      petmBotPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Bar progressing normally
    else if (!petmBotCompleted && petmBotPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      petmBotProg += petmBotSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.height = petmBotProg + "%";
    //console.log('PETM: ' + elem.style.height);

    if (petmBotActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      petmBotActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('petmBot').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!petmBotCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !petmBotCompleted)  { outline = hoverBarr; }
    if (queueTear && !petmBotCompleted)  { outline = hoverTear; }
    if (queueBaton && !petmBotCompleted) { outline = hoverBaton; }
    if (queueLive && !petmBotCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('petmBotCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#petmBot').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    petmBotActn = true;
    console.log ('petmBot clicked, applyBarr'); // need to deal with case of trying to hover/click a killed bar
  }         
  else if (queueTear)  {
    applyTear = true;
    petmBotActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    petmBotActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    petmBotActn = true;
  }
});