import playerW from "./Jugador/jugadorMA.js";
import NPC from "./NPCMA/NPC.js";
export default class juego extends Phaser.Scene{

constructor(){
    super({key: "juego"});
}
preload(){
    this.load.image("map", "./assets/overworld/mapa.jpg");
    this.load.image("player", "./assets/overworld/player.png");
    this.load.image("remilia", "./assets/overworld/NPC1.jpg");
    this.load.image("flandre", "./assets/overworld/NPC2.jpg");
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 1066 , 635);
    this.physics.world.setBounds(0, 0, 1066, 635);
    this.add.image(0, 0, 'map').setOrigin(0);

    //detalles del sprite
    this.jugador = new playerW(this, 30, 30, "player");
    this.jugador.setScale(.1).setOrigin(0,0);

    this.remilia = new NPC(this, 300, 200, "remilia");
    this.remilia.setScale(.2).setOrigin(0,0);

    this.flandre = new NPC(this, 800, 500, "flandre");
    this.flandre.setScale(.2).setOrigin(0,0);
    //fisicas
    this.jugador.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.flandre, this.jugador);
    this.physics.add.collider(this.remilia, this.jugador);
    //detalles de la cámara
    this.cameras.main.startFollow(this.jugador);
    this.cameras.main.followOffset.set(0, 0);
    //control
    this.movimiento = this.input.keyboard.createCursorKeys();
}

update(time, delta){
    if (this.movimiento.right.isDown){
        this.jugador.body.setVelocityX(150);
    }else if (this.movimiento.left.isDown){
        this.jugador.body.setVelocityX(-150);
    }else {
        this.jugador.body.setVelocityX(0);
    }
    
    if (this.movimiento.up.isDown){
        this.jugador.body.setVelocityY(-150);
    }else if (this.movimiento.down.isDown){
        this.jugador.body.setVelocityY(150);
    }else {
        this.jugador.body.setVelocityY(0);  
    }
    
    
    
}
}