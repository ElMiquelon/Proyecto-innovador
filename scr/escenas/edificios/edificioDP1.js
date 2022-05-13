export default class edificioDP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioDP1'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,750,232);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'DP1').setOrigin(0,0);
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
            this.add.rectangle(599,0,12,121).setOrigin(0,0),
            this.add.rectangle(611,37,17,85).setOrigin(0,0),
            this.add.rectangle(0,201,264,30).setOrigin(0,0),
            this.add.rectangle(285,201,1,17).setOrigin(0,0),
            this.add.rectangle(305,201,445,30).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de las escaleras (de izquierda a derecha)
        this.escalera1 = this.add.zone(264,201,21,30).setOrigin(0);//esta la de en medio que sube
        this.escalera2 = this.add.zone(286,201,19,30).setOrigin(0);//esta la de en medio que baja
        this.escalera3 = this.add.zone(521,100,34,22).setOrigin(0);//esta escalera es la derecha que baja
        this.escalera4 = this.add.zone(565,100,34,22).setOrigin(0);//esta escalera es la derecha que sube
        
        this.physics.add.staticGroup([this.escalera1, this.escalera2, this.escalera3, this.escalera4]);
        this.physics.add.overlap(this.jugador, this.escalera1, ()=>{
            console.log('subiste por escalera 1 a DP2');
            this.registry.events.emit('subirescalera1d2');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP2', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador, this.escalera2, ()=>{
            console.log('bajaste por escalera 2 a escalera2 DP0');
            this.registry.events.emit('bajarescalera2d');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador,this.escalera3,()=>{
            console.log('bajaste por escalera 3 a escalera1 de DP0');
            this.registry.events.emit('bajarescalera1d');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador,this.escalera4,()=>{
            console.log('bajaste por escalera 4 a DP2');
            this.registry.events.emit('subirescalera2d2');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP2', duration:300, sleep:true, moveBelow:true});
        });

        //detalles de las puertas de los salones (izq -> der)
        this.puerta1 = this.add.rectangle(20,109,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
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
        this.registry.events.on('subirescalera1d', ()=>{
            this.jugador.setPosition(538,143);
        });

        this.registry.events.on('subirescalera2d', ()=>{
            this.jugador.setPosition(295,189);
        });

        this.registry.events.on('bajarescalera1d1', ()=>{
            this.jugador.setPosition(273,185);
        });

        this.registry.events.on('bajarescalera2d1', ()=>{
            this.jugador.setPosition(584,144);
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