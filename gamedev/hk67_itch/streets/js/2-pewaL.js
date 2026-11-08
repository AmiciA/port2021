// --------------- RIOT BAR PROGRESS --------------- //
function pewaLef () {
  var elem = document.getElementById("pewaLefCurr");
  var intJ = setInterval(frame, gameSpeed);
  function frame() {
    
    // State checking
    // Game timed out
    if (pewaLefCompleted) { console.log('timeout');
      clearInterval(intJ);
      elem.style.backgroundColor = bkgCplt;
    }
    
    // Bar has reached 100% - loss
    if (pewaLefProg >= 99){
      elem.style.backgroundColor = bkgCplt;
      pewaLefCompleted = true;
      console.log('failed');
      scoreRiotLocal += 7;
      //scorePublLocal--;
      clearInterval(intJ);
    }

    // Live rounds applied (bar stopped permanently)
    if (applyLive && pewaLefActn == true && ammoLive > 0) {
      elem.style.backgroundImage = bkgLive;
      pewaLefCompleted = true;
      useLiveAmmo();
      scoreRiotLocal++;
      scorePublLocal++;
      clearInterval(intJ);
      sndGun.play();
    }

    // Tear smoke applied (large pushback)
    else if (applyTear == true && pewaLefActn == true) {
      pewaLefProg = Math.max(pewaLefProg - pushTG, 0); console.log('max: ' + pewaLefProg);
      applyTear = false;
      scoreRiotLocal++;
      scorePublLocal++;
      sndTG.play();
    }

    // Baton rounds applied (small pushback)
    else if (applyBaton && pewaLefActn == true) {
      pewaLefProg = Math.max(pewaLefProg - pushBT, 0); console.log('max: ' + pewaLefProg);
      applyBaton = false;
      scorePublLocal++;
      sndGun.play();
    }

    // Barricade applied (short pause)
    else if (applyBarr && pewaLefActn == true && ammoBarr > 0) {
      elem.style.backgroundColor = bkgPaus;
      useBarricade();
      pewaLefSpeed = pauseSpeed;
      pewaLefPauses = pauseCount;
      applyBarr = false;
      scorePublLocal++;
      sndBar.play();
    }

    // Bar progressing normally
    else if (!pewaLefCompleted && pewaLefPauses == 0) {
      elem.style.backgroundColor = bkgDflt;
      pewaLefProg += pewaLefSpeed;
    }

    // Apply above calculated progress to HTML element
    elem.style.width = pewaLefProg + "%";
    //console.log('PETM: ' + elem.style.width);

    if (pewaLefActn == true) {
      clearQueue ();
      clearApply ();
      clearVisuals ();
      pewaLefActn = false;
      console.log ('All 3 (queue, apply, viz) cleared & actionApplied = false');
    }
  }
}



// --------------- RIOT BAR HOVER EFFECTS --------------- //
$(window).mousemove(function(e) {
  var barRect = document.getElementById('pewaLef').getBoundingClientRect();   // padded, full-width container is used to determine hover effects
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
    if (!pewaLefCompleted)               { outline = hoverGeneral; }
    if (queueBarr && !pewaLefCompleted)  { outline = hoverBarr; }
    if (queueTear && !pewaLefCompleted)  { outline = hoverTear; }
    if (queueBaton && !pewaLefCompleted) { outline = hoverBaton; }
    if (queueLive && !pewaLefCompleted)  { outline = hoverLive; }
  }
  else {
    outline = "none";
  }
  document.getElementById('pewaLefCurr').style.outline = outline;
});



// --------------- APPLY QUEUED ACTION --------------- //
$('#pewaLef').on('click', function () {
  if (queueBarr)  {
    applyBarr = true;
    pewaLefActn = true;
  }         
  else if (queueTear)  {
    applyTear = true;
    pewaLefActn = true;
  }
  else if (queueBaton) {
    applyBaton = true;
    pewaLefActn = true;
  }
  else if (queueLive)  {
    applyLive = true;
    pewaLefActn = true;
  }
});