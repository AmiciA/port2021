function bomb2Flow () {
    
  // --------------- OPEN MODAL ONLY IF BOMB STILL ACTIVE --------------- //
  bomb2Img.addEventListener("click", function() { if(bomb2Stat) {
    // Pass to modal: position in array, whether this bomb is real or not 
    openModal(1, bombsReal[1]);
    assignBomb2Images ();
  } });
  
  
  
  // --------------- CHECK STATES AND UPDATE ICONS --------------- //
  var b2Alerted = false;
  var b2Scored = false;
  var int2 = setInterval(function frame () {
    
    // Count down as long as no modal is open and the bomb has not already timed out/been defused
    if (bomb2Prog > 0 && !modal2Open && bomb2Stat) {
      bomb2Prog--;
      bomb2Bar.style.width = bomb2Prog + "px";
      // Change icon to alert icon when at specified percentage
      if (bomb2Prog < alertTime && !b2Alerted) {
        b2Alerted = true;
        bomb2Img.src = "bombing/assets/icons/bomb-waiting-alert.gif";
      }
    }

    // Bomb timed out
    else if (bomb2Prog == 0 && bomb2Defu == false) {
      bomb2Bar.style.display = "none";
      bomb2Stat = false;
      // A real bomb timed out: explosion
      if (bombsReal[1] && !b2Scored) {
        b2Scored = true;
        bomb2Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb timed out: ???
      else if (!bombsReal[1] && !b2Scored) {
        b2Scored = true;
        bomb2Img.src = "bombing/assets/icons/bomb-fake-timeout.png";
        scorePublLocal++;
        scoreRiotLocal++;
      }
      bomb2Stat = false;
      updateLocalScore();
      if (modalOpen) { setTimeout(() => endGameBombing(), 5000); }
      else           { endGameBombing(); }
      clearInterval(int2);
    }

    // Bomb was defused
    else if (bomb2Defu) {
      bomb2Bar.style.display = "none";
      // A real bomb was defused: good to go
      if (bombsReal[1] && !b2Scored) {
        setTimeout(function frame() {
          b2Scored = true;
          bomb2Img.src = "bombing/assets/icons/bomb-real-defu.png";
          scorePublLocal++;
          sndWinr.play();
        },countSpeed * 1000);
      }
      // A fake bomb was defused: time was wasted, traffic detour
      if (!bombsReal[1] && !b2Scored) {
        setTimeout(function frame() {
          b2Scored = true;
          bomb2Img.src = "bombing/assets/icons/bomb-fake-defu.png";
          scorePublLocal++;
          scoreRiotLocal++;
          sndAnoy.play();
        },countSpeed * 1000);
      }
      clearInterval(int2);
    }
    
    // Bomb was ignored
    else if (!bomb2Stat) { 
      bomb2Bar.style.display = "none";
      // A real bomb was ignored: explosion
      if (bombsReal[1] && !b2Scored) {
        b2Scored = true;
        bomb2Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb was ignored: good to go
      if (!bombsReal[1] && !b2Scored)  {
        b2Scored = true;
        bomb2Img.src = "bombing/assets/icons/bomb-fake-ignore.png";
        scorePublLocal++;
        sndWinr.play();
      }
      clearInterval(int2);
    }
  },bombSpeed);
}



// --------------- ASSIGN IMAGES BASED ON REAL/FAKE VALUES --------------- //
function assignBomb2Images () {
  document.getElementById("imageHolder").innerHTML      = bomb2DetailFront;
  document.getElementById("bombBigFront").innerHTML     = bomb2DetailFront;
  document.getElementById("bombBigBack").innerHTML      = bomb2DetailBack;
  document.getElementById("bombBigUnder").innerHTML     = bomb2DetailUnder;
}