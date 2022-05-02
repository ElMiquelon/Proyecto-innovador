export default class edificioAP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioAP1'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.camara = this.cameras.main.setBounds(0,0,600,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'AP1').setOrigin(0,0);
        this.physics.world.setBounds(0,0,600,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(575, 76, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox de escaleras
        this.escalera1 = this.add.zone(557,0,21,19).setOrigin(0);
        this.escalera2 = this.add.zone(0,0,20,19).setOrigin(0);
        this.physics.add.staticGroup([this.escalera1, this.escalera2]);
        this.physics.add.overlap(this.jugador, this.escalera1, ()=>{
            console.log('bajaste por escalera 1');
            this.registry.events.emit('bajarescalera1a');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioAP0', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador, this.escalera2, ()=>{
            console.log('bajaste por escalera 2');
            this.registry.events.emit('bajarescalera2a');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioAP0', duration:300, sleep:true, moveBelow:true});
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
        this.registry.events.on('subirescalera1a', ()=>{
            this.jugador.setPosition(569,53);
        });

        this.registry.events.on('subirescalera2a', ()=>{
            this.jugador.setPosition(14,53);
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