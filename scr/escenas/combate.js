const srtWait = 750;
const medWait = 1000;
const lngWait = 1500;
var palParry;
var card_atk;
var card_block;
var card_rest;
var card_strong;
var enemyHealthbar;
var playerHealthbar;
var mirror = 0;
var elEnemigoAtaco;

var playerStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00,
    resT: 0,
    buffDmg: 0,
    buffDef: 0,
    buffDmgT: 0,
    buffDefT: 0,
    penalHeal: 0
};

var enemyStats = {
    maxhp: '?',
    hp: '?',
    atk: '?',
    res: '?',
    resT: 0,
    buffDmg: 0,
    nombre: 'x',
    buffDmgT: 0,
    penal: 0,
    xp:0
};

export default class combate extends Phaser.Scene {
    constructor() {
        super({ key: "combate" });
    };

    create() {
        //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
        this.camara = this.cameras.main.setBounds(0, 0, 500, 480).setRotation(359); //al final se usó para la transición
        this.camara.zoom = .01;

        //this.physics.world.setBounds(0, 0, 500, 480); ni el set bounds
        this.add.image(0, 0, 'map').setOrigin(0);

        //barra de vida
        enemyHealthbar = this.add.sprite(20, 50, 'healthbar').setOrigin(0);
        playerHealthbar = this.add.sprite(20, 370, 'healthbar').setOrigin(0);

        //cartas
        card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
        card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
        card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
        card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

        //audio
        this.bgm =this.sound.add('BGMcombate');

        //textos de daño 
        this.BGEnemyDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .4).setVisible(false);
        this.enemyDmg = this.add.text(370,92,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosEnemyDmg = this.time.delayedCall();/*se crean 3 objetos, 1 rectangulo, 1 texto y 1 temporizador en blanco para poder eleminarlo al momento de 
        ejecutar el evento que lo hace mostrarse (esto para evitar que el tiempo se acumule y genere bugs)*/

        this.BGPlayerDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .4).setVisible(false);
        this.playerDmg = this.add.text(435,362,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosPlayerDmg = this.time.delayedCall();

        //EVENTOS DE COMBATE
        this.events.on('response', () => {
            //"response" escoge un numero entre 1 y 5 para que el enemigo responda
            var r = Phaser.Math.Between(1, 5);
            switch (r) {
                case 1:
                    this.events.emit('hurtPlayer', 1)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque medio', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 2:
                    this.events.emit('hurtPlayer', 1.5);
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque fuerte', srtWait);
                    this.events.emit('playerSetRes', 1.2, 3)
                    elEnemigoAtaco = 0;
                    break;
                case 3:
                    this.events.emit('hurtPlayer', .5)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque débil', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 4:
                    this.events.emit('healEnemy', 5)
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse un poco', srtWait);
                    elEnemigoAtaco = 1;
                    break;
                case 5:
                    if (enemyStats.penal >= 1) {
                        this.events.emit('hurtPlayer', 1)
                        this.registry.events.emit('accionDeCombate', 'El enemigo iba a curarse pero decidió atacar', srtWait);
                        elEnemigoAtaco = 0;
                    } else {
                        this.events.emit('healEnemy', Math.round(enemyStats.maxhp * 0.25));
                        this.events.emit('buffDmgEnemy', 5, 3);
                        this.events.emit('enemySetRes', 0.8, 4);
                        this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse mucho', srtWait);
                        enemyStats.penal = 8;
                        elEnemigoAtaco = 1;
                    }
                    break;
                default:
                    break;
            }
        });
        //Modificadores de jugador
        this.events.on('healPlayer', (raw) => {
            playerStats.hp += raw;
            if (playerStats.hp >= playerStats.maxhp) {
                playerStats.hp = playerStats.maxhp;
            }
            this.events.emit('actualizarBarras');
        });

        this.events.on('hurtPlayer', (multi) => {
            var outgoing = Math.round(multi * (enemyStats.atk + enemyStats.buffDmg)); //Obtiene un daño con un multiplicador más ataque y buffs
            outgoing = Math.round((outgoing - playerStats.def - playerStats.buffDef) * playerStats.res); //Multiplica por la resistencia del jugador
            if (outgoing <= 0) {
                outgoing = 1;
                console.log('El daño del enemigo era muy bajo!');
            }
            mirror = outgoing;
            playerStats.hp -= outgoing;
            if (playerStats.hp < 0) {
                playerStats.hp = 0;
            }
            this.events.emit('mostrarDmgAPlayer', outgoing);
            this.events.emit('actualizarBarras');
        });

        this.events.on('playerSetRes', (set, turns) => {
            if (playerStats.resT > 0) {
                console.log('El jugador ya tiene modificaciones a su resistencia');
            } else {
                playerStats.res = set;
                playerStats.resT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('buffDmgPlayer', (buff, turns) => {
            if (playerStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff de daño activo');
            } else {
                playerStats.buffDmg = buff;
                playerStats.buffDmgT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('buffDefPlayer', (buff, turns) => {
            if (playerStats.buffDefT > 0) {
                console.log('El jugador ya tiene un buff de defensa activo');
            } else {
                playerStats.buffDef = buff;
                playerStats.buffDefT = turns;
            };
            this.events.emit('actualizarBarras');
        });
        //Modificadores de enemigo
        this.events.on('enemySetRes', (set, turns) => {
            if (enemyStats.resT > 0) {
                console.log('El enemigo ya tiene modificaciones a su resistencia');
            } else {
                enemyStats.res = set;
                enemyStats.resT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('healEnemy', (raw) => {
            enemyStats.hp += raw;
            if (enemyStats.hp > enemyStats.maxhp) {
                enemyStats.hp = enemyStats.maxhp;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('hurtEnemy', (multi) => {
            var incoming = Math.round(multi * (playerStats.atk + playerStats.buffDmg)); //Obtiene un daño con un multiplicador más ataque y buffs
            incoming = Math.round(incoming * enemyStats.res); //Multiplica por la resistencia del enemigo
            if (incoming <= 0) {
                incoming = 1;
                console.log('El daño del jugador era muy bajo!');
            }
            enemyStats.hp -= incoming;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            };
            this.events.emit('mostrarDmgAEnemy', incoming);
            this.events.emit('actualizarBarras');
        });

        this.events.on('hurtEnemyMirror', (raw) => {
            enemyStats.hp -= raw;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            }
            this.enemyDmg.setText(palParry + ' & -' + raw);
            this.BGEnemyDmg.setSize(this.enemyDmg.getBounds().width, this.enemyDmg.getBounds().height).setPosition(this.enemyDmg.getBounds().centerX,this.enemyDmg.getBounds().centerY).setOrigin(.5);
            this.events.emit('actualizarBarras');
        });

        this.events.on('buffDmgEnemy', (buff, turns) => {
            if (enemyStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff activo');
            } else {
                enemyStats.buffDmg = buff;
                enemyStats.buffDmgT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        //Otros
        this.events.on('actualizarBarras', ()=>{
        //barra de vida del enemigo
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
        };

        //barra de vida del jugador
        if (playerStats.hp == playerStats.maxhp) {
            playerHealthbar.setTexture('healthbar', 0);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.9)) {
            playerHealthbar.setTexture('healthbar', 1);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.8)) {
            playerHealthbar.setTexture('healthbar', 2);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.7)) {
            playerHealthbar.setTexture('healthbar', 3);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.6)) {
            playerHealthbar.setTexture('healthbar', 4);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.5)) {
            playerHealthbar.setTexture('healthbar', 5);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.4)) {
            playerHealthbar.setTexture('healthbar', 6);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.3)) {
            playerHealthbar.setTexture('healthbar', 7);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.2)) {
            playerHealthbar.setTexture('healthbar', 8);
        } else if (playerStats.hp >= (playerStats.maxhp * 0.1)) {
            playerHealthbar.setTexture('healthbar', 9);
        } else if (playerStats.hp == 0) {
            playerHealthbar.setTexture('healthbar', 10);
        };});

        this.events.on('nextTurn', () => {
            playerStats.buffDmgT -= 1;
            playerStats.buffDefT -= 1;
            playerStats.resT -= 1;
            enemyStats.resT -= 1;
            enemyStats.buffDmgT -= 1;
            enemyStats.penal -= 1;
            playerStats.penalHeal -= 1;

            //Reseta los buff si el contador de turnos es termina
            if (playerStats.buffDmgT <= 0) {
                playerStats.buffDmgT = 0;
                playerStats.buffDmg = 0;
            };
            if (playerStats.buffDefT <= 0) {
                playerStats.buffDefT = 0;
                playerStats.buffDef = 0;
            };
            if (playerStats.resT <= 0) {
                playerStats.res = 1.00;
            };
            if (enemyStats.buffDmgT <= 0) {
                enemyStats.buffDmgT = 0;
                enemyStats.buffDmg = 0;
            };
            if (enemyStats.resT <= 0) {
                enemyStats.res = 1.00;
            };
            if (playerStats.penalHeal <= 0) {
                playerStats.penalHeal = 0;
            };
            //Actualiza barras
            this.events.emit('actualizarBarras');
        });

        this.events.on('gameOver', (v) => {
            switch (v) {
                case 0: /*Perdiste*/
                    this.registry.events.emit('accionDeCombate', 'Has perdido', lngWait);
                    //lo que se hace aquí es poner el texto "Has ganado" durante segundo y medio 
                    setTimeout(() => {
                        console.log('inserte aqui lo que pasa cuando pierdes')
                    }, lngWait); //y una vez hayan pasado esos 1500 milisegundos, se reinicia
                    break;
                case 1: /*Ganaste*/
                    this.input.keyboard.enabled = false;
                    this.registry.events.emit('accionDeCombate', '¡Has ganado!', lngWait);
                    this.registry.values.playerStats.xp += enemyStats.xp;
                    if(this.registry.values.playerStats.xp >= this.registry.values.playerStats.nxtlvl){
                        var lvlup = this.cache.json.get('lvlup');
                        this.registry.values.playerStats.hp += lvlup.hp[Phaser.Math.Between(0, lvlup.hp.length - 1)];
                        this.registry.values.playerStats.atk += lvlup.atk[Phaser.Math.Between(0, lvlup.atk.length - 1)];
                        this.registry.values.playerStats.def += lvlup.def[Phaser.Math.Between(0, lvlup.def.length - 1)];
                        this.registry.values.playerStats.xp -= this.registry.values.playerStats.nxtlvl;
                        this.registry.values.playerStats.nxtlvl = Math.round(this.registry.values.playerStats.nxtlvl * 1.25);
                        this.registry.values.playerStats.lvl += 1; 
                        //aqui falta agregar las notificaciones correspondientes
                        this.time.delayedCall(medWait, ()=>{
                            //this.scene.switch('overworld'); tambien se puede hacer una transición
                            this.bgm.stop();
                            this.registry.events.emit('transicionaoverworld');
                        });
                    }else{
                        this.time.delayedCall(medWait, ()=>{
                            //this.scene.switch('overworld'); tambien se puede hacer una transición
                            this.bgm.stop();
                            this.registry.events.emit('transicionaoverworld');
                        });
                    };
                    break;
                default:
                    break;
            }
        });

        this.events.on('mostrarDmgAPlayer', (dmg)=>{
            this.adiosPlayerDmg.destroy();
            this.playerDmg.setText('-' + dmg).setVisible(true);
            this.BGPlayerDmg.setSize(this.playerDmg.getBounds().width, this.playerDmg.getBounds().height).setPosition(this.playerDmg.getBounds().centerX,this.playerDmg.getBounds().centerY).setOrigin(.5).setVisible(true);
            this.adiosPlayerDmg = this.time.delayedCall(400, ()=>{
                this.playerDmg.setVisible(false);
                this.BGPlayerDmg.setVisible(false);
            },[], this)
        });

        this.events.on('mostrarDmgAEnemy', (dmg)=>{
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


        //BOTONES DE ACCIÓN
        //Parry
        this.acc.right.on('down', () => {
            this.events.emit('actualizarBarras');
            card_strong.setTexture('card_strong', 1);
            this.events.emit('playerSetRes', 0.8, 1);
            this.registry.events.emit('accionDeCombate', 'Has intentado realizar un parry', srtWait);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.events.emit('response');
                    setTimeout(() => {
                        if (elEnemigoAtaco != 1) {
                            mirror = Math.round(mirror * 0.5);
                            this.events.emit('hurtEnemy', 1);
                            this.events.emit('hurtEnemyMirror', mirror);
                            this.registry.events.emit('accionDeCombate', 'Has ejecutado un parry exitosamente', medWait);
                        } else {
                            playerStats.hp -= Math.round(playerStats.maxhp * 0.2);
                            this.events.emit('mostrarDmgAPlayer', Math.round(playerStats.maxhp * 0.2));
                            this.registry.events.emit('accionDeCombate', 'Has fallado el parry', medWait);
                        };
                    }, srtWait);
                } else {
                    this.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.events.emit('nextTurn');
                } else {
                    this.events.emit('gameOver', 0);
                };
                card_strong.setTexture('card_strong', 0);
            }, srtWait); //el tiempo debe de ser equivalente al timer de combateDialogos

        });
        //Bloquear
        this.acc.left.on('down', () => {
            this.events.emit('actualizarBarras');
            this.events.emit('setPlayerRes', 0.1, 2);
            card_block.setTexture('card_block', 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido hacer un bloqueo', srtWait);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.events.emit('response');
                    if (elEnemigoAtaco == 1) {
                        this.events.emit('buffDefPlayer', 10, 3);
                        console.log('El enemigo no ataco por lo que te aumento la defensa');
                    };
                } else {
                    this.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.events.emit('nextTurn');
                } else {
                    this.events.emit('gameOver', 0);
                };
                card_block.setTexture('card_block', 0);
                card_rest.setTexture('card_rest', 0);
            }, srtWait);


        });
        //Ataque básico
        this.acc.up.on('down', () => {
            this.events.emit('actualizarBarras');
            card_atk.setTexture('card_atk', 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido atacar', srtWait);
            this.events.emit('hurtEnemy', 1);
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.events.emit('response');
                } else {
                    this.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.events.emit('nextTurn');
                } else {
                    this.events.emit('gameOver', 0);
                };
                card_atk.setTexture('card_atk', 0);
            }, srtWait);
        });
        //Descansar y buffear
        this.acc.down.on('down', () => {
            this.events.emit('actualizarBarras');
            card_rest.setTexture('card_rest', 1);
            if (playerStats.hp < (playerStats.maxhp * 0.5)) {
                if (playerStats.penalHeal > 1) {
                    this.events.emit('healPlayer', Math.round(playerStats.maxhp * .3));
                    this.registry.events.emit('accionDeCombate', 'Te curas tantito', srtWait);
                    console.log('El jugador uso un superheal recientemente');
                } else {
                    this.events.emit('healPlayer', Math.round(playerStats.maxhp * .1));
                    this.registry.events.emit('accionDeCombate', 'Has decidido recuperarte', srtWait);
                    playerStats.penalHeal = 8;
                };
            } else {
                this.events.emit('healPlayer', Math.round(playerStats.maxhp * .1));
                this.events.emit('playerSetRes', 0.75, 2);
                this.events.emit('buffDmgPlayer', 5, 2);
                this.events.emit('buffDefPlayer', 5, 2);
                this.registry.events.emit('accionDeCombate', 'Has decidido juntar fuerzas', srtWait);
            };
            setTimeout(() => {
                if (enemyStats.hp > 0) {
                    this.events.emit('response');
                } else {
                    this.events.emit('gameOver', 1);
                };
                if (playerStats.hp > 0) {
                    this.events.emit('nextTurn');
                } else {
                    this.events.emit('gameOver', 0);
                };
                card_rest.setTexture('card_rest', 0);
            }, srtWait);
        });


