import salon from "../edificios/salon";
import edificioAP0 from "../edificios/edificioAP0";
import edificioAP1 from "../edificios/edificioAP1";
import edificioCP0 from "../edificios/edificioCP0";
import edificioDP0 from "../edificios/edificioDP0";
import edificioDP1 from "../edificios/edificioDP1";
import edificioDP2 from "../edificios/edificioDP2";
import edificioEP0 from "../edificios/edificioEP0";
import edificioEP1 from "../edificios/edificioEP1";
import edificioEP2 from "../edificios/edificioEP2";
import edificioFP0 from "../edificios/edificioFP0";
import edificioFP1 from "../edificios/edificioFP1";
import edificioFP2 from "../edificios/edificioFP2";
export default class reconstruirEdificios extends Phaser.Scene{
    constructor(){
        super({key:'reconstruirEdificios'});
    }

    create(){
        this.registry.events.on('reconstruccionsalon', ()=>{
            this.scene.add('salon', new salon);
            this.scene.moveAbove('salon', 'cajaDeDialogos');
            this.scene.moveAbove('salon', 'transicionACombate');
        });
        
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

        this.registry.events.on('reconstruccionC', ()=>{
            this.scene.add('edificioCP0', new edificioCP0);
            //this.scene.add('edificioAP1', new edificioAP1);
            this.scene.moveAbove('edificioCP0', 'cajaDeDialogos')//.moveAbove('edificioAP1', 'cajaDeDialogos');
            this.scene.moveAbove('edificioCP0', 'transicionACombate')//.moveAbove('edificioAP1', 'transicionACombate')
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

        this.registry.events.on('reconstruccionF'/*Cuiden las tildes, no las pongan*/, ()=>{
            this.scene.add('edificioFP0', new edificioFP0);
            this.scene.add('edificioFP1', new edificioFP1);
            this.scene.add('edificioFP2', new edificioFP2);
            this.scene.moveAbove('edificioFP0', 'cajaDeDialogos').moveAbove('edificioFP1', 'cajaDeDialogos').moveAbove('edificioFP2', 'cajaDeDialogos');
            this.scene.moveAbove('edificioFP0', 'transicionACombate').moveAbove('edificioFP1', 'transicionACombate').moveAbove('edificioFP2', 'transicionACombate');
        });

        this.registry.events.on('destruccionedificioFP0', ()=>{
            this.scene.remove('edificioFP1');
            this.scene.remove('edificioFP2');
        });
    }
}