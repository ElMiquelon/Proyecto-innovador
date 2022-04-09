import combate_test from "./combate_test";
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
        this.scene.add("combate_test", new combate_test);
    }

    update(time, delta){
        if (this.cursor.space.isDown){
            this.scene.start("pantallaDeCarga");
        } else if (this.cursor.shift.isDown) {
            this.scene.start("combate_test");
        }
    }
}