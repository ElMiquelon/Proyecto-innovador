export default class combateDialogos extends Phaser.Scene{
    constructor(){
        super({key:'combateDialogos'});
    };

    create(){
        this.pausa = this.time.delayedCall();
        this.BGaccion = this.add.rectangle(250,270,0,0,0xaaaaaa, .4);
        this.accion = this.add.text(250,270,'a eaeaea moviendo la cadera',{color:'black', padding:{bottom:2}}).setOrigin(.5);
        this.registry.events.on('accionDeCombate', (laAccion, duracion)=>{
            this.pausa.destroy();
            //this.scene.pause('combate');
            this.scene.wake(this);
            this.accion.setText(laAccion);
            this.BGaccion.setSize(this.accion.getBounds().width, this.accion.getBounds().height).setPosition(250,270).setOrigin(.5);
            this.pausa = this.time.delayedCall(duracion, ()=>{
                this.scene.sleep(this)
                //this.scene.resume('combate');
            }, [], this);
        });

    }
}