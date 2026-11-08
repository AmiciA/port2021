function bomb1Flow () {  
  
  // --------------- OPEN MODAL ONLY IF BOMB STILL ACTIVE --------------- //
  bomb1Img.addEventListener("click", function() { if(bomb1Stat) {
    // Pass to modal: position in array, whether this bomb is real or not 
    openModal(0, bombsReal[0]);
    assignBomb1Images ()
  } });
  
  
  
  // --------------- CHECK STATES AND UPDATE ICONS --------------- //
  var b1Alerted = false;
  var b1Scored = false;
  var int1 = setInterval(function frame () { //console.log(bomb1Stat + ' ' + bomb2Stat + ' ' + bomb3Stat + ' ' + bomb4Stat + ' ' + bomb5Stat);
    
    // Count down as long as no modal is open and the bomb has not already timed out/been defused
    if (bomb1Prog > 0 && !modal1Open && bomb1Stat) {
      bomb1Prog--;
      bomb1Bar.style.width = bomb1Prog + "px";
      // Change icon to alert icon when at specified percentage
      if (bomb1Prog < alertTime && !b1Alerted) {
        b1Alerted = true;
        bomb1Img.src = "bombing/assets/icons/bomb-waiting-alert.gif";
      }
    }

    // Bomb timed out
    else if (bomb1Prog == 0 && bomb1Defu == false) { console.log(bomb1Stat + ' ' + bomb2Stat + ' ' + bomb3Stat + ' ' + bomb4Stat + ' ' + bomb5Stat);
      bomb1Bar.style.display = "none";
      bomb1Stat = false;
      // A real bomb timed out: explosion
      if (bombsReal[0] && !b1Scored) { console.log('A real bomb timed out: explosion');
        b1Scored = true;
        bomb1Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb timed out: ???
      else if (!bombsReal[0] && !b1Scored) { console.log('A fake bomb timed out: traffic detour');
        b1Scored = true;
        bomb1Img.src = "bombing/assets/icons/bomb-fake-timeout.png";
        scorePublLocal++;
        scoreRiotLocal++;
      }
      bomb1Stat = false;
      updateLocalScore();
      if (modalOpen) { setTimeout(() => endGameBombing(), 5000); }
      else           { endGameBombing(); }
      clearInterval(int1);
    }

    // Bomb was defused
    else if (bomb1Defu) {
      bomb1Bar.style.display = "none";
      // A real bomb was defused: good to go
      if (bombsReal[0] && !b1Scored) { console.log('A real bomb was defused: good to go' + scoreRiotLocal);
        setTimeout(function frame() {
          b1Scored = true;
          bomb1Img.src = "bombing/assets/icons/bomb-real-defu.png";
          scorePublLocal++;
          sndWinr.play();
        },countSpeed * 1000);
      }
      // A fake bomb was defused: time was wasted, traffic detour
      if (!bombsReal[0] && !b1Scored) { console.log('A fake bomb was defused: time was wasted, traffic detour');
        setTimeout(function frame() {
          b1Scored = true;
          bomb1Img.src = "bombing/assets/icons/bomb-fake-defu.png";
          scorePublLocal++;
          scoreRiotLocal++;
          sndAnoy.play();
        },countSpeed * 1000);
      }
      clearInterval(int1);
    }
    
    // Bomb was ignored
    else if (!bomb1Stat) {
      bomb1Bar.style.display = "none";
      // A real bomb was ignored: explosion
      if (bombsReal[0] && !b1Scored) { console.log('A real bomb was ignored: explosion');
        b1Scored = true;
        bomb1Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb was ignored: good to go
      if (!bombsReal[0] && !b1Scored) { console.log('A fake bomb was ignored: good to go');
        b1Scored = true;
        bomb1Img.src = "bombing/assets/icons/bomb-fake-ignore.png";
        scorePublLocal++;
        sndWinr.play();
      }
      clearInterval(int1);
    }
  },bombSpeed);
}



// --------------- ASSIGN IMAGES BASED ON REAL/FAKE VALUES --------------- //
function assignBomb1Images () {
  document.getElementById("imageHolder").innerHTML      = bomb1DetailFront;
  document.getElementById("bombBigFront").innerHTML     = bomb1DetailFront;
  document.getElementById("bombBigBack").innerHTML      = bomb1DetailBack;
  document.getElementById("bombBigUnder").innerHTML     = bomb1DetailUnder;
}