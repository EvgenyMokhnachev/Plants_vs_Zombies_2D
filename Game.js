function Game(){
    Game.width = document.documentElement.clientWidth-4;
    Game.height = document.documentElement.clientHeight-4;

    Game.stage = new PIXI.Stage(0x66FF99);
    Game.renderer = PIXI.autoDetectRenderer(999, 600);

    Game.zombies = [];
    Game.weapons = [];
    Game.bullets = [];
    Game.winnerZombieCount = 0;
    Game.score = 500;
    Game.previewWeapon = null;

    var renderView = Game.renderer.view;
    document.body.appendChild(renderView);
    Game.initMouseEvents(renderView);
    Game.init();
    Game.update();
}

Game.init = function(){
    var textureMapBackground = PIXI.Texture.fromImage('sprites/mapBackground.jpg');
    var mapBackground = new PIXI.Sprite(textureMapBackground);
    mapBackground.anchor.x = 0;
    mapBackground.anchor.y = 0;
    mapBackground.position.x = 0;
    mapBackground.position.y = 0;
    Game.stage.addChild(mapBackground);

    Cell.addCell(new Cell(1,253, 85, 82, 94, false, true));
    Cell.addCell(new Cell(1, 335, 85, 74, 94));
    Cell.addCell(new Cell(1, 409, 85, 91, 94));
    Cell.addCell(new Cell(1, 409, 85, 91, 94));
    Cell.addCell(new Cell(1, 500, 85, 76, 94));
    Cell.addCell(new Cell(1, 576, 85, 79, 94));
    Cell.addCell(new Cell(1, 655, 85, 85, 94));
    Cell.addCell(new Cell(1, 740, 85, 72, 94));
    Cell.addCell(new Cell(1, 812, 85, 85, 94));
    Cell.addCell(new Cell(1, 897, 85, 84, 94, true));

    Cell.addCell(new Cell(2, 253, 179, 82, 100, false, true));
    Cell.addCell(new Cell(2, 335, 179, 74, 100));
    Cell.addCell(new Cell(2, 409, 179, 91, 100));
    Cell.addCell(new Cell(2, 409, 179, 91, 100));
    Cell.addCell(new Cell(2, 500, 179, 76, 100));
    Cell.addCell(new Cell(2, 576, 179, 79, 100));
    Cell.addCell(new Cell(2, 655, 179, 85, 100));
    Cell.addCell(new Cell(2, 740, 179, 72, 100));
    Cell.addCell(new Cell(2, 812, 179, 85, 100));
    Cell.addCell(new Cell(2, 897, 179, 84, 100, true));

    Cell.addCell(new Cell(3, 253, 279, 82, 105, false, true));
    Cell.addCell(new Cell(3, 335, 279, 74, 105));
    Cell.addCell(new Cell(3, 409, 279, 91, 105));
    Cell.addCell(new Cell(3, 409, 279, 91, 105));
    Cell.addCell(new Cell(3, 500, 279, 76, 105));
    Cell.addCell(new Cell(3, 576, 279, 79, 105));
    Cell.addCell(new Cell(3, 655, 279, 85, 105));
    Cell.addCell(new Cell(3, 740, 279, 72, 105));
    Cell.addCell(new Cell(3, 812, 279, 85, 105));
    Cell.addCell(new Cell(3, 897, 279, 84, 105, true));

    Cell.addCell(new Cell(4, 253, 384, 82, 85, false, true));
    Cell.addCell(new Cell(4, 335, 384, 74, 85));
    Cell.addCell(new Cell(4, 409, 384, 91, 85));
    Cell.addCell(new Cell(4, 409, 384, 91, 85));
    Cell.addCell(new Cell(4, 500, 384, 76, 85));
    Cell.addCell(new Cell(4, 576, 384, 79, 85));
    Cell.addCell(new Cell(4, 655, 384, 85, 85));
    Cell.addCell(new Cell(4, 740, 384, 72, 85));
    Cell.addCell(new Cell(4, 812, 384, 85, 85));
    Cell.addCell(new Cell(4, 897, 384, 84, 85, true));

    Cell.addCell(new Cell(5, 253, 469, 82, 107, false, true));
    Cell.addCell(new Cell(5, 335, 469, 74, 107));
    Cell.addCell(new Cell(5, 409, 469, 91, 107));
    Cell.addCell(new Cell(5, 409, 469, 91, 107));
    Cell.addCell(new Cell(5, 500, 469, 76, 107));
    Cell.addCell(new Cell(5, 576, 469, 79, 107));
    Cell.addCell(new Cell(5, 655, 469, 85, 107));
    Cell.addCell(new Cell(5, 740, 469, 72, 107));
    Cell.addCell(new Cell(5, 812, 469, 85, 107));
    Cell.addCell(new Cell(5, 897, 469, 84, 107, true));

    Zombie.setZombies(Game.getRandomInt(1,5));
    setInterval(function(){
        Zombie.setZombies(Game.getRandomInt(1,5));
    }, 3500);

    var controls = new Controls();

    var audio = new Audio('audios/background/sound_'+Game.getRandomInt(1,6)+'.mp3');
    audio.loop = true;
    audio.play();
};

