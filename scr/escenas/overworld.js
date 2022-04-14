export default class overworld extends Phaser.Scene{
    constructor(){
        super({key: 'overworld'});
    }
    preload(){
        //no estoy seguro si los sonidos será mejor cargarlos aquí o en la pantalla de carga.
    }

    create(){
        //detalles de la camara y limites del mundo
        this.cameras.main.setBounds(0,0,2000,2000);
        this.cameras.main.setZoom(.7)
        this.overworldBG = this.add.image(0,0, 'polimapa').setOrigin(0,0);
        this.physics.world.setBounds(0,0,2000,2000);


        //creacion de NPCs
        this.rem = this.physics.add.sprite(1183, 93, 'spritemilia').setOrigin(0,0).setImmovable(true);
        this.patch = this.physics.add.sprite(400, 800, 'spriteknowledge').setOrigin(0,0).setImmovable(true);


        //creacion del this.jugador y detalles
        this.jugador = this.physics.add.sprite(294, 983, 'playersprite');
        this.jugador.setSize(12,16, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jugador,[this.rem, this.patch/*y todos los demas objetos/personajes que se agreguen*/]);
        this.cameras.main.startFollow(this.jugador);
        
        //estructuración del mapa para evitar que salga, traspase edificios, etc.
        this.edificioBA = this.add.rectangle(217,699,258,58).setOrigin(0,0)
        this.physics.add.existing(this.edificioBA);
        this.edificioBA.body.setImmovable(true);

        this.edificioBB = this.add.rectangle(476,638,157,119).setOrigin(0,0);
        this.physics.add.existing(this.edificioBB);
        this.edificioBB.body.setImmovable(true);
        
        this.edificioBC = this.add.rectangle(634,682,478,63).setOrigin(0,0);
        this.physics.add.existing(this.edificioBC);
        this.edificioBC.body.setImmovable(true);

        this.physics.add.collider(this.jugador,[this.edificioBA, this.edificioBB, this.edificioBC]);

        //estructuracion del mapa.1 - zonas que llevarán al jugador a un escenario mas detallado del edificio.
        
        
        //estructuración del mapa.2 - zonas donde apareceran enemigos genericos
        
        


        this.mov = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        
        this.jugador.body.setVelocity(0);
        //console.log('X: ' + this.input.activePointer.worldX + '\nY: ' + this.input.activePointer.worldY);
        if (this.mov.right.isDown ){
            this.jugador.body.setVelocityX(100);
            this.jugador.anims.play('right_walk',true);
            //console.log('se mueve');
        }else if (this.mov.left.isDown){
            this.jugador.body.setVelocityX(-100);
            this.jugador.anims.play('left_walk', true);
        }else if (this.mov.up.isDown){
            this.jugador.body.setVelocityY(-100);
            this.jugador.anims.play('top_walk', true);
        }else if (this.mov.down.isDown){
            this.jugador.body.setVelocityY(100);
            this.jugador.anims.play('bot_walk', true);
        }else{
            this.jugador.anims.pause();
            //this.jugador.anims.play('stall', true); esta es una opción, principalmente en caso de tener un sprite para eso
        }
    }
}