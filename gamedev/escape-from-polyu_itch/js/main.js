// ANIMATION SETTINGS
var setFrames = 20;
var setFps = 10;
var delay = 6500;
var animator = new INHANCE_SegmentAnimator.Animator('#sceneHolder', {
    naming: 'assets/scenes/start-uni/start-uni##.png', frames: setFrames, fps: setFps,
});

// GLOBAL VARIABLES
var sceneName = 'sew-str-U';
var sceneCount = 0;          // prevent ladders from showing up in first 5 scenes
var sceneSel;                // 0-99 RNG for weighted scene selection
var endFlag = false;         // triggered when reaching a ladder scene
var endName;                 // name of end scene corresponding to ladder scene
var endGame = false;         // triggers end of game, button will refresh page
var contGame = false;        // triggers game pause, button will return to loop
var endButton;               // determines which of the above buttons to show

// AUDIO
var soundUni = 'assets/sounds/uni.mp3';
var soundSewer = 'assets/sounds/sewerAmbiance.mp3';
var soundStreet = 'assets/sounds/streets.mp3';
var soundPolice = 'assets/sounds/police.mp3';
var soundBreath = 'assets/sounds/breathing.mp3';
var soundSteps = 'assets/sounds/footsteps.mp3';
var bgm = new Audio(soundUni);
var breaths = new Audio (soundBreath);
var steps = new Audio (soundSteps);
var muted = true;

// RNG
function getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }

// RENDER INITIAL SCENE
$(document).ready(function() {
    animator.playAnim(0, setFrames-1, true, function () {});
});





// HANDLE MOUSE MOVEMENT FOR MASK //FIX THIS FIX THIS
var moveMask = document.getElementById("maskImg");
var moveBreathFog = document.getElementById("breathFogAnim");
addEventListener("mousemove", e => {
    moveMask.style.setProperty('--mouse-x', e.pageX - ($(window).width() / 2) + "px");
    moveMask.style.setProperty('--mouse-y', e.pageY - ($(window).height() / 2) + "px");
    
    moveBreathFog.style.setProperty('--mouse-x', e.pageX - ($(window).width() / 2) + "px");
    moveBreathFog.style.setProperty('--mouse-y', e.pageY - ($(window).height() / 2) + "px");
});

// HANDLE BUTTON INPUTS
$('#sound').on('click', function() {
    bgm.loop = true;
    breaths.loop = true; 
    if (muted == true) {
        bgm.play();
        breaths.play();
        document.getElementById("sound").classList.remove('soundOn');
        document.getElementById("sound").classList.add('soundOff');
        muted = false;
    }
    else {
        bgm.pause();
        breaths.pause();
        steps.pause();
        document.getElementById("sound").classList.remove('soundOff');
        document.getElementById("sound").classList.add('soundOn');
        muted = true;  
    }
});

$('#begin').on('click', function () {
    init();
    this.style.display = "none";
    document.getElementById("timerBar").style.visibility = "visible";
    document.getElementById("logoImg").style.visibility = "hidden";
    if (endName != 'cont-lock') {
        bgm.src = soundSewer;
        if (muted == false) { bgm.play(); }
    }
});

$('#retry').on('click', function () {
    location.reload(); 
});

// BEGIN SCREENSAVER
function init () {
    var animator = new INHANCE_SegmentAnimator.Animator('#sceneHolder', {
        naming: 'assets/scenes/' + sceneName + '/' + sceneName + '##.png', frames: setFrames, fps: setFps,
    });    
    // fade initial scene out and in
    var countdown = setInterval(fadeInOut, 200);
    var opacity = 0;
    function fadeInOut() {        
        // fade out current scene
        if (opacity < 1) {
            opacity += .25;
            document.getElementById('maskImg').style.backgroundColor = 'rgba(24, 24, 24, ' + opacity + ')';
        }
        else {
            // cancel the interval timer & load next scene
            clearInterval(countdown);
            animator.playAnim(0, setFrames-1, true, function () {});
            
            // fade in next scene
            setInterval(fadeOut, 100);
            function fadeOut() {
                if (opacity > 0) {
                    opacity -= .25;
                    document.getElementById('maskImg').style.backgroundColor = 'rgba(24, 24, 24, ' + opacity + ')';
                }
            }
            progressTimer();
        }
    } 
    //animator.playAnim(0, setFrames-1, true, function () {});
    setTimeout(timedSwap, delay);
}

