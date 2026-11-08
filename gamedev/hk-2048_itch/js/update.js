// Move sprite sheet through walk animation
function walkAnim() {
    if (player.counter <= r ) { 
        player.sx = 0; 
    }
    if (player.counter > r && player.counter <= (r*2) ) { 
        player.sx = 112; 
    }
    if (player.counter > (r*2) && player.counter <= (r*3) ) { 
        player.sx = 224; 
    }
    if (player.counter > (r*3) && player.counter <= (r*4) ) { 
        player.sx = 336; 
    }
    if (player.counter > (r*4) ) { 
        player.counter = 0; 
    }  
    player.counter += 1;
}


// Update game objects
var update = function (modifier) {
    if (isPaused !== true) {                    // GAME UNPAUSED  
        var playerMid = player.x + player.w/2;
        // Check proximity to monsters, set prompt flag & hilight object
        if (playerMid <= (monster1.x + monsterImage1.width) && playerMid >= monster1.x) {
            prompt = true;
            monsterImage1.src = 'images/monster1-prompt.png';
        }
        else if (playerMid <= (monster2.x + monsterImage2.width) && playerMid >= monster2.x) { 
            prompt = true;
            monsterImage2.src = 'images/monster2-prompt.png';
        }
        else if (playerMid <= (monster3.x + monsterImage3.width) && playerMid >= monster3.x) {
            prompt = true;
            monsterImage3.src = 'images/monster3-prompt.png';
        }
        else if (playerMid <= (monster4.x + monsterImage4.width) && playerMid >= monster4.x) {
            prompt = true;
            monsterImage4.src = 'images/monster4-prompt.png';
        }
        else if (playerMid <= (monster5.x + monsterImage5.width) && playerMid >= monster5.x) {
            prompt = true;
            monsterImage5.src = 'images/monster5-prompt.png';
        }
        else {
            prompt = false;
            monsterImage1.src = 'images/monster.png';
            monsterImage2.src = 'images/monster2.png';
            monsterImage3.src = 'images/monster3.png';
            monsterImage4.src = 'images/monster4.png';
            monsterImage5.src = 'images/monster5.png';
        }
        
        // drone movement
        drone.x += .5 * drone.dir;
        if (drone.x >= 250) {
            drone.dir = -1
        }
        if (drone.x <= 50) {
            drone.dir = 1;
        }
        
        // arrow movement
        arrowcounter += 1;
        if (arrowcounter <= 75) {
            arrowhide = 240;
        }
        else if (arrowcounter <=150){
            arrowhide = 700;
        }
        else {
            arrowcounter = 0;
        }
            
        console.log(arrowcounter);
        
        // Player movement
        if (37 in keysDown) {                   // left
            character.src = 'images/hero-sprites-L.png';
            player.x -= player.speed * modifier;
            lastDir = 'left';
            walkAnim();
        } 
        else if (39 in keysDown) {              // right
            character.src = 'images/hero-sprites.png';
            player.x += player.speed * modifier;
            lastDir = 'right';
            walkAnim();
        }
        else {                                  // no input (stopped)
            if (lastDir == 'left') {
                character.src = 'images/hero-L.png';
                player.counter = 0;
                player.sx = 0;
            }
            if (lastDir == 'right') {
                character.src = 'images/hero.png';
                player.counter = 0;
                player.sx = 0;
            }
        }

        // Canvas bounds: right, left
        if (player.x >= canvas.width - player.w) { player.x = canvas.width - player.w; }
        if (player.x <= 0) { player.x = 0; }
        
        // On activation, check proximity to monsters, set prox# flags
        if (38 in keysDown) {                   // up
            var playerMid = player.x + player.w/2;
            if (playerMid <= (monster1.x + monsterImage1.width) && playerMid >= monster1.x) {
                if (player.inventory < 5 && collected1 == false) { player.inventory += 1; collected1 = true; }
                prox1 = true;
            }
            else if (playerMid <= (monster2.x + monsterImage2.width) && playerMid >= monster2.x) {
                if (player.inventory < 5 && collected2 == false) { player.inventory += 1; collected2 = true; }
                prox2 = true;
            }
            else if (playerMid <= (monster3.x + monsterImage3.width) && playerMid >= monster3.x) {
                if (player.inventory < 5 && collected3 == false) { player.inventory += 1; collected3 = true; }
                prox3 = true; 
            }
            else if (playerMid <= (monster4.x + monsterImage4.width) && playerMid >= monster4.x) {
                if (player.inventory < 5 && collected4 == false) { player.inventory += 1; collected4 = true; }
                prox4 = true;
            }
            else if (playerMid <= (monster5.x + monsterImage5.width) && playerMid >= monster5.x) {
                if (player.inventory < 5 && collected5 == false) { player.inventory += 1; collected5 = true; }
                prox5 = true;
            }
        }
        
        // Pause if any prox# flags
        if (prox1 || prox2 || prox3 || prox4 || prox5 == true) { isPaused = true; }
    }
    else if (isPaused == true) {                // GAME PAUSED
        // Unpause when down pressed
        if (40 in keysDown) {                   // down
            prox1 = false;
            prox2 = false;
            prox3 = false;
            prox4 = false;
            prox5 = false;
            isPaused = false;
        }
    }
    
    
    //clean this up - make global variable
    var div = document.getElementById("modal");
    div.style.display = "none";
    
    
    
    if (end == true) {
        div.style.display = "block";
    }
    if (27 in keysDown) {
        end = false;
        isPaused = false;
    }
};