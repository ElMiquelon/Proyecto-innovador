let dialogo;
let textoAMostrar;
var laEscena;
var explorador = 1;//no se me ocurrio un buen nombre, pero este será como i en for, servirá para avanzar el dialogo
var multi;
export default class cajaDeDialogos extends Phaser.Scene{
    constructor(){
        super({key: 'cajaDeDialogos'});
    }

    preload(){
        //aqui los JSON de los NPCs que no variarán en dialogo según avance la historia
        this.load.json('NPC1', './assets/overworld/dialogos/dialogosnpc1.json');
        this.load.json('NPC3', './assets/overworld/dialogos/dialogosnpc3.json');
        this.load.json('NPC4', './assets/overworld/dialogos/dialogosnpc4.json');

        //aquí, los JSON de los NPCs que varien en dialogo según avance la historia
        this.load.json('NPC2P1', './assets/overworld/dialogos/dialogosnpc2p1.json');
        this.load.json('NPC2P2', './assets/overworld/dialogos/dialogosnpc2p2.json');

        //aquí los dialogos guía de eli (quizá se cambie)
        this.load.json('NPC0', './assets/overworld/dialogos/dialogosnpc0.json');//este dialogo y el de abajo son un caso especial. son dialogos de historia
        this.load.json('NPC00', './assets/overworld/dialogos/dialogosnpc00.json');
        this.load.json('dialogoeli0', './assets/overworld/dialogos/dialogoseli0.json');
        this.load.json('dialogoeli1', './assets/overworld/dialogos/dialogoseli1.json');
        this.load.json('dialogoeli7', './assets/overworld/dialogos/dialogoseli7.json');
        
        //aquí los dialogos prebatalla de los jefes
        this.load.json('dialogoprejefe1', './assets/overworld/dialogos/dialogosprejefe1.json');
        this.load.json('dialogoprejefe2', './assets/overworld/dialogos/dialogosprejefe2.json');
        this.load.json('dialogoprejefe3', './assets/overworld/dialogos/dialogosprejefe3.json');
        this.load.json('dialogoprejefe4', './assets/overworld/dialogos/dialogosprejefe4.json');

        //aqui los dialogos postbatalla de los jefes
        this.load.json('dialogopostjefe1', './assets/overworld/dialogos/dialogospostjefe1.json');
        this.load.json('dialogopostjefe2', './assets/overworld/dialogos/dialogospostjefe2.json');
        this.load.json('dialogopostjefe3', './assets/overworld/dialogos/dialogospostjefe3.json');
    };

    create(){
        this.caja = this.add.rectangle(0, 380, this.sys.game.config.width, 100, 0xaaaaaa, .35).setOrigin(0,0);
        dialogo = this.add.text(this.caja.getBounds().x, this.caja.getBounds().y, 'arrremangala arrempujala arremangala arrempujala', {
            fontSize: '15px',
            color:'#000',
            padding:{
                bottom: 2
            }
        });
        this.desaparece = this.time.delayedCall();
        this.ok = this.input.keyboard.addKey('X');
        this.ok.on('down', ()=>{//al momento de presionar X
            if (multi == true){//se comprueba si será un monologo/conversación
                if(explorador == textoAMostrar.dialogo.length){//y si el explorador (una variable para navegar por el arreglo del monologo) alcanzó el fondo
                    multi = false;
                    explorador = 1;//y regresa las variables multi y explorador a su estado inicial 
                    this.scene.resume(laEscena);
                    this.scene.sleep(this);//y "devuelve" al jugador a la escena anterior
                }else{//sino
                    dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[explorador]);//cambia el texto al siguiente
                    explorador ++;//y se aumenta el explorador para seguir cambiandolo
                }
            }else{//en caso de no ser monologo
                this.scene.resume(laEscena);
                this.scene.sleep(this);//directamente se "transiciona devuelta"
            };
        });

