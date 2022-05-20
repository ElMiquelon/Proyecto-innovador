export default class edificioCP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioCP1'});
    }
    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(40,0,518,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'CP1').setOrigin(0,0);
        this.physics.world.setBounds(40,0,518,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(70, 60, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(40,0,58,20).setOrigin(0),
            this.add.rectangle(98,0,16,10).setOrigin(0),
            this.add.rectangle(114,0,104,20).setOrigin(0),
            this.add.rectangle(233,0,37,20).setOrigin(0),
            this.add.rectangle(218,0,15,10).setOrigin(0),
            this.add.rectangle(312,0,60,20).setOrigin(0),
            this.add.rectangle(387,0,42,20).setOrigin(0),
            this.add.rectangle(372,0,15,10).setOrigin(0),
            this.add.rectangle(444,0,46,20).setOrigin(0),
            this.add.rectangle(429,0,15,10).setOrigin(0),
            this.add.rectangle(505,0,53,20).setOrigin(0),
            this.add.rectangle(490,0,15,10).setOrigin(0),
            this.add.rectangle(289,14,22,1).setOrigin(0),
            this.add.rectangle(289,15,1,7).setOrigin(0)
        ]);

        this.physics.add.collider(this.jugador, this.hitboxes);
        
        //overlap de las escaleras
        this.escalera = this.add.zone(270,0,20,20).setOrigin(0);
        this.physics.add.existing(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('bajaste por escalera ');
            this.registry.events.emit('bajarescalerac');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioCP0', duration:300, sleep:true, moveBelow:true});
        });


        //eventos que modificarán la posicion del jugador de acuerdo a la escalera que tome
        this.registry.events.on('subirescalerac', ()=>{
            this.jugador.setPosition(272,56);
        });


        //Detalles de las puertas de izquierda a derecha
        this.puerta1 = this.add.rectangle(97,9,17,21).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta2 = this.add.rectangle(217,9,17,21).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta3 = this.add.rectangle(371,9,17,21).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta4 = this.add.rectangle(428,9,17,21).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta5 = this.add.rectangle(489,9,17,21).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
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

        //detalles del input
        this.mov = this.input.keyboard.createCursorKeys();
        this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            this.registry.events.emit('aviso', 'No puedes salir del edificio si no estas en la PB');
        });
    };

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
    };
}