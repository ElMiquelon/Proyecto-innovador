import edificioAP0 from "../edificios/edificioAP0";
import edificioAP1 from "../edificios/edificioAP1";
export default class reconstruirEdificios extends Phaser.Scene{
    constructor(){
        super({key:'reconstruirEdificios'});
    }

    create(){
        this.registry.events.on('reconstruccionA', ()=>{
            this.scene.add('edificioAP0', new edificioAP0);
            this.scene.add('edificioAP1', new edificioAP1);
            this.scene.moveAbove('edificioAP0', 'cajaDeDialogos').moveAbove('edificioAP1', 'cajaDeDialogos');
        });
    }
}