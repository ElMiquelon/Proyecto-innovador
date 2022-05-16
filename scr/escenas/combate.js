const srtWait = 1200;
const medWait = 1800;
const lngWait = 2500;
const VOLUMEN = .3;
var fondo;
var card_atk;
var card_block;
var card_rest;
var card_strong;
var enemyHealthbar;
var playerHealthbar;
var palParry;
var mirror = 0;
var elEnemigoAtaco;
var stillAlive;

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
    res: 1,
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
        fondo = this.add.sprite(0, 0, 'fondo').setOrigin(0);

        //barra de vida
        enemyHealthbar = this.add.sprite(20, 50, 'healthbar').setOrigin(0);
        playerHealthbar = this.add.sprite(20, 370, 'healthbar').setOrigin(0);

        //cartas
        card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
        card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
        card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
        card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

        //audio
        this.inicioCombate =this.sound.add('inicioCombateBGM',{volume:VOLUMEN});

        //textos de daño 
        this.BGEnemyDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .5).setVisible(false);
        this.enemyDmg = this.add.text(370,92,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosEnemyDmg = this.time.delayedCall();/*se crean 3 objetos, 1 rectangulo, 1 texto y 1 temporizador en blanco para poder eleminarlo al momento de 
        ejecutar el evento que lo hace mostrarse (esto para evitar que el tiempo se acumule y genere bugs)*/

        this.BGPlayerDmg = this.add.rectangle(0,0,0,0,0xaaaaaa, .5).setVisible(false);
        this.playerDmg = this.add.text(435,362,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5).setVisible(false);
        this.adiosPlayerDmg = this.time.delayedCall();

        //EVENTOS DE COMBATE
        this.events.on('response', () => {
            //"response" escoge un numero entre 1 y 5 para que el enemigo responda
            var r = Phaser.Math.Between(1, 5);
            switch (r) {
                case 1:
                    this.events.emit('hurtPlayer', 1);
                    this.cameras.main.shake(50, .04, true);
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque medio', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 2:
                    this.events.emit('hurtPlayer', 1.5);
                    this.cameras.main.shake(50, .1, true);
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque fuerte', srtWait);
                    this.events.emit('playerSetRes', 1.2, 3);
                    elEnemigoAtaco = 0;
                    break;
                case 3:
                    this.events.emit('hurtPlayer', .5);
                    this.cameras.main.shake(50, .01, true);
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio un ataque débil', srtWait);
                    elEnemigoAtaco = 0;
                    break;
                case 4:
                    this.events.emit('healEnemy', Math.round(enemyStats.maxhp * 0.05));
                    this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse un poco', srtWait);
                    elEnemigoAtaco = 1;
                    break;
                case 5:
                    if (enemyStats.penal >= 1) {
                        this.events.emit('hurtPlayer', 1);
                        this.cameras.main.shake(50, .04, true);
                        this.registry.events.emit('accionDeCombate', 'El enemigo iba a curarse pero decidió atacar', srtWait);
                        elEnemigoAtaco = 0;
                    } else {
                        this.events.emit('healEnemy', Math.round(enemyStats.maxhp * 0.25));
                        this.events.emit('buffDmgEnemy', Math.round(enemyStats.atk * 0.5), 3);
                        this.events.emit('enemySetRes', 0.8, 4);
                        this.registry.events.emit('accionDeCombate', 'El enemigo escogio curarse mucho', srtWait);
                        enemyStats.penal = 10;
                        elEnemigoAtaco = 1;
                    }
                    break;
            };
        });

        //Modificadores de jugador
        this.events.on('healPlayer', (raw) => { //Para curar el jugador y evita que tenga más HP de la que debe
            playerStats.hp += raw;
            if (playerStats.hp >= playerStats.maxhp) {
                playerStats.hp = playerStats.maxhp;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('hurtPlayer', (multi) => {
            var outgoing = Math.round(multi * (enemyStats.atk + enemyStats.buffDmg)); //Obtiene un daño con un multiplicador más ataque y buffs
            outgoing = Math.round((outgoing - playerStats.def - playerStats.buffDef) * playerStats.res); //Multiplica por la resistencia del jugador
            if (outgoing <= 0) {
                outgoing = 1;
                console.log('El daño del enemigo era muy bajo!');
            };
            mirror = outgoing;
            playerStats.hp -= outgoing;
            if (playerStats.hp < 0) {
                playerStats.hp = 0;
            };
            this.events.emit('mostrarDmgAPlayer', outgoing);
            this.events.emit('actualizarBarras');
        });

        this.events.on('playerSetRes', (set, turns) => {  //Modificar la resistencia del jugador por los turnos indicados
            if (playerStats.resT > 0) {
                console.log('El jugador ya tiene modificaciones a su resistencia');
            } else {
                playerStats.res = set;
                playerStats.resT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('buffDmgPlayer', (buff, turns) => { //Añadir bonos de ataque al jugador por los turnos indicados
            if (playerStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff de daño activo');
            } else {
                playerStats.buffDmg = buff;
                playerStats.buffDmgT = turns;
            };
            this.events.emit('actualizarBarras');
        });

        this.events.on('buffDefPlayer', (buff, turns) => { //Añadir bonos de defensa al jugador por varios turnos
            if (playerStats.buffDefT > 0) {
                console.log('El jugador ya tiene un buff de defensa activo');
            } else {
                playerStats.buffDef = buff;
                playerStats.buffDefT = turns;
            };
            this.events.emit('actualizarBarras');
        });
        
        //Modificadores de enemigo
        this.events.on('healEnemy', (raw) => { //Curar al enemigo y evitar que se cure demás
            enemyStats.hp += raw;
            if (enemyStats.hp > enemyStats.maxhp) {
                enemyStats.hp = enemyStats.maxhp;
            };
            this.events.emit('actualizarBarras');
        });
        
        this.events.on('hurtEnemy', (multi) => { //Dañar al enemigo
            var incoming = Math.round(multi * (playerStats.atk + playerStats.buffDmg)); //Obtiene un daño con un multiplicador más ataque y buffs
            incoming = Math.round(incoming * enemyStats.res); //Multiplica por la resistencia del enemigo
            if (incoming <= 0) {
                incoming = 1;
                console.log('El daño del jugador era muy bajo!');
            };
            enemyStats.hp -= incoming;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            };
            this.events.emit('mostrarDmgAEnemy', incoming);
            this.events.emit('actualizarBarras');
        });

        this.events.on('hurtEnemyMirror', (raw) => { //Usado en el parry,
            enemyStats.hp -= raw;
            if (enemyStats.hp < 0) {
                enemyStats.hp = 0;
            };
            this.enemyDmg.setText(palParry + ' & -' + raw);
            this.BGEnemyDmg.setSize(this.enemyDmg.getBounds().width, this.enemyDmg.getBounds().height).setPosition(this.enemyDmg.getBounds().centerX,this.enemyDmg.getBounds().centerY).setOrigin(.5);
            this.events.emit('actualizarBarras');
        });

        this.events.on('enemySetRes', (set, turns) => { //Modificar la resistencia del enemigo por los turnos indicados
            if (enemyStats.resT > 0) {
                console.log('El enemigo ya tiene modificaciones a su resistencia');
            } else {
                enemyStats.res = set;
                enemyStats.resT = turns;
            };
        });

        this.events.on('buffDmgEnemy', (buff, turns) => { //Modificar los bonos de ataque por los turnos indicados
            if (enemyStats.buffDmgT > 0) {
                console.log('El jugador ya tiene un buff activo');
            } else {
                enemyStats.buffDmg = buff;
                enemyStats.buffDmgT = turns;
            };
        });

        //OTROS
        this.events.on('startTurn', (card) => { //Se ejecuta cada que se presiona una carta
            this.input.keyboard.enabled = false;
            this.events.emit('actualizarBarras');
            switch (card) {
                case 'card_strong':
                    card_strong.setTexture('card_strong', 1);
                break;
                case 'card_block':
                    card_block.setTexture('card_block', 1);
                break;
                case 'card_atk':
                    card_atk.setTexture('card_atk', 1);
                break;
                case 'card_rest':
                    card_rest.setTexture('card_rest', 1);
                break;
            }
        });

        this.events.on('nextTurn', () => { //Se ejecuta si nadie ha muerto y prepara el siguiente turno
            this.events.emit('resetCards');

            playerStats.buffDmgT -= 1;
            playerStats.buffDefT -= 1;
            playerStats.resT -= 1;
            enemyStats.resT -= 1;
            enemyStats.buffDmgT -= 1;
            enemyStats.penal -= 1;
            playerStats.penalHeal -= 1;

            //Reseta los buff si el contador llega a 0 y caduca los bonos.
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

            //Actualiza barras y permite el movimiento de nuevo
            this.events.emit('actualizarBarras');
            this.input.keyboard.enabled = true;
        });

        this.events.on('checkDeath', () => { //Checar la muerte, cada que se hace daño se verifica esto
            stillAlive = true;
            if (playerStats.hp == 0) {
                this.events.emit('gameOver', 0);
                stillAlive = false;
            };
            if (enemyStats.hp == 0) {
                this.events.emit('gameOver', 1);
                stillAlive = false;
            };
        });

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
        
        this.events.on('resetCards', ()=>{ //usado para regresar las cartas a su estado inactivo
            card_strong.setTexture('card_strong', 0);
            card_block.setTexture('card_block', 0);
            card_atk.setTexture('card_atk', 0);
            card_rest.setTexture('card_rest', 0);
        });

        this.events.on('gameOver', (v) => { //En caso de que el jugador o el enemigo lleguen a 0HP
            this.events.emit('resetCards');
            this.input.keyboard.enabled = false; //Desactivar teclado para evitar errores
            
            //Resetear las resistencias
            playerStats.res = 1.00;
            enemyStats.res = 1.00;
            playerStats.buffDmgT = 0;
            playerStats.buffDefT = 0;
            playerStats.resT = 0;
            enemyStats.resT = 0;
            enemyStats.buffDmgT = 0;
            enemyStats.penal = 0;
            playerStats.penalHeal = 0;

            switch (v) {
                case 0: /*Perdiste*/
                    this.registry.events.emit('accionDeCombate', 'Has perdido', lngWait);
                    fondo.setTexture('fondo', 2);
                    this.tweens.add({
                        targets:this.bgm,
                        duration:medWait,
                        volume: 0
                    });
                    //lo que se hace aquí es poner el texto "Has ganado" durante lngwait (revisen mas arriba)
                    this.time.delayedCall(medWait, ()=>{
                        this.bgm.stop();
                        this.input.keyboard.enabled = true;
                        this.registry.events.emit('transicionaoverworld');
                    }); //y una vez hayan pasado el tiempo, se reinicia
                    break;
                case 1: /*Ganaste*/
                    this.spriteEnemigo.setVisible(false);
                    this.registry.events.emit('accionDeCombate', '¡Has ganado!', lngWait);
                    this.registry.values.playerStats.xp += enemyStats.xp;
                    if(this.registry.values.playerStats.xp >= this.registry.values.playerStats.nxtlvl){
                        var lvlup = this.cache.json.get('lvlup');
                        this.registry.events.emit('accionDeCombate', '¡Has subido de nivel!',medWait);
                        this.time.delayedCall(srtWait, ()=>{
                            this.registry.values.playerStats.hp += lvlup.hp[Phaser.Math.Between(0, lvlup.hp.length - 1)];
                            this.registry.values.playerStats.atk += lvlup.atk[Phaser.Math.Between(0, lvlup.atk.length - 1)];
                            this.registry.values.playerStats.def += lvlup.def[Phaser.Math.Between(0, lvlup.def.length - 1)];
                            this.registry.values.playerStats.xp -= this.registry.values.playerStats.nxtlvl;
                            this.registry.values.playerStats.nxtlvl = Math.round(this.registry.values.playerStats.nxtlvl * 1.25);
                            this.registry.values.playerStats.lvl += 1; 
                            this.registry.events.emit('accionDeCombate', 
                            'Vida: ' + playerStats.maxhp + ' => ' + this.registry.values.playerStats.hp +
                            '\nAtaque: ' + playerStats.atk + ' => ' + this.registry.values.playerStats.atk +
                            '\nDefensa: ' + playerStats.def + ' => ' + this.registry.values.playerStats.def +
                            '\nXP actual: ' + this.registry.values.playerStats.xp +
                            '\nXP para el siguiente nivel: ' + this.registry.values.playerStats.nxtlvl,
                            lngWait*2
                            );
                        });
                        //aqui falta agregar las notificaciones correspondientes
                        this.time.delayedCall(medWait+lngWait*2.1, ()=>{
                            this.bgm.stop();
                            this.input.keyboard.enabled = true;
                            this.registry.events.emit('transicionaoverworld');
                        });
                    } else{
                        this.time.delayedCall(medWait, ()=>{
                            this.bgm.stop();
                            this.input.keyboard.enabled = true;
                            this.registry.events.emit('transicionaoverworld');
                        });
                    };
                    break;
            };
        });

        this.events.on('mostrarDmgAPlayer', (dmg)=>{
            this.adiosPlayerDmg.destroy();
            this.playerDmg.setText('-' + dmg).setVisible(true);
            this.BGPlayerDmg.setSize(this.playerDmg.getBounds().width, this.playerDmg.getBounds().height).setPosition(this.playerDmg.getBounds().centerX,this.playerDmg.getBounds().centerY).setOrigin(.5).setVisible(true);
            this.adiosPlayerDmg = this.time.delayedCall(srtWait - 400, ()=>{
                this.playerDmg.setVisible(false);
                this.BGPlayerDmg.setVisible(false);
            },[], this)
        });

        this.events.on('mostrarDmgAEnemy', (dmg)=>{
            palParry = '-' + dmg;
            this.adiosEnemyDmg.destroy();
            this.enemyDmg.setText('-' + dmg).setVisible(true);
            this.BGEnemyDmg.setSize(this.enemyDmg.getBounds().width, this.enemyDmg.getBounds().height).setPosition(this.enemyDmg.getBounds().centerX,this.enemyDmg.getBounds().centerY).setOrigin(.5).setVisible(true);
            this.adiosEnemyDmg = this.time.delayedCall(srtWait - 400, ()=>{
                this.enemyDmg.setVisible(false);
                this.BGEnemyDmg.setVisible(false);
            },[], this)
        });

        //control
        this.acc = this.input.keyboard.createCursorKeys();
        this.input.keyboard.enabled = false;//paso necesario para evitar overlap con Overworld


        //BOTONES DE ACCIÓN
        //Parry / ataque especial
        this.acc.right.on('down', () => {
            this.events.emit('startTurn', 'card_strong');
            this.events.emit('playerSetRes', 0.8, 1);
            this.registry.events.emit('accionDeCombate', 'Has intentado realizar un parry', srtWait);
            setTimeout(() => {
                this.events.emit('response');
                this.events.emit('checkDeath');
                if (stillAlive) {
                    setTimeout(() => {
                        if (elEnemigoAtaco != 1) { //Si el enemigo ataca se activa el ataque especial
                            mirror = Math.round(mirror * 2);
                            this.events.emit('hurtEnemy', 1);
                            this.events.emit('hurtEnemyMirror', mirror);
                            this.cameras.main.shake(50, .08, true);
                            this.registry.events.emit('accionDeCombate', 'Has ejecutado un parry exitosamente', medWait);
                        } else { //Aqui fallo
                            playerStats.hp -= Math.round(playerStats.maxhp * 0.25);
                            if (playerStats.hp < 0) { //La vida es restada directamente, por lo que este paso es necesario para regresarlo a 0
                                playerStats.hp = 0;
                            };
                            this.events.emit('actualizarBarras');
                            this.events.emit('setPlayerRes', 1.1, 3);
                            this.cameras.main.shake(50, .08, true);
                            this.events.emit('mostrarDmgAPlayer', Math.round(playerStats.maxhp * 0.25));
                            this.registry.events.emit('accionDeCombate', 'Has fallado el parry', medWait);
                        };
                        this.events.emit('checkDeath'); 
                        if (stillAlive) { //Si nadie murio se ejecuta esta parte
                            this.events.emit('nextTurn');
                        };
                    }, srtWait);
                };
            }, srtWait);
        });

        //Bloquear
        this.acc.left.on('down', () => {
            this.events.emit('startTurn', 'card_block');
            this.events.emit('playerSetRes', 0.5, 1);
            this.registry.events.emit('accionDeCombate', 'Has decidido hacer un bloqueo', srtWait);
            setTimeout(() => {
                this.events.emit('response');
                this.events.emit('checkDeath');
                if (stillAlive) { //Si nadie murio se ejecuta esta parte
                    if (elEnemigoAtaco == 1) {
                        this.events.emit('buffDefPlayer', Math.round(playerStats.def * .75), 6);
                        console.log('El enemigo no ataco por lo que te aumento la defensa');
                    } else {
                        this.events.emit('buffDefPlayer', Math.round(playerStats.def * .25), 3);
                    };
                    this.events.emit('nextTurn');
                };
            }, srtWait);
        });

        //Ataque básico
        this.acc.up.on('down', () => {
            this.events.emit('startTurn', 'card_atk');
            this.registry.events.emit('accionDeCombate', 'Has decidido atacar', srtWait);
            this.events.emit('hurtEnemy', 1);
            this.cameras.main.shake(50, .03, true);
            setTimeout(() => {
                this.events.emit('checkDeath');
                if (stillAlive) { //Si nadie murio se ejecuta esta parte
                    this.events.emit('response');
                    this.events.emit('checkDeath');
                    if (stillAlive) { //Si nadie murio en lo anterior se ejecuta esta parte
                        this.events.emit('nextTurn');
                    };
                };
            }, srtWait);
        });

        //Descansar y buffear
        this.acc.down.on('down', () => {
            this.events.emit('startTurn', 'card_rest');
            if (playerStats.hp < (playerStats.maxhp * 0.5)) { //Usa supercuración si esta bajo de vida, si ya uso una supercuración cura menos hasta que la penalización termine
                if (playerStats.penalHeal > 1) { //Checa si esta penalizado actualmente
                    this.events.emit('healPlayer', Math.round(playerStats.maxhp * .2));
                    this.registry.events.emit('accionDeCombate', 'Te curas tantito', srtWait);
                    console.log('El jugador uso un superheal recientemente');
                } else { //Aqui hace la supercuración
                    this.events.emit('healPlayer', Math.round(playerStats.maxhp * .4));
                    this.registry.events.emit('accionDeCombate', 'Te curas mucho', srtWait);
                    playerStats.penalHeal = 8;
                };
            } else { //Cura poquito y da bonos si no esta bajo de vida
                this.events.emit('healPlayer', Math.round(playerStats.maxhp * .1));
                this.events.emit('playerSetRes', 0.75, 2);
                this.events.emit('buffDmgPlayer', Math.round(playerStats.atk * 0.75), 2);
                this.registry.events.emit('accionDeCombate', 'Canalizas tu fuerza', srtWait);
            };
            setTimeout(() => {
                this.events.emit('response');
                this.events.emit('checkDeath');
                if (stillAlive) { //Si nadie murio se ejecuta esta parte
                    this.events.emit('nextTurn');
                };
            }, srtWait);
        });


        //asignación de estadisticas al enemigo y jugador
        this.events.on('comenzarBatalla', () => {
            playerStats.maxhp = this.registry.values.playerStats.hp;
            playerStats.hp = playerStats.maxhp
            playerStats.atk = this.registry.values.playerStats.atk;
            playerStats.def = this.registry.values.playerStats.def;
            console.log('El nivel del jugador es: ' + this.registry.values.playerStats.lvl);
            //esta webada es para poner enemigos de acuerdo al nivel del jugador
            if (this.registry.values.playerStats.lvl <= 9) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(1, 2));
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.hp = enemyStats.maxhp;
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.xp = Phaser.Math.Between(this.enemyLoader.xp[0], this.enemyLoader.xp[1])
                console.log(enemyStats);
            } else{ //if (this.registry.values.playerStats.lvl == 2) {
                this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(3, 4));
                enemyStats.nombre = this.enemyLoader.nombre;
                enemyStats.maxhp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
                enemyStats.hp = enemyStats.maxhp;
                enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
                enemyStats.xp = Phaser.Math.Between(this.enemyLoader.xp[0], this.enemyLoader.xp[1])
                console.log(enemyStats);
            };
            //para que no se vea mal necesitaremos sprites del mismo tamaño, se pueden redimensionar estos no?
            this.spriteEnemigo = this.add.sprite(249,143, this.enemyLoader.nombre);
            this.spriteEnemigo.anims.play('stall' + this.enemyLoader.nombre);
            this.bgm = this.sound.add('BGMCombateNormal',{loop:true, volume:VOLUMEN});
        });

        //impresion de las estadisticas del jugador y enemigo
        this.BGPlayerStats = this.add.rectangle(0, 305, 0, 0, 0xaaaaaa, .5).setOrigin(0);
        this.txtPlayerstats = this.add.text(0, 305,
            'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
            '\nAtaque: ' + playerStats.atk + '(+' + playerStats.buffDmg + ')' +
            '\nDefensa: ' + playerStats.def + '(+' + playerStats.buffDef + ')' +
            '\nResistencia: ' + (playerStats.res * -100 + 100) + '%',
            {
                color: 'black', padding: { bottom: 2 }
            });
        this.BGPlayerStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)

        this.BGEnemyStats = this.add.rectangle(0, 0, 0, 0, 0xaaaaaa, .5).setOrigin(0);
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
            this.inicioCombate.play();
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
            this.time.delayedCall(300,()=>{
                this.bgm.play();
            });
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
