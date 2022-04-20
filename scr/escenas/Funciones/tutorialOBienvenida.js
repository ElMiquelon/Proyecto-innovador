var i = 0;
export default class tutorial extends Phaser.Scene{
    constructor(){
        super({key:'tutorial'});
    }

    preload(){
        this.load.json('textoTutorial', './assets/overworld/dialogos/tutorial/tutorial0.json');
    }

    create(){
        this.tuto = this.cache.json.get('textoTutorial');
        this.rectangulo = this.add.rectangle(0, this.sys.game.config.height, this.sys.game.config.width, 100, 0xaaaaaa, .35).setOrigin(0,1);
        this.texto = this.add.text(this.rectangulo.getBounds().x, this.rectangulo.getBounds().y,this.tuto.textos[i],{color:'#000', fontSize:'15px'});
        this.ok = this.input.keyboard.addKeys('X, ENTER');
        this.ok.X.on('down',()=>{
            i++;
            this.texto.setText(this.tuto.textos[i]);
        });
        this.ok.ENTER.on('down', ()=>{
            this.scene.start('prologo');
        })

    }

    update(){
        if (i == this.tuto.textos.length){
            this.scene.start('prologo');
        };
    }
}