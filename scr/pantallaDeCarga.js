import juego from "./escenas/juego";
/*import cajadialogos from "./escenas/cajadialogos";
import poliprueba from "./escenas/poliprueba";*/
import overworld from "./escenas/overworld";
import cajaDeDialogos from "./escenas/cajaDeDialogos";
//import combate_test from "./combate_test";
import verMapa from "./escenas/Funciones/verMapa";
import tutorial from "./escenas/Funciones/tutorialOBienvenida";
import prologo from "./escenas/Funciones/prologo";
export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key: 'pantallaDeCarga'});
    }

    preload(){
        //descubrí que desde este momento se pueden cargar todos los assets del juego.
        //de ahora en adelante se hará aquí y de preferencia en el orden puesto

        //esta zona carga las escenas del juego
        this.scene.add('juego', new juego);//este script ha quedado obsoleto, pero es usado para crear las animaciones
        this.scene.add('overworld', new overworld);
        
        
        //this.scene.add('cajadialogos', new cajadialogos); este quedó inutil por completo. borrar luego
        //this.scene.add('poliprueba', new poliprueba);//""
        
        
        this.scene.add('cajaDeDialogos', new cajaDeDialogos);
        //this.scene.add('combate_test', new combate_test)
        this.scene.add('verMapa', new verMapa);
        this.scene.add('tutorial', new tutorial);
        this.scene.add('prologo', new prologo)

        
        //aquí se cargarán assets del mundo (objetos, BG, ambiente, etc)
        this.load.image('loading', './assets/mp.jpg');
        this.load.image("polimapa", "./assets/overworld/mapa.png");
        this.load.image('polibg', './assets/overworld/edificios/poliprueba.JPG');
        this.load.audio('BGMOverworld', './assets/overworld/sonidos/BGMOverworld.ogg');
        //recomiendo que el sonido que usemos final sea uno que quede en cualquier superficie
        this.load.audio('stone1', './assets/overworld/sonidos/stone1.ogg');
        this.load.audio('stone2', './assets/overworld/sonidos/stone2.ogg');
        this.load.audio('stone3', './assets/overworld/sonidos/stone3.ogg');
        this.load.audio('stone4', './assets/overworld/sonidos/stone4.ogg');
        this.load.audio('stone5', './assets/overworld/sonidos/stone5.ogg');
        this.load.audio('stone6', './assets/overworld/sonidos/stone6.ogg');

        //aqui se cargaran imagenes de dialogos
        this.load.image('eli', './assets/overworld/dialogos/tutorial/eli.jpeg');
        this.load.image('eliEnojado', './assets/overworld/dialogos/tutorial/eliEnojado.jpeg');

        //aqui se cargarán sonidos de dialogos
        this.load.audio('sonidoNPC1', './assets/overworld/dialogos/npc1.wav');
        this.load.audio('sonidoNPC2', './assets/overworld/dialogos/npc2.ogg');

        
        //aquí se cargarán sprites
        this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
        this.load.spritesheet("spritemilia", "./assets/overworld/NPC1_sprite.png", {frameWidth:24, frameHeight:32});
        this.load.spritesheet("spriteknowledge", "./assets/overworld/NPC2_sprite.png", {frameWidth:24, frameHeight:32});
    }

    create(){
        //no se como hacer para que ponga un texto de "cargando", será algo a futuro
        /*this.scene.launch('cajadialogos').sleep('cajadialogos');
        this.scene.launch('poliprueba').sleep('poliprueba');*/
        //this.scene.launch('combate_test').sleep('combate_test');
        this.scene.launch('juego').stop('juego');
        this.scene.launch('cajaDeDialogos').sleep('cajaDeDialogos');
        this.scene.launch('verMapa').stop('verMapa');
        this.scene.start('tutorial');
        //this.scene.start('overworld');  
    }
}