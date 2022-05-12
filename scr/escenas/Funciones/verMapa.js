export default class verMapa extends Phaser.Scene{
    constructor(){
        super({key:'verMapa'});
    }

    create(){
        var mapa = this.add.image(250,250, 'minipolimapa').setScale(0);
        //esta madre se puede simplificar si simplemente diseñamos una imagen
        this.events.on('transitionstart', (fromScene, duration)=>{
            this.tweens.add({
                targets: mapa,
                scaleX: 1,
                scaleY: 1,
                duration: duration
            });
        });

        this.events.on('transitionout', (toScene, duration)=>{
            this.tweens.add({
                targets:mapa,
                scaleX:0,
                scaleY:0,
                duration:duration,
            })
        });
        this.volver = this.input.keyboard.addKey('M');
        this.volver.on('down', ()=>{//se puede poner 'up' para que se deba mantener M presionado
            this.scene.transition({target:'overworld', duration:100});
        });
    };
}