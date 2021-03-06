export default class edificioBP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioBP0'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,133);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'BP0').setOrigin(0,0);
        this.physics.world.setBounds(0,0,620,133);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(570, 70, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(0,0,600,21).setOrigin(0,0),
            this.add.rectangle(0,101,306,31).setOrigin(0,0),
            this.add.rectangle(326,101,274,31).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de la escalera
        this.escalera = this.add.zone(306,101,20,31).setOrigin(0);
        this.physics.add.staticGroup(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('subiste por LA escalera');
            this.registry.events.emit('subirescalerab');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioBP1', duration:300, sleep:true, moveBelow:true});
        });

        //overlap del pedazo de pasillo que llevará a BP00
        this.pasillo = this.add.zone(592,21,8,80).setOrigin(0);
        this.physics.add.staticGroup(this.pasillo);
        this.physics.add.overlap(this.jugador,this.pasillo,()=>{
            console.log('pasaste a BP00');
            this.input.keyboard.enabled = false;
            this.registry.events.emit('pasilloabp00');
            this.scene.transition({target:'edificioBP00', duration:300, sleep:true, moveBelow:true})
        });

        //dos rectangulos en la parte negra para salir al overworld
        this.backWalk1 = this.add.zone(0,100, 284,1).setOrigin(0,0);
        this.physics.add.existing(this.backWalk1);
        this.physics.add.collider(this.jugador, this.backWalk1, ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
        });
        this.backWalk2 = this.add.zone(340,100, 253,1).setOrigin(0,0);
        this.physics.add.existing(this.backWalk2);
        this.physics.add.collider(this.jugador, this.backWalk2, ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
        });

        //detalles de las puertas de los salones (derecha a izquierda)

        this.puerta1 = this.add.rectangle(50,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B8');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta2 = this.add.rectangle(119,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B7');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta3 = this.add.rectangle(190,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B6');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta4 = this.add.rectangle(261,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B5');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta5 = this.add.rectangle(332,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B4');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta6 = this.add.rectangle(418,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta6);
        this.puerta6.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B3');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta8 = this.add.rectangle(486,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta8);
        this.puerta8.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B2');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta9 = this.add.rectangle(561,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta9);
        this.puerta9.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B1');
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
        this.registry.events.on('bajarescalerab', ()=>{
            this.jugador.setPosition(315,88);
        });
        this.registry.events.on('pasilloabp0', ()=>{
            this.jugador.setPosition(575,60);
        });

        //input
        this.mov = this.input.keyboard.createCursorKeys();
        this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
            this.bgm.stop();
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