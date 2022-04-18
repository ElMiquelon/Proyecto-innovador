export default class verMapa extends Phaser.Scene{
    constructor(){
        super({key:'verMapa'});
    }

    create(){
        this.cameras.main.setBounds(0,0,2000,2000);
        this.cameras.main.setZoom(.25);
        //this.add.text(0,0,'Si ves esto, cierra el mapa y abrelo de nuevo\nNo se porqué sucede :(',{fontSize: '200px',color: '#fff'}).setVisible(false)
        var mapa = this.add.image(1000,1000, 'polimapa').setScale(0);
        //esta madre se puede simplificar si simplemente diseñamos una imagen
        var pasillos = this.add.group([
            //pasillos del A
            this.add.rectangle(536, 927, 55, 104, 0x00ffff).setOrigin(0,0),
            this.add.rectangle(591, 927, 521, 28, 0x00ffff).setOrigin(0,0),
            this.add.rectangle(591, 1003, 521, 28, 0x00ffff).setOrigin(0,0),
            //Pasillos del B
            this.add.rectangle(537,638,45,119,0x00ffff).setOrigin(0,0),
            this.add.rectangle(583,682,529,24,0x00ffff).setOrigin(0,0),
            //Pasillo del C
            this.add.rectangle(785,560, 339, 27, 0x00ffff).setOrigin(0,0),
            //Pasillos del D
            this.add.rectangle(630,307,27,94,0x00ffff).setOrigin(0,0),
            this.add.rectangle(658,307,458,28,0x00ffff).setOrigin(0,0),
            //Pasillos del E
            this.add.rectangle(566,189,551,34,0x00ffff).setOrigin(0,0),
        ],{visible: false});

        this.events.on('transitionstart', (fromScene, duration)=>{
            this.tweens.add({
                targets: mapa,
                scaleX: 1,
                scaleY: 1,
                duration: duration
            });
        });

        this.events.on('transitioncomplete', ()=>{
            pasillos.setVisible(true);
        });

        this.events.on('transitionout', (toScene, duration)=>{
            pasillos.setVisible(false);
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