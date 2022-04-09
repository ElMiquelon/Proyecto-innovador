import playerW from "../Jugador/jugadorMA";
import NPC from "../NPCMA/NPC";
export default class poliprueba extends Phaser.Scene{
    constructor(){
        super({key:'poliprueba'});
    }

    preload(){
        this.load.image('polibg', './assets/overworld/edificios/poliprueba.JPG');
        this.load.spritesheet("playersprite", "./assets/overworld/player_sprites_chidos.png", {frameWidth:24, frameHeight:32});
    }

    create(){
        this.add.image(0,0,'polibg').setOrigin(0,0);
        this.player = new playerW(this, 0,0,'playersprite').setOrigin(0,0);
        console.log('la posicion es:' + this.player.getBounds().x + ' + ' + this.player.getBounds().y)
        this.registry.events.on('comenzarPoliPrueba', (ejeX, ejeY) =>{
            this.scene.sleep('juego');
            console.log('el evento se ejecutará');
            this.player.setPosition(ejeX, ejeY);
            console.log('la posicion deberia ser:' + this.player.getBounds().x + ' + ' + this.player.getBounds().y);
            this.scene.wake(this);
        });

        this.movimiento = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        this.player.body.setVelocity(0);
        if(this.movimiento.right.isDown){
            this.player.body.setVelocityX(10);
        }else if(this.movimiento.shift.isDown){
            this.scene.switch('juego');
        }
    }
}