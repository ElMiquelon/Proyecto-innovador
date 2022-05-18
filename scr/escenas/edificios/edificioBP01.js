export default class edificioBP01 extends Phaser.Scene{
    constructor(){
        super({key:'edificioBP01'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(148,0,271,167);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'BP01').setOrigin(0,0);
        this.physics.world.setBounds(125,0,294,167);

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
            this.add.rectangle(148,101,225,32).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de la escalera
        this.escalera = this.add.zone(361,133,12,34).setOrigin(0);
        this.physics.add.staticGroup(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('bajste por LA escalera hacia BEspecial');
            this.registry.events.emit('bajarescaleraespecial');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioBP00', duration:300, sleep:true, moveBelow:true});
        });

        //overlap del pedazo de pasillo que llevará a BP1
        this.pasillo = this.add.zone(148,20,8,81).setOrigin(0);
        this.physics.add.staticGroup(this.pasillo);
        this.physics.add.overlap(this.jugador,this.pasillo,()=>{
            console.log('pasaste a BP1');
            this.input.keyboard.enabled = false;
            this.registry.events.emit('pasilloabp1');
            this.scene.transition({target:'edificioBP1', duration:300, sleep:true, moveBelow:true})
        });

        //aqui van las puertas, al rato se hacen
        this.lockers = this.add.rectangle(182,7,56,28).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.lockers);
        this.lockers.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Ningún loker está abierto y ninguno es tuyo');
        });
        this.puerta1 = this.add.rectangle(325,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Cerrado...');
        });
        this.aviso = this.add.zone(415,34,3,33).setOrigin(0,0);
        this.physics.add.existing(this.aviso);
        this.physics.add.overlap(this.jugador,this.aviso, ()=>{
            this.registry.events.emit('aviso', 'Es la biblioteca, pero también está cerrado');
        });
        this.aviso2 = this.add.zone(415,76,3,17).setOrigin(0,0);
        this.physics.add.existing(this.aviso2);
        this.physics.add.overlap(this.jugador,this.aviso2, ()=>{
            this.registry.events.emit('aviso', 'Es la Oficilia de la escuela, pero también está cerrado');
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
        this.registry.events.on('subirescalerabiblio', ()=>{
            this.jugador.setPosition(395,150);
        });

        this.registry.events.on('pasilloabp01',()=>{
            this.jugador.setPosition(170,60);
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