        //asignación de estadisticas al enemigo y jugador
        this.events.on('comenzarBatalla', () => {
            //esta webada podria servir para poner enemigos de acuerdo al nivel del jugador
            playerStats.maxhp = this.registry.values.playerStats.hp;
            playerStats.hp = playerStats.maxhp
            playerStats.atk = this.registry.values.playerStats.atk;
            playerStats.def = this.registry.values.playerStats.def;
            console.log('El nivel del jugador es: ' + this.registry.values.playerStats.lvl);
            if (this.registry.values.playerStats.lvl == 1) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(1, 2));
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.hp = enemyStats.maxhp;
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
                enemyStats.xp = Phaser.Math.Between(this.enemyLoader.xp[0], this.enemyLoader.xp[1])
                console.log(enemyStats);
            } else{ //if (this.registry.values.playerStats.lvl == 2) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(3, 4));
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.hp = enemyStats.maxhp;
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
                enemyStats.xp = Phaser.Math.Between(this.enemyLoader.xp[0], this.enemyLoader.xp[1])
                console.log(enemyStats);
            };
            console.log(playerStats);
            console.log(this.registry.get('playerStats'))
        });

        //impresion de las estadisticas del jugador y enemigo
        this.BGPlayerStats = this.add.rectangle(0, 305, 0, 0, 0xaaaaaa, .4).setOrigin(0);
        this.txtPlayerstats = this.add.text(0, 305,
            'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
            '\nAtaque: ' + playerStats.atk + '(+' + playerStats.buffDmg + ')' +
            '\nDefensa: ' + playerStats.def + '(+' + playerStats.buffDef + ')' +
            '\nResistencia: ' + (playerStats.res * -100 + 100) + '%',
            {
                color: 'black', padding: { bottom: 2 }
            });
        this.BGPlayerStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)

        this.BGEnemyStats = this.add.rectangle(0, 0, 0, 0, 0xaaaaaa, .4).setOrigin(0);
        this.txtEnemyStats = this.add.text(0, 0,
            'Vida: ' + enemyStats.hp + ' / ' + enemyStats.maxhp +
            '\nAtaque: ' + enemyStats.atk + '(+' + enemyStats.buffDmg + ')' +
            '\nResistencia: ' + (enemyStats.res * -100 + 100) + '%',
            {
                color: 'black', padding: { bottom: 2 }
            });
        this.BGEnemyStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)
        

        //transiciones
        this.events.on('transitionstart', (fromScene, duration)=>{
            this.events.emit('comenzarBatalla');
            this.bgm.play();
            this.camara.fadeOut(duration,0,0,0);
            this.time.delayedCall(duration + 100,()=>{
                this.camara.fadeFrom(300,0,0,0);
                this.time.delayedCall(400, ()=>{
                    this.input.keyboard.enabled = true;
                });
            });
            this.tweens.add({
                targets:this.camara,
                zoom:1,//quiza sea buena idea borrar el zoom no?
                rotation:0,
                duration: duration
            });
        });

        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.scene.sleep('overworld');
        });

        
    };

    update(time, delta) {
        this.txtPlayerstats.setText(
            'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
            '\nAtaque: ' + playerStats.atk + '(+' + playerStats.buffDmg + ')' +
            '\nDefensa: ' + playerStats.def +  '(+' + playerStats.buffDef + ')' +
            '\nResistencia: '  + (playerStats.res * -100 + 100) + '%'
        );

        this.txtEnemyStats.setText(
            'Vida: ' + enemyStats.hp + ' / ' + enemyStats.maxhp +
            '\nAtaque: ' + enemyStats.atk + '(+' + enemyStats.buffDmg + ')' +
            '\nResistencia: ' + (enemyStats.res * -100 + 100) + '%'
        );
    }
}
