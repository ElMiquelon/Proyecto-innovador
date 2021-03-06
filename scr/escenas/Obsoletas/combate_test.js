const srtWait = 750;
const medWait = 1000;
const lngWait = 1500;
var palParry;
var card_atk;
var card_block;
var card_rest;
var card_strong;
var enemyHealthbar;
var t = 0;
var mirror = 0;
var elEnemigoAtaco;
import combateDialogos from "./combateDialogos";
var playerStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00,
    buffDmg: 0,
    buffDef: 0,
    buffDmgT: 0,
    buffDefT: 0
};

var enemyStats = {
    maxhp: 200,
    hp: 200,
    atk: 10,
    res: 1.00,
    buffDmg: 0,
    nombre: 'elpepe',
    buffDmgT: 0,
    penal: 0
};

export default class combate_test extends Phaser.Scene {

    constructor() {
        super({ key: "combate_test" });
    }

    preload() {
        this.load.image("map", "./assets/combate/mapa_c.png");
        this.load.image("player_c", "./assets/combate/player_c.png");
        this.load.image("enemy_c", "./assets/combate/pew.png");
        this.load.spritesheet("card_atk", "./assets/combate/card_atk.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_block", "./assets/combate/card_block.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_rest", "./assets/combate/card_rest.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("card_strong", "./assets/combate/card_strong.png", { frameWidth: 50, frameHeight: 70 });
        this.load.spritesheet("healthbar", "./assets/combate/healthbar.png", { frameWidth: 100, frameHeight: 10 });


        this.load.json('enemigo1', './assets/combate/estadisticas/enemigo1.json');
        this.load.json('enemigo2', './assets/combate/estadisticas/enemigo2.json');
        this.load.json('enemigo3', './assets/combate/estadisticas/enemigo3.json');
        this.load.json('enemigo4', './assets/combate/estadisticas/enemigo4.json');

        this.scene.add('combateDialogos', new combateDialogos)
    }

    create() {
        //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
        //this.cameras.main.setBounds(0, 0, 500 , 480); no veo necesaria la camara aquí
        //this.physics.world.setBounds(0, 0, 500, 480); ni el set bounds
        this.add.image(0, 0, 'map').setOrigin(0);

        this.scene.launch('combateDialogos').sleep('combateDialogos');

        //barra de vida
        enemyHealthbar = this.add.sprite(20, 50, 'healthbar').setOrigin(0);

        //cartas
        card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
        card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
        card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
        card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

        //textos de daño 
        this.BGEnemyDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .4).setVisible(false);
        this.enemyDmg = this.add.text(370,92,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosEnemyDmg = this.time.delayedCall();

        this.BGPlayerDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .4).setVisible(false);
        this.playerDmg = this.add.text(435,362,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosPlayerDmg = this.time.delayedCall();
        //eventos del combate
        this.registry.events.on('response', () => {
            var r = Phaser.Math.Between(1, 5);
            switch (r) {
                case 1:
                    this.registry.events.emit('hurtPlayer', 1)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque medio', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 2:
                    this.registry.events.emit('hurtPlayer', 1.5);
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque fuerte', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 3:
                    this.registry.events.emit('hurtPlayer', .5)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque débil', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 4:
                    this.registry.events.emit('healEnemy', 5)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse un poco', srtWait);
                    elEnemigoAtaco = 1;
                    break;
                case 5:
                    if (enemyStats.penal >= 1) {
                        this.registry.events.emit('hurtPlayer', 1)
                        this.registry.events.emit('accionDeCombate', 'El enemigo iba a curarse pero decidió atacar', srtWait);
                        elEnemigoAtaco = 0;
                    } else {
                        this.registry.events.emit('healEnemy', 10);
                        this.registry.events.emit('buffDmgEnemy', 5, 1);
                        this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse mucho', srtWait);
                        enemyStats.penal = 5;
                        elEnemigoAtaco = 1;
                    }
                    break;
                default:
                    break;
            }
        });

        this.registry.events.on('hurtPlayer', (multi) => {
            var outgoing = Math.round(multi * enemyStats.atk);
            if (enemyStats.buffDmg > 0) {
                outgoing += enemyStats.buffDmg;
            }
            outgoing -= playerStats.def - playerStats.buffDef;
            if (outgoing <= 0) {
                outgoing = 1;
                console.log('El daño del enemigo era muy bajo!');
            }
            mirror = outgoing;
            playerStats.hp -= outgoing;
            if (playerStats.hp < 0) {
                playerStats.hp = 0;
            }
            this.registry.events.emit('mostrarDmgAPlayer', outgoing);
        });

        this.registry.events.on('healEnemy', (raw) => {
            enemyStats.hp += raw;
            if (enemyStats.hp > enemyStats.maxhp) {
                enemyStats.hp = enemyStats.maxhp;
            }
        });

        this.registry.events.on('hurtEnemy', (multi) => {
            var incoming = Math.round(multi * playerStats.atk);
            if (playerStats.buffDmg > 0) {
                incoming += playerStats.buffDmg;
            }
            if (incoming <= 0) {
                incoming = 1;
                console.log('El daño del jugador era muy bajo!');
            }
            enemyStats.hp -= incoming;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            }
            this.registry.events.emit('mostrarDmgAEnemy', incoming);
        });

        this.registry.events.on('hurtEnemyMirror', (raw) => {
            enemyStats.hp -= raw;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            }
            this.enemyDmg.setText(palParry + ' & -' + raw);
            this.BGEnemyDmg.setSize(this.enemyDmg.getBounds().width, this.enemyDmg.getBounds().height).setPosition(this.enemyDmg.getBounds().centerX,this.enemyDmg.getBounds().centerY).setOrigin(.5);
        })

