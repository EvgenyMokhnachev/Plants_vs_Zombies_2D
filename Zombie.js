function Zombie(cell){
    this.lineNumber = cell.lineNumber;
    this.winX = Cell.getFirstCellByLine(cell.lineNumber).x;

    this.health = 100;

    this.texture = PIXI.Texture.fromImage('sprites/zombie_'+Game.getRandomInt(1, 5)+'.png');
    this.sprite = new PIXI.Sprite(this.texture);

    this.sprite.width = 90;
    this.sprite.height = 100;

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 1;

    this.sprite.position.y = cell.y+cell.height;
    this.sprite.position.x = cell.x+cell.width/2;

    Game.stage.addChild(this.sprite);
    Game.zombies.push(this);
}

Zombie.prototype.move = function(speed){
    if(this.sprite.position.x > this.winX){
        this.sprite.position.x -= speed;
        return true;
    } else {
        this.kill();
        return false;
    }
};

Zombie.prototype.kill = function(){
    Game.stage.removeChild(this.sprite);
};

Zombie.setZombies = function(count){
    var cells = Cell.getRandomLastCells(count);

    cells.forEach(function(item){
        new Zombie(item);
    });
};
