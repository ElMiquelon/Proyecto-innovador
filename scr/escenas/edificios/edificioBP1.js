export default class edificioBP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioBP1'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,133);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'BP1').setOrigin(0,0);
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
            this.add.rectangle(0,101,285,31).setOrigin(0,0),
            this.add.rectangle(285,116,21,1).setOrigin(0,0),
            this.add.rectangle(306,101,1,16).setOrigin(0,0),
            this.add.rectangle(326,101,274,31).setOrigin(0,0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de la escalera
        this.escalera = this.add.zone(306,101,20,31).setOrigin(0);
        this.physics.add.staticGroup(this.escalera);
        this.physics.add.overlap(this.jugador, this.escalera, ()=>{
            console.log('bajaste por LA escalera');
            this.registry.events.emit('bajarescalerab');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioBP0', duration:300, sleep:true, moveBelow:true});
        });

        //overlap del pedazo de pasillo que llevará a BP00
        this.pasillo = this.add.zone(592,21,8,80).setOrigin(0);
        this.physics.add.staticGroup(this.pasillo);
        this.physics.add.overlap(this.jugador,this.pasillo,()=>{
            console.log('pasaste a BP01');
            this.input.keyboard.enabled = false;
            this.registry.events.emit('pasilloabp01');
            this.scene.transition({target:'edificioBP01', duration:300, sleep:true, moveBelow:true})
        });

        //detalles de las puertas de los salones (las copié y pegué del A, no están configuradas)
        this.puerta1 = this.add.rectangle(111,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'El B14 está cerrado');
        });
        this.puerta2 = this.add.rectangle(190,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Esto no es un salón, no puedes entrar');
        });
        this.puerta3 = this.add.rectangle(261,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al B13');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta4 = this.add.rectangle(332,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al 12');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta5 = this.add.rectangle(418,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al 11');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta6 = this.add.rectangle(486,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta6);
        this.puerta6.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al 10');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta7 = this.add.rectangle(561,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta7);
        this.puerta7.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al 9');
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
        this.registry.events.on('subirescalerab', ()=>{
            this.jugador.setPosition(315,88);
        });

        this.registry.events.on('pasilloabp1', ()=>{
            this.jugador.setPosition(575,60);
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