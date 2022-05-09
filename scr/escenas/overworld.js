var pelea;
export default class overworld extends Phaser.Scene{
    constructor(){
        super({key: 'overworld'});
    }
    preload(){
        //no estoy seguro si los sonidos será mejor cargarlos aquí o en la pantalla de carga.
        //por ahora estan en la pantalla de carga 24/04/22
    }

    create(){
        //detalles de la camara, limites del mundo, BG y BGM
        this.camara = this.cameras.main.setBounds(0,0,2000,2000);
        //this.cameras.main.setZoom(.7); esta madre es mas que nada de debug
        this.add.image(0,0, 'polimapa').setOrigin(0,0);
        this.physics.world.setBounds(0,0,2000,2000);
        this.bgm = this.sound.add('BGMOverworld', {loop:true});
        this.bgm.play();


        //estructuración del mapa para evitar que salga, traspase edificios, etc.
        this.edificios = this.physics.add.staticGroup([
            //rectangulos del A
            this.add.rectangle(432,955,106,48).setOrigin(0,0),
            this.add.rectangle(582,955,530,48).setOrigin(0,0),
            //rectangulos del B
            this.add.rectangle(217,699,260,59).setOrigin(0,0),
            this.add.rectangle(476,638,83,120).setOrigin(0,0),
            this.add.rectangle(595,638,39,44).setOrigin(0,0),
            this.add.rectangle(595,710,39,48).setOrigin(0,0),
            this.add.rectangle(634,710,479,36).setOrigin(0,0),
            this.add.rectangle(217,758,233,45).setOrigin(0,0),
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

        //estructuracion del mapa.1 - zonas que llevarán al jugador a un escenario mas detallado del edificio.
        
        //poliplaza
        this.aPoliplaza = this.add.zone(217,803,234,1).setOrigin(0,0);
        this.physics.add.existing(this.aPoliplaza,true);

        //edificio A 
        this.alEdificioA1 = this.add.rectangle(538, 955, 44, 48, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA1);
        this.alEdificioA1.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al A o a su cafetería.WIP');
        });
        this.alEdificioA2 = this.add.rectangle(432, 927, 680, 28, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA2);
        this.alEdificioA2.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionA');
            this.scene.transition({target:'edificioAP0', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioA3 = this.add.rectangle(432, 1003, 680, 28, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA3);
        this.alEdificioA3.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al A parte trasera(?.WIP');
        });


        //edificio B no se confundan porque dice "B1" o "B2", es así porque son 2 rectangulos
        this.alEdificioB1 = this.add.rectangle(559,638,36,120,0xffffff).setOrigin(0,0);
        this.alEdificioB2 = this.add.rectangle(595,682,518,28,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioB1);
        this.physics.add.existing(this.alEdificioB2);
        this.alEdificioB1.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al B. se puede hacer que sea al B en la parte "administrativa" (oficialia, biblioteca, la wea de abajo donde nos citó tapia etc.)');
        });
        this.alEdificioB2.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al B. se puede hacer que sea al B en la parte de aulas');
        });

        //edificio C
        this.alEdificioC = this.add.rectangle(785,560, 339, 27, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioC);
        this.alEdificioC.on('pointerdown', ()=>{
            console.log('aqui va el evento que te lleva al C. WIP');
        });

        //edificio D, misma mierda que con el B
        this.alEdificioD1 = this.add.rectangle(630,307,27,94,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD1);
        this.alEdificioD1.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionD');
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioD2 = this.add.rectangle(658,307,458,28,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD2);
        this.alEdificioD2.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionD');
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });

        //edificio E
        this.alEdificioE = this.add.rectangle(566,189,551,34,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioE);
        this.alEdificioE.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionE');
            this.scene.transition({target:'edificioEP0', duration:300, sleep:true, moveBelow:true});
        });


        //estructuración del mapa.2 - zonas donde apareceran enemigos genericos
        this.zonasDeBatalla = this.physics.add.staticGroup([
            //zona entre el B y el A
            this.add.zone(590,801,492,99).setOrigin(0,0), 
            //camellones(? debajo del A
            this.add.zone(434,1091,287,15).setOrigin(0,0),
            //Polipasto (arriba del E)
            this.add.zone(149,41,1029,83).setOrigin(0,0),
            this.add.zone(243,1158,498,193).setOrigin(0,0),
            this.add.zone(396,1350,280,106).setOrigin(0,0),
            this.add.zone(677,1350,40,42).setOrigin(0,0),
            this.add.zone(677,1393,17,35).setOrigin(0,0),
            this.add.zone(677,1429,8,13).setOrigin(0,0),
            this.add.zone(484,1457,155,56).setOrigin(0,0),
            this.add.zone(1118,125,54,278).setOrigin(0,0),
            this.add.zone(565,224,552,82).setOrigin(0,0),
            this.add.zone(172,125,393,180).setOrigin(0,0),
            this.add.zone(172,306,351,96).setOrigin(0,0),
            this.add.zone(586,436,152,134).setOrigin(0,0),
            this.add.zone(742,485,42,22).setOrigin(0,0),
            this.add.zone(742,435,334,49).setOrigin(0,0),
            this.add.zone(196,402,327,173).setOrigin(0,0),
            this.add.zone(524,403,25,165).setOrigin(0,0),
            this.add.zone(1208,41,37,403).setOrigin(0,0),
            this.add.zone(1246,230,494,36).setOrigin(0,0),
            this.add.zone(1246,387,407,47).setOrigin(0,0),
            this.add.zone(1717,267,23,101).setOrigin(0,0),
            this.add.zone(1654,360,20,49).setOrigin(0,0),
            this.add.zone(1655,360,48,31).setOrigin(0,0),
            this.add.zone(1704,356,15,26).setOrigin(0,0),
            this.add.zone(1246,267,44,119).setOrigin(0,0),
            this.add.zone(1686,205,54,24).setOrigin(0,0),
            this.add.zone(1650,207,35,22).setOrigin(0,0),
            this.add.zone(1615,209,34,20).setOrigin(0,0),
            this.add.zone(1564,212,50,17).setOrigin(0,0),
            this.add.zone(1517,215,46,13).setOrigin(0,0),
            this.add.zone(813,1088,236,11).setOrigin(0,0),
            this.add.zone(842,1163,131,212).setOrigin(0,0),
            this.add.zone(1088,1163,145,145).setOrigin(0,0),
            this.add.zone(1088,1309,143,4).setOrigin(0,0),
            this.add.zone(1088,1314,139,4).setOrigin(0,0),
            this.add.zone(1088,1319,97,56).setOrigin(0,0),
            this.add.zone(1186,1319,4,49).setOrigin(0,0),
            this.add.zone(1191,1319,4,42).setOrigin(0,0),
            this.add.zone(1196,1319,5,35).setOrigin(0,0),
            this.add.zone(1202,1319,5,27).setOrigin(0,0),
            this.add.zone(1202,1319,5,27).setOrigin(0,0),
            this.add.zone(1208,1319,4,19).setOrigin(0,0),
            this.add.zone(1213,1319,5,11).setOrigin(0,0),
            this.add.zone(1224,1314,3,4).setOrigin(0,0),
            this.add.zone(1207,446,27,638).setOrigin(0,0),
            this.add.zone(1235,971,423,56).setOrigin(0,0),
            this.add.zone(1235,645,421,17).setOrigin(0,0),
            this.add.zone(1235,663,279,101).setOrigin(0,0),
            this.add.zone(1515,739,142,29).setOrigin(0,0),
            this.add.zone(1616,663,40,75).setOrigin(0,0),
            this.add.zone(1479,638,177,6).setOrigin(0,0)
        ]);

        //creacion de NPCs
        this.rem = this.physics.add.sprite(326, 1062, 'spritemilia').setOrigin(0,0).setImmovable(true).setInteractive();
        this.patch = this.physics.add.sprite(454, 762, 'spriteknowledge').setOrigin(0,0).setImmovable(true).setInteractive();
        this.eli = this.physics.add.sprite(1194,914,'eliSprite',4).setInteractive().setImmovable(true);
        this.eli.anims.play('stalleli');

        //interacciones de los NPCs al ser clickeados (dialogos)
        this.data.set('remFirstTalk', true);
        this.rem.on('pointerdown', ()=>{
            this.registry.events.emit('dialogar', 1, this.data.get('remFirstTalk'),this.scene.key);
            this.data.set('remFirstTalk', false);
        });

        this.data.set('patchFirstTalk', true);
        this.patch.on('pointerdown',()=>{
            this.registry.events.emit('dialogar', 2, this.data.get('patchFirstTalk'), this.scene.key);
            this.data.set('patchFirstTalk', false);
        });

        this.eli.on('pointerdown', ()=>{
            if(Phaser.Math.Between(0,50) == 1){
                this.registry.events.emit('dialogareli', true, this.scene.key);
                this.eli.anims.play('polloeli');
                this.time.delayedCall(150,()=>{
                    this.eli.anims.play('stalleli');
                })
            }else{
                this.registry.events.emit('dialogareli', false, this.scene.key);
            }
        });

        //creacion del this.jugador y detalles
        this.jugador = this.physics.add.sprite(294, 983, 'playersprite');
        this.jugador.setBodySize(12,18, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jugador,[this.rem, this.patch, this.eli/*y todos los demas objetos/personajes que se agreguen*/]);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });
        //estructuracion del mapa.0.1 - el COLLIDER que evitará que el jugador traspase lo que no debe
        this.physics.add.collider(this.jugador,this.edificios);

        //estructuracion del mapa.1.1 - el OVERLAP entre el jugador y los rectangulos de los edificios;
        this.physics.add.collider(this.jugador, this.aPoliplaza,() =>{
            console.log('aquí va el evento que lleva a poliplaza. WIP');
            this.jugador.setPosition(this.jugador.getBounds().centerX + 4, this.jugador.getBounds().centerY + 4);
        });
        this.physics.add.overlap(this.jugador,[this.alEdificioA1, this.alEdificioA2, this.alEdificioA3, this.alEdificioB1, this.alEdificioB2,this.alEdificioC,this.alEdificioD1, this.alEdificioD2,this.alEdificioE]);
       
        //estructuración del mapa.2.1 - creacion del OVERLAP en las zonas de batalla y su funcion.
        /*explicacion: aqui, al momento del jugador estar sobre las zonas, se genera un numero y si cumple el if, se verifica que la 
        escena de combate exista, sino, llama a un evento que la crea*/
        this.aPelear = this.physics.add.overlap(this.jugador, this.zonasDeBatalla, ()=>{
            console.log('esta contando');
            pelea = Phaser.Math.Between(0,1250/*no se un buen numero*/) 
            if(pelea >= 40 && pelea <= 43){
                if(this.scene.isActive('combate') != null){
                    this.bgm.pause();
                    this.registry.events.emit('transicionacombate');
                }else{
                    this.registry.events.emit('repararcombate')
                }
            };
        });

        //creacion del overlay de edificios
        this.polimapaOverlay = this.add.image(0,0,'polimapaOverlay').setOrigin(0,0);

        //Input jaja
        this.mov = this.input.keyboard.createCursorKeys();
        
        
        //Tecla para abrir el mapa
        this.map = this.input.keyboard.addKey('M');
        this.map.on('down', ()=>{
            this.scene.transition({target:'verMapa', duration:100, sleep:true});
        });

        //detalles de las transiciones
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            if(fromScene.scene.key == 'transicionACombate'){
                this.camara.fadeFrom(400, 0, 0, 0);
                this.bgm.resume();
                this.scene.resume(this);
                
            }else if(fromScene.scene.key != 'verMapa'){
                this.registry.events.emit('destruccion' + fromScene.scene.key);
                this.camara.fadeFrom(400, 0, 0, 0);
                this.bgm.resume();
            };
        });

        this.events.on('transitionout',(targetScene, duration)=>{
            if (targetScene.scene.key != 'verMapa'){
                this.cameras.main.fadeOut(duration, 0,0,0);
            }
        });

    };

    update(time, delta){
        //overlay de edificios
        this.polimapaOverlay.setAlpha(.3);
        if(this.alEdificioA1.body.touching.none && !this.alEdificioA1.body.embedded.valueOf() && this.alEdificioA2.body.touching.none && !this.alEdificioA2.body.embedded.valueOf() && this.alEdificioA3.body.touching.none && !this.alEdificioA3.body.embedded.valueOf() && this.alEdificioB1.body.touching.none && !this.alEdificioB1.body.embedded.valueOf() && this.alEdificioB2.body.touching.none && !this.alEdificioB2.body.embedded.valueOf() && this.alEdificioC.body.touching.none && !this.alEdificioC.body.embedded.valueOf() && this.alEdificioD1.body.touching.none && !this.alEdificioD1.body.embedded.valueOf() && this.alEdificioD2.body.touching.none && !this.alEdificioD2.body.embedded.valueOf() && this.alEdificioE.body.touching.none && !this.alEdificioE.body.embedded.valueOf()){
            this.polimapaOverlay.setAlpha(1);
        };
        //Lineas relacionadas al transporte del jugador        
        this.alEdificioA1.setVisible(true).setInteractive();
        this.alEdificioA2.setVisible(true).setInteractive();
        this.alEdificioA3.setVisible(true).setInteractive();
        if(this.alEdificioA1.body.touching.none && !this.alEdificioA1.body.embedded.valueOf() && this.alEdificioA2.body.touching.none && !this.alEdificioA2.body.embedded.valueOf() && this.alEdificioA3.body.touching.none && !this.alEdificioA3.body.embedded.valueOf()){
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