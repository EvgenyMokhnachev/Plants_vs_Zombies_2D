Weapon.Peas = 'peas';

function Weapon(type){
    if(!Weapon.textures) {
        Weapon.textures = {};
        Weapon.textures[Weapon.Peas] = PIXI.Texture.fromImage('sprites/'+Weapon.Peas+'.png');
    }
    this.type = type;
    this.texture = Weapon.textures[this.type];
    this.sprite = new PIXI.Sprite(this.texture);
    this.shotInterval = null;
}

Weapon.prototype.setToCell = function(cell){
    if(this.cell) if(this.cell === cell) return;
    this.cell = cell;
    this.lineNumber = cell.lineNumber;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 1;
    this.sprite.position.x = cell.x+cell.width/2;
    this.sprite.position.y = cell.y+cell.height;
    this.sprite.width = 80;
    this.sprite.height = 80;
    Game.stage.addChild(this.sprite);
};

Weapon.prototype.init = function(){
    Game.weapons.push(this);
    var selfWeapon = this;
    if(this.type == Weapon.Peas){
        this.shotInterval = setInterval(function(){
            var notEmptyLine = Game.zombies.some(function(zombie){
                return zombie.lineNumber == selfWeapon.lineNumber;
            });
            if(notEmptyLine) new Bullet(selfWeapon.sprite.position.x+selfWeapon.sprite.width/2, selfWeapon.sprite.position.y-60, selfWeapon.cell)
        }, 1500);
    }
};

Weapon.prototype.kill = function(){
    if(this.shotInterval) clearInterval(this.shotInterval);
    Game.stage.removeChild(this.sprite);
};