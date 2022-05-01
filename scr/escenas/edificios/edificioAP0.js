export default class edificioAP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioAP0'});
    }

    create(){
         //detalles de la camara, limites del mundo
         this.camara = this.cameras.main.setBounds(0,0,300,50);
         //this.cameras.main.setZoom(.7); esta madre es mas que nada de debug
         this.add.image(0,0, 'AP0').setOrigin(0,0);
         this.physics.world.setBounds(0,0,2000,2000);
    }
}