import ending from "../ending.js";
var jefeFT = true;
export default class salonFinal extends Phaser.Scene{
    constructor(){
        super({key:'salonFinal'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,600);
        this.cameras.main.setZoom(2);
        this.add.image(0,0, 'salonbg').setOrigin(0,0);
        this.physics.world.setBounds(0,0,600,600);

        //detalles del jugador
        this.jugador = this.physics.add.sprite(35, 49, 'playersprite');
        this.jugador.setBodySize(12,18,true);
        this.jugador.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });

        //creación y acomodo de las sillas y escritorio
        this.sillas = this.physics.add.staticGroup({key:'silla', frameQuantity:30})//30 sillas están bien.
        Phaser.Actions.PlaceOnRectangle(this.sillas.getChildren(), new Phaser.Geom.Rectangle(150,150,300,300))
        this.sillas.refresh();
        this.escritorio = this.physics.add.staticImage(300,300,'escritorio');
        this.escritorio.refreshBody();
        this.physics.add.collider(this.jugador,[this.sillas, this.escritorio]);

        //creacion de los NPCs
        this.eli = this.physics.add.staticSprite(300,400, 'eliSprite',2);
        
        this.viejo = this.physics.add.staticSprite(300,300, 'viejoSprite').setOrigin(.5,1).setInteractive();
        this.viejo.anims.play('stallviejoow');
        this.viejo.refreshBody();
        this.viejo.on('pointerdown', ()=>{
            if(jefeFT == true){
                this.registry.events.emit('dialogarjefefinal',this.scene.key, jefeFT);
                jefeFT = false;
                this.time.delayedCall(200, ()=>{ 
                    this.registry.events.emit('transicionacombatejefe', this.scene.key, 4);
                });
            }else if (this.registry.values.progreso <= 8){
                this.registry.events.emit('dialogarjefefinal',this.scene.key, jefeFT);
                this.time.delayedCall(200, ()=>{ 
                    this.registry.events.emit('transicionacombatejefe', this.scene.key, 4);
                });
            }else{
                console.log('inserte aquí lo que se hace al acabar el juego');
                this.scene.add('ending', new ending);
                this.input.keyboard.enabled = false;
                this.viejo.destroy();
                this.scene.transition({target:'ending',duration:1000, remove:true, moveBelow:true});
            };
        });

        this.physics.add.collider(this.jugador, [this.eli,this.viejo])

        //detalles de las transiciones
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
            this.input.keyboard.enabled = true;
        });
        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration,0,0,0);
        });

        //puerta para NO salir
        this.salida = this.add.zone(0,18,6,50).setOrigin(0);
        this.physics.add.existing(this.salida);
        this.physics.add.collider(this.jugador,this.salida,()=>{
            this.registry.events.emit('aviso', 'NO HAY SALIDA');
            this.salida.destroy();
        });

        //input jaja
        this.mov = this.input.keyboard.createCursorKeys();
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