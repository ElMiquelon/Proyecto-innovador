var pacoFT = true;
export default class edificioFP2 extends Phaser.Scene{
    constructor(){
        super({key:'edificioFP2'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'FP2').setOrigin(0,0);
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

        //NPCs
        this.paco = this.physics.add.staticSprite(51,31,'pacoSprite').setInteractive();
        this.physics.add.collider(this.jugador,this.paco);
        this.paco.on('pointerdown', ()=>{
            if(pacoFT == true && this.registry.values.progreso == 5){
                this.registry.events.emit('dialogarmulti', 4, this.scene.key);
                this.registry.values.progreso++;
                pacoFT = false;
            }else{
                this.registry.events.emit('dialogar', 4,this.scene.key);    
            };
        });

        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(18,14,1,8).setOrigin(0),
            this.add.rectangle(20,14,20,1).setOrigin(0),
            this.add.rectangle(40,0,230,22).setOrigin(0),
            this.add.rectangle(289,14,1,8).setOrigin(0),
            this.add.rectangle(291,14,20,1).setOrigin(0),
            this.add.rectangle(311,0,246,22).setOrigin(0),
            this.add.rectangle(576,14,1,8).setOrigin(0),
            this.add.rectangle(578,14,20,1).setOrigin(0),
            this.add.rectangle(598,0,2,32).setOrigin(0)
        ]);
        this.physics.add.collider(this.jugador, this.hitboxes);
        
        this.escalera1 = this.add.zone(0,0,18,22).setOrigin(0);
        this.escalera2 = this.add.zone(270,0,19,22).setOrigin(0);
        this.escalera3 = this.add.zone(557,0,19,22).setOrigin(0);
        this.physics.add.staticGroup([this.escalera1, this.escalera2, this.escalera3]);

        this.physics.add.overlap(this.jugador,this.escalera1, ()=>{
            this.input.keyboard.enabled = false;
            console.log('bajaste por escalera 1 para salir en escalera 1 de FP1');
            this.registry.events.emit('bajarescalera1f1');
            this.scene.transition({target:'edificioFP1', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera2, ()=>{
            this.input.keyboard.enabled = false;
            console.log('subiste por escalera 2 para salir en escalera 3 de FP1');
            this.registry.events.emit('bajarescalera2f1');
            this.scene.transition({target:'edificioFP1', duration:300, sleep:true, moveBelow:true});
        });

        this.physics.add.overlap(this.jugador,this.escalera3, ()=>{
            this.input.keyboard.enabled = false;
            console.log('bajaste por escalera 3 para salir en escalera 5 de FP1');
            this.registry.events.emit('bajarescalera3f1');
            this.scene.transition({target:'edificioFP1', duration:300, sleep:true, moveBelow:true});
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
        this.registry.events.on('subirescalera1f2', ()=>{
            this.jugador.setPosition(11,38);
        });
        this.registry.events.on('subirescalera2f2', ()=>{
            this.jugador.setPosition(280,38);
        });
        this.registry.events.on('subirescalera3f2', ()=>{
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