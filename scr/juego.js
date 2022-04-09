import playerW from "./Jugador/jugadorMA.js";
import NPC from "./NPCMA/NPC.js";
import dialogue1 from "./NPCMA/NPC1/dialogos.js";
import cajadialogos from "./NPCMA/cajadialogos.js";
import poliprueba from "./escenas/poliprueba.js";
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
    this.jugador.setOrigin(0,0);

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

    //aqui se crea la escena que solo agrega el texto y funciones que manejan la caja
    this.scene.add("cajadialogo", new cajadialogos);
    //aqui se ejecuta en paralelo
    this.scene.launch('cajadialogo');
    //en esta variable se almacenará y enviará el mensaje a la escena de la caja
    var mensaje;

    //esta variable es para confirmar si ya se habló por primera vez o no
    //con el proposito de tener un primer dialogo "especial" y luego "genericos"
    this.data.set('remFirstTalk', true);

    

    this.remilia.on('pointerdown', () => {
        this.scene.wake('cajadialogo');
        /*en esta línea se llama a una funcion externa que determina si ya se habló con el npc por primera
        vez y regresa un dialogo "especial", sino, uno "generico"*/  
        mensaje = dialogue1(this.data.get('remFirstTalk'));
        //aqui se actualiza el boleano para que la proxima vez mande el generico
        this.data.setValue('remFirstTalk', false);
        //aqui se llama al evento en cajadialogos.js 
        this.registry.events.emit('pasarInfo', mensaje);
        
    });
    //eventos de personaje
    


    //salaberga, el acomodo de coordenadas está raro
    this.edificioAdmn = this.add.rectangle(255, 167, 179, 45, 0x00ff00).setInteractive();
    //a continuación, intentaré pasar de escena guardando datos de la anterior
    this.scene.add('poliprueba', new poliprueba);
    this.scene.launch('poliprueba');
    this.scene.sleep('poliprueba');
    this.edificioAdmn.on('pointerdown', ()=> {
        this.registry.events.emit('comenzarPoliPrueba', this.jugador.getBounds().centerX, this.jugador.getBounds().centerY);
        //this.scene.switch('poliprueba');
    });
}

update(time, delta){
    this.jugador.body.setVelocity(0);
    
    //console.log('X: ' + this.input.activePointer.worldX + '\nY: ' + this.input.activePointer.worldY);
    if (this.movimiento.right.isDown ){
        this.jugador.body.setVelocityX(100);
        this.jugador.anims.play('right_walk',true);
        console.log('se mueve');
    }else if (this.movimiento.left.isDown){
        this.jugador.body.setVelocityX(-100);
        this.jugador.anims.play('left_walk', true);
    }else if (this.movimiento.up.isDown){
        this.jugador.body.setVelocityY(-100);
        this.jugador.anims.play('top_walk', true);
    }else if (this.movimiento.down.isDown){
        this.jugador.body.setVelocityY(100);
        this.jugador.anims.play('bot_walk', true);
    }else{
        this.jugador.anims.pause();
        //this.jugador.anims.play('stall', true); esta es una opción, principalmente en caso de tener un sprite para eso
    }
    
}
}