        this.registry.events.on('nextTurn', () => {
            t += 1;
            playerStats.buffDmgT -= 1;
            playerStats.buffDefT -= 1;
            playerStats.res = 1.00;
            enemyStats.res = 1.00;
            enemyStats.buffDmgT -= 1;
            enemyStats.penal -= 1;

            if (playerStats.buffDmgT <= 0) {
                playerStats.buffDmgT = 0;
                playerStats.buffDmg = 0;
            };
            if (playerStats.buffDefT <= 0) {
                playerStats.buffDefT = 0;
                playerStats.buffDef = 0;
            };
            if (enemyStats.buffDmgT <= 0) {
                enemyStats.buffDmgT = 0;
                enemyStats.buffDmg = 0;
            };
        })

        this.registry.events.on('healPlayer', (raw) => {
            playerStats.hp += raw;
            if (playerStats.hp >= playerStats.hp) {
                playerStats.hp = playerStats.maxhp;
            }
        });

        this.registry.events.on('gameOver', (v) => {
            switch (v) {
                case 0: /*Perdiste*/
                    this.registry.events.emit('accionDeCombate', 'Has perdido', lngWait);
                    setTimeout(() => {
                        console.log('inserte aqui lo que pasa cuando pierdes')
                    }, lngWait);
                    break;
                case 1: /*Ganaste*/
                    this.registry.events.emit('accionDeCombate', '¡Has ganado!', lngWait);
                    setTimeout(() => {
                        //this.scene.switch('overworld'); tambien se puede hacer una transición
                        console.log('inserte aqui lo que pasa cuando ganas')
                    }, lngWait);
                    break;
                default:
                    break;
            }
        });

        this.registry.events.on('buffDmgPlayer', (buff, turns) => {
            if (playerStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff de daño activo');
            } else {
                playerStats.buffDmg = buff;
                playerStats.buffDmgT = turns;
            }
        });

        this.registry.events.on('buffDefPlayer', (buff, turns) => {
            if (playerStats.buffDefT > 0) {
                console.log('El jugador ya tiene un buff de defensa activo');
            } else {
                playerStats.buffDef = buff;
                playerStats.buffDefT = turns;
            }
        });

        this.registry.events.on('buffDmgEnemy', (buff, turns) => {
            if (enemyStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff activo');
            } else {
                enemyStats.buffDmg = buff;
                enemyStats.buffDmgT = turns;
            }
        });

