// --------------- AUDIO --------------- //
// On game first launch, play current music (default = splash)
if (gameActive === null) { bgmCurr.play(); }
else                     { musicInitialCheck(); }



// --------------- RENDER INITIAL SCENE & CARRY SCORING IN --------------- //
$(document).ready(function() {  
  
  // Check URL for game status
  pullMasterScore();
  
  // Trigger end slides button if all games complete
  checkCompletion();
  
  // Set base scores if a new game
  if (gameActive != "active") {
    console.log('NEW GAME');
    scorePubl = 0;
    scoreRiot = 0;
    gameProg = "";
    pushMasterScore();
    pushScoresToLinks();
    scoreHold.classList.add("hidden");
  }
  
  // Apply current scores for an ongoing game
  pushMasterScore();
  pushScoresToLinks();
});

function pushScoresToLinks () {
  document.getElementById("linkShootup").href = "militia.html?score_public=" + scorePubl + "&score_riot=" + scoreRiot + "&game=active" + "&prog="+gameProg + "&soundon=" + sndStatus;
  document.getElementById("linkInvestg").href = "house.html?score_public="   + scorePubl + "&score_riot=" + scoreRiot + "&game=active" + "&prog="+gameProg + "&soundon=" + sndStatus;
  document.getElementById("linkStreets").href = "streets.html?score_public=" + scorePubl + "&score_riot=" + scoreRiot + "&game=active" + "&prog="+gameProg + "&soundon=" + sndStatus;
  document.getElementById("linkBombing").href = "bombing.html?score_public=" + scorePubl + "&score_riot=" + scoreRiot + "&game=active" + "&prog="+gameProg + "&soundon=" + sndStatus;
}

function checkCompletion () { console.log(gameProg);
  if (gameProg.includes("m")) { document.getElementById("iM").src = "assets/map/target-complete.gif"; }
  if (gameProg.includes("h")) { document.getElementById("iH").src = "assets/map/target-complete.gif"; }
  if (gameProg.includes("b")) { document.getElementById("iB").src = "assets/map/target-complete.gif"; }
  if (gameProg.includes("s")) { document.getElementById("iS").src = "assets/map/target-complete.gif"; }
  
  if (gameProg.includes("h" && "m" && "b" && "s")) {
    console.log('btch');
  }
}