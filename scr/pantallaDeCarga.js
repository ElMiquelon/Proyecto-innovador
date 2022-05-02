import creacionAnimaciones from "./escenas/creacionAnimaciones";
/*import cajadialogos from "./escenas/cajadialogos";
import poliprueba from "./escenas/poliprueba";*/
import overworld from "./escenas/overworld";
import reconstruirEdificios from "./escenas/Funciones/reconstruirEdificios";
import cajaDeDialogos from "./escenas/cajaDeDialogos";
//import combate_test from "./combate_test";
import verMapa from "./escenas/Funciones/verMapa";
import tutorial from "./escenas/Funciones/tutorialOBienvenida";
import prologo from "./escenas/Funciones/prologo";
import combate from "./escenas/combate";
import combateDialogos from "./escenas/combateDialogos";
import transitionACombate from "./escenas/Funciones/transicionACombate";
import menup from "./menu principal";
export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key: 'pantallaDeCarga'});
    }

    preload(){
        //descubrí que desde este momento se pueden cargar todos los assets del juego.
        //de ahora en adelante se hará aquí y de preferencia en el orden puesto

        //aqui se cargarán los recursos del overworld
        //esta zona carga las escenas del juego
        this.scene.add('menup', new menup);
        this.scene.add('creacionAnimaciones', new creacionAnimaciones);//este script ha quedado obsoleto, pero es usado para crear las animaciones
        this.scene.add('overworld', new overworld);
        this.scene.add('reconstruirEdificios', new reconstruirEdificios)
        this.scene.add('cajaDeDialogos', new cajaDeDialogos);
        this.scene.add('verMapa', new verMapa);
        this.scene.add('tutorial', new tutorial);
        this.scene.add('prologo', new prologo);
        this.scene.add('combate', combate);
        this.scene.add('combateDialogos', new combateDialogos);
        this.scene.add('transicionACombate', new transitionACombate)
        
        //aquí se cargarán assets del mundo (objetos, BG, ambiente, etc)
        this.load.image('loading', './assets/mp.jpg');
        this.load.image("polimapa", "./assets/overworld/mapa.png");
        this.load.image('polibg', './assets/overworld/edificios/poliprueba.JPG');
        this.load.image('AP0', './assets/overworld/edificios/edificioAP0.png');
        this.load.image('AP1', './assets/overworld/edificios/edificioAP1.png')
        this.load.image('polimapaOverlay', './assets/overworld/mapa-overlay.png')
        this.load.audio('BGMOverworld', './assets/overworld/sonidos/BGMOverworld.ogg');
        //recomiendo que el sonido que usemos final sea uno que quede en cualquier superficie
        this.load.audio('stone1', './assets/overworld/sonidos/stone1.ogg');
        this.load.audio('stone2', './assets/overworld/sonidos/stone2.ogg');
        this.load.audio('stone3', './assets/overworld/sonidos/stone3.ogg');
        this.load.audio('stone4', './assets/overworld/sonidos/stone4.ogg');
        this.load.audio('stone5', './assets/overworld/sonidos/stone5.ogg');
        this.load.audio('stone6', './assets/overworld/sonidos/stone6.ogg');

        //aquí se cargarán sprites
        this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
        this.load.spritesheet("spritemilia", "./assets/overworld/NPC1_sprite.png", {frameWidth:24, frameHeight:32});
        this.load.spritesheet("spriteknowledge", "./assets/overworld/NPC2_sprite.png", {frameWidth:24, frameHeight:32});

        //aqui se cargaran imagenes de dialogos
        this.load.image('eli', './assets/overworld/dialogos/tutorial/eli.jpeg');
        this.load.image('eliEnojado', './assets/overworld/dialogos/tutorial/eliEnojado.jpeg');

        //aqui se cargarán sonidos de dialogos
        this.load.audio('sonidoNPC1', './assets/overworld/dialogos/npc1.wav');
        this.load.audio('sonidoNPC2', './assets/overworld/dialogos/npc2.ogg');

        //aqui se cargarán recursos para el combate. eli separalos porfa
        this.load.audio("BGMcombate", "./assets/combate/audio/BGMcombate.mp3");
        this.load.image("map", "./assets/combate/mapa_c.png");
        this.load.image("player_c", "./assets/combate/player_c.png");
        this.load.image("enemy_c", "./assets/combate/pew.png");
        this.load.spritesheet("card_atk", "./assets/combate/card_atk.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_block", "./assets/combate/card_block.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_rest", "./assets/combate/card_rest.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_strong", "./assets/combate/card_strong.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("healthbar", "./assets/combate/healthbar.png", { frameWidth: 100, frameHeight: 10 });
        this.load.spritesheet('duende', './assets/combate/sprites_enemigos/duende.png',{frameWidth:131, frameHeight:259});
        this.load.spritesheet('gusano', './assets/combate/sprites_enemigos/gusano.png', {frameWidth:34, frameHeight:36});
        this.load.spritesheet('vampiro', './assets/combate/sprites_enemigos/vampiro.png', {frameWidth:86, frameHeight:89});
        this.load.json('lvlup', './assets/combate/estadisticas/jugador/lvlup.json');
        this.load.json('enemigo1', './assets/combate/estadisticas/enemigo1.json');
        this.load.json('enemigo2', './assets/combate/estadisticas/enemigo2.json');
        this.load.json('enemigo3', './assets/combate/estadisticas/enemigo3.json');
        this.load.json('enemigo4', './assets/combate/estadisticas/enemigo4.json');
    }

    create(){
        this.registry.set('playerStats', {hp: 100, atk: 20, def: 5, lvl: 1, xp:0, nxtlvl:100});
        //no se como hacer para que ponga un texto de "cargando", será algo a futuro
        this.scene.launch('creacionAnimaciones').stop('creacionAnimaciones');
        this.scene.launch('cajaDeDialogos').sleep('cajaDeDialogos');
        this.scene.launch('verMapa').stop('verMapa');
        this.scene.launch('combateDialogos').sleep('combateDialogos');
        this.scene.launch('transicionACombate').launch('reconstruirEdificios');
        this.scene.start('menup');
        //this.scene.start('overworld');  
    }
}