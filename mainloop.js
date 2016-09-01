const ENEMY_W = 20;
const ENEMY_H = 20;
const DISPLAY_LEADERBOARD_LENGTH = 10;
const GAME_SPEED = 10;

var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');


var context1 = canvas1.getContext('2d');
var context2 = canvas2.getContext('2d');


var enemyLife = 40;
var addedLife = 100;
var enemySpeed = 20;
var enemySpawnTime = 100;
var enemyEscaped = 0;


var scoredPoints = 0;
var hunterGold = 10;
var intervalId;

var paused = false;

//  <li class="list-group-item">Cras justo odio</li>
var leaderboardToString = function(arrObj){
    var res = "";
    for(var i=0;i<arrObj.length && i<DISPLAY_LEADERBOARD_LENGTH;++i){
        res += '<li class="list-group-item">' + '<b>' + (1+i) + '</b>' +',   ' + arrObj[i].userName + ", score: " + arrObj[i].userScore + "</li>";
    }
    return res;
};

window.onload = function(){
    socket.on('sortedBoard',function(msg){
        if(msg.length>0){
            console.log(leaderboardToString(msg));
            jQuery('#leaderboard').html(leaderboardToString(msg));
        }else{
            jQuery('#leaderboard').text("------------");
        }
    });
    intervalId = setInterval(logicLoop, GAME_SPEED);
    renderLoop();
};

var towers = [];

var path = new Enemy_path(0,1/9*canvas1.height,2/3*canvas1.width,2/3*canvas1.width,1/9*canvas1.height,4/9*canvas1.height,1/9*canvas1.height,4/9*canvas1.height,2/3*canvas1.height,1/9*canvas1.height,5/9*canvas1.height,1/3*canvas1.height,2/9*canvas1.height,7/9*canvas1.height,7/9*canvas1.height,1/9*canvas1.width);
path.draw();

function renderLoop(){
    context2.clearRect(0,0,canvas1.width,canvas1.height);

    for(var i=0;i<enemies.length;++i){
        enemies[i].draw();
    }

    for(var j=0;j<bullets.length;++j){
        bullets[j].draw();
    }

    drawRange();
    window.requestAnimationFrame(renderLoop);
}

function logicLoop(){
    if(enemyEscaped >= 10){
        alert("you lost");
        socket.emit('lost', {
		    'score': scoredPoints
        });
        clearInterval(intervalId);
    }


    enemySpawnTime--;
    if(enemySpawnTime < 1){
        enemies.push(new Enemy(0,1/9*canvas1.height+1/18*canvas1.height-ENEMY_H/2));
        enemySpawnTime = 100;
    }

    for(var i=0;i<enemies.length;++i){
        enemies[i].move();
        if(enemies[i].life <= 0){
            enemies.splice(i,1);
            scoredPoints++;
            jQuery('#scoredPoints').text(scoredPoints);

            //get stronger
            addedLife += 1;

            for(var countI=0;countI<enemies.length;++countI){
                enemies[countI].getStronger(addedLife);
            }

            //update gold
            var resGold = parseInt(jQuery('#gold').text()) + hunterGold;
            jQuery('#gold').text(resGold);
        }
        if(enemies[i].x >= canvas1.width){
            enemyEscaped++;
            enemies.splice(i,1);
            jQuery('#escapedNum').text(enemyEscaped);
        }


    }

    for(var j=0;j<towers.length;++j){
        towers[j].findTarget();
        //if(towers[j].ice)
        //towers[j].fireIce();
        towers[j].fire();
    }

    for(var k=0;k<bullets.length;++k){
        bullets[k].move();
        if(bullets[k].checkCollision()){
            bullets.splice(k,1);
        }
    }
}
