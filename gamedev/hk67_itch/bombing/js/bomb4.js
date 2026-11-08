function bomb4Flow () {
    
  // --------------- OPEN MODAL ONLY IF BOMB STILL ACTIVE --------------- //
  bomb4Img.addEventListener("click", function() { if(bomb4Stat) {
    // Pass to modal: position in array, whether this bomb is real or not 
    openModal(3, bombsReal[3]);
    assignBomb4Images ();
  } });
  
  
  
  // --------------- CHECK STATES AND UPDATE ICONS --------------- //
  var b4Scored = false;
  var b4Alerted = false;
  var int4 = setInterval(function frame () { //console.log('bomb4Stat: ' + bomb4Stat);
    
    // Count down as long as no modal is open and the bomb has not already timed out/been defused
    if (bomb4Prog > 0 && !modal4Open && bomb4Stat) {
      bomb4Prog--;
      bomb4Bar.style.width = bomb4Prog + "px";
      // Change icon to alert icon when at specified percentage
      if (bomb4Prog < alertTime && !b4Alerted) {
        b4Alerted = true;
        bomb4Img.src = "bombing/assets/icons/bomb-waiting-alert.gif";
      }
    }

    // Bomb timed out
    else if (bomb4Prog == 0 && bomb4Defu == false) {
      bomb4Bar.style.display = "none";
      bomb4Stat = false;
      // A real bomb timed out: explosion
      if (bombsReal[3] && !b4Scored) {
        b4Scored = true;
        bomb4Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb timed out: ???
      else if (!bombsReal[3] && !b4Scored) {
        b4Scored = true;
        bomb4Img.src = "bombing/assets/icons/bomb-fake-timeout.png";
        scorePublLocal++;
        scoreRiotLocal++;
      }
      bomb4Stat = false;
      updateLocalScore();
      if (modalOpen) { setTimeout(() => endGameBombing(), 5000); }
      else           { endGameBombing(); }
      clearInterval(int4);
    }

    // Bomb was defused
    else if (bomb4Defu) {
      bomb4Bar.style.display = "none";
      // A real bomb was defused: good to go
      if (bombsReal[3] && !b4Scored) {
        setTimeout(function frame() {
          b4Scored = true;
          bomb4Img.src = "bombing/assets/icons/bomb-real-defu.png";
          scorePublLocal++;
          sndWinr.play();
        },countSpeed * 1000);
      }
      // A fake bomb was defused: time was wasted, traffic detour
      if (!bombsReal[3] && !b4Scored) {
        setTimeout(function frame() {
          b4Scored = true;
          bomb4Img.src = "bombing/assets/icons/bomb-fake-defu.png";
          scorePublLocal++;
          scoreRiotLocal++;
          sndAnoy.play();
        },countSpeed * 1000);
      }
      clearInterval(int4);
    }
    
    // Bomb was ignored
    else if (!bomb4Stat) { 
      bomb4Bar.style.display = "none";
      // A real bomb was ignored: explosion
      if (bombsReal[3] && !b4Scored) {
        b4Scored = true;
        bomb4Img.src = "bombing/assets/icons/bomb-real-failed.png";
        scoreRiotLocal = +scoreRiotLocal + 2;
        sndXpld.play();
      }
      // A fake bomb was ignored: good to go
      if (!bombsReal[3] && !b4Scored) {
        b4Scored = true;
        bomb4Img.src = "bombing/assets/icons/bomb-fake-ignore.png";
        scorePublLocal++;
        sndWinr.play();
      }
      clearInterval(int4);
    }
  },bombSpeed);
}



// --------------- ASSIGN IMAGES BASED ON REAL/FAKE VALUES --------------- //
function assignBomb4Images () {
  document.getElementById("imageHolder").innerHTML      = bomb4DetailFront;
  document.getElementById("bombBigFront").innerHTML     = bomb4DetailFront;
  document.getElementById("bombBigBack").innerHTML      = bomb4DetailBack;
  document.getElementById("bombBigUnder").innerHTML     = bomb4DetailUnder;
}