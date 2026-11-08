




























/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required


/*function tA2 () {
    var elem = document.getElementById("riotBarCurr2");
    var val = 0;
    var id = setInterval(frame, 50);
    function frame() {
      if (val < 100 && stopT == false) {
        val++;
        elem.style.height = val + "%";
      }
      else if (val < 100 && stopT == true) {
        elem.style.height = val + "%";
      }
      else {
        clearInterval(id);
      }
    }
  }*/




        //console.log ("END | i: " + i + ", length: " + riotArray.length + ", riotArray[i]: " + riotArray[i]);
        
        /*if (riotArray[i].classList.contains("right")) {
          dir = riotArray[i].style.width = prog + "%";
          //console.log("root");
          i++;}  // expand the element's width for horizontal bars
        if (riotArray[i].classList.contains("down"))  {
          dir = riotArray[i].style.height = prog + "%";
          //console.log("doot");
          i++;}  // expand the element's height for vertical bars*/
        //riotArray[0].style.width = petmRigProg + "%";   


/*.btnAction {
  position: absolute;
  right: 15px;
  top: calc(50% - 105px);
  padding: 10px 20px;
  border: 2px solid #FCF4E9;
  border-left: none;
  border-bottom: none;
  border-radius: 10px;
  box-shadow: 0px 5px #BCA88C;
  background-color: #CFBFA2;
  font-family: monospace;
  font-size: 18px;
  color: #312E2A;
  text-align: center;
  user-select: none;
  text-decoration: none;
  transition: all .1s ease-in, opacity 0.3s ease-out;
}
.btnSubordinate {
  top: calc(50% - 40px);
  font-size: 14px;
  padding: 4px 12px;
}*/
/*.btnMain {
  width: 100px;
  height: 100px;
  background-color: #322E45;
  margin: 13px 10px;
  padding: 11px 14px 20px 14px;
  border-radius: 15px;
  box-shadow: 0px 5px #1F1D30;
  user-select: none;
  transition: all .1s ease-in;
}*/
/*.btnGeneral {
  position: absolute;
  padding: 13px 20px;
  border-radius: 15px;
  background-color: #322E45;
  box-shadow: 0px 5px #1F1D30;
  color: #faf3e2;
  font-family: monospace;
  font-size: 16px;
  user-select: none;
  transition: all .1s ease-in;
}*/
/*.btnAction:hover { background-color: #fdf8eb !important; }*/

// --------------- AUDIO --------------- //
/*var soundBombingBkg = 'audio/mapmusic.mp3';
var bgm = new Audio(soundBombingBkg);
var muted = true;

$('#btnAudio').on('click', function() {
    bgm.loop = true;
    //breaths.loop = true; 
    if (muted == true) {
        bgm.play();
        //breaths.play();
        //document.getElementById("btnAudio").classList.remove('soundON');
        //document.getElementById("btnAudio").classList.add('soundOFF');
        muted = false;
    }
    else {
        bgm.pause();
        //breaths.pause();
        //steps.pause();
        //document.getElementById("btnAudio").classList.remove('soundOFF');
        //document.getElementById("btnAudio").classList.add('soundON');
        muted = true;  
    }
});*/


/*document.addEventListener("keyup", function(event) {
  var keyTO,
      seconds = 1;
  
  //if (event.defaultPrevented) { return; }
  if (event.code == "KeyA" || event.code == "ArrowLeft") {
    if(keyTO) {  
      console.log('A/← pressed');
      clearTimeout(keyTO);
      console.log('keyTO timeout cleared');
      keyTO = null;
      apcadv = true;
    }
  }
  keyTO = setTimeout(function() {
    console.log('QTE cancelled');
    apcadv = false;
  }, seconds * 1000);
  
  // Consume the event so it doesn't get handled twice
  //event.preventDefault();
}, true);*/










/*$("#nav-two a")
  .each(function(i) { console.log('eachy');
    if (i != 0) { 
      $("#beep-two")
        .clone()
        .attr("id", "beep-two" + i)
        .appendTo($(this).parent());
    }
    $(this).data("beeper", i);
  })
  .mouseenter(function() { console.log('me beeps');
    $("#beep-two" + $(this).data("beeper"))[0].play();
  });
$("#beep-two").attr("id", "beep-two0");*/