import juego from "./escenas/juego";
import cajadialogos from "./escenas/cajadialogos";
import poliprueba from "./escenas/poliprueba";
export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key: 'pantallaDeCarga'});
    }

    preload(){
        this.scene.add('juego', new juego);
        this.scene.add('cajadialogos', new cajadialogos);
        this.scene.add('poliprueba', new poliprueba);
        this.load.image('loading', './assets/mp.jpg');
    }

    create(){
        //no se como hacer para que ponga un texto de "cargando", será algo a futuro
        this.scene.launch('cajadialogos').sleep('cajadialogos');
        this.scene.launch('poliprueba').sleep('poliprueba');
        this.scene.start('juego');  
    }

    update(){

    }
}