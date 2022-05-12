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

        //el rectangulo y texto 
        this.rectangulo = this.add.rectangle(0, this.sys.game.config.height, this.sys.game.config.width, 100, 0xaaaaaa, .35).setOrigin(0,1);
        this.texto = this.add.text(this.rectangulo.getBounds().x, this.rectangulo.getBounds().y,this.conversacion.texto[i],{color:'#000', fontSize:'15px', padding:{bottom:2}});
        
        //el texto de FIN, acá bien marcadote más que un pito sangre
        this.fin = this.add.text(250,200, 'FIN',{fontSize:'60px'}).setOrigin(.5,.5);
        this.fin.setVisible(false);


        this.nxt = this.input.keyboard.addKey('X');
        this.nxt.on('down', ()=>{
            i++;
            this.texto.setText(this.conversacion.texto[i]);
            this.events.emit('cambiarexpresion')
        });

        this.events.on('cambiarexpresion', ()=>{
            console.log(i)
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