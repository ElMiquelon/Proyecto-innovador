export default class edificioAP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioAP0'});
    }

    create(){
        //detalles de la camara, limites del mundo
        this.camara = this.cameras.main.setBounds(0,0,600,101);
        this.cameras.main.setZoom(1.5);
        this.add.image(0,0, 'AP0').setOrigin(0,0);
        this.physics.world.setBounds(0,0,600,101);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(575, 76, 'playersprite');
        this.jugador.setSize(12,18, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //hitbox de escaleras
        this.escalera1 = this.add.zone(578,0,22,31).setOrigin(0);//esta escalera es la derecha
        this.escalera2 = this.add.zone(21,0,20,31).setOrigin(0);//esta la izquierda
        this.physics.add.staticGroup([this.escalera1, this.escalera2]);
        this.physics.add.collider(this.jugador, this.escalera1, ()=>{
            console.log('subiste por escalera 1');
            this.registry.events.emit('subirescalera1a');
            this.scene.transition({target:'edificioAP1', duration:300, sleep:true})
        });
        this.physics.add.collider(this.jugador, this.escalera2, ()=>{
            console.log('subiste por escalera 2');
            this.registry.events.emit('subirescalera2a');
            this.scene.transition({target:'edificioAP1', duration:300, sleep:true})
        });

        //eventos que modificarán la posicion del jugador de acuerdo a la escalera que tome
        this.registry.events.on('bajarescalera1a', ()=>{
            this.jugador.setPosition(585,50);
        });

        this.registry.events.on('bajarescalera2a', ()=>{
            this.jugador.setPosition(30,50);
        });

        //input
        this.mov = this.input.keyboard.createCursorKeys();
        this.back = this.input.keyboard.addKey('X');
        this.back.on('down', ()=>{
            this.scene.remove('edificioAP1');
            this.scene.transition({target:'overworld', duration:300, remove:true});
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