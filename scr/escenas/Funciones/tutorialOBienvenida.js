var i = 0;
export default class tutorial extends Phaser.Scene{
    constructor(){
        super({key:'tutorial'});
    }

    preload(){
        this.load.json('textoTutorial', './assets/overworld/dialogos/tutorial.json');
    }

    create(){
        this.tuto = this.cache.json.get('textoTutorial');
        this.texto = this.add.text(0,0,this.tuto.textos[i],{color:'#000', fontSize:'15px', backgroundColor:'#fff'});
        this.ok = this.input.keyboard.addKey('X');
        this.ok.on('down',()=>{
            i++;
            this.texto.setText(this.tuto.textos[i]);
        })
        
    }

    update(){
        if (i == this.tuto.textos.length){
            this.scene.start('overworld');
        };
    }
}