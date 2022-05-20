export default class edificioDP2 extends Phaser.Scene{
    constructor(){
        super({key:'edificioDP2'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,750,232);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'DP2').setOrigin(0,0);
        this.physics.world.setBounds(0,0,750,232);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(194, 144, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(0,100,521,22).setOrigin(0,0),
            this.add.rectangle(555,100,10,22).setOrigin(0,0),
            this.add.rectangle(565,100,34,1).setOrigin(0,0),
            this.add.rectangle(599,0,12,121).setOrigin(0,0),
            this.add.rectangle(611,37,17,85).setOrigin(0,0),
            this.add.rectangle(0,201,264,30).setOrigin(0,0),
            this.add.rectangle(264,219,23,1).setOrigin(0,0),
            this.add.rectangle(285,201,1,17).setOrigin(0,0),
            this.add.rectangle(305,201,445,30).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de las escaleras y la zona que lleva a cafetería
        this.escalera1 = this.add.zone(286,201,19,30).setOrigin(0);//esta es la escalera de enmedio
        this.escalera2 = this.add.zone(521,100,34,22).setOrigin(0);//esta de la derecha
        
        this.physics.add.staticGroup([this.escalera1, this.escalera2]);
        this.physics.add.overlap(this.jugador, this.escalera1, ()=>{
            console.log('bajaste por escalera 1 a escalera1 de DP1');
            this.registry.events.emit('bajarescalera1d1');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP1', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador, this.escalera2, ()=>{
            console.log('bajaste por escalera 2 a escalera4 de DP1');
            this.registry.events.emit('bajarescalera2d1');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP1', duration:300, sleep:true, moveBelow:true});
        });

        //detalles de las puertas de los salones (izq -> der)
        this.puerta1 = this.add.rectangle(487,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D10');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta2 = this.add.rectangle(416,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D11');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta3 = this.add.rectangle(340,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D12');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta4 = this.add.rectangle(261,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D13');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta5 = this.add.rectangle(192,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D14');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta6 = this.add.rectangle(138,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta6);
        this.puerta6.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D15');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta7 = this.add.rectangle(92,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta7);
        this.puerta7.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D16');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta8 = this.add.rectangle(20,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta8);
        this.puerta8.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al D17');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.lockers = this.add.rectangle(611,37,17,85).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.lockers);
        this.lockers.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Un locker huele a flor de lavanda.\nNinguno se puede abrir');
        });
        this.aviso = this.add.zone(748,47,2,19).setOrigin(0,0);
        this.physics.add.existing(this.aviso);
        this.physics.add.overlap(this.jugador,this.aviso, ()=>{
            this.registry.events.emit('aviso', 'Es un baño... De hombres');
        });


        //detalles de las transiciones
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });
        
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });

        //eventos que modificarán la posicion del jugador de acuerdo a la escalera que tome
        this.registry.events.on('subirescalera1d2', ()=>{
            this.jugador.setPosition(295,190);
        });

        this.registry.events.on('subirescalera2d2', ()=>{
            this.jugador.setPosition(539,142);
        });

        
        //input
        this.mov = this.input.keyboard.createCursorKeys();
        this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            this.registry.events.emit('aviso', 'No puedes salir del edificio si no estas en la PB');
        });

    }

    update(){
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