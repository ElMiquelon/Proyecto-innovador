import combate from "./escenas/combate";
import pantallaDeCarga from "./pantallaDeCarga";
export default class menup extends Phaser.Scene{

    constructor(){
        super({key: "menup"});
    }

    preload(){
        this.load.image("mm", "./assets/mp.jpg");
    }

    create(){
        let graphics = this.add.graphics();
        this.mm = this.add.image(0,0,"mm");
        this.mm.setOrigin(0,0);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.scene.add("pantallaDeCarga", new pantallaDeCarga);
        this.scene.add("combate", new combate);
        this.scene.launch('combate').sleep('combate');
    }

    update(time, delta){
        if (this.cursor.space.isDown){
            this.scene.start("pantallaDeCarga");
        } else if (this.cursor.shift.isDown) {
            this.registry.events.emit('comenzarBatalla', Phaser.Math.Between(1,2));
            console.log('Está es una pantalla de debug para el combate, ser removida para el final');
        }
    }
}