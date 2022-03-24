import playerW from "./Jugador/jugadorMA.js";
import NPC from "./NPCMA/NPC.js";
var follower;
var path;
var graphics;
export default class combate_test extends Phaser.Scene{

constructor(){
    super({key: "combate_test"});
}

preload(){
    this.load.image("map", "./assets/mapa_c.png");
    this.load.image("player", "./assets/player_c.png");
    this.load.image("pew", "./assets/pew.png");
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 500 , 480);
    this.physics.world.setBounds(0, 0, 500, 480);
    this.add.image(0, 0, 'map').setOrigin(0);

    //detalles del sprite
    this.jugador = new playerW(this, 30, 30, "player");
    this.jugador.setScale(.1).setOrigin(0,0);
    
    //proyectil
    this.pew = new NPC(this, 0, 250, "pew");
    this.pew.setScale(.2).setOrigin(0,0);
    graphics = this.add.graphics();

    follower = { t: 0, vec: new Phaser.Math.Vector2() };
    path = new Phaser.Curves.Path(100, 100);

    path.lineTo(500, 200);
    path.lineTo(200, 300);
    path.lineTo(400, 500);

    this.tweens.add({
        targets: follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 4000,
        yoyo: true,
        repeat: -1
    });

    //fisicas
    this.jugador.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.pew, this.jugador);
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
    graphics.clear();
    path.draw(graphics);

    path.getPoint(follower.t, follower.vec);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
}
}