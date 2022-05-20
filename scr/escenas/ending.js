var i = 0;
export default class ending extends Phaser.Scene{
    constructor(){
        super({key:'ending'});
    };

    preload(){
        this.load.json('textoEnding', './assets/overworld/dialogos/dialogoending.json');
    };

    create(){
        //variable que almacena la información del JSON
        this.conversacion = this.cache.json.get('textoEnding');
        
        //fondo
        this.fondo = this.add.image(0,0,'prologoFondo').setOrigin(0,0);

        //el rectangulo y texto 
        this.rectangulo = this.add.rectangle(0, this.sys.game.config.height, this.sys.game.config.width, 100, 0xaaaaaa, .5).setOrigin(0,1);
        this.texto = this.add.text(this.rectangulo.getBounds().x, this.rectangulo.getBounds().y,this.conversacion.texto[i],{color:'#000', fontSize:'15px', padding:{bottom:2}});

        //las imagenes de la conversación
        this.viejo = this.add.image(150,this.rectangulo.getBounds().top, 'viejoEnojado').setOrigin(.5,1);
        this.eli = this.add.image(350,this.rectangulo.getBounds().top, 'eliSmug').setOrigin(.5,1);
        
        //el texto de FIN, acá bien marcadote más que un pito sangre
        this.fin = this.add.text(250,200, 'FIN',{fontSize:'60px'}).setOrigin(.5,.5);
        this.fin.setVisible(false);


        this.nxt = this.input.keyboard.addKey('X');
        this.nxt.on('down', ()=>{
            i++;
            this.texto.setText(this.conversacion.texto[i]);
            this.events.emit('cambiarexpresion');
        });

        this.events.on('cambiarexpresion', ()=>{
            if(i == 1){
                this.viejo.setTexture('viejo');
            };

            if(i == 5){
                this.eli.setTexture('eli');
            };

            if(i == 8){
                this.viejo.setTexture('viejoHisteria');
            };

            if(i == 9){
                this.eli.setTexture('eliSorpresa');
            };

            if(i == 10){
                this.fondo.setVisible(false);
                this.eli.setVisible(false);
                this.viejo.setVisible(false);
            };

            if(i == 16){
                this.fin.setVisible(true);
                this.input.keyboard.enabled = false;
            };
        });

        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.cameras.main.fadeFrom(200, 0,0,0);
        });
    };
};