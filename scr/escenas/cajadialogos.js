//a partir de la creacion de cajaDeDialogos.js, este script es inutil. 
let basedialogos;
export default class cajadialogos extends Phaser.Scene{
    constructor (){
        super({key: 'cajadialogos'});
    }

    preload(){
        console.log('textos listos');
    }

    create(){
        //aqui se define la caja de texto, aspectos esteticos para luego
        basedialogos = this.add.text(0,0,'sample text xdxdxdddd',{
            color:'#000',
            backgroundColor: '#fff',
            fontSize: '12px',
            padding:{
                bottom: 5
            }
        }).setVisible(false);//importante, no se ve
        //aqui se crea una "plantilla" para el timer que oculta la caja nuevamente
        var eliminarCaja = this.time.delayedCall(0);
        this.registry.events.on('pasarInfo', (mensaje)=>{
            this.scene.wake(this);
            console.log(this.scene.isSleeping(this));
            basedialogos.setText(mensaje).setVisible(true);// pero ahora sí y se pasa el mensaje obtenido
            //de la otra función
            eliminarCaja.destroy();//aqui se cancela cualquier timer que haya quedado anteriormente
            eliminarCaja = this.time.delayedCall(1500, this.adioscaja, [], this);//aqui se configura el
            //timer a 1500? ticks para posteriormente ejecutar adioscaja
        });

        
    }

    adioscaja(){
        basedialogos.setVisible(false);// ocultar otra vez la "caja"
        this.scene.sleep(this);//y poner a "dormir" la escena... quiza se ahorre memoria asi
    }//me pregunto si cuando necesite revisitar esto le entenderé
}