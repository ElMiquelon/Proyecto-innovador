var i = 0;
export default class tutorial extends Phaser.Scene{
    constructor(){
        super({key:'tutorial'});
    }

    preload(){
        this.load.json('textoTutorial', './assets/overworld/dialogos/tutorial/tutorial0.json');
    }

    create(){
        this.tutoimg = this.add.image(0,0,'tuto1').setOrigin(0,0).setVisible(false);

        this.tuto = this.cache.json.get('textoTutorial');
        this.rectangulo = this.add.rectangle(0, this.sys.game.config.height, this.sys.game.config.width, 100, 0xaaaaaa, .5).setOrigin(0,1);
        this.texto = this.add.text(this.rectangulo.getBounds().x, this.rectangulo.getBounds().y,this.tuto.textos[i],{color:'#000', fontSize:'15px'});
        this.ok = this.input.keyboard.addKeys('X, ENTER');
        this.ok.X.on('down',()=>{
            i++;
            this.texto.setText(this.tuto.textos[i]);
            this.events.emit('avanzarTuto');
        });
        this.ok.ENTER.on('down', ()=>{
            this.scene.start('prologo');
        })
        this.events.on('avanzarTuto',()=>{
            if (i == 6){
                this.tutoimg.setVisible(true);
            };
            if (i == 7){
                this.tutoimg.setTexture('tuto2');
            };
            if (i == 10){
                this.tutoimg.setTexture('tuto3');
            };
            if (i == 12){
                this.tutoimg.setTexture('tuto4');
            };
            if (i == 13){
                this.tutoimg.setTexture('tuto5');
            };
            if (i == 14){
                this.tutoimg.setTexture('tuto6');
            };
            if (i == 15){
                this.tutoimg.setVisible(false);
            };
            if (i == 21){
                this.tutoimg.setVisible(true);
                this.tutoimg.setTexture('tuto7');
            };
            if (i == 22){
                this.tutoimg.setTexture('tuto8');
            };
            if (i == 25){
                this.tutoimg.setTexture('tuto9');
            };
            if (i == 28){
                this.tutoimg.setTexture('tuto10');
            };
            if(i == 31){
                this.tutoimg.setVisible(false);
            };
    
            
        });

    }

    update(){
        if (i == this.tuto.textos.length){
            this.scene.start('prologo');
        };
    }
}