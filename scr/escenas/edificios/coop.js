export default class coop extends Phaser.Scene{
    constructor(){
        super({key:'coop'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(101,0,398,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'coop').setOrigin(0,0);
        this.physics.world.setBounds(101,0,410,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(248, 60, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //aqui el unico rectangulo que se necesita usar.
        this.hitbox = this.physics.add.staticGroup([
            this.add.rectangle(101,0, 398,19).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitbox)

        //aqui la zona que te lleva de vuelta a el A y la que te debería llevar al otro lado del A
        this.alA = this.add.zone(491,19,8,82).setOrigin(0,0);
        this.physics.add.existing(this.alA);
        this.physics.add.overlap(this.alA, this.jugador,()=>{
            this.input.enabled = false;
            this.registry.events.emit('salircoop');
            this.scene.transition({target:'edificioAP0', duration:300, sleep:true, moveBelow:true});
        });

        this.aviso = this.add.zone(101,19,8,82).setOrigin(0,0);
        this.physics.add.existing(this.aviso);
        this.physics.add.overlap(this.jugador,this.aviso, ()=>{
            this.registry.events.emit('aviso', 'Aquí no hay nada interesante');
        });

        //detalles de las transiciones
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });
        
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });

        //eventos que modificarán la posicion del jugador
        this.registry.events.on('entrarcoop', ()=>{
            this.jugador.setPosition(476,60);
        })


        //input
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
}