var currentTower = 0;

var tower = function(x,y){
    this.x = x;
    this.y = y;
};

tower.prototype.range = 150;
tower.prototype.size = 20;
tower.prototype.color = 'red';
tower.prototype.damage = 20;
tower.prototype.rate = 20;
tower.prototype.cost = 50;

tower.prototype.draw = function(){
    context1.beginPath();
    context1.fillStyle = this.color;
    context1.arc(this.x,this.y,this.size,0,2*Math.PI);
    context1.fill();
    context1.stroke();
};

//draw range alonging with the mouse
function drawRange(){
    context2.beginPath();
    context2.globalAlpha = 0.2;
    if(mouse){
        context2.fillStyle = drawable(mouse.x,mouse.y)? 'yellow':'red';
        context2.arc(mouse.x,mouse.y,towerClass[currentTower].prototype.range,0,2*Math.PI);
    }
    context2.fill();
    context2.globalAlpha = 1;
}

tower.prototype.findTarget = function(){
    if(!enemies) return;

    for (var i=0;i<enemies.length;++i){
        var dist = Math.sqrt(Math.pow((this.x-enemies[i].x),2)+Math.pow((this.y-enemies[i].y),2));
        if (dist < this.range){
            this.target = enemies[i];
            return;
        }
    }
};

tower.prototype.fire = function(){
    if(!this.target || this.target.life <= 0){
        return;//no target
    }else{
        this.rate--;
        if(this.rate<1){
            bullets.push(new Bullet(this.x,this.y,this.target,this.damage,0));
            this.rate = this.constructor.prototype.rate;
        }
    }
};

function drawable(x,y){
    if(x > canvas1.width || x < canvas1.offsetLeft || y > canvas1.height || !afordable() || paused){
        return false;
    }else{
        if(x<canvas1.width && y<1/9*canvas1.height)
            return true;
        else if(x>7/9*canvas1.width && y<7/9*canvas1.height)
            return true;
        else if(x<2/3*canvas1.width && y<4/9*canvas1.height && y>2/9*canvas1.height)
            return true;
        else if(x<1/9*canvas1.width && y>4/9*canvas1.height)
            return true;
        else if(x>2/9*canvas1.width && y<7/9*canvas1.height && y>5/9*canvas1.height)
            return true;
        else if(x>1/9*canvas1.width && y>8/9*canvas1.height)
            return true;
        else
            return false;//what else will be?
    }
}

//Freeze tower
var Tower2 = function(x,y){
    this.x = x;
    this.y = y;
};
Tower2.prototype = Object.create(tower.prototype);
Tower2.prototype.constructor = Tower2;

Tower2.prototype.color = 'blue';
Tower2.prototype.ice = true;
Tower2.prototype.cost = 70;


Tower2.prototype.fire = function(){
    if(!this.target || this.target.life <= 0){
        return;//no target
    }else{
        this.rate--;
        if(this.rate<1){
            bullets.push(new Bullet(this.x,this.y,this.target,this.damage,1));
            this.rate = this.constructor.prototype.rate;
        }
    }
};

//split mode tower
var Tower3 = function(x,y){
    this.x = x;
    this.y = y;
    this.targets = [];
};

Tower3.prototype = Object.create(tower.prototype);
Tower3.prototype.constructor = Tower3;

Tower3.prototype.color = 'yellow';
Tower3.prototype.rate = 20;
Tower3.prototype.damage = 20;
Tower3.prototype.cost = 100;
//Tower3.prototype.targets = [];


Tower3.prototype.findTarget = function(){
    if(!enemies) return;
    for(var i=0;i<enemies.length;++i){
        var dist = Math.pow((this.x-enemies[i].x),2)+Math.pow((this.y-enemies[i].y),2);
        if (dist <= this.range*this.range && jQuery.inArray(enemies[i],this.targets) === -1){
            this.targets.push(enemies[i]);
        }else{
            if(dist > this.range*this.range){
                this.targets.splice(i,1);
            }
        }
    }
    //console.log(this.targets.length);
};

Tower3.prototype.fire = function(){
    if(!this.targets) return;
    else{
        this.rate--;
        if(this.rate<1){
            for(var i=0;i<this.targets.length;++i){
                bullets.push(new Bullet(this.x,this.y,this.targets[i],this.damage,0));
            }
            this.rate = this.constructor.prototype.rate;
        }
    }
    //console.log("targets:"+this.targets.length);
};


//used to select tower type
var towerClass = [tower,Tower2,Tower3];
var towers = [];
