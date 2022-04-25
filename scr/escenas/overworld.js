export default class overworld extends Phaser.Scene{
    constructor(){
        super({key: 'overworld'});
    }
    preload(){
        //no estoy seguro si los sonidos será mejor cargarlos aquí o en la pantalla de carga.
        //por ahora estan en la pantalla de carga 24/04/22
    }

    create(){
        //detalles de la camara, limites del mundo y BGM
        this.cameras.main.setBounds(0,0,2000,2000);
        this.cameras.main.setZoom(.7)
        this.overworldBG = this.add.image(0,0, 'polimapa').setOrigin(0,0).setInteractive();
        this.physics.world.setBounds(0,0,2000,2000);
        this.bgm = this.sound.add('BGMOverworld', {loop:true});
        this.bgm.play();


        //creacion de NPCs
        this.rem = this.physics.add.sprite(326, 1062, 'spritemilia').setOrigin(0,0).setImmovable(true).setInteractive();
        this.patch = this.physics.add.sprite(454, 762, 'spriteknowledge').setOrigin(0,0).setImmovable(true).setInteractive();

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
        this.jugador.setSize(16,26, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jugador,[this.rem, this.patch/*y todos los demas objetos/personajes que se agreguen*/]);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });
       
       
        //estructuración del mapa para evitar que salga, traspase edificios, etc.
        this.edificios = this.physics.add.staticGroup([
            //rectangulos del A
            this.add.rectangle(432,927,104,104).setOrigin(0,0),
            this.add.rectangle(591,955,521,48).setOrigin(0,0),
            //rectangulos del B
            this.add.rectangle(217,699,258,58).setOrigin(0,0),
            this.add.rectangle(476,638,60,119).setOrigin(0,0),
            this.add.rectangle(583,638,50,43).setOrigin(0,0),
            this.add.rectangle(583,707,50,50).setOrigin(0,0),
            this.add.rectangle(634,707,478,38).setOrigin(0,0),
            //rectangulos del C
            this.add.rectangle(785,486,339,73).setOrigin(0,0),
            //rectangulos del D
            this.add.rectangle(524,307,105,94).setOrigin(0,0),
            this.add.rectangle(658,336,458,66).setOrigin(0,0),
            //rectangulos del E
            this.add.rectangle(566,125,551,63).setOrigin(0,0),
            //rectangulo de P.C. (protección civil)
            this.add.rectangle(1515,663,100,75).setOrigin(0,0),
            //rectangulos no me acuerdo qué es (creo que era algo de fundición)
            this.add.rectangle(1236,766,420,204).setOrigin(0,0),
            //rectangulos de la otra cooperativa (blanca¿)
            this.add.rectangle(1143,1088,91,71).setOrigin(0,0),
            //rectangulos de ni idea (creo que es el edificio administrativo que no han terminado)
            this.add.rectangle(1272,1121,295,111).setOrigin(0,0),
            //rectangulos de la cancha
            /*this.add.rectangle(974,1165,113,210).setOrigin(0,0), ea, esta madre no es necesaria o sí?*/
            //rectangulos de mecanicos
            this.add.rectangle(1229,446, 425,198).setOrigin(0,0),
        ]);

        this.physics.add.collider(this.jugador,this.edificios);


        //estructuracion del mapa.1 - zonas que llevarán al jugador a un escenario mas detallado del edificio.
        
        //poliplaza
        this.aPoliplaza = this.add.zone(217,758,233,45).setOrigin(0,0);
        this.physics.add.existing(this.aPoliplaza,true);
        this.physics.add.collider(this.jugador, this.aPoliplaza,() =>{
            console.log('aquí va el evento que lleva a poliplaza. WIP');
            this.jugador.setPosition(this.jugador.getBounds().centerX + 4, this.jugador.getBounds().centerY + 4);
        });

        //edificio A 
        this.alEdificioA1 = this.add.rectangle(536, 927, 55, 104, 0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA1);
        this.alEdificioA1.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al A o a su cafetería.WIP');
        });
        this.alEdificioA2 = this.add.rectangle(591, 927, 521, 28, 0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA2);
        this.alEdificioA2.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al A parte frontal(?.WIP');
        });
        this.alEdificioA3 = this.add.rectangle(591, 1003, 521, 28, 0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA3);
        this.alEdificioA3.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al A parte trasera(?.WIP');
        });


        //edificio B no se confundan porque dice "B1" o "B2", es así porque son 2 rectangulos
        this.alEdificioB1 = this.add.rectangle(537,638,45,119,0x00ffff).setOrigin(0,0);
        this.alEdificioB2 = this.add.rectangle(583,682,529,24,0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioB1);
        this.physics.add.existing(this.alEdificioB2);
        this.alEdificioB1.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al B. se puede hacer que sea al B en la parte "administrativa" (oficialia, biblioteca, la wea de abajo donde nos citó tapia etc.)');
        });
        this.alEdificioB2.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al B. se puede hacer que sea al B en la parte de aulas');
        });

        //edificio C
        this.alEdificioC = this.add.rectangle(785,560, 339, 27, 0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioC);
        this.alEdificioC.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al C. WIP');
        });

        //edificio D, misma mierda que con el B
        this.alEdificioD1 = this.add.rectangle(630,307,27,94,0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD1);
        this.alEdificioD1.on('pointerdown', ()=>{
            console.log('aqui va el evento qu te lleva al D. WIP');
        });
        this.alEdificioD2 = this.add.rectangle(658,307,458,28,0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD2);
        this.alEdificioD2.on('pointerdown', ()=>{
            console.log('aqui va el evento qu te lleva al D. WIP');
        });

        //edificio E
        this.alEdificioE = this.add.rectangle(566,189,551,34,0x00ffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioE);
        this.alEdificioE.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al E. WIP');
        });


        this.physics.add.overlap(this.jugador,[this.alEdificioA1, this.alEdificioA2, this.alEdificioA3, this.alEdificioB1, this.alEdificioB2,this.alEdificioC,this.alEdificioD1, this.alEdificioD2,this.alEdificioE]);


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


        //Input jaja
        this.mov = this.input.keyboard.createCursorKeys();
        
        
        //Detalles para abrir el mapa
        this.map = this.input.keyboard.addKey('M');
        this.map.on('down', ()=>{
            this.scene.transition({target:'verMapa', duration:100, sleep:true});
        });
        this.events.on('transitionout', (targetScene, duration) =>{
            /*if(!targetScene.scene.key == 'verMapa'){
                this.bgm.pause();
            } se usará luego*/
        }); 
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            /*if(!fromScene.scene.key == 'verMapa'){
                this.bgm.resume();
            } se usará luego*/
        });
    };

    update(time, delta){
        //Lineas relacionadas al transporte del jugador        
        this.alEdificioA1.setVisible(true).setInteractive();
        this.alEdificioA2.setVisible(true).setInteractive();
        this.alEdificioA3.setVisible(true).setInteractive();
        if(this.alEdificioA1.body.touching.none && !this.alEdificioA1.body.embedded.valueOf() && this.alEdificioA2.body.touching.none && !this.alEdificioA2.body.embedded.valueOf() && this.alEdificioA3.body.touching.none && !this.alEdificioA3.body.embedded.valueOf() ){
            this.alEdificioA1.setVisible(false).disableInteractive();
            this.alEdificioA2.setVisible(false).disableInteractive();
            this.alEdificioA3.setVisible(false).disableInteractive();
        };

        this.alEdificioB1.setVisible(true).setInteractive();
        this.alEdificioB2.setVisible(true).setInteractive();
        if(this.alEdificioB1.body.touching.none && !this.alEdificioB1.body.embedded.valueOf() && this.alEdificioB2.body.touching.none && !this.alEdificioB2.body.embedded.valueOf()){
            this.alEdificioB1.setVisible(false).disableInteractive();
            this.alEdificioB2.setVisible(false).disableInteractive();
        };

        this.alEdificioC.setVisible(true).setInteractive();
        if(this.alEdificioC.body.touching.none && !this.alEdificioC.body.embedded.valueOf()){
            this.alEdificioC.setVisible(false).disableInteractive();
        };

        this.alEdificioD1.setVisible(true).setInteractive();
        this.alEdificioD2.setVisible(true).setInteractive();
        if(this.alEdificioD1.body.touching.none && !this.alEdificioD1.body.embedded.valueOf() && this.alEdificioD2.body.touching.none && !this.alEdificioD2.body.embedded.valueOf()){
            this.alEdificioD1.setVisible(false).disableInteractive();
            this.alEdificioD2.setVisible(false).disableInteractive();
        };

        this.alEdificioE.setVisible(true).setInteractive();
        if(this.alEdificioE.body.touching.none && !this.alEdificioE.body.embedded.valueOf()){
            this.alEdificioE.setVisible(false).disableInteractive();
        };

        //Cosas relacionadas al movimiento del jugador
        this.jugador.body.setVelocity(0);
        if (this.mov.right.isDown){
            this.jugador.body.setVelocityX(100);
            this.jugador.anims.play('right_walk',true);
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
        };

    }
}