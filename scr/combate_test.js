var card_atk;
var card_block;
var card_rest;
var card_strong;

var playerStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00,
    buffDmg: 0,
    buffMaxhp: 0,
    buffDef: 0
};

var enemyStats = {
    maxhp: 100,
    hp: 100,
    atk: 7,
    def: 5,
    res: 1.00,
    nombre: 'elpepe'
};

var Combate = {
    healPlayer : function(raw){
        playerStats.hp += raw;
        if (playerStats.hp >= playerStats.hp){
            playerStats.hp = playerStats.maxhp;
        }
    },
    hurtPlayer : function(multi){
        var outgoing = Math.round(multi * enemyStats.atk * enemyStats.buffDmg)
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
        enemyStats.hp -= incoming ;
        if (enemyStats.hp < 0){
            enemyStats.hp = 0;
        }
    },
    response : function(x, y){
        var r = Phaser.Math.Between(x,y);
        switch (r) {
            case 1:
                this.hurtPlayer(1);
                break;
            case 2:
                this.hurtPlayer(1.5);
                break;
            case 3:
                this.hurtPlayer(0.5);
                break;
            case 4:
                this.healEnemy(5);
                break;
            case 5:
                this.healEnemy(10);
                break;
            default:
                break;
        }
    }
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
    
    
    this.load.json('enemigo1', './assets/combate/estadisticas/enemigo1.json');
    this.load.json('enemigo2', './assets/combate/estadisticas/enemigo2.json');
    this.load.json('enemigo3', './assets/combate/estadisticas/enemigo3.json');
    this.load.json('enemigo4', './assets/combate/estadisticas/enemigo4.json');
}

create(){
    //detalles del tamaño del mundo (los tamaños son iguales a los de la imagen)
    this.cameras.main.setBounds(0, 0, 500 , 480);
    this.physics.world.setBounds(0, 0, 500, 480);
    this.add.image(0, 0, 'map').setOrigin(0);

    //jugador
    /*var x = new PlayerStats(combate_test, 50, 50, "player_c", 100, 7, 5, 1.00);*/

    //cartas
    card_strong = this.add.sprite(310, 400, 'card_strong').setOrigin(0.5);
    card_block = this.add.sprite(190, 400, 'card_block').setOrigin(0.5);
    card_atk = this.add.sprite(250, 350, 'card_atk').setOrigin(0.5);
    card_rest = this.add.sprite(250, 450, 'card_rest').setOrigin(0.5);

    //control
    this.acc = this.input.keyboard.createCursorKeys();


    //estos se imrpimen en la escena equivocada aaaa
    this.acc.right.on('down', () => {
        Combate.hurtEnemy(1.5);
        console.log('Vida enemigo = ' + enemyStats.hp);
        Combate.response(1,5);
    });
    this.acc.left.on('down', () => {
        Combate.hurtEnemy(0.5);
        console.log('Vida enemigo = ' + enemyStats.hp);
    });
    this.acc.up.on('down', () => {
        Combate.hurtEnemy(1);
        console.log('Vida enemigo = ' + enemyStats.hp);
    });
    this.acc.down.on('down', () => {
        Combate.healPlayer(10);
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
            enemyStats.def = this.enemyLoader.def[Phaser.Math.Between(0, this.enemyLoader.def.length - 1)];
            enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];            
            console.log(enemyStats);
        }else if(playerLVL == 2){
            this.enemyLoader = this.cache.json.get('enemigo' + Phaser.Math.Between(3,4));
            enemyStats.nombre = this.enemyLoader.nombre;
            enemyStats.maxhp = this.enemyLoader.maxhp[Phaser.Math.Between(0, this.enemyLoader.maxhp.length - 1)];
            enemyStats.hp = this.enemyLoader.hp[Phaser.Math.Between(0, this.enemyLoader.hp.length - 1)];
            enemyStats.atk = this.enemyLoader.atk[Phaser.Math.Between(0, this.enemyLoader.atk.length - 1)];
            enemyStats.def = this.enemyLoader.def[Phaser.Math.Between(0, this.enemyLoader.def.length - 1)];
            enemyStats.res = this.enemyLoader.res[Phaser.Math.Between(0, this.enemyLoader.res.length - 1)];
            console.log(enemyStats); 
        }
    });
}

update(time, delta){
    card_strong.setTexture('card_strong', 0)
    card_block.setTexture('card_block', 0)
    card_atk.setTexture('card_atk', 0)
    card_rest.setTexture('card_rest', 0)
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
