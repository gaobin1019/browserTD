var bullets = [];

var Bullet = function(x,y,target,damage,type){//type 0 normal, 1 ice bullet
    this.x = x;
    this.y = y;
    this.target = target;
    this.damage = damage;
    this.type = type;
};

Bullet.prototype.r = 5;
Bullet.prototype.speed = 4;


Bullet.prototype.draw = function(){
    context2.beginPath();
    context2.arc(this.x,this.y,this.r,0,2*Math.PI);
    if(this.type === 0)
        context2.fillStyle = 'black';
    else
        context2.fillStyle = 'blue';
    context2.fill();
};

Bullet.prototype.move = function(){
    var xDist = this.target.x-this.x;
    var yDist = this.target.y-this.y;
    var dist = Math.sqrt(xDist*xDist+yDist*yDist);
    this.x = this.x+this.speed*xDist/dist;
    this.y = this.y+this.speed*yDist/dist;
};

Bullet.prototype.checkCollision = function() {
  if(Math.abs(this.x-this.target.x)<5 && Math.abs(this.y-this.target.y)<5) {//close enough
       this.target.life -= this.damage;
       if(this.type === 1){
           //console.log(this.type);
           if(!this.target.isSlowed){
               this.target.speed /= 2;
               this.target.isSlowed = true;
               this.target.color = 'blue';
           }
           //console.log(this.target.speed);
       }
       return true;
     }
  return false;
};