// SWAP TO NEXT SCENE
function timedSwap() {
    console.log('first in timedSwap');
    sceneSel = getRandomInt(100);
    console.log(sceneCount);
    
    // determine the corresponding end scene to show after a ladder scene
    if (endFlag == true) {
        console.log(sceneName);
        if (sceneName == 'sew-lad-good') {
            endName = 'end-good';
            endButton = 'retry';
            endGame = true;
            bgm.src = soundStreet;
        }
        else if (sceneName == 'sew-lad-bad') {
            endName = 'end-bad';
            setFrames = 18;
            endButton = 'retry';
            endGame = true;
            bgm.src = soundPolice;
        }
        else if (sceneName == 'sew-lad-lock') {
            endName = 'cont-lock';
            setFrames = 8;
            endButton = 'begin';
            contGame = true;
        }             
        else if (sceneName == 'sew-lad-uni') {
            endName = 'cont-uni';
            endButton = 'begin';
            contGame = true;
            bgm.src = soundUni;
        }
        
    }
    
    // highest-frequency scenes
    else if (sceneSel >= 0 && sceneSel <= 10) {
        console.log('woot');
        sceneName = 'sew-str-U';
    }
    else if (sceneSel >= 11 && sceneSel <= 21) {
        console.log('noot');
        sceneName = 'sew-str';
    }
    else if (sceneSel >= 22 && sceneSel <= 32) {
        console.log('doot');
        sceneName = 'sew-str-L';
    }
    else if (sceneSel >= 33 && sceneSel <= 43) {
        console.log('goot');
        sceneName = 'sew-str-R';
    }
    
    // mid-frequency scenes 
    else if (sceneSel >= 44 && sceneSel <= 50) {
        console.log('wub');
        sceneName = 'sew-dead-L';
    }
    else if (sceneSel >= 51 && sceneSel <= 57) {
        console.log('lub');
        sceneName = 'sew-dead-R';
    }
    else if (sceneSel >= 58 && sceneSel <= 64) {
        console.log('dub');
        sceneName = 'sew-dead';
    }
    
    // mid-frequency ladder scenes
    else if (sceneSel >= 65 && sceneSel <= 71 && sceneCount >= 5) {
        console.log('grub');
        sceneName = 'sew-lad-good';
        endFlag = true;
    }
    else if (sceneSel >= 72 && sceneSel <= 78 && sceneCount >= 5) {
        console.log('snub');
        sceneName = 'sew-lad-bad';
        endFlag = true;
    }
    else if (sceneSel >= 79 && sceneSel <= 85 && sceneCount >= 5) {
        console.log('kub');
        sceneName = 'sew-lad-uni';
        endFlag = true;
    }
    else if (sceneSel >= 86 && sceneSel <= 92 && sceneCount >= 5) {
        console.log('jub');
        sceneName = 'sew-lad-lock';
        endFlag = true;
    }
    
    // low frequency scenes
    else if (sceneSel >= 93 && sceneSel <= 96) {
        console.log('tam');
        sceneName = 'sew-str-L-R';
    }
    else if (sceneSel >= 97 && sceneSel <= 99) {
        console.log('uam'); 
        sceneName = 'sew-dead-L-R';
    }
    
    // any ladder scenes selected in the first 5 rounds default to this instead
    else {
        console.log('thatsa ladder - no no no!');
        sceneName = 'sew-str'; 
    }
    
    if (endGame == true) {
        var animator = new INHANCE_SegmentAnimator.Animator('#sceneHolder', {
            naming: 'assets/scenes/' + endName + '/' + endName + '##.png', frames: setFrames, fps: setFps,
        });
        document.getElementById("timerBar").style.visibility = "hidden";
        document.getElementById(endButton).style.display = "block";
        endGame = false;
        endFlag = false;
        if (muted == false) { bgm.play(); }
        //turn on flashlight if bad end
        if (sceneName == 'sew-lad-bad') {
            setTimeout(flashOn, 2000);
            function flashOn() {
                document.getElementById('flashCircles').style.visibility = "visible";
                setTimeout(beamsOn, 100);
                function beamsOn() {
                    document.getElementById('flashBeams').style.visibility = "visible";
                }
            }
        }
    }
    else if (contGame == true) {
        var animator = new INHANCE_SegmentAnimator.Animator('#sceneHolder', {
            naming: 'assets/scenes/' + endName + '/' + endName + '##.png', frames: setFrames, fps: setFps,
        });
        document.getElementById("timerBar").style.visibility = "hidden";
        document.getElementById(endButton).style.display = "block";
        contGame = false;
        endFlag = false;        
        if (muted == false) { bgm.play(); }
    }
    else {
        var animator = new INHANCE_SegmentAnimator.Animator('#sceneHolder', {
            naming: 'assets/scenes/' + sceneName + '/' + sceneName + '##.png', frames: setFrames, fps: setFps,
        });        
        sceneCount++;
        setFrames = 20;
        setTimeout(timedSwap, delay);   
    }

    // fading scenes in & out
    var countdown = setInterval(fadeInOut, 200);
    var opacity = 0;
    function fadeInOut() {
        if (muted == false) { steps.play(); }
        
        // fade out current scene
        if (opacity < 1) {
            opacity += .25;
            document.getElementById('maskImg').style.backgroundColor = 'rgba(24, 24, 24, ' + opacity + ')';
        }
        else {
            // cancel the interval timer & load next scene
            clearInterval(countdown);
            animator.playAnim(0, setFrames-1, true, function () {});
            
            // fade in next scene
            setInterval(fadeOut, 100);
            function fadeOut() {
                if (opacity > 0) {
                    opacity -= .25;
                    document.getElementById('maskImg').style.backgroundColor = 'rgba(24, 24, 24, ' + opacity + ')';
                }
            }
            progressTimer();
        }
    }    
}

// VISIBLE COUNTDOWN
function progressTimer() {
    var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("timerTime");
    var width = 100;
    var id = setInterval(frame, 50);
    function frame() {
        if (width <= 0) {
            clearInterval(id);
            i = 0;
        }
        else {
            width--;
            elem.style.width = width + "%";
        }
    }
  }
} 