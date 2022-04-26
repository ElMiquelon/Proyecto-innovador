export default class creacionAnimaciones extends Phaser.Scene{


constructor(){
    super({key: "creacionAnimaciones"});
}
preload(){
    //por el momento lo desactivo ya que otra escena tiene exactamente lo mismo y esto redunda
    //this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
    //las medidas de la hoja de sprites dependerán del modelo final
    
    //this.load.spritesheet("spritemilia", "./assets/overworld/NPC1_sprite.png", {frameWidth:24, frameHeight:32});
    //this.load.spritesheet("spriteknowledge", "./assets/overworld/NPC2_sprite.png", {frameWidth:24, frameHeight:32});
    //this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
}

create(){
    /*
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.camara = this.cameras.main.setBounds(0, 0, 2000 , 2000);
    this.physics.world.setBounds(0, 0, 2000, 2000);
    this.bg = this.add.image(0, 0, 'polimapa').setOrigin(0).setInteractive();


    //detalles del sprite
    this.jugador = new playerW(this, 30, 30, "playersprite");
    this.jugador.setSize(12,16);
    //creo que a partir de ahora lo mejor será mover al jugador desde el centro
    //this.jugador.setOrigin(0,0);
    */
    this.anims.create({
        key: 'top_walk',
        frames: this.anims.generateFrameNumbers('playersprite',{
            frames: [0,1,2,3]
        }),
        repeat: -1,
        frameRate:16//no se cual se vea mejor
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
        frameRate:16//no se cual se vea mejor
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
        frameRate:16//no se cual se vea mejor
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
        frameRate:16//no se cual se vea mejor
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
        frameRate:16//no se cual se vea mejor
    })

    /*this.jugador.anims.play('stall');

    this.remilia = new NPC(this, 300, 200, "spritemilia");
    this.remilia.setOrigin(0,0).setInteractive();*/
    this.anims.create({
        key: 'stallmilia',
        frames: this.anims.generateFrameNumbers('spritemilia',{
            frames: [30,32]
        }),
        repeat: -1,
        frameRate:4//no se cual se vea mejor
    })
    /*this.remilia.anims.play('stallmilia');

    this.patchouli = new NPC(this, 800, 500, "spriteknowledge");
    this.patchouli.setOrigin(0,0);*/
    this.anims.create({
        key: 'stallknowledge',
        frames: this.anims.generateFrameNumbers('spriteknowledge',{
            frames: [70,71,12]
        }),
        repeat: -1,
        frameRate:4//no se cual se vea mejor
    })
    /*this.patchouli.anims.play('stallknowledge');

    //fisicas
    this.jugador.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.patchouli, this.jugador);
    this.physics.add.collider(this.remilia, this.jugador);
    //detalles de la cámara
    this.cameras.main.startFollow(this.jugador);
    this.cameras.main.followOffset.set(0, 0);
    this.cameras.main.setZoom(1.5);
    //control
    this.movimiento = this.input.keyboard.createCursorKeys();

    
    //sistema de dialogos 
    
    //en esta variable se almacenará y enviará el mensaje a la escena de la caja
    var mensaje;

    //esta variable es para confirmar si ya se habló por primera vez o no
    //con el proposito de tener un primer dialogo "especial" y luego "genericos"
    this.data.set('remFirstTalk', true);

    

    this.remilia.on('pointerdown', () => {
        en esta línea se llama a una funcion externa que determina si ya se habló con el npc por primera
        vez y regresa un dialogo "especial", sino, uno "generico" 
        mensaje = dialogue1(this.data.get('remFirstTalk'));
        //aqui se actualiza el boleano para que la proxima vez mande el generico
        this.data.setValue('remFirstTalk', false);
        //aqui se llama al evento en cajadialogos.js 
        this.registry.events.emit('pasarInfo', mensaje);
        
    });
    //eventos de personaje
    


    //salaberga, el acomodo de coordenadas está raro
    this.edificioAdmn = this.add.rectangle(255, 167, 179, 45, 0x00ff00).setInteractive();
    this.pasarAedificioAdmn = this.add.zone(this.edificioAdmn.getBounds().x, this.edificioAdmn.getBounds().y -5, 178, 5);
    this.pasarAedificioAdmn.setOrigin(0,0);
    this.physics.world.enable(this.pasarAedificioAdmn);
    this.pasarAedificioAdmn.body.setAllowGravity(false);
    this.physics.add.overlap(this.jugador, this.pasarAedificioAdmn);
    //a continuación, intentaré pasar de escena guardando datos de la anterior
    this.edificioAdmn.on('pointerdown', ()=> {
        this.regi
    });

    


    //ola, soy yo de nuevo cambiando la idea de exploración.
    // cuando quieran la explicación diganme y les digo, porque tardaré en escribirla
    this.bg.on('pointerdown', ()=>{
        this.cameras.main.setZoom(.5);
    });

    this.bg.on('pointerup', ()=>{
        this.cameras.main.setZoom(1.5);
    });*/
}

update(time, delta){
    /*this.jugador.body.setVelocity(0);
    console.log(this.scene.isSleeping('cajadialogos'));
    //console.log('X: ' + this.input.activePointer.worldX + '\nY: ' + this.input.activePointer.worldY);
    if (this.movimiento.right.isDown ){
        this.jugador.body.setVelocityX(100);
        this.jugador.anims.play('right_walk',true);
        //console.log('se mueve');
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

    if(!this.pasarAedificioAdmn.body.touching.none){
        this.registry.events.emit('comenzarPoliPrueba', this.jugador.getBounds().centerX, this.jugador.getBounds().centerY);
        this.jugador.setPosition(this.jugador.getBounds().centerX, this.jugador.getBounds().top + 5);
    }
    */
}
}

