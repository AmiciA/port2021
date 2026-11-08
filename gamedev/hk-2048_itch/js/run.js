// Draw everything
var render = function () {
	// Draw background & characters when ready
    if (bgReady) { ctx.drawImage(bg, 0, 0); };
    
	if (monsterReady1) { ctx.drawImage(monsterImage1, monster1.x, monster1.y); };
    if (monsterReady2) { ctx.drawImage(monsterImage2, monster2.x, monster2.y); }; 
    if (monsterReady3) { ctx.drawImage(monsterImage3, monster3.x, monster3.y); };
    if (monsterReady4) { ctx.drawImage(monsterImage4, monster4.x, monster4.y); };
    if (arrowReady)    { ctx.drawImage(arrowImage, 548, arrowhide); };
    if (characterReady) { ctx.drawImage(character, player.sx, 0, player.w, player.h, player.x, player.y, player.w, player.h); };
    if (monsterReady5) { ctx.drawImage(monsterImage5, monster5.x, monster5.y); };
    
    ctx.drawImage(trashImage, 0, canvas.height-trashImage.height-4);
       

    // Show button-press prompt when near monster
    if (prompt) {
        ctx.drawImage(up, player.x+50, player.y +140)
    }
    
    // Word wrapping
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, wx, wy);
            line = words[n] + ' ';
            wy += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, wx, wy);
      }
    var maxWidth = 350;
    var lineHeight = 25;
    var wx = 75;
    var wy = 185;
    var ty = 110;
    var text = ""
    
    // Show drone
    ctx.drawImage(droneImage, drone.x, drone.y, 68, 36)

    // Show item's information
    if (prox1) {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(50, 50, (canvas.width/2 - 100), canvas.height-100);
        
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Segoe UI, Open Sans, Arial, sans-serif";
        ctx.fillText("One Country, One Flag", wx, ty);
        
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(50, 140, (canvas.width/2 - 100), 1);
        
        ctx.fillStyle = "#333333";
        ctx.font = "15px Segoe UI, Open Sans, Arial, sans-serif";
        var text = "Since last year's Annex into the new Pearl River Delta Megaprovince, all Hong Kong flags and insignia have been retired. 15 million new PRC flags were delivered to households across the city as a gesture of goodwill, while former SAR and colonial symbols have been banned from use due to possible separatist intentions. ";
        
        ctx.drawImage(down, wx-5, canvas.height-100, 120, 40);
        
        ctx.drawImage(monsterBig1, (canvas.width/2 - 130), 21, 120, 120);
    }
    
    else if (prox2) {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(50, 50, (canvas.width/2 - 100), canvas.height-100);
        
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Segoe UI, Open Sans, Arial, sans-serif";
        ctx.fillText("Mainland Investment", wx, ty);
        
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(50, 140, (canvas.width/2 - 100), 1);
        
        ctx.fillStyle = "#333333";
        ctx.font = "15px Segoe UI, Open Sans, Arial, sans-serif";
        var text = "Most western companies have long since pulled their headquarters from Hong Kong, but low tax rates within the Xianggang SEZ have encouraged many Chinese companies to take their place. In addition, Emperor Xi personally instituted heavy subsidies in the two former SARs to ensure no ethnic Chinese went unemployed if their western employer left the city.";
        
        ctx.drawImage(down, wx-5, canvas.height-100, 120, 40);
        
        ctx.drawImage(monsterBig2, (canvas.width/2 - 170), 21, 160, 120);
    }
    else if (prox3) {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(50, 50, (canvas.width/2 - 100), canvas.height-100);
        
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Segoe UI, Open Sans, Arial, sans-serif";
        ctx.fillText("Real Estate", wx, ty);
        
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(50, 140, (canvas.width/2 - 100), 1);
        
        ctx.fillStyle = "#333333";
        ctx.font = "15px Segoe UI, Open Sans, Arial, sans-serif";
        var text = "In order to make space for the influx of Chinese workers, protections on Country Parks have been cut and developers are beginning to clear the trees and level the mountainsides across Hong Kong in preparation for construction. Besides, Maluanshan Park in Shenzhen is just a quick 15 minute journey away with the Express Rail Link!";
        
        ctx.drawImage(down, wx-5, canvas.height-100, 120, 40);
        
        ctx.drawImage(monsterBig3, (canvas.width/2 - 200), 21, 160, 120);
    }
    else if (prox4) {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(50, 50, (canvas.width/2 - 100), canvas.height-100);
        
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Segoe UI, Open Sans, Arial, sans-serif";
        ctx.fillText("Speak Mandarin", wx, ty);
        
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(50, 140, (canvas.width/2 - 100), 1);
        
        ctx.fillStyle = "#333333";
        ctx.font = "15px Segoe UI, Open Sans, Arial, sans-serif";
        var text = "To promote greater harmony and understanding between the former SARs and the rest of the Megaprovince, a 'Speak Mandarin' campaign has been implemented. All speech in public is monitored and those who don't meet the daily quota for Mandarin are required to take extra lessons or risk losing their right to work in the city.";
        
        ctx.drawImage(down, wx-5, canvas.height-100, 120, 40);
        
        ctx.drawImage(monsterBig4, (canvas.width/2 - 190), 21, 160, 120);
    }
    else if (prox5) {
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
         ctx.fillStyle = "#ffffff";
        ctx.fillRect(50, 50, (canvas.width/2 - 100), canvas.height-100);
        
        ctx.fillStyle = "#000000";
        ctx.font = "bold 24px Segoe UI, Open Sans, Arial, sans-serif";
        ctx.fillText("Air Quality", wx, ty);
        
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(50, 140, (canvas.width/2 - 100), 1);
        
        ctx.fillStyle = "#333333";
        ctx.font = "15px Segoe UI, Open Sans, Arial, sans-serif";
        var text = "With factories expanding across the Shenzhen river into newly-cleared Country Parks comes an expanding smog cloud. A daily AQI over 250 is the everyday reality now and residents are advised to wear masks when walking outside. Plants can barely get enough sunlight to survive.";
        
        ctx.drawImage(down, wx-5, canvas.height-100, 120, 40);
        
        ctx.drawImage(monsterBig5, (canvas.width/2 - 130), 20, 160, 120);
    }
    wrapText(ctx, text, wx, wy, maxWidth, lineHeight);
    
    // inventory/progress
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(canvas.width/2 - 100, canvas.height-30, 200, 35);
    
    ctx.fillStyle = "#333333";
    ctx.font = "bold 14px Segoe UI, Open Sans, Arial, sans-serif";
    ctx.fillText("Discovered: " + player.inventory + "/5", 443, canvas.height-9);
    
    //trigger end state
    if (player.inventory == 5) {
        ctx.fillStyle = "#59dd33";
        ctx.fillRect(canvas.width/2-100, canvas.height-30, 200, 30);
        
        ctx.fillStyle = "white"
        ctx.fillText("press 'E' to return", 435, canvas.height-10);
        if (69 in keysDown) {
            end = true;
            isPaused = true;
        }
        if (82 in keysDown) {
            end = false;
            isPaused = false;
        }
    }
    
    
    //clean this up - make global variable
    var div = document.getElementById("modal");
    div.style.display = "none";
    
    
    if (end == true) {
        div.style.display = "block";
    }
    /*else if (end == true && 27 in keysDown) {
        div.style.display = "none";
    }*/
};


// Main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    window.requestAnimationFrame(main);
};


// Set timefix & begin game
var then = Date.now();
loadImages();
main();