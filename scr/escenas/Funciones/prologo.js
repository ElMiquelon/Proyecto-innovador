var i = 0;
export default class prologo extends Phaser.Scene{
    constructor(){
        super({key:'prologo'});
    }

    preload(){
        this.load.json('textoPrologo', './assets/overworld/dialogos/tutorial/prologo0.json');
    }

    create(){
        this.reacciones = this.add.image(0,0,'eli').setOrigin(0,0).setScale(.7).setVisible(false);

        this.prologo = this.cache.json.get('textoPrologo');
        this.rectangulo = this.add.rectangle(0, this.sys.game.config.height, this.sys.game.config.width, 100, 0xaaaaaa, .5).setOrigin(0,1);
        this.texto = this.add.text(this.rectangulo.getBounds().x, this.rectangulo.getBounds().y,this.prologo.dialogo[i],{color:'#000', fontSize:'15px', padding:{bottom:2}});
        
        this.ok = this.input.keyboard.addKeys('X, ENTER');
        this.ok.X.on('down', ()=>{
            i++;
            this.texto.setText(this.prologo.dialogo[i]);
            this.events.emit('cambiarexpresion');
        });
        this.ok.ENTER.on('down', ()=>{
            this.scene.start('overworld').remove(this)
        });

        this.events.on('cambiarexpresion',()=>{
            this.reacciones.setTexture('eli');
            if (i == 8){
                this.reacciones.setVisible(true);
            };
    
            //sí se necesita hacer manualmente
            if (i == 24 || i == 49){
                this.reacciones.setTexture('eliEnojado');
            };
    
            if(i == this.prologo.dialogo.length - 1){
                this.reacciones.setVisible(false);
            };
    
            
        });

        
    }

    update(){
        if(i == this.prologo.dialogo.length){
            this.scene.start('overworld').remove(this)
        };
    }
}