        this.registry.events.on('dialogar', (numeroNPC, escenaAPausar)=>{
            /*este es el clasico dialogo de nomas una línea que está desde juego.js... maso*/
            this.scene.wake(this);//se despierta esta escena
            laEscena = escenaAPausar//se guarda la key de la escena donde se llamó el evento
            this.scene.pause(laEscena);//se pausa dicha escena
            //this.sound.play('sonidoNPC' + numeroNPC);//esto igual y se borra
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC);//se recupera el JSON con los dialogos
            dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogogenerico[Phaser.Math.Between(0,textoAMostrar.dialogogenerico.length-1)]);//y se pone uno random
        });

        this.registry.events.on('dialogarmulti', (numeroNPC, escenaAPausar)=>{
            //en el multi cambia un poco, ya que habrá monologo (en algun caso habra conversación)
            this.scene.wake(this);
            laEscena = escenaAPausar
            this.scene.pause(laEscena);
            //this.sound.play('sonidoNPC' + numeroNPC);//eaeeaeaeaeaeaeaea
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC);
            dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);//se comienza por el inicio (jeje) del monologo/conversación
            multi = true;//y esta variable se vuelve true
        });

        this.registry.events.on('aviso', (texto)=>{
            this.scene.wake(this);
            this.desaparece.destroy();
            dialogo.setText(texto);
            this.desaparece = this.time.delayedCall(1500, ()=>{
                this.scene.sleep(this);
            })
        });
        
        this.registry.events.on('dialogarprejefe', (escenaOrigen, vaAPeliar,id)=>{
            /*para los dialogos prebatalla se necesitará saber si se cumplen los requerimientos o no
            (vaAPeliar) con un booleano*/ 
            this.scene.wake(this);
            laEscena = escenaOrigen;
            this.scene.pause(laEscena);
            textoAMostrar = this.cache.json.get('dialogoprejefe' + id);//recupera el JSON con los dialogos del jefe antes de derrotarlo
            if(vaAPeliar == true){// y si habrá enfrentamiento
                this.registry.events.emit('repararcombatejefe');//ejecuta el evento que construye la escena de combateJefe
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogobatalla[Phaser.Math.Between(0, 1)]);//y pone algún dialogo para la batalla
            }else{//sino
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);//prepara el monologo que explica porque no debe pelear aún
                multi = true;//y esta variable se vuelve true
            }
        });
        
        this.registry.events.on('dialogarpostjefe', (escenaOrigen, FT,id)=>{
            /*Ok, entonces aquí se necesitan 3 datos, el unico nuevo es FT, siglas de first talk y sirve
            para saber si se debe poner el dialogo con lore o uno generico*/
            this.scene.wake(this);
            laEscena = escenaOrigen;
            this.scene.pause(laEscena);
            textoAMostrar = this.cache.json.get('dialogopostjefe' + id);//recupera el JSON con los dialogos del jefe despues de derrotarlo
            if(FT == true){//entonces se verifica si es la primera vez que se habla despues de derrotarlo
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);// se pone el primer dialogo del monologo
                multi = true;//y esta variable se vuelve true
            }else{//sino
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogogenerico[Phaser.Math.Between(0,textoAMostrar.dialogogenerico.length-1)]);//nomas hablas y ya
                //nomas tira una línea pedorra y ya
            };
        });

        this.registry.events.on('dialogarjefefinal', (escenaOrigen, FT)=>{
            this.scene.wake(this);
            laEscena = escenaOrigen;
            this.scene.pause(laEscena);
            textoAMostrar = this.cache.json.get('dialogoprejefe4');
            if(FT == true){//entonces se verifica si es la primera vez que se habla con el viejo
                this.registry.events.emit('repararcombatejefe');
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);// se pone el primer dialogo del monologo
                multi = true;//y esta variable se vuelve true
            }else{//sino
                this.registry.events.emit('repararcombatejefe');
                dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogogenerico[Phaser.Math.Between(0,textoAMostrar.dialogogenerico.length-1)]);//nomas hablas y ya
                //nomas tira una línea pedorra y a peliar
            };
        });

        this.registry.events.on('dialogarprogreso', (numeroNPC, escenaAPausar, progreso)=>{
            /*este es el clasico dialogo de nomas una línea que está desde juego.js... maso*/
            this.scene.wake(this);//se despierta esta escena
            laEscena = escenaAPausar//se guarda la key de la escena donde se llamó el evento
            this.scene.pause(laEscena);//se pausa dicha escena
            //this.sound.play('sonidoNPC' + numeroNPC);//esto igual y se borra
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC+'P'+progreso);//se recupera el JSON con los dialogos
            dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogogenerico[Phaser.Math.Between(0,textoAMostrar.dialogogenerico.length-1)]);//y se pone uno random
        });

        this.registry.events.on('dialogarprogresomulti', (numeroNPC, escenaAPausar, progreso)=>{
            //en el multi cambia un poco, ya que habrá monologo (en algun caso habra conversación)
            this.scene.wake(this);
            laEscena = escenaAPausar
            this.scene.pause(laEscena);
            //this.sound.play('sonidoNPC' + numeroNPC);//eaeeaeaeaeaeaeaea
            textoAMostrar = this.cache.json.get('NPC'+numeroNPC+'P'+progreso);
            dialogo.setText(textoAMostrar.nombre + textoAMostrar.dialogo[0]);//se comienza por el inicio (jeje) del monologo/conversación
            multi = true;//y esta variable se vuelve true
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
            };
        });
    }
}