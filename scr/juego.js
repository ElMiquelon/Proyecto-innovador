export default class juego extends Phaser.Scene{

constructor(){
    super({key: "juego"});
}
preload(){
    this.load.image("player", "./assets/player.png");
}

create(){
    //detalles del sprite
    this.jugador = this.physics.add.image(20,20,"player");
    this.jugador.setScale(.25);
    this.jugador.setOrigin(0,0);
    //fisicas
    this.jugador.setCollideWorldBounds(true);
    //control
    this.cursor = this.input.keyboard.createCursorKeys();
}

update(time, delta){
    if (this.cursor.right.isDown){
        this.jugador.x++;
    }
    if (this.cursor.left.isDown){
        this.jugador.x--;
    }
    if (this.cursor.up.isDown){
        this.jugador.y--;
    }
    if (this.cursor.down.isDown){
        this.jugador.y++;
    }
}
}