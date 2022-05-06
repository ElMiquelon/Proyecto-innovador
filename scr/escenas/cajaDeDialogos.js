let dialogo;
let textoAMostrar;
var laEscena;
export default class cajaDeDialogos extends Phaser.Scene{
    constructor(){
        super({key: 'cajaDeDialogos'});
    }

    preload(){
        this.load.json('NPC1', './assets/overworld/dialogos/dialogosnpc1.json');
        this.load.json('NPC2', './assets/overworld/dialogos/dialogosnpc2.json');
        this.load.json('dialogoeli0', './assets/overworld/dialogos/dialogoseli0.json');
        this.load.json('dialogoeli1', './assets/overworld/dialogos/dialogoseli1.json');
        this.load.json('dialogojefe1', './assets/overworld/dialogos/dialogosjefe1.json');
    }

    create(){
        this.caja = this.add.rectangle(0, 380, this.sys.game.config.width, 100, 0xaaaaaa, .35).setOrigin(0,0);
        dialogo = this.add.text(this.caja.getBounds().x, this.caja.getBounds().y, 'placeholder', {
            fontSize: '15px',
            color:'#000',
            padding:{
                bottom: 2
            }
        });
        this.desaparece = this.time.delayedCall();
        this.ok = this.input.keyboard.addKey('X');
        this.ok.on('down', ()=>{
            this.scene.resume(laEscena);
            this.scene.sleep(this);
        });

        this.registry.events.on('dialogar', (numeroNPC, FT, escenaAPausar)=>{
            this.scene.wake(this);
            laEscena = escenaAPausar
            this.scene.pause(laEscena);
            this.sound.play('sonidoNPC' + numeroNPC);
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC);
            if (FT){
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);
            }else{
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[Phaser.Math.Between(1,textoAMostrar.dialogo.length-1)]);
            };
        });

        this.registry.events.on('aviso', (texto)=>{
            this.scene.wake(this);
            this.desaparece.destroy();
            dialogo.setText(texto);
            this.desaparece = this.time.delayedCall(1000, ()=>{
                this.scene.sleep(this);
            })
        });
        
        this.registry.events.on('dialogarjefe', (escenaOrigen, vaAPeliar,id)=>{
            /*Esta madre es un tanto diferente a un dialogo normal. primero, necesita saber de qué escena viene (aquí
                comienza la cadena xd), después, un booleano especificando si se peleará o no y por último el ID del jefe
                a enfrentar*/ 
            this.scene.wake(this);
            laEscena = escenaOrigen;//guarda la scene key en una variable local
            this.scene.pause(laEscena);//y pausa dicha
            textoAMostrar = this.cache.json.get('dialogojefe' + id);//recupera el JSON con los dialogos del jefe
            if(vaAPeliar == true){// y si habrá enfrentamiento
                this.registry.events.emit('repararcombatejefe');//ejecuta el evento que construye la escena de combateJefe
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);//y pone el primer texto
            }else{//sino
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[Phaser.Math.Between(1,textoAMostrar.dialogo.length-1)]);//nomas hablas y ya
            }
        });

        this.registry.events.on('dialogareli', (pollo, escena)=>{
            this.scene.wake(this);
            laEscena = escena;
            this.scene.pause(laEscena);
            textoAMostrar = this.cache.json.get('dialogoeli' + this.registry.values.progreso);
            if(pollo == true){
                dialogo.setText('E: Un pollo')
            }else{
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[Phaser.Math.Between(0,textoAMostrar.dialogo.length-1)]);
            }
        })
    }
}