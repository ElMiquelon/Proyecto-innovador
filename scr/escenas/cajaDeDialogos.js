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
        this.caja = this.add.rectangle(0, 380, this.sys.game.config.width, 100, 0xaaaaaa, .35).setOrigin(0,0);
        dialogo = this.add.text(this.caja.getBounds().x, this.caja.getBounds().y, 'placeholder', {
            fontSize: '15px',
            color:'#000',
            padding:{
                bottom: 2
            }
        });
        this.desaparece = this.time.delayedCall();
        this.ok = this.input.keyboard.addKey('X');
        this.ok.on('down', ()=>{
            this.scene.resume('overworld');
            this.scene.sleep(this);
        });

        this.registry.events.on('dialogar', (numeroNPC, FT)=>{
            this.scene.wake(this);
            this.sound.play('sonidoNPC' + numeroNPC);
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC);
            if (FT){
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);
            }else{
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[Phaser.Math.Between(1,textoAMostrar.dialogo.length-1)]);
            };
            this.scene.pause('overworld');
        });

        this.registry.events.on('aviso', (texto)=>{
            this.scene.wake(this);
            this.desaparece.destroy();
            dialogo.setText(texto);
            this.desaparece = this.time.delayedCall(800, ()=>{
                this.scene.sleep(this);
            })
        });
    }
}