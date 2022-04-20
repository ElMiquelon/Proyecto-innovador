var card_atk;
var card_block;
var card_rest;
var card_strong;
var enemyHealthbar;
var t = 0;
var mirror = 0;
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

var Combate = {
    healPlayer : function(raw){
        playerStats.hp += raw;
        if (playerStats.hp >= playerStats.hp){
            playerStats.hp = playerStats.maxhp;
        }
    },
    hurtPlayer : function(multi){
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
        if (playerStats.hp < 0){
            playerStats.hp = 0;
        }
    },
    healEnemy: function(raw){
        enemyStats.hp += raw;
        if (enemyStats.hp > enemyStats.maxhp){
            enemyStats.hp = enemyStats.maxhp;
        }
    },
    hurtEnemy: function(multi){
        var incoming = Math.round(multi * playerStats.atk);
        if (playerStats.buffDmg > 0) {
            incoming += playerStats.buffDmg;
        }
        if (incoming <= 0) {
            incoming = 1;
            console.log('El daño del jugador era muy bajo!');
        }
        enemyStats.hp -= incoming ;
        if (enemyStats.hp < 0){
            enemyStats.hp = 0;
        }
    },
    hurtEnemyMirror: function(raw){
        enemyStats.hp -= raw;
        if (enemyStats.hp < 0){
            enemyStats.hp = 0;
        }
    },
    response : function(){
        var r = Phaser.Math.Between(1,5);
        switch (r) {
            case 1:
                this.hurtPlayer(1);
                console.log('El enemigo escogio un ataque medio');
                return 0;
            case 2:
                this.hurtPlayer(1.5);
                console.log('El enemigo escogio un ataque fuerte');
                return 0;
            case 3:
                this.hurtPlayer(0.5);
                console.log('El enemigo escogio un ataque débil');
                return 0;
            case 4:
                this.healEnemy(5);
                console.log('El enemigo escogio curarse un poco');
                return 1;
            case 5:
                if (enemyStats.penal >= 1) {
                    this.hurtPlayer(1);
                    console.log('El enemigo iba a curarse pero decidió no hacerlo');
                } else {
                    this.healEnemy(10);
                    Combate.buffDmgEnemy(5, 1);
                    console.log('El enemigo escogio curarse mucho');
                    enemyStats.penal += 5;
                    return 1;
                }
                break;
            default:
                break;
        }
    },
    gameOver : function(v){
        switch (v) {
            case 0: /*Perdiste*/
                console.log('Perdiste');
                break;
            case 1: /*Ganaste*/
                console.log('Ganaste');
                this.scene
                break;
            default:
                break;
        }
    },
    nextTurn : function(){
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
    },
    buffDmgPlayer : function(buff, turns) {
        if (playerStats.buffDmgT > 0) {
            console.log('El jugador ya tiene un buff de daño activo');
        } else {
            playerStats.buffDmg = buff;
            playerStats.buffDmgT = turns;
        }
    },
    buffDefPlayer : function(buff, turns) {
        if (playerStats.buffDefT > 0) {
            console.log('El jugador ya tiene un buff de defensa activo');
        } else {
            playerStats.buffDef = buff;
            playerStats.buffDefT = turns;
        }
    },
    buffDmgEnemy : function(buff, turns) {
        if (enemyStats.buffDmgT > 0) {
            console.log('El jugador ya tiene un buff activo');
        } else {
            enemyStats.buffDmg = buff;
            enemyStats.buffDmgT = turns;
        }
    },
};


