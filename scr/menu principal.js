import juego from "./juego";
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
        this.scene.add("juego", new juego);
    }

    update(time, delta){
        if (this.cursor.space.isDown){
            this.scene.start("juego");
            
        }
    }
}