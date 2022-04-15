let dialogo;
let textoAMostrar;
export default class cajaDeDialogos extends Phaser.Scene{
    constructor(){
        super({key: 'cajaDeDialogos'});
    }

    preload(){
        this.load.json('NPC1', './assets/overworld/dialogos/dialogosnpc1.json');
        this.load.json('NPC2', './assets/overworld/dialogos/dialogosnpc2.json');
    }

    create(){
        dialogo = this.add.text(0,0, 'placeholder', {
            fontSize: '15px',
            backgroundColor: '#fff',
            color:'#000',
            padding:{
                bottom: 5,
            }
        }).setVisible(false);
        this.ok = this.input.keyboard.addKey('X');

        this.registry.events.on('dialogar', (numeroNPC, FT)=>{
            this.scene.wake(this);
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC);
            if (FT){
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]).setVisible(true);
            }else{
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[Phaser.Math.Between(1,textoAMostrar.dialogo.length-1)]).setVisible(true);
            }
            
            this.scene.pause('overworld');
        })
    }

    update(time,delta){
        if(this.ok.isDown){
            dialogo.setVisible(false);
            this.scene.resume('overworld');
            this.scene.sleep(this);
        }
    }
}