export default class edificioEP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioEP0'});
    };
    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'EP0').setOrigin(0,0);
        this.physics.world.setBounds(0,0,600,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(35, 49, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(0,0,20,20).setOrigin(0),
            this.add.rectangle(42,0,250,20).setOrigin(0),
            this.add.rectangle(312,0,267,20).setOrigin(0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);
        
        this.escalera1 = this.add.zone(20,0,22,20).setOrigin(0);
        this.escalera2 = this.add.zone(292,0,20,20).setOrigin(0);
        this.escalera3 = this.add.zone(579,0,21,20).setOrigin(0);
        this.physics.add.staticGroup([this.escalera1, this.escalera2, this.escalera3]);

        this.physics.add.overlap(this.jugador,this.escalera1, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 1  para salir en escalera 1 de EP1');
            this.registry.events.emit('subirescalera1e');
            this.scene.transition({target:'edificioEP1', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera2, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 2 para salir en escalera 3 de EP1');
            this.registry.events.emit('subirescalera2e');
            this.scene.transition({target:'edificioEP1', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera3, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 3 para salir en escalera 5 de EP1');
            this.registry.events.emit('subirescalera3e');
            this.scene.transition({target:'edificioEP1', duration:300, sleep:true, moveBelow:true});
        });

        //aqui van las puertas, cuando las pongan cambien este comentario por algo que indique que aqui estan las puertas


        //detalles de las transiciones
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });

        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });

        //eventos que modificarán la posicion del jugador de acuerdo a la escalera que tome
        this.registry.events.on('bajarescalera1e', ()=>{
            this.jugador.setPosition(31,38);
        });
        this.registry.events.on('bajarescalera2e', ()=>{
            this.jugador.setPosition(302,38);
        });
        this.registry.events.on('bajarescalera3e', ()=>{
            this.jugador.setPosition(587,38);
        });

        //detalles del input
        this.mov = this.input.keyboard.createCursorKeys();
        /*this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            aqui se debe agregar la transicion al overworld
        });*/

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