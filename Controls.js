Controls.PricePeas = Weapon.Peas;
function Controls(){
    Controls.controls = [];

    var starTexture = PIXI.Texture.fromImage('sprites/start.png');
    var star = new PIXI.Sprite(starTexture);
    star.width = 50;
    star.height = 49;
    star.position.x = 20;
    star.position.y = 20;
    Game.stage.addChild(star);

    Controls.score = new PIXI.Text(Game.score, {
        fill: '#ffffff',
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI/3,
        dropShadowDistance: 2
    });
    Controls.score.anchor.y = 0.5;
    Controls.score.position.x = star.position.x + star.width + 20;
    Controls.score.position.y = star.position.y + star.height/2;
    Game.stage.addChild(Controls.score);


    var pricePeasTexture = PIXI.Texture.fromImage('sprites/pricePeas.png');
    var pricePeas = new PIXI.Sprite(pricePeasTexture);
    pricePeas.custonName = Controls.PricePeas;
    pricePeas.width = 112;
    pricePeas.height = 70;
    pricePeas.position.x = 20;
    pricePeas.position.y = star.position.y + star.height + 20;
    Game.stage.addChild(pricePeas);
    Controls.controls.push(pricePeas);
}

Controls.update = function(){
    Controls.score.setText(Game.score);
};

Controls.getControlByCord = function(x, y){
    var result = null;
    Controls.controls.some(function(control, index){
        if(x > control.position.x && x < control.position.x+control.width &&
        y > control.position.y && y < control.position.y + control.height){
            result = control.custonName;
            return true;
        }
    });
    return result;
};