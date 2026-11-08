function bomb3Flow () {
    
  // --------------- OPEN MODAL ONLY IF BOMB STILL ACTIVE --------------- //
  bomb3Img.addEventListener("click", function() { if(bomb3Stat) {
    // Pass to modal: position in array, whether this bomb is real or not 
    openModal(2, bombsReal[2]);
    assignBomb3Images ();
  } });
  
  
  
  // --------------- CHECK STATES AND UPDATE ICONS --------------- //
  var b3Scored = false;
  var b3Alerted = false;
  var int3 = setInterval(function frame () {
    
    // Count down as long as no modal is open and the bomb has not already timed out/been defused
    if (bomb3Prog > 0 && !modal3Open && bomb3Stat) {
      bomb3Prog--;
      bomb3Bar.style.width = bomb3Prog + "px";
      // Change icon to alert icon when at specified percentage
      if (bomb3Prog < alertTime && !b3Alerted) {
        b3Alerted = true;
        bomb3Img.src = "bombing/assets/icons/bomb-waiting-alert.gif";
      }
    }

    // Bomb timed out
    else if (bomb3Prog == 0 && bomb3Defu == false) {
      bomb3Bar.style.display = "none";
      bomb3Stat = false;
      // A real bomb timed out: explosion
      if (bombsReal[2] && !b3Scored) {
        b3Scored = true;
        bomb3Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb timed out: ???
      else if (!bombsReal[2] && !b3Scored) {
        b3Scored = true;
        bomb3Img.src = "bombing/assets/icons/bomb-fake-timeout.png";
        scorePublLocal++;
        scoreRiotLocal++;
      }
      bomb3Stat = false;
      updateLocalScore();
      if (modalOpen) { setTimeout(() => endGameBombing(), 5000); }
      else           { endGameBombing(); }
      clearInterval(int3);
    }

    // Bomb was defused
    else if (bomb3Defu) {
      bomb3Bar.style.display = "none";
      // A real bomb was defused: good to go
      if (bombsReal[2] && !b3Scored) {
        setTimeout(function frame() {
          b3Scored = true;
          bomb3Img.src = "bombing/assets/icons/bomb-real-defu.png";
          scorePublLocal++;
          sndWinr.play();
        },countSpeed * 1000);
      }
      // A fake bomb was defused: time was wasted, traffic detour
      if (!bombsReal[2] && !b3Scored) {
        setTimeout(function frame() {
          b3Scored = true;
          bomb3Img.src = "bombing/assets/icons/bomb-fake-defu.png";
          scorePublLocal++;
          scoreRiotLocal++;
          sndAnoy.play();
        },countSpeed * 1000);
      }
      clearInterval(int3);
    }
    
    // Bomb was ignored
    else if (!bomb3Stat) { 
      bomb3Bar.style.display = "none";
      // A real bomb was ignored: explosion
      if (bombsReal[2] && !b3Scored) {
        b3Scored = true;
        bomb3Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb was ignored: good to go
      if (!bombsReal[2] && !b3Scored) {
        b3Scored = true;
        bomb3Img.src = "bombing/assets/icons/bomb-fake-ignore.png";
        scorePublLocal++;
        sndWinr.play();
      }
      clearInterval(int3);
    }
  },bombSpeed);
}



// --------------- ASSIGN IMAGES BASED ON REAL/FAKE VALUES --------------- //
function assignBomb3Images () {
  document.getElementById("imageHolder").innerHTML      = bomb3DetailFront;
  document.getElementById("bombBigFront").innerHTML     = bomb3DetailFront;
  document.getElementById("bombBigBack").innerHTML      = bomb3DetailBack;
  document.getElementById("bombBigUnder").innerHTML     = bomb3DetailUnder;
}