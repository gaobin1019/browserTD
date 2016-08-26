var Enemy = function(x,y){
    this.x = x;
    this.y = y;
};

Enemy.prototype.w = 20;
Enemy.prototype.h = 20;
Enemy.prototype.life = 400;
Enemy.prototype.speed = 1;
Enemy.prototype.isSlowed = false;
Enemy.prototype.color = 'red';

Enemy.prototype.draw = function(){
    context2.fillStyle = this.color;
    context2.fillRect(this.x,this.y,this.w,this.h);
};

Enemy.prototype.move = function(){
    if(this.x<6.5/9*canvas1.width && this.y === 1/9*canvas1.height+1/18*canvas1.height-ENEMY_H/2){//on center of first path
        this.x += this.speed;
    }else if(this.x === Math.ceil(6.5/9*canvas1.width) && this.y < 4.5/9*canvas1.height){
        this.y += this.speed;
    }else if(this.y === Math.ceil(4.5/9*canvas1.height) && this.x > 1.5/9*canvas1.width){
        this.x -= this.speed;
    }else if(this.x === Math.ceil(1.5/9*canvas1.width) && this.y < 7.5/9*canvas1.height){
        this.y += this.speed;
    }else{
        if(this.x <= canvas1.width)
            this.x += this.speed;
    }
};

Enemy.prototype.getStronger = function(stronger){
    this.life += stronger;
};

var enemies = [];
