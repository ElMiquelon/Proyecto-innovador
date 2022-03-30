var card_w, card_a, card_s, card_d;
var keys;
export default class combate_test extends Phaser.Scene{

constructor(){
    super({key: "combate_test"});
}

preload(){
    this.load.image("map", "./assets/combate/mapa_c.png");
    //this.load.image("player", "./assets/combate/player_c.png");
    this.load.image("card_off", "./assets/combate/card_off.png")
    this.load.image("card_on", "./assets/combate/card_off.png")
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 500 , 480);
    this.physics.world.setBounds(0, 0, 500, 480);
    this.add.image(0, 0, 'map').setOrigin(0);

    //cartas
    card_w = this.add.sprite(65, 50, 'card_off').setOrigin(0.5);
    card_a = this.add.image(15, 90, 'card_off').setOrigin(0.5);
    card_s = this.add.image(65, 150, 'card_off').setOrigin(0.5);
    card_d = this.add.image(115, 90, 'card_off').setOrigin(0.5);

    //control
    keys = this.input.keyboard.addKeys('W,A,S,D');
    this.movimiento = this.input.keyboard.createCursorKeys();
}

update(time, delta){
    /*ESTO NO FUNCIONA*/
    /*if (this.movimiento.up.isDown){
        card_w.setTexture('card_on')
    }else if (this.movimiento.left.isUp){
        card_w.setTexture('card_off')
    }*/

    card_w.setAlpha((keys.W.isDown) ? 1 : 0.2)
    card_a.setAlpha((keys.A.isDown) ? 1 : 0.2)
    card_s.setAlpha((keys.S.isDown) ? 1 : 0.2)
    card_d.setAlpha((keys.D.isDown) ? 1 : 0.2)
}
}
