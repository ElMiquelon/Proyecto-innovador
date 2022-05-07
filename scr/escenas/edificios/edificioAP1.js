export default class edificioAP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioAP1'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,101);
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

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(577,14,23,1).setOrigin(0),
            this.add.rectangle(577,15,2,17).setOrigin(0),//estas madres son como un varandal, puestos al lado de escalera1
            this.add.rectangle(40,0,518,22).setOrigin(0),
            this.add.rectangle(17,14,23,1).setOrigin(0),//estas tambien, pero estan al lado de escalera 2
            this.add.rectangle(17,15,2,17).setOrigin(0),
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //prueba de progreso
        this.jefePrueba = this.add.sprite(29,29,'playersprite').setInteractive();
        this.jefePrueba.on('pointerdown',()=>{
            if (this.registry.values.playerStats.lvl >= 4 && this.registry.values.progreso == 0){
                /*uy. primero revisa que se cumplan 2 condiciones: que el nivel del jugador sea al menos 4
                y que no se haya derrotado a ningún otro jefe, si se cumplen ambas condiciones*/
                this.registry.events.emit('dialogarjefe',this.scene.key,true, 1);
                //llama su dialogo de "desafio", dando la key de esta escena, diciendo que habrá golpes, y el ID del jefe
                this.time.delayedCall(200, ()=>{
                    //despues este temporizador comenzará a contar cuando el jugador presione X y cierre el dialogo
                    this.registry.events.emit('transicionacombatejefe', this.scene.key, 1);
                    //y llama al evento que comienza la transición al combate, dando otra vez la key y el ID
                });
            }else if(this.registry.values.playerStats.lvl <= 4){
                //si no sos fuerte
                this.registry.events.emit('aviso', '- No, aún no puedo enfrentarlo.');
                //decís "no soy fuerte" y ya
            }else{// si ya lo derrotaste
                this.registry.events.emit('dialogarjefe',this.scene.key,false, 1);
                //lo mismo que en el dialogo de desafio, pero diciendo que no habrá golpes.
            }
        })

        //overlap de las escaleras
        this.escalera1 = this.add.zone(558,0,19,22).setOrigin(0);
        this.escalera2 = this.add.zone(0,0,17,22).setOrigin(0);
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

        //detalles de las puertas de los salones ( también están puestas de derecha a izquierda)
        this.puerta1 = this.add.rectangle(517,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
        });

        this.puerta2 = this.add.rectangle(448,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta2);
        this.puerta2.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
        });

        this.puerta3 = this.add.rectangle(366,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta3);
        this.puerta3.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
        });

        this.puerta4 = this.add.rectangle(258,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta4);
        this.puerta4.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
        });

        this.puerta5 = this.add.rectangle(154,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta5);
        this.puerta5.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
        });

        this.puerta6 = this.add.rectangle(86,9,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta6);
        this.puerta6.on('pointerdown', ()=>{
            this.registry.events.emit('aviso', 'Aun no se hace esto, saludos al teorema');
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