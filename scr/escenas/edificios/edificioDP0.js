var jefeFT = true;
export default class edificioDP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioDP0'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,750,232);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'DP0').setOrigin(0,0);
        this.physics.world.setBounds(0,0,750,232);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(684, 154, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //creacion de chuco (jefe2)
        this.chuco = this.physics.add.staticSprite(684,80).setInteractive();
        this.chuco.anims.play('stallchucoow');
        this.chuco.body.setSize(18,31);
        this.chuco.refreshBody();
        this.physics.add.collider(this.jugador,this.chuco);
        this.chuco.on('pointerdown',()=>{//atención, esto es importante para los demás jefes
            if(this.registry.values.playerStats.lvl >= 4 && this.registry.values.progreso == 4){//primero se comprueba tanto si el jugador alcanzó la bandera necesaria para poder enfrentarse a él como si cumple el nivel para ello
                this.registry.events.emit('dialogarprejefe',this.scene.key,true, 2);//en caso de cumplir ambas, comienza un dialogoprejefe, enviando la key de esta escena, un true de que es true va a peliar y su ID
                this.time.delayedCall(200, ()=>{//y 200 ms despues de haber cerrado la caja 
                    this.registry.events.emit('transicionacombatejefe', this.scene.key, 2);//comienza el combate, dando la key de esta escena y el ID del jefe
                });
            }else if(this.registry.values.playerStats.lvl <= 4){//sino, si el jugador no tiene el nivel adecuado
                this.registry.events.emit('dialogarprejefe',this.scene.key,false, 2);//llama un dialogo prejefe; dando la key de la escena, diciendo que no peleará y dando su ID
                //aviso: no sé que suceda si vas a hablar con él sin haber cumplido las banderas
            }else if(this.registry.values.progreso >= 5 && jefeFT == true){//entonces, si ya lo derrotaste y hablas con él
                this.registry.events.emit('dialogarpostjefe',this.scene.key,true, 2);//lanzará un monologo con lore
                jefeFT = false;//y dirá "simon, el wey ya hablo conmigo"
            }else{//sino
                this.registry.events.emit('dialogarpostjefe',this.scene.key,false, 2);//te da un dialogo generico
            };
        });


        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(0,100,565,22).setOrigin(0,0),
            this.add.rectangle(598,0,12,122).setOrigin(0,0),
            this.add.rectangle(611,37,17,85).setOrigin(0,0),
            this.add.rectangle(0,200,420,32).setOrigin(0,0),
            this.add.rectangle(440,200,310,32).setOrigin(0,0),
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);

        //OVERLAP de las escaleras (de derecha a izquierda)
        this.escalera1 = this.add.zone(565,100,34,22).setOrigin(0);//esta la derecha
        this.escalera2 = this.add.zone(420,200,20,32).setOrigin(0);//esta de enmedio
        
        this.physics.add.staticGroup([this.escalera1, this.escalera2]);
        this.physics.add.overlap(this.jugador, this.escalera1, ()=>{
            console.log('subiste por escalera 1 a escalera3 de DP1');
            this.registry.events.emit('subirescalera1d');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP1', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.overlap(this.jugador, this.escalera2, ()=>{
            console.log('subiste por escalera 2 a escalera2 DP1');
            this.registry.events.emit('subirescalera2d');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioDP1', duration:300, sleep:true, moveBelow:true});
        });

        //detalles de las puertas de los salones (izq -> der)
        this.puerta1 = this.add.rectangle(750,480,17,22).setOrigin(0,0).setInteractive();
        this.physics.add.existing(this.puerta1);
        this.puerta1.on('pointerdown', ()=>{
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
        this.registry.events.on('bajarescalera1d', ()=>{
            this.jugador.setPosition(584,135);
        });

        this.registry.events.on('bajarescalera2d', ()=>{
            this.jugador.setPosition(430,185);
        });
        
        //input
        this.mov = this.input.keyboard.createCursorKeys();
        this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            this.scene.transition({target:'overworld', duration:500, remove:true});
        });

    }

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
    }
}