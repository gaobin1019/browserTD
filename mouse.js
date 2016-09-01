var mouse;
var newGold;

function afordable(){
    var currentGold = parseInt(jQuery('#gold').text());
    newGold = currentGold - towerClass[currentTower].prototype.cost;
    if(newGold >= 0)
        return true;
    else
        return false;
}


//pause and restart logicloop

jQuery('#pause')
    .click(function(){
        if(!paused){
            clearInterval(intervalId);
            paused = true;
            jQuery(this).text('Resume');
        }
        else{
            intervalId = setInterval(logicLoop,GAME_SPEED);
            jQuery(this).text('Pause Game');
            paused = false;
        }
    })
;


jQuery('#changeName')
    .click(function(){
        var newName = jQuery('#userName').val();
        socket.emit('changeName', {
		    'custumName': newName
        });
        console.log('emited: '+ newName);
    })
;

jQuery("#tower1")
    .click(function(){
        currentTower = 0;
    })
;

jQuery("#tower2")
    .click(function(){
        currentTower = 1;
    })
;

jQuery("#tower3")
    .click(function(){
        currentTower = 2;
    })
;
//get mouse position inside the canvas
jQuery(window)
    .mousemove(function (event){
        var rect = canvas1.getBoundingClientRect();
        mouse = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        if(mouse){
            jQuery('#testMouse').text(mouse.x+","+mouse.y);
        }
    })
;
//var currentGold = parseInt(jQuery('#gold').text());
//var newGold = currentGold - tower.prototype.cost;
//jQuery('#gold').text(newGold);
//draw currently selected tower when mousedown and drawable
jQuery(document)
    .mousedown(function(){
        if(drawable(mouse.x,mouse.y) && afordable()){
            towers.push(new towerClass[currentTower](mouse.x,mouse.y));
            towers[towers.length-1].draw();
            jQuery('#gold').text(newGold);
        }
    })
;
