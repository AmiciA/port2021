function bomb5Flow () {  
  
  // --------------- OPEN MODAL ONLY IF BOMB STILL ACTIVE --------------- //
  bomb5Img.addEventListener("click", function() { if(bomb5Stat) {
    // Pass to modal: position in array, whether this bomb is real or not 
    openModal(4, bombsReal[4]);
    assignBomb5Images ();
  } });
  
  
  
  // --------------- CHECK STATES AND UPDATE ICONS --------------- //
  var b5Scored = false;
  var b5Alerted = false;
  var int5 = setInterval(function frame () {
    
    // Count down as long as no modal is open and the bomb has not already timed out/been defused
    if (bomb5Prog > 0 && !modal5Open && bomb5Stat) {
      bomb5Prog--;
      bomb5Bar.style.width = bomb5Prog + "px";
      // Change icon to alert icon when at specified percentage
      if (bomb5Prog < alertTime && !b5Alerted) {
        b5Alerted = true;
        bomb5Img.src = "bombing/assets/icons/bomb-waiting-alert.gif";
      }
    }

    // Bomb timed out
    else if (bomb5Prog == 0 && bomb5Defu == false) {
      bomb5Bar.style.display = "none";
      bomb5Stat = false;
      // A real bomb timed out: explosion
      if (bombsReal[4] && !b5Scored) {
        b5Scored = true;
        bomb5Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb timed out: ???
      else if (!bombsReal[4] && !b5Scored) {
        b5Scored = true;
        bomb5Img.src = "bombing/assets/icons/bomb-fake-timeout.png";
        scorePublLocal++;
        scoreRiotLocal++;
      }
      bomb5Stat = false;
      updateLocalScore();
      if (modalOpen) { setTimeout(() => endGameBombing(), 5000); }
      else           { endGameBombing(); }
      clearInterval(int5);
    }

    // Bomb was defused
    else if (bomb5Defu) {
      bomb5Bar.style.display = "none";
      // A real bomb was defused: good to go
      if (bombsReal[4] && !b5Scored) {
        setTimeout(function frame() {
          b5Scored = true;
          bomb5Img.src = "bombing/assets/icons/bomb-real-defu.png";
          scorePublLocal++;
          sndWinr.play();
        },countSpeed * 1000);
      }
      // A fake bomb was defused: time was wasted, traffic detour
      if (!bombsReal[4] && !b5Scored) {
        setTimeout(function frame() {
          b5Scored = true;
          bomb5Img.src = "bombing/assets/icons/bomb-fake-defu.png";
          scorePublLocal++;
          scoreRiotLocal++;
          sndAnoy.play();
        },countSpeed * 1000);
      }
      clearInterval(int5);
    }
    
    // Bomb was ignored
    else if (!bomb5Stat) {
      bomb5Bar.style.display = "none";
      // A real bomb was ignored: explosion
      if (bombsReal[4] && !b5Scored) {
        b5Scored = true;
        bomb5Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb was ignored: good to go
      if (!bombsReal[4] && !b5Scored) {
        b5Scored = true;
        bomb5Img.src = "bombing/assets/icons/bomb-fake-ignore.png";
        scorePublLocal++;
        sndWinr.play();
      }
      clearInterval(int5);
    }
  },bombSpeed);
}



// --------------- ASSIGN IMAGES BASED ON REAL/FAKE VALUES --------------- //
function assignBomb5Images () {
  document.getElementById("imageHolder").innerHTML      = bomb5DetailFront;
  document.getElementById("bombBigFront").innerHTML     = bomb5DetailFront;
  document.getElementById("bombBigBack").innerHTML      = bomb5DetailBack;
  document.getElementById("bombBigUnder").innerHTML     = bomb5DetailUnder;
}