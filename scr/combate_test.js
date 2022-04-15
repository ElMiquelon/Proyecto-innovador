var card_atk;
var card_block;
var card_rest;
var card_strong;

var Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize:
    function Unit(scene, x, y, texture, frame, type, hp, damage) {
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp = this.hp = hp;
        this.damage = damage; // default damage                
    },
    attack: function(target) {
        target.takeDamage(this.damage);      
    },
    takeDamage: function(damage) {
        this.hp -= damage;        
    }
});

var Enemy = new Phaser.Class({
    Extends: Unit,
    initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
});

var PlayerCharacter = new Phaser.Class({
    Extends: Unit,
    initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
        // flip the image so I don't have to edit it manually
        this.flipX = true;
        
        this.setScale(2);
    }
});

export default class combate_test extends Phaser.Scene{

constructor(){
    super({key: "combate_test"});
}

preload(){
    this.load.image("map", "./assets/combate/mapa_c.png");
    this.load.image("player", "./assets/combate/player_c.png");
    this.load.image("dragonblue", "./assets/combate/pew.png");
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

    //cartas
    card_strong = this.add.image(310, 400, 'card_strong').setOrigin(0.5);
    card_block = this.add.image(190, 400, 'card_block').setOrigin(0.5);
    card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
    card_rest = this.add.image(250, 450, 'card_rest').setOrigin(0.5);

    //control
    this.acc = this.input.keyboard.createCursorKeys();

    //Weas
    // player character - warrior
    var warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);        
    this.add.existing(warrior);       
    
    var dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);
    
    // array with heroes
    this.heroes = [warrior];
    // array with enemies
    this.enemies = [dragonblue];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);
}

update(time, delta){


    if (this.acc.right.isDown){
        card_strong.setTexture('card_strong', 1)
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
