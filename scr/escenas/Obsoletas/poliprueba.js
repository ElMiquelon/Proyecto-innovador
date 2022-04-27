import playerW from "./Jugador/jugadorMA";
import NPC from "./NPCMA/NPC";
export default class poliprueba extends Phaser.Scene{
    constructor(){
        super({key:'poliprueba'});
    }

    preload(){
        }

    create(){
        this.add.image(0,0,'polibg').setOrigin(0,0);
        this.warZone /*e la referencia*/ = this.add.zone(30, 50, 300, 300);
        this.physics.world.enable(this.warZone);
        
        this.player = new playerW(this, 0,0,'playersprite').setOrigin(0,0);
        console.log('la posicion es:' + this.player.getBounds().x + ' + ' + this.player.getBounds().y)
        this.registry.events.on('comenzarPoliPrueba', (ejeX, ejeY) =>{
            this.scene.sleep('juego');
            console.log('el evento se ejecutará');
            this.player.setPosition(ejeX, ejeY);
            console.log('la posicion deberia ser:' + this.player.getBounds().x + ' + ' + this.player.getBounds().y);
            this.scene.wake(this);
        });
        this.physics.add.overlap(this.player, this.warZone);
        this.movimiento = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        this.player.body.setVelocity(0);

        if(!this.warZone.body.touching.none){
            if(Phaser.Math.Between(0,500) <= 2){
                this.scene.switch('combate_test');
            }
        }
        if(this.movimiento.right.isDown){
            this.player.body.setVelocityX(100);
            this.player.anims.play('right_walk',true);
        }else if(this.movimiento.left.isDown){
            this.player.body.setVelocityX(-100);
        }else if(this.movimiento.up.isDown){
            this.player.body.setVelocityY(-100);
        }else if(this.movimiento.down.isDown){
            this.player.body.setVelocityY(100);
        }else{
            this.player.anims.pause();
        }

        if(this.movimiento.shift.isDown){
            this.scene.switch('juego');
        }
    }
}