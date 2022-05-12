export default class edificioCP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioCP0'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(40,0,518,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'CP0').setOrigin(0,0);
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
        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(40,0,23,19).setOrigin(0),
            this.add.rectangle(78,0,20,19).setOrigin(0),
            this.add.rectangle(64,0,15,10).setOrigin(0),
            this.add.rectangle(113,0,54,19).setOrigin(0),
            this.add.rectangle(98,0,15,10).setOrigin(0),
            this.add.rectangle(182,0,36,19).setOrigin(0),
            this.add.rectangle(167,0,15,10).setOrigin(0),
            this.add.rectangle(233,0,38,19).setOrigin(0),
            this.add.rectangle(218,0,15,10).setOrigin(0),
            this.add.rectangle(312,0,61,19).setOrigin(0),
            this.add.rectangle(372,0,16,10).setOrigin(0),
            this.add.rectangle(388,0,41,19).setOrigin(0),
            this.add.rectangle(444,0,46,19).setOrigin(0),
            this.add.rectangle(429,0,15,10).setOrigin(0),
            this.add.rectangle(490,0,16,10).setOrigin(0),
            this.add.rectangle(506,0,52,19).setOrigin(0)
            //this.add.rectangle().setOrigin(0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de las escaleras
        this.escalera = this.add.zone(271,0,40,19).setOrigin(0);//esta la de en medio que sube
        this.physics.add.existing(this.escalera)
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('subiste por la única escalera');
            this.registry.events.emit('subirescalerac');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioCP1', duration:300, sleep:true, moveBelow:true});
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
            this.scene.transition({target:'overworld', duration:500, remove:true});
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
};