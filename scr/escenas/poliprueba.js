import playerW from "../Jugador/jugadorMA";
import NPC from "../NPCMA/NPC";
import cajadialogos from "../NPCMA/cajadialogos";
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

        
    }

    update(time, delta){

    }
}