Game.update = function(){
    requestAnimFrame(Game.update);

    Game.zombies.forEach(function(zombie, indexZombie){
        if(zombie){
            if(!zombie.move(0.7)) {
                delete Game.zombies[indexZombie];
                ++Game.winnerZombieCount;
            } else {
                Game.weapons.some(function(weapon, indexWeapon){
                    if(weapon.lineNumber == zombie.lineNumber){
                        if(weapon.sprite.position.x > zombie.sprite.position.x-zombie.sprite.width/2 && weapon.sprite.position.x < zombie.sprite.position.x + zombie.sprite.width/2){
                            weapon.kill();
                            delete Game.weapons[indexWeapon];
                            return true;
                        }
                    }
                });

                Game.bullets.some(function(bullet, indexBullet){
                    if(bullet.lineNumber == zombie.lineNumber){
                        if(bullet.sprite.position.x > zombie.sprite.position.x){
                            zombie.health -= bullet.power;
                            if(zombie.health <= 0){
                                zombie.kill();
                                Game.score += 50;
                                delete Game.zombies[indexZombie];
                            }

                            bullet.kill(true);
                            delete Game.bullets[indexBullet];

                            return true;
                        }
                    }
                });
            }
        }
    });

    Game.bullets.forEach(function(bullet, bulletIndex){
        if(!bullet.move(3)){
            delete Game.bullets[bulletIndex];
        }
    });

    Controls.update();

    Game.renderer.render(Game.stage);
};

Game.getRandomInt = function(min, max){return Math.floor(Math.random() * (max - min + 1)) + min;};

Game.initMouseEvents = function(canvas){
    var x = null;
    var y = null;
    canvas.onmousemove = function(event){
        x = event.layerX;
        y = event.layerY;

        var mouseInCell = Cell.getCellByCords(x, y);
        if(Game.previewWeapon && mouseInCell) Game.previewWeapon.setToCell(mouseInCell);
    };
    canvas.onclick = function(){
        var clickedCell = Cell.getCellByCords(x, y);
        if(clickedCell){
            if(Game.previewWeapon){

                var error = Game.weapons.some(function(weapon, index){
                    if(Game.previewWeapon.cell.x == weapon.cell.x && Game.previewWeapon.cell.y == weapon.cell.y){
                        return true;
                    }
                });

                if(Game.previewWeapon.cell.x == clickedCell.x && Game.previewWeapon.cell.y == clickedCell.y && !error){
                    Game.previewWeapon.init();
                    Game.previewWeapon = null;
                }
            }
        } else {
            var controlName = Controls.getControlByCord(x, y);

            switch (controlName){
                case 'peas': {
                    if(!Game.previewWeapon && Game.score >= 100) {
                        Game.previewWeapon = new Weapon(Weapon.Peas);
                        Game.score -= 100;
                    }
                }
            }
        }
    };
};