        this.registry.events.on('mostrarDmgAPlayer', (dmg)=>{
            this.adiosPlayerDmg.destroy();
            this.playerDmg.setText('-' + dmg).setVisible(true);
            this.BGPlayerDmg.setSize(this.playerDmg.getBounds().width, this.playerDmg.getBounds().height).setPosition(this.playerDmg.getBounds().centerX,this.playerDmg.getBounds().centerY).setOrigin(.5).setVisible(true);
            this.adiosPlayerDmg = this.time.delayedCall(400, ()=>{
                this.playerDmg.setVisible(false);
                this.BGPlayerDmg.setVisible(false);
            },[], this)
        });

        this.registry.events.on('mostrarDmgAEnemy', (dmg)=>{
            palParry = '-' + dmg;
            this.adiosEnemyDmg.destroy();
            this.enemyDmg.setText('-' + dmg).setVisible(true);
            this.BGEnemyDmg.setSize(this.enemyDmg.getBounds().width, this.enemyDmg.getBounds().height).setPosition(this.enemyDmg.getBounds().centerX,this.enemyDmg.getBounds().centerY).setOrigin(.5).setVisible(true);
            this.adiosEnemyDmg = this.time.delayedCall(400, ()=>{
                this.enemyDmg.setVisible(false);
                this.BGEnemyDmg.setVisible(false);
            },[], this)
        });
        //control
        this.acc = this.input.keyboard.createCursorKeys();
        this.input.keyboard.enabled = false;//paso necesario para evitar overlap con Overworld


