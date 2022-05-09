export default class salon extends Phaser.Scene{
    constructor(){
        super({key:'salon'});
    };

    create(){
        //detalles de la camara, limites del mundo
        this.cameras.main.setBounds(0,0,600,600);
        this.cameras.main.setZoom(.5);
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
        this.sillas = this.physics.add.staticGroup({key:'silla', frameQuantity:30})//30 sillas están bien?
        var sillero = this.sillas.getChildren();
        for (var i = 0; i < sillero.length; i++){
            sillero[i].setOrigin(0,0)
            sillero[i].setPosition(Phaser.Math.Between(0,550), Phaser.Math.Between(100,550));
        };
        this.sillas.refresh();
        this.escritorio = this.physics.add.staticImage(Phaser.Math.Between(214,600),Phaser.Math.Between(0,75), 'escritorio').setOrigin(1,0);
        this.escritorio.refreshBody();
        this.physics.add.collider(this.jugador,[this.sillas, this.escritorio]);

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