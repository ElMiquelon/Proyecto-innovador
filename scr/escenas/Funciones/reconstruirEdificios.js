import edificioAP0 from "../edificios/edificioAP0";
import edificioAP1 from "../edificios/edificioAP1";
import edificioEP0 from "../edificios/edificioEP0";
import edificioEP1 from "../edificios/edificioEP1";
export default class reconstruirEdificios extends Phaser.Scene{
    constructor(){
        super({key:'reconstruirEdificios'});
    }

    create(){
        this.registry.events.on('reconstruccionA', ()=>{
            this.scene.add('edificioAP0', new edificioAP0);
            this.scene.add('edificioAP1', new edificioAP1);
            this.scene.moveAbove('edificioAP0', 'cajaDeDialogos').moveAbove('edificioAP1', 'cajaDeDialogos');
            this.scene.moveAbove('edificioAP0', 'transicionACombate').moveAbove('edificioAP1', 'transicionACombate')
        });

        //jaja al final por como funciona phaser, el script también destruirá edificios
        this.registry.events.on('destruccionedificioAP0', ()=>{/*se debera seguir esa nomenclatura para nombrar
            los demas eventos de destrucción */
            this.scene.remove('edificioAP1');
        });

        this.registry.events.on('reconstruccionE'/*Cuiden las tildes, no las pongan*/, ()=>{
            this.scene.add('edificioEP0', new edificioEP0);
            this.scene.add('edificioEP1', new edificioEP1);
            this.scene.moveAbove('edificioEP0', 'cajaDeDialogos').moveAbove('edificioEP1', 'cajaDeDialogos');
            this.scene.moveAbove('edificioEP0', 'transicionACombate').moveAbove('edificioEP1', 'transicionACombate');
            console.log('lo hizo')
        })
    }
}