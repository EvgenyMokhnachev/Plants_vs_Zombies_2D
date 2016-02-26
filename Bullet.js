function Bullet(x, y, cell){
    if(!Bullet.texture) Bullet.texture = PIXI.Texture.fromImage('sprites/bullet.png');
    this.power = 20;
    this.lineNumber = cell.lineNumber;
    this.winCell = Cell.getLastCellByLine(this.lineNumber);
    this.winX = this.winCell.x + this.winCell.width;
    this.texture = Bullet.texture;
    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;

    var bulletSound = new Audio('audios/bulletStart.mp3');
    bulletSound.loop = false;
    bulletSound.volume = 0.3;
    bulletSound.play();

    Game.stage.addChild(this.sprite);
    Game.bullets.push(this);
}

Bullet.prototype.move = function(speed){
    if(this.sprite.position.x < this.winX){
        this.sprite.position.x += speed;
        return true;
    } else {
        this.kill(false);
        return false;
    }
};

Bullet.prototype.kill = function(soundBoolean){
    if(soundBoolean){
        var bulletSound = new Audio('audios/bulletEnd.mp3');
        bulletSound.loop = false;
        bulletSound.volume = 0.3;
        bulletSound.play();
    }
    Game.stage.removeChild(this.sprite);
};