export default class combate_test extends Phaser.Scene{

constructor(){
    super({key: "combate_test"});
}

preload(){
    this.load.image("map", "./assets/combate/mapa_c.png");
    this.load.image("player_c", "./assets/combate/player_c.png");
    this.load.image("enemy_c", "./assets/combate/pew.png");
    this.load.spritesheet("card_atk", "./assets/combate/card_atk.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_block", "./assets/combate/card_block.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_rest", "./assets/combate/card_rest.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("card_strong", "./assets/combate/card_strong.png", {frameWidth: 50, frameHeight: 70});
    this.load.spritesheet("healthbar", "./assets/combate/healthbar.png", {frameWidth: 100, frameHeight: 10});
    
    
    this.load.json('enemigo1', './assets/combate/estadisticas/enemigo1.json');
    this.load.json('enemigo2', './assets/combate/estadisticas/enemigo2.json');
    this.load.json('enemigo3', './assets/combate/estadisticas/enemigo3.json');
    this.load.json('enemigo4', './assets/combate/estadisticas/enemigo4.json');

    this.scene.add('combateDialogos', new combateDialogos)
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    //this.cameras.main.setBounds(0, 0, 500 , 480); no veo necesaria la camara aquí
    //this.physics.world.setBounds(0, 0, 500, 480); ni el set bounds
    this.add.image(0, 0, 'map').setOrigin(0);

    this.scene.launch('combateDialogos').sleep('combateDialogos');

    //jugador
    /*var x = new PlayerStats(combate_test, 50, 50, "player_c", 100, 7, 5, 1.00);*/

    //barra de vida
    enemyHealthbar = this.add.sprite(20, 50, 'healthbar').setOrigin(0);

    //cartas
    card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
    card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
    card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
    card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

    //control
    this.acc = this.input.keyboard.createCursorKeys();


    //estos se imrpimen en la escena equivocada aaaa
    this.acc.right.on('down', () => {
        card_strong.setTexture('card_strong', 1);
        playerStats.res = 0.8;
        this.registry.events.emit('accionDeCombate', 'Has intentado realizar un parry');
        setTimeout(() => {
            if (enemyStats.hp > 0) {
                var x = Combate.response();
                if (x != 1) {
                    mirror = Math.round(mirror * 0.5);
                    Combate.hurtEnemy(0.5);
                    Combate.hurtEnemyMirror(mirror);
                    this.registry.events.emit('accionDeCombate', 'Has ejecutado un parry exitosamente');
                    console.log('Vida enemigo = ' + enemyStats.hp);
                } else {
                    playerStats.hp -= 5;
                    this.registry.events.emit('accionDeCombate', 'Has fallado el parry');
                    console.log('Vida jugador = ' + playerStats.hp);
                }
            } else {
                Combate.gameOver(1);
            };
            if (playerStats.hp > 0) {
                Combate.nextTurn();
            } else {
                Combate.gameOver(0);
            };
        }, 1500);//el tiempo debe de ser equivalente al timer de combateDialogos
        
    });
    this.acc.left.on('down', () => {
        playerStats.res = 0.1;
        card_block.setTexture('card_block', 1);
        this.registry.events.emit('accionDeCombate', 'Has elejido hacer un bloqueo');
        if (enemyStats.hp > 0) {
            var x = Combate.response();
            if (x != 1) {
                Combate.buffDefPlayer(10,1);
            }
        } else {
            Combate.gameOver(1);
        };
        if (playerStats.hp > 0) {
            Combate.nextTurn();
        } else {
            Combate.gameOver(0);
        };
        console.log('Vida enemigo = ' + enemyStats.hp);

    });
    this.acc.up.on('down', () => {
        card_atk.setTexture('card_atk', 1);
        this.registry.events.emit('accionDeCombate', 'Has decidido atacar');
        Combate.hurtEnemy(1);
        console.log('Vida enemigo = ' + enemyStats.hp);
        if (enemyStats.hp > 0) {
            Combate.response();
        } else {
            Combate.gameOver(1);
        };
        if (playerStats.hp > 0) {
            Combate.nextTurn();
        } else {
            Combate.gameOver(0);
        };
    });
    this.acc.down.on('down', () => {
        card_rest.setTexture('card_rest', 1);
        this.registry.events.emit('accionDeCombate', 'Has decidido curarte');
        Combate.healPlayer(10);
        playerStats.res = 0.3;
        Combate.buffDmgPlayer(5,1);
        Combate.buffDefPlayer(5, 1);
        if (enemyStats.hp > 0) {
            Combate.response();
        } else {
            Combate.gameOver(1);
        };
        if (playerStats.hp > 0) {
            Combate.nextTurn();
        } else {
            Combate.gameOver(0);
        };
        console.log('Vida = ' + playerStats.hp);
    });


    //asignación de estadisticas al enemigo
    this.registry.events.on('comenzarBatalla', (playerLVL)=>{
        //esta webada podria servir para poner enemigos de acuerdo al nivel del jugador
        this.scene.wake(this);
        this.scene.stop('menup');
        console.log('El nivel del jugador es: ' + playerLVL);
        if (playerLVL == 1){
            this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(1,2));/*nosotros tendremos que decir "a, los enemigos desde 
            x a y serán para tal nivel de jugador" y los pondremos dentro del between. voy a testar con el lvl1*/
            enemyStats.nombre = this.enemyLoader.nombre;
            enemyStats.maxhp = this.enemyLoader.maxhp[Phaser.Math.Between(0, this.enemyLoader.maxhp.length - 1)];
            enemyStats.hp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
            enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
            enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];            
            console.log(enemyStats);
        }else if(playerLVL == 2){
            this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(3,4));
            enemyStats.nombre = this.enemyLoader.nombre;
            enemyStats.maxhp = this.enemyLoader.maxhp[Phaser.Math.Between(0, this.enemyLoader.maxhp.length - 1)];
            enemyStats.hp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
            enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
            enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
            console.log(enemyStats); 
        }
    });

    //impresion de las estadisticas del jugador y enemigo
    this.BGPlayerStats = this.add.rectangle(0,305,0,0, 0xaaaaaa, .4).setOrigin(0);
    this.txtPlayerstats = this.add.text(0,305,
        'Vida: ' + playerStats.hp + ' / ' + playerStats.maxhp +
        '\nAtaque: ' + playerStats.atk + 
        '\nDefensa: ' + playerStats.def + 
        '\nResistencia: ' + playerStats.res, 
        {color:'black', padding:{bottom:2}
    }); 
    this.BGPlayerStats.setSize(this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)
    
    
    this.BGEnemyStats = this.add.rectangle(0,0,0,0, 0xaaaaaa, .4).setOrigin(0);
    this.txtEnemyStats = this.add.text(0,0,
        'Vida: ' + enemyStats.hp +  ' / ' + enemyStats.maxhp +
        '\nAtaque: ' + enemyStats.atk +  
        '\nResistencia: ' + enemyStats.res, 
        {color:'black', padding:{bottom:2}
    }); 
    this.BGEnemyStats.setSize( this.txtPlayerstats.getBounds().width, this.txtPlayerstats.getBounds().height)
}

update(time, delta){
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
    }else if (enemyStats.hp >= (enemyStats.maxhp * 0.3)) {
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
    
    if (this.acc.right.isDown){
        card_strong.setTexture('card_strong', 1)
    }else if (this.acc.left.isDown){
        card_block.setTexture('card_block', 1)
    }else if (this.acc.up.isDown){
        card_atk.setTexture('card_atk', 1)
    }else if (this.acc.down.isDown){
        card_rest.setTexture('card_rest', 1)
    }
}
}
