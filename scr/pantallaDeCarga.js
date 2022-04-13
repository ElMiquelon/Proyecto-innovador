import juego from "./escenas/juego";
import cajadialogos from "./escenas/cajadialogos";
import poliprueba from "./escenas/poliprueba";
//import combate_test from "./combate_test";
export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key: 'pantallaDeCarga'});
    }

    preload(){
        //descubrí que desde este momento se pueden cargar todos los assets del juego.
        //de ahora en adelante se hará aquí
        this.scene.add('juego', new juego);
        this.scene.add('cajadialogos', new cajadialogos);
        this.scene.add('poliprueba', new poliprueba);
        //this.scene.add('combate_test', new combate_test)
        this.load.image('loading', './assets/mp.jpg');
        this.load.image("polimapa", "./assets/overworld/mapa.jpg");
        this.load.image("player", "./assets/overworld/player.png");
        this.load.image("remilia", "./assets/overworld/NPC1.jpg");
        this.load.image("patchouli", "./assets/overworld/NPC2.jpg");
        this.load.image('polibg', './assets/overworld/edificios/poliprueba.JPG');
        this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
    
    }

    create(){
        //no se como hacer para que ponga un texto de "cargando", será algo a futuro
        this.scene.launch('cajadialogos').sleep('cajadialogos');
        this.scene.launch('poliprueba').sleep('poliprueba');
        this.scene.launch('combate_test').sleep('combate_test');
        this.scene.start('juego');  
    }

    update(){

    }
}