export default class menup extends Phaser.Scene{

    constructor(){
        super({key: 'menup'});
    }

    preload(){
        this.load.image("mm", "./assets/mp.jpg");
    }

    create(){
        let graphics = this.add.graphics();
        this.mm = this.add.image(0,0,"mm");
        this.mm.setOrigin(0,0);
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        if (this.cursor.space.isDown){
            this.scene.start("tutorial");
        } else if (this.cursor.shift.isDown) {
            /*this.registry.events.emit('comenzarBatalla', Phaser.Math.Between(1,2));
            console.log('Está es una pantalla de debug para el combate, ser removida para el final');*/
            this.scene.transition({target:'combate', duration:6000});
        }
    }
}