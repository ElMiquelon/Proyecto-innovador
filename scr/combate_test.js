var card_atk;
var card_block;
var card_rest;
var card_strong;

var playerStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00
};

var enemyStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00
};

var Combate = {
    healPlayer : function(raw){
        playerStats.hp += raw;
        if (playerStats.hp > playerStats.hp){
            playerStats.hp = playerStats.maxhp;
        }
    }
};


/*function empezarCombate(atk, maxhp, def, res, eatk, emaxhp, eres) {
    
}*/

export default class combate_test extends Phaser.Scene{

constructor(){
    super({key: "combate_test"});
}

preload(){
    this.load.image("map", "./assets/combate/mapa_c.png");
    this.load.image("player_c", "./assets/combate/player_c.png");
    this.load.image("enemy_c", "./assets/combate/pew.png");
    this.load.spritesheet("card_atk", "./assets/combate/card_atk.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_block", "./assets/combate/card_block.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_rest", "./assets/combate/card_rest.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_strong", "./assets/combate/card_strong.png", {frameWidth: 50, frameHeight: 70});
    
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 500 , 480);
    this.physics.world.setBounds(0, 0, 500, 480);
    this.add.image(0, 0, 'map').setOrigin(0);

    //jugador
    /*var x = new PlayerStats(combate_test, 50, 50, "player_c", 100, 7, 5, 1.00);*/

    //cartas
    card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
    card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
    card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
    card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

    //control
    this.acc = this.input.keyboard.createCursorKeys();
}

update(time, delta){
    if (this.acc.right.isDown){
        card_strong.setTexture('card_strong', 1)
        Combate.healPlayer(10);
        console.log('Vida = ' + playerStats.hp);
    }else if (this.acc.left.isDown){
        card_block.setTexture('card_block', 1)
    }else if (this.acc.up.isDown){
        card_atk.setTexture('card_atk', 1)
    }else if (this.acc.down.isDown){
        card_rest.setTexture('card_rest', 1)
    }else{
        card_strong.setTexture('card_strong', 0)
        card_block.setTexture('card_block', 0)
        card_atk.setTexture('card_atk', 0)
        card_rest.setTexture('card_rest', 0)
    }
}
}