        //estos se imrpimen en la escena equivocada aaaa
        this.acc.right.on('down', () => {
            card_strong.setTexture('card_strong', 1);
            playerStats.res = 0.8;
            this.registry.events.emit('accionDeCombate', 'Has intentado realizar un parry', srtWait);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.registry.events.emit('response');
                    setTimeout(() => {
                        if (elEnemigoAtaco != 1) {
                            mirror = Math.round(mirror * 0.5);
                            this.registry.events.emit('hurtEnemy', 0.5);
                            this.registry.events.emit('hurtEnemyMirror', mirror);
                            this.registry.events.emit('accionDeCombate', 'Has ejecutado un parry exitosamente', medWait);
                            console.log('Vida enemigo = ' + enemyStats.hp);
                        } else {
                            playerStats.hp -= 5;
                            this.registry.events.emit('mostrarDmgAPlayer', 5);
                            this.registry.events.emit('accionDeCombate', 'Has fallado el parry', medWait);
                            console.log('Vida jugador = ' + playerStats.hp);
                        };
                    }, srtWait);
                } else {
                    this.registry.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.registry.events.emit('nextTurn');
                } else {
                    this.registry.events.emit('gameOver', 0);
                };
            }, srtWait);//el tiempo debe de ser equivalente al timer de combateDialogos

        });
        this.acc.left.on('down', () => {
            playerStats.res = 0.1;
            card_block.setTexture('card_block', 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido hacer un bloqueo', srtWait);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.registry.events.emit('response');
                    if (elEnemigoAtaco != 1) {
                        this.registry.events.emit('buffDefPlayer', 10, 1);
                    }
                } else {
                    this.registry.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.registry.events.emit('nextTurn');
                } else {
                    this.registry.events.emit('gameOver', 0);
                };
                console.log('Vida enemigo = ' + enemyStats.hp);
            }, srtWait);


        });
        this.acc.up.on('down', () => {
            card_atk.setTexture('card_atk', 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido atacar', srtWait);
            this.registry.events.emit('hurtEnemy', 1);
            console.log('Vida enemigo = ' + enemyStats.hp);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.registry.events.emit('response');
                } else {
                    this.registry.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.registry.events.emit('nextTurn');
                } else {
                    this.registry.events.emit('gameOver', 0);
                };
            }, srtWait);


        });
        this.acc.down.on('down', () => {
            card_rest.setTexture('card_rest', 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido curarte', srtWait);
            this.registry.events.emit('healPlayer', 10);
            playerStats.res = 0.3;
            this.registry.events.emit('buffDmgPlayer', 5, 1);
            this.registry.events.emit('buffDefPlayer', 5, 1);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.registry.events.emit('response');
                } else {
                    this.registry.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.registry.events.emit('nextTurn');
                } else {
                    this.registry.events.emit('gameOver', 0);
                };
                console.log('Vida = ' + playerStats.hp);
            }, srtWait);

        });


        //asignación de estadisticas al enemigo
        this.registry.events.on('comenzarBatalla', (playerLVL) => {
            //esta webada podria servir para poner enemigos de acuerdo al nivel del jugador
            this.scene.wake(this);
            this.input.keyboard.enabled = true;
            this.scene.stop('menup');
            console.log('El nivel del jugador es: ' + playerLVL);
            if (playerLVL == 1) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(1, 2));/*nosotros tendremos que decir "a, los enemigos desde 
            x a y serán para tal nivel de jugador" y los pondremos dentro del between. voy a testar con el lvl1*/
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.maxhp[Phaser.Math.Between(0, this.enemyLoader.maxhp.length - 1)];
                enemyStats.hp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
                console.log(enemyStats);
            } else if (playerLVL == 2) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(3, 4));
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.maxhp[Phaser.Math.Between(0, this.enemyLoader.maxhp.length - 1)];
                enemyStats.hp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
                console.log(enemyStats);
            }
        });

        //impresion de las estadisticas del jugador y enemigo
        this.BGPlayerStats = this.add.rectangle(0, 305, 0, 0, 0xaaaaaa, .4).setOrigin(0);
        this.txtPlayerstats = this.add.text(0, 305,
            'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
            '\nAtaque: ' + playerStats.atk +
            '\nDefensa: ' + playerStats.def +
            '\nResistencia: ' + playerStats.res,
            {
                color: 'black', padding: { bottom: 2 }
            });
        this.BGPlayerStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)


        this.BGEnemyStats = this.add.rectangle(0, 0, 0, 0, 0xaaaaaa, .4).setOrigin(0);
        this.txtEnemyStats = this.add.text(0, 0,
            'Vida: ' + enemyStats.hp + ' / ' + enemyStats.maxhp +
            '\nAtaque: ' + enemyStats.atk +
            '\nResistencia: ' + enemyStats.res,
            {
                color: 'black', padding: { bottom: 2 }
            });
        this.BGEnemyStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)
    }

    update(time, delta) {
        this.txtPlayerstats.setText(
            'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
            '\nAtaque: ' + playerStats.atk +
            '\nDefensa: ' + playerStats.def +
            '\nResistencia: ' + playerStats.res);

        this.txtEnemyStats.setText(
            'Vida: ' + enemyStats.hp + ' / ' + enemyStats.maxhp +
            '\nAtaque: ' + enemyStats.atk +
            '\nResistencia: ' + enemyStats.res,
        );

        if (enemyStats.hp == enemyStats.maxhp) {
            enemyHealthbar.setTexture('healthbar', 0);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.9)) {
            enemyHealthbar.setTexture('healthbar', 1);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.8)) {
            enemyHealthbar.setTexture('healthbar', 2);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.7)) {
            enemyHealthbar.setTexture('healthbar', 3);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.6)) {
            enemyHealthbar.setTexture('healthbar', 4);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.5)) {
            enemyHealthbar.setTexture('healthbar', 5);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.4)) {
            enemyHealthbar.setTexture('healthbar', 6);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.3)) {
            enemyHealthbar.setTexture('healthbar', 7);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.2)) {
            enemyHealthbar.setTexture('healthbar', 8);
        } else if (enemyStats.hp >= (enemyStats.maxhp * 0.1)) {
            enemyHealthbar.setTexture('healthbar', 9);
        } else if (enemyStats.hp == 0) {
            enemyHealthbar.setTexture('healthbar', 10);
        }

        card_strong.setTexture('card_strong', 0);
        card_block.setTexture('card_block', 0);
        card_atk.setTexture('card_atk', 0);
        card_rest.setTexture('card_rest', 0);
    };
}
