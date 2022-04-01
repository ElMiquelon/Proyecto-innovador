import playerW from "./Jugador/jugadorMA.js";
import NPC from "./NPCMA/NPC.js";
import dialogue1 from "./NPCMA/NPC1/dialogos.js";
export default class juego extends Phaser.Scene{


constructor(){
    super({key: "juego"});
}
preload(){
    this.load.image("map", "./assets/overworld/mapa.jpg");
    this.load.image("player", "./assets/overworld/player.png");
    this.load.image("remilia", "./assets/overworld/NPC1.jpg");
    this.load.image("patchouli", "./assets/overworld/NPC2.jpg");
    this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
    //las medidas de la hoja de sprites dependerán del modelo final
    this.load.spritesheet("spritemilia", "./assets/overworld/NPC1_sprite.png", {frameWidth:24, frameHeight:32});
    this.load.spritesheet("spriteknowledge", "./assets/overworld/NPC2_sprite.png", {frameWidth:24, frameHeight:32});
    //this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 1066 , 635);
    this.physics.world.setBounds(0, 0, 1066, 635);
    this.add.image(0, 0, 'map').setOrigin(0);


    //detalles del sprite
    this.jugador = new playerW(this, 30, 30, "playersprite");
    this.jugador.setOrigin(0,0)/*.setScale(.1) Puede volver a ser necesario*/;
    this.anims.create({
        key: 'top_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [0,1,2,3]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })
    //todos los tachados son los que al final no se usarán
    /*this.anims.create({
        key: 'topright_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [4,5,6,7]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })*/

    this.anims.create({
        key: 'right_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [8,9,10,11]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })

    /*this.anims.create({
        key: 'botright_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [12,13,14,15]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })*/

    this.anims.create({
        key: 'bot_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [16,17,18,19]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })

    /*this.anims.create({
        key: 'botleft_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [20,21,22,23]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })*/

    this.anims.create({
        key: 'left_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [24,25,26,27]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })

    /*this.anims.create({
        key: 'topleft_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [28,29,30,31]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })*/ 

    this.anims.create({
        key: 'stall',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [16,18]
        }),
        repeat: -1,
        frameRate:8//no se cual se vea mejor
    })

    this.jugador.anims.play('stall');

    this.remilia = new NPC(this, 300, 200, "spritemilia");
    this.remilia.setOrigin(0,0).setInteractive();
    this.anims.create({
        key: 'stallmilia',
        frames: this.anims.generateFrameNumbers('spritemilia',{
            frames: [30,32]
        }),
        repeat: -1,
        frameRate:4//no se cual se vea mejor
    })
    this.remilia.anims.play('stallmilia');

    this.patchouli = new NPC(this, 800, 500, "spriteknowledge");
    this.patchouli.setOrigin(0,0);
    this.anims.create({
        key: 'stallknowledge',
        frames: this.anims.generateFrameNumbers('spriteknowledge',{
            frames: [70,71,12]
        }),
        repeat: -1,
        frameRate:4//no se cual se vea mejor
    })
    this.patchouli.anims.play('stallknowledge');

    //fisicas
    this.jugador.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.patchouli, this.jugador);
    this.physics.add.collider(this.remilia, this.jugador);
    //detalles de la cámara
    this.cameras.main.startFollow(this.jugador);
    this.cameras.main.followOffset.set(0, 0);
    //control
    this.movimiento = this.input.keyboard.createCursorKeys();


    //sistema de dialogos 
    let basedialogos = this.add.text(0,0,'sample text xdxdxdddd',{
        color:'#000',
        backgroundColor: '#fff',
        fontSize: '12px',
        padding:{
            bottom: 5
        }
    }).setVisible(false);
    var mensaje;
    //Variables universales
    
    //esta variable es para confirmar si ya se habló por primera vez o no
    //con el proposito de tener un primer dialogo "especial" y luego "genericos"
    //se puede cambiar por un registry mas adelante
    var remiliaFT = true;
    var posicion = this.remilia.getBounds();
    //variables de personaje 

    this.remilia.on('pointerdown', function(){
        mensaje = dialogue1(remiliaFT);
        remiliaFT=false;
        basedialogos.setText(mensaje).setVisible(true).setX(posicion.right).setY(posicion.top);
    });
    this.remilia.on('pointerout', function(){
        basedialogos.setVisible(false);
    });
    //eventos de personaje
}

update(time, delta){
    this.jugador.body.setVelocity(0);

    if (this.movimiento.right.isDown ){
        this.jugador.body.setVelocityX(300);
        this.jugador.anims.play('right_walk',true);
    }else if (this.movimiento.left.isDown){
        this.jugador.body.setVelocityX(-300);
        this.jugador.anims.play('left_walk', true);
    }else if (this.movimiento.up.isDown){
        this.jugador.body.setVelocityY(-300);
        this.jugador.anims.play('top_walk', true);
    }else if (this.movimiento.down.isDown){
        this.jugador.body.setVelocityY(300);
        this.jugador.anims.play('bot_walk', true);
    }else{
        this.jugador.anims.pause();
        //this.jugador.anims.play('stall', true); esta es una opción, principalmente en caso de tener un sprite para eso
    }
    
}
}

