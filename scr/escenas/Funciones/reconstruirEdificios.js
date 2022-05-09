import edificioAP0 from "../edificios/edificioAP0";
import edificioAP1 from "../edificios/edificioAP1";
import edificioDP0 from "../edificios/edificioDP0";
import edificioDP1 from "../edificios/edificioDP1";
import edificioDP2 from "../edificios/edificioDP2";
import edificioEP0 from "../edificios/edificioEP0";
import edificioEP1 from "../edificios/edificioEP1";
import edificioEP2 from "../edificios/edificioEP2";
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

        this.registry.events.on('reconstruccionD'/*Cuiden las tildes, no las pongan*/, ()=>{
            this.scene.add('edificioDP0', new edificioDP0);
            this.scene.add('edificioDP1', new edificioDP1);
            this.scene.add('edificioDP2', new edificioDP2);
            this.scene.moveAbove('edificioDP0', 'cajaDeDialogos').moveAbove('edificioDP1', 'cajaDeDialogos').moveAbove('edificioDP2', 'cajaDeDialogos');
            this.scene.moveAbove('edificioDP0', 'transicionACombate').moveAbove('edificioDP1', 'transicionACombate').moveAbove('edificioDP2', 'transicionACombate');
        });

        this.registry.events.on('destruccionedificioDP0', ()=>{
            this.scene.remove('edificioDP1');
            this.scene.remove('edificioDP2');
        });

        this.registry.events.on('reconstruccionE'/*Cuiden las tildes, no las pongan*/, ()=>{
            this.scene.add('edificioEP0', new edificioEP0);
            this.scene.add('edificioEP1', new edificioEP1);
            this.scene.add('edificioEP2', new edificioEP2);
            this.scene.moveAbove('edificioEP0', 'cajaDeDialogos').moveAbove('edificioEP1', 'cajaDeDialogos').moveAbove('edificioEP2', 'cajaDeDialogos');
            this.scene.moveAbove('edificioEP0', 'transicionACombate').moveAbove('edificioEP1', 'transicionACombate').moveAbove('edificioEP2', 'transicionACombate');
        });

        this.registry.events.on('destruccionedificioEP0', ()=>{
            this.scene.remove('edificioEP1');
            this.scene.remove('edificioEP2');
        });
    }
}