export default class edificioBP00 extends Phaser.Scene{
    constructor(){
        super({key:'edificioBP00'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(148,0,270,133);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'BP00').setOrigin(0,0);
        this.physics.world.setBounds(148,0,270,133);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(200, 60, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(148,0,270,20).setOrigin(0,0),
            this.add.rectangle(148,101,194,32).setOrigin(0,0),
            this.add.rectangle(375,100,10,33).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de la escalera
        this.escalera = this.add.zone(385,100,33,13).setOrigin(0);
        this.physics.add.staticGroup(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('subiste por LA escalera hacia la biblioteca');
            this.registry.events.emit('subirescalerabiblio');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioBP01', duration:300, sleep:true, moveBelow:true});
        });

        //overlap del pedazo de pasillo que llevará a BP0
        this.pasillo = this.add.zone(342,101,33,11).setOrigin(0);
        this.physics.add.staticGroup(this.pasillo);
        this.physics.add.overlap(this.jugador,this.pasillo,()=>{
            console.log('pasaste a BP0');
            this.input.keyboard.enabled = false;
            this.registry.events.emit('pasilloabp0');
            this.scene.transition({target:'edificioBP0', duration:300, sleep:true, moveBelow:true})
        });

        //dos rectangulos en la parte negra para salir al overworld
        this.backWalk1 = this.add.zone(148,20, 1,81).setOrigin(0,0);
        this.physics.add.existing(this.backWalk1);
        this.physics.add.collider(this.jugador, this.backWalk1, ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
        });
        this.backWalk2 = this.add.zone(417,20, 1,73).setOrigin(0,0);
        this.physics.add.existing(this.backWalk2);
        this.physics.add.collider(this.jugador, this.backWalk2, ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
        });

        //aqui van las puertas, al rato se hacen

        //detalles de las transiciones
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });
        
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });

        //eventos que modificarán la posicion del jugador de acuerdo a la escalera que tome
        this.registry.events.on('bajarescaleraespecial', ()=>{
            this.jugador.setPosition(400,88);
        });

        this.registry.events.on('pasilloabp00',()=>{
            this.jugador.setPosition(358,88);
        });

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