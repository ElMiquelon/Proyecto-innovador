export default class verMapa extends Phaser.Scene{
    constructor(){
        super({key:'verMapa'});
    }

    create(){
        var mapa = this.add.image(250,250, 'minipolimapa').setScale(0);
        this.ubicacion = this.add.image(0,0,'playerMapa').setScale(.2).setVisible(false);
        
        this.registry.events.on('acomodominimapa', (x,y)=>{
            this.ubicacion.setPosition(x/4,y/4);
        });

        this.events.on('transitionstart', (fromScene, duration)=>{
            this.tweens.add({
                targets: mapa,
                scaleX: 1,
                scaleY: 1,
                duration: duration
            });
        });

        this.events.on('transitionout', (toScene, duration)=>{
            this.ubicacion.setVisible(false);
            this.tweens.add({
                targets:mapa,
                scaleX:0,
                scaleY:0,
                duration:duration,
            })
        });

        this.events.on('transitioncomplete', (fromscene, duration)=>{
            this.ubicacion.setVisible(true);
        });
        this.volver = this.input.keyboard.addKey('M');
        this.volver.on('down', ()=>{//se puede poner 'up' para que se deba mantener M presionado
            this.scene.transition({target:'overworld', duration:100});
        });
    };
}