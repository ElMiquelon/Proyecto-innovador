export default class edificioFP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioFP1'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'FP1').setOrigin(0,0);
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
            this.add.rectangle(20,0,1,21).setOrigin(0),
            this.add.rectangle(41,0,229,21).setOrigin(0),
            this.add.rectangle(291,0,1,21).setOrigin(0),
            this.add.rectangle(312,0,245,21).setOrigin(0),
            this.add.rectangle(578,0,1,21).setOrigin(0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);
        
        this.escalera1 = this.add.zone(0,0,20,21).setOrigin(0);
        this.escalera2 = this.add.zone(21,0,20,21).setOrigin(0);
        this.escalera3 = this.add.zone(270,0,21,21).setOrigin(0);
        this.escalera4 = this.add.zone(292,0,20,21).setOrigin(0);
        this.escalera5 = this.add.zone(557,0,21,21).setOrigin(0);
        this.escalera6 = this.add.zone(579,0,21,21).setOrigin(0);
        this.physics.add.staticGroup([this.escalera1, this.escalera2, this.escalera3, this.escalera4, this.escalera5, this.escalera6]);

        this.physics.add.overlap(this.jugador,this.escalera1, ()=>{
            this.input.keyboard.enabled = false;
            console.log('bajaste por escalera 1 para salir en escalera 1 de FP0');
            this.registry.events.emit('bajarescalera1f');
            this.scene.transition({target:'edificioFP0', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera2, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 2 para salir en escalera 1 de FP2');
            this.registry.events.emit('subirescalera1f2');
            this.scene.transition({target:'edificioFP2', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera3, ()=>{
            this.input.keyboard.enabled = false;
            console.log('bajaste por escalera 3 para salir en escalera 2 de FP0');
            this.registry.events.emit('bajarescalera2f');
            this.scene.transition({target:'edificioFP0', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera4, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 4  para salir en escalera 2 de FP2');
            this.registry.events.emit('subirescalera2f2');
            this.scene.transition({target:'edificioFP2', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera5, ()=>{
            this.input.keyboard.enabled = false;
            console.log('bajaste por escalera 5 para salir en escalera 3 de FP0');
            this.registry.events.emit('bajarescalera3f');
            this.scene.transition({target:'edificioFP0', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera6, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 6  para salir en escalera 3 de FP2');
            this.registry.events.emit('subirescalera3f2');
            this.scene.transition({target:'edificioFP2', duration:300, sleep:true, moveBelow:true});
        });

        //aqui van las puertas, cuando las pongan cambien este comentario por algo que indique que aqui estan las puertas
        this.puerta1 = this.add.rectangle(66,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F5');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta2 = this.add.rectangle(145,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F6');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta3 = this.add.rectangle(220,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F7');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta4 = this.add.rectangle(361,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F8');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta5 = this.add.rectangle(431,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F9');
            this.registry.events.emit('reconstruccionsalon');
            this.scene.transition({target:'salon', duration:300, sleep:true, moveBelow:true});
        });
        this.puerta6 = this.add.rectangle(511,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta6);
        this.puerta6.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Entraste al F10');
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
        this.registry.events.on('bajarescalera1f1', ()=>{
            this.jugador.setPosition(31,38);
        });
        this.registry.events.on('bajarescalera2f1', ()=>{
            this.jugador.setPosition(302,38);
        });
        this.registry.events.on('bajarescalera3f1', ()=>{
            this.jugador.setPosition(587,38);
        });//los eventos de "subir" pertenecen a las escaleras de la izquierda, y los de "bajar" a las derechas (izquierda y derecha de cada par)
        this.registry.events.on('subirescalera1f', ()=>{
            this.jugador.setPosition(11,38);
        });
        this.registry.events.on('subirescalera2f', ()=>{
            this.jugador.setPosition(280,38);
        });
        this.registry.events.on('subirescalera3f', ()=>{
            this.jugador.setPosition(568,38);
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
};