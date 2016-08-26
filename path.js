var Enemy_path = function(x1,y1,l1,x2,y2,l2,x3,y3,l3,x4,y4,l4,x5,y5,l5,width){
    this.x1 = x1;
    this.y1 = y1;
    this.l1 = l1;

    this.x2 = x2;
    this.y2 = y2;
    this.l2 = l2;

    this.x3 = x3;
    this.y3 = y3;
    this.l3 = l3;

    this.x4 = x4;
    this.y4 = y4;
    this.l4 = l4;

    this.x5 = x5;
    this.y5 = y5;
    this.l5 = l5;

    this.width = width;
};

Enemy_path.prototype.draw = function(){
    context1.fillStyle = 'green';
    context1.fillRect(this.x1,this.y1,this.l1,this.width);
    context1.fillRect(this.x2,this.y2,this.width,this.l2);
    context1.fillRect(this.x3,this.y3,this.l3,this.width);
    context1.fillRect(this.x4,this.y4,this.width,this.l4);
    context1.fillRect(this.x5,this.y5,this.l5,this.width);
};
