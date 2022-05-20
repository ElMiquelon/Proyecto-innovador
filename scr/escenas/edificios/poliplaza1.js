export default class poliplaza1 extends Phaser.Scene{
    constructor(){
        super({key:'poliplaza1'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,500,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'PP1').setOrigin(0,0);
        this.physics.world.setBounds(94,0,271,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(230, 75, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(96,0,184,19).setOrigin(0),
            this.add.rectangle(321,0,45,19).setOrigin(0),
            this.add.rectangle(306,28,7,1).setOrigin(0),//esta hitbox es de la base de la maceta, no se me antojo hacer el "varandal" clasico.
            this.add.rectangle(298,14,1,5).setOrigin(0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de las escaleras
        this.escalera = this.add.zone(280,0,18,19).setOrigin(0);//esta la de en medio que sube
        this.physics.add.existing(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('bajaste por la única escalera');
            this.registry.events.emit('bajarescalerapp');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'poliplaza0', duration:300, sleep:true, moveBelow:true});
        });

        //detalles de las transiciones
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });
        
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });

        //eventos que modificarán la posicion del jtras tomar la escalera
        this.registry.events.on('subirescalerapp', ()=>{
            this.jugador.setPosition(288,38);
        });

        //la puerta
        this.puerta1 = this.add.rectangle(108,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Los estudiantes no pueden entrar a Control Escolar');
        });
        this.aviso = this.add.zone(363,54,3,17).setOrigin(0,0);
        this.physics.add.existing(this.aviso);
        this.physics.add.overlap(this.jugador,this.aviso, ()=>{
            this.registry.events.emit('aviso', 'La dirección, no se encuentra nadie');
        });

        //input
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