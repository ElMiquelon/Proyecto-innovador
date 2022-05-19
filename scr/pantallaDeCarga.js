import creacionAnimaciones from "./escenas/creacionAnimaciones.js";
import overworld from "./escenas/overworld.js";
import reconstruirEdificios from "./escenas/Funciones/reconstruirEdificios.js";
import cajaDeDialogos from "./escenas/cajaDeDialogos.js";
import transicionAMapa from "./escenas/Funciones/transicionAMapa.js";
import verMapa from "./escenas/Funciones/verMapa.js";
import tutorial from "./escenas/Funciones/tutorial.js";
import prologo from "./escenas/Funciones/prologo.js";
import combate from "./escenas/combate.js";
import combateDialogos from "./escenas/combateDialogos.js";
import transitionACombate from "./escenas/Funciones/transicionACombate.js";
import menup from "./menu principal.js";

export default class pantallaDeCarga extends Phaser.Scene{
    constructor(){
        super({key: 'pantallaDeCarga'});
    }

    preload(){
        this.add.text(250,200, 'Cargando...', {fontSize:'50px'}).setOrigin(.5,.5);
        //descubrí que desde este momento se pueden cargar todos los assets del juego.
        //de ahora en adelante se hará aquí y de preferencia en el orden puesto

        //aqui se cargarán los recursos del overworld
        //esta zona carga las escenas del juego
        this.scene.add('menup', new menup);
        this.scene.add('creacionAnimaciones', new creacionAnimaciones);//este script ha quedado obsoleto, pero es usado para crear las animaciones
        this.scene.add('overworld', new overworld);
        this.scene.add('reconstruirEdificios', new reconstruirEdificios)
        this.scene.add('cajaDeDialogos', new cajaDeDialogos);
        this.scene.add('transicionAMapa', new transicionAMapa);
        this.scene.add('verMapa', new verMapa);
        this.scene.add('tutorial', new tutorial);
        this.scene.add('prologo', new prologo);
        this.scene.add('combate', combate);
        this.scene.add('combateDialogos', new combateDialogos);
        this.scene.add('transicionACombate', new transitionACombate);
        
        //aquí se cargarán assets del mundo (objetos, BG, ambiente, etc)
        this.load.image("polimapa", "./assets/overworld/mapa.png");
        this.load.image('polimapaOverlay', './assets/overworld/mapa-overlay.png');
        this.load.image('minipolimapa', './assets/overworld/miniMapa.png');
        this.load.image('playerMapa', './assets/overworld/playerMapa.png');
        this.load.image('salonbg', './assets/overworld/edificios/salon.png');
        this.load.image('silla', './assets/overworld/edificios/silla.png');
        this.load.image('escritorio', './assets/overworld/edificios/escritorio.png');
        this.load.image('PP0', './assets/overworld/edificios/poliplaza0.png');
        this.load.image('PP1', './assets/overworld/edificios/poliplaza1.png');
        this.load.image('AP0', './assets/overworld/edificios/edificioAP0.png');
        this.load.image('AP1', './assets/overworld/edificios/edificioAP1.png');
        this.load.image('coop', './assets/overworld/edificios/coop.png');

        this.load.image('BP0', './assets/overworld/edificios/edificioBP0.png');
        this.load.image('BP1', './assets/overworld/edificios/edificioBP1.png');
        this.load.image('BP00', './assets/overworld/edificios/edificioBEspecial.png');
        this.load.image('BP01', './assets/overworld/edificios/edificioBBiblio.png');

        this.load.image('CP0', './assets/overworld/edificios/edificioCP0.png');
        this.load.image('CP1', './assets/overworld/edificios/edificioCP1.png');
        this.load.image('DP0', './assets/overworld/edificios/edificioDP0.png');
        this.load.image('DP1', './assets/overworld/edificios/edificioDP1.png');
        this.load.image('DP2', './assets/overworld/edificios/edificioDP2.png');
        this.load.image('EP0', './assets/overworld/edificios/edificioEP0.png');
        this.load.image('EP1', './assets/overworld/edificios/edificioEP1.png');
        this.load.image('EP2', './assets/overworld/edificios/edificioEP2.png');
        this.load.image('FP0', './assets/overworld/edificios/edificioFP0.png');
        this.load.image('FP1', './assets/overworld/edificios/edificioFP1.png');
        this.load.image('FP2', './assets/overworld/edificios/edificioFP2.png');
        this.load.audio('BGMOverworld', './assets/overworld/sonidos/BGMOverworld.ogg');
        //Soundtrack By Josuwu5

        this.load.audio('BGMA', './assets/overworld/sonidos/edificioA.wav');
        this.load.audio('BGMB', './assets/overworld/sonidos/edificioB.wav');
        this.load.audio('BGMC', './assets/overworld/sonidos/edificioC.wav');
        this.load.audio('BGMD', './assets/overworld/sonidos/edificioD.wav');
        this.load.audio('BGME', './assets/overworld/sonidos/edificioE.wav');
        this.load.audio('BGMF', './assets/overworld/sonidos/edificioF.wav');


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
        this.load.spritesheet('profe1Sprite', './assets/overworld/profe1Sprite.png',{frameWidth:16, frameHeight:33});
        this.load.spritesheet('eliSprite', './assets/overworld/eliSprite.png',{frameWidth:18, frameHeight:31});
        this.load.spritesheet('juanSprite', './assets/overworld/juanSprite.png',{frameWidth:18, frameHeight:31});
        this.load.spritesheet('chucoSprite', './assets/overworld/chucoSprite.png',{frameWidth:18, frameHeight:31});
        this.load.spritesheet('pacoSprite', './assets/overworld/pacoSprite.png',{frameWidth:18, frameHeight:31});
        this.load.spritesheet('mariaSprite', './assets/overworld/mariaSprite.png',{frameWidth:24, frameHeight:28});
        this.load.spritesheet('viejoSprite', './assets/overworld/viejoSprite.png',{frameWidth:18, frameHeight:31});

        //aqui se cargaran imagenes de dialogos
        this.load.image('prologoFondo', './assets/overworld/dialogos/tutorial/eli.jpeg');
        this.load.image('prologoFondoEnojado', './assets/overworld/dialogos/tutorial/eliEnojado.jpeg');
        this.load.image("eli", "./assets/overworld/eli.png");
        this.load.image("eliEnojado", "./assets/overworld/eliEnojado.png");
        this.load.image("eliSorpresa", "./assets/overworld/eliSorprendido.png");
        this.load.image("eliSmug", "./assets/overworld/eliSmug.png");
        this.load.image("viejo", "./assets/overworld/viejo.png");
        this.load.image("viejoEnojado", "./assets/overworld/viejoEnojado.png");
        this.load.image("viejoHisteria", "./assets/overworld/viejoHisterico.png");


        //aqui el turorial
        this.load.image('tuto1', './assets/overworld/dialogos/tutorial/tuto1.png');
        this.load.image('tuto2', './assets/overworld/dialogos/tutorial/tuto2.png');
        this.load.image('tuto3', './assets/overworld/dialogos/tutorial/tuto3.png');
        this.load.image('tuto4', './assets/overworld/dialogos/tutorial/tuto4.png');
        this.load.image('tuto5', './assets/overworld/dialogos/tutorial/tuto5.png');
        this.load.image('tuto6', './assets/overworld/dialogos/tutorial/tuto6.png');
        this.load.image('tuto7', './assets/overworld/dialogos/tutorial/tuto7.png');
        this.load.image('tuto8', './assets/overworld/dialogos/tutorial/tuto8.png');
        this.load.image('tuto9', './assets/overworld/dialogos/tutorial/tuto9.png');
        this.load.image('tuto10', './assets/overworld/dialogos/tutorial/tuto10.png');

        //aqui se cargarán sonidos de dialogos
        this.load.audio('sonidoNPC1', './assets/overworld/dialogos/npc1.wav');
        this.load.audio('sonidoNPC2', './assets/overworld/dialogos/npc2.ogg');

        //aqui se cargarán recursos para el combate. eli separalos porfa
        this.load.audio("BGMcombate", "./assets/combate/audio/BGMcombate.mp3");
        this.load.audio('inicioCombateBGM', "./assets/combate/audio/combateStart.mp3");
        this.load.audio("BGMCombateNormal", "./assets/combate/audio/BGMcombateLoop.mp3");
        this.load.spritesheet("fondo", "./assets/combate/fondo.png", { frameWidth: 500, frameHeight: 480});
        this.load.spritesheet("card_atk", "./assets/combate/card_atk.png", { frameWidth: 50, frameHeight: 70});
        this.load.spritesheet("card_block", "./assets/combate/card_block.png", { frameWidth: 50, frameHeight: 70});
        this.load.spritesheet("card_rest", "./assets/combate/card_rest.png", { frameWidth: 50, frameHeight: 70});
        this.load.spritesheet("card_strong", "./assets/combate/card_strong.png", { frameWidth: 50, frameHeight: 70});
        this.load.spritesheet("healthbar", "./assets/combate/healthbar.png", { frameWidth: 100, frameHeight: 10});
        this.load.spritesheet('duende', './assets/combate/sprites_enemigos/duende.png',{frameWidth:124, frameHeight:186});
        this.load.spritesheet('gusano', './assets/combate/sprites_enemigos/gusano.png', {frameWidth:41, frameHeight:36});
        this.load.spritesheet('beetle', './assets/combate/sprites_enemigos/beetle.png', {frameWidth:40, frameHeight:50});
        this.load.spritesheet('vampiro', './assets/combate/sprites_enemigos/vampiro.png', {frameWidth:40, frameHeight:85});
        this.load.spritesheet('esqueleto', './assets/combate/sprites_enemigos/esqueleto.png', {frameWidth:44, frameHeight:52});
        this.load.spritesheet('fantasma', './assets/combate/sprites_enemigos/fantasma.png', {frameWidth:72, frameHeight:65});
        this.load.spritesheet('arbol', './assets/combate/sprites_enemigos/arbol.png', {frameWidth:72, frameHeight:65});
        this.load.spritesheet('burro', './assets/combate/sprites_enemigos/burro.png', {frameWidth:75, frameHeight:90});
        this.load.spritesheet('topo', './assets/combate/sprites_enemigos/topo.png', {frameWidth:151, frameHeight:117});
        this.load.spritesheet('profe1pleito', './assets/combate/sprites_enemigos/profe1Pleito.png', {frameWidth:32, frameHeight:64});
        this.load.spritesheet('chucopleito', './assets/combate/sprites_enemigos/chucoPleito.png', {frameWidth:62, frameHeight:76});
        this.load.spritesheet('mariapleito', './assets/combate/sprites_enemigos/mariaPleito.png', {frameWidth:69, frameHeight:75});
        this.load.spritesheet('viejopleito', './assets/combate/sprites_enemigos/viejoPleito.png', {frameWidth:54, frameHeight:93});
        this.load.json('lvlup', './assets/combate/estadisticas/jugador/lvlup.json');
        this.load.json('enemigo1', './assets/combate/estadisticas/enemigo1.json');
        this.load.json('enemigo2', './assets/combate/estadisticas/enemigo2.json');
        this.load.json('enemigo3', './assets/combate/estadisticas/enemigo3.json');
        this.load.json('enemigo4', './assets/combate/estadisticas/enemigo4.json');
        this.load.json('enemigo5', './assets/combate/estadisticas/enemigo5.json');
        this.load.json('enemigo6', './assets/combate/estadisticas/enemigo6.json');
        this.load.json('enemigo7', './assets/combate/estadisticas/enemigo7.json');
        this.load.json('enemigo8', './assets/combate/estadisticas/enemigo8.json');
        this.load.json('enemigo9', './assets/combate/estadisticas/enemigo9.json');
        this.load.json('jefe1', './assets/combate/estadisticas/jefe1.json');
        this.load.json('jefe2', './assets/combate/estadisticas/jefe2.json');
        this.load.json('jefe3', './assets/combate/estadisticas/jefe3.json');
        this.load.json('jefe4', './assets/combate/estadisticas/jefe4.json');
    }

    create(){
        this.registry.set('playerStats', {hp: 100, atk: 10, def: 5, lvl: 1, xp:0, nxtlvl:100});
        this.registry.set('progreso', 0);
        this.scene.launch('creacionAnimaciones').stop('creacionAnimaciones');
        this.scene.launch('cajaDeDialogos').sleep('cajaDeDialogos');
        this.scene.launch('verMapa').stop('verMapa');
        this.scene.launch('combateDialogos').sleep('combateDialogos');
        this.scene.launch('transicionACombate').launch('reconstruirEdificios').launch('transicionAMapa');
        this.scene.start('menup');
    };
}
