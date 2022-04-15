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
        this.rem = this.physics.add.sprite(326, 1062, 'spritemilia').setOrigin(0,0).setImmovable(true).setInteractive();
        this.patch = this.physics.add.sprite(400, 800, 'spriteknowledge').setOrigin(0,0).setImmovable(true).setInteractive();

        //interacciones de los NPCs al ser clickeados (dialogos)
        this.data.set('remFirstTalk', true);
        this.rem.on('pointerdown', ()=>{
            this.registry.events.emit('dialogar', 1, this.data.get('remFirstTalk'));
            this.data.set('remFirstTalk', false);
        });

        this.data.set('patchFirstTalk', true);
        this.patch.on('pointerdown',()=>{
            this.registry.events.emit('dialogar', 2, this.data.get('patchFirstTalk'));
            this.data.set('patchFirstTalk', false);
        })

        //creacion del this.jugador y detalles
        this.jugador = this.physics.add.sprite(294, 983, 'playersprite');
        this.jugador.setSize(12,16, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jugador,[this.rem, this.patch/*y todos los demas objetos/personajes que se agreguen*/]);
        this.cameras.main.startFollow(this.jugador);
       
       
        //estructuración del mapa para evitar que salga, traspase edificios, etc.
        this.edificios = this.physics.add.staticGroup([
            //rectangulos del A
            this.add.rectangle(432,927,679,103).setOrigin(0,0),
            //rectangulos del B
            this.add.rectangle(217,699,258,58).setOrigin(0,0),
            this.add.rectangle(476,638,157,119).setOrigin(0,0),
            this.add.rectangle(634,682,478,63).setOrigin(0,0),
            //rectangulos del C
            this.add.rectangle(785,486,339,100).setOrigin(0,0),
            //rectangulos del D
            this.add.rectangle(524,307,592,94).setOrigin(0,0),
            //rectangulos del E
            this.add.rectangle(566,125,551,98).setOrigin(0,0),
            //rectangulo de P.C. (protección civil)
            this.add.rectangle(1515,663,100,75).setOrigin(0,0),
            //rectangulos no me acuerdo qué es (creo que era algo de fundición)
            this.add.rectangle(1236,766,420,204).setOrigin(0,0),
            //rectangulos de la otra cooperativa (blanca¿)
            this.add.rectangle(1143,1088,91,71).setOrigin(0,0),
            //rectangulos de ni idea (creo que es el edificio administrativo que no han terminado)
            this.add.rectangle(1272,1121,295,111).setOrigin(0,0),
            //rectangulos de la cancha
            this.add.rectangle(974,1165,113,210).setOrigin(0,0),
            //rectangulos de mecanicos
            this.add.rectangle(1229,446, 425,198).setOrigin(0,0),
        ],{setImmovable:true});

        this.physics.add.collider(this.jugador,this.edificios);


        //estructuracion del mapa.1 - zonas que llevarán al jugador a un escenario mas detallado del edificio.
        
        //WIP

        //estructuración del mapa.2 - zonas donde apareceran enemigos genericos
        this. zonasDeBatalla = this.physics.add.staticGroup([
            //zona entre el B y el A
            this.add.zone(590,801,492,99).setOrigin(0,0), 
            //camellones(? debajo del A
            this.add.zone(434,1091,287,15).setOrigin(0,0)
        ]);
        
        this.physics.add.overlap(this.jugador, this.zonasDeBatalla, ()=>{
            if(Phaser.Math.Between(0,1500/*no se un buen numero*/) <= 2){
                console.log('aqui se pondrá el evento que inicie la batalla');
            }     
        });

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