import combate from "../combate";
import combateJefe from "../combateJefe";
var laEscena;
var elCombate;
export default class transitionACombate extends Phaser.Scene{
    constructor(){
        super({key:'transicionACombate'});
    }

    create(){//en este script se apoya la transición entre el combate y el overworld

        //primero, tenemos un evento que crea (las veces que se necesite) la escena de combate
        this.registry.events.on('repararcombate', ()=>{
            this.scene.add('combate', new combate);
            this.scene.moveAbove('combate', 'combateDialogos');
        });
        //luego, un evento que pausa el overworld para evitar se mueva el personaje o genere mas numeros
        this.registry.events.on('transicionacombate', ()=>{
            this.scene.pause('overworld');
            this.scene.wake(this);//se "despierta" a sí misma 
            this.scene.transition({target:'combate', duration:4200, sleep: true});
        });

        //este evento es llamado desde el script del combate y hace lo que dice su nombre
        this.registry.events.on('transicionaoverworld', ()=>{
            this.scene.wake(this);//despierta esta escena 
            this.scene.wake('overworld').pause('overworld');//despierta y pausa el overworld
            this.scene.transition({target:'overworld', duration: 100, sleep:true})//y transiciona a este
        });

        //este evento es para preparar la escena de combate contra jefes, como repararcombate
        this.registry.events.on('repararcombatejefe', ()=>{
            this.scene.add('combateJefe', new combateJefe);
            this.scene.moveAbove('combateJefe', 'combateDialogos');
        });

        //y esta servirá de transición universal entre cualquier escena y un combate de jefe (en teoría)
        this.registry.events.on('transicionacombatejefe', (origen, id)=>{
            laEscena = origen;/*a diferencia de los combates normales que solo se dan en el overworld,
            los combates con jefes en teoría se darán en cualquier lugar. por ello, cuando se llame este evento
            es necesario pasar la key de la escena en donde está el jugador para ser guardado en una variable 
            local y usada más adelante*/
            this.scene.pause(laEscena);
            this.scene.wake(this); 
            this.scene.transition({target:'combateJefe', duration:4200, sleep: true});
            this.registry.events.emit('comenzarBatallaJefe', origen, id);/*una vez haya pausado la escena origen,
            se haya despertado a sí mismo y comenzado la transición, se ejecuta este evento el cual pasa la escena
            origen y el id del jefe a la escena de combate.*/
        });

        //esta será una transición universal entre el combateJefe y la escena de donde viene
        this.registry.events.on('victoriajefe', ()=>{
            this.scene.wake(this);//despierta esta escena para posteriormente despertar la escena origen
            this.scene.wake(laEscena);
            this.scene.transition({target: laEscena, duration: 100, sleep:true})//y transiciona a dicha
        });

        //detalles a la hora de transicionar 
        this.events.on('transitionout', (targetScene, duration) =>{//al momento de iniciar una trnsición
            if(targetScene.scene.key == 'combate' || targetScene.scene.key == 'combateJefe'){//se revisa si va a combate
                console.log('a peliar');
                elCombate = targetScene.scene.key;//se guarda a qué escena se peleará para poder eliminarla después
                this.cameras.main.fadeIn(200, 255, 255, 255);//y hace un fadein que se ve mamalon
            }else{//sino
                this.cameras.main.fadeOut(duration, 0,0,0);//hace un efecto mamalón
                this.time.delayedCall(duration - 100, ()=>{
                this.scene.remove(elCombate);//y la tras 100 MS menos de lo que dura la transición, elimina la escena donde se combatió 
                });
            };
        }); 
        /*this.events.on('transitionstart', (fromScene, duration)=>{
            if(fromScene.scene.key == 'combate'){
                this.time.delayedCall(duration - 200,()=>{
                    this.scene.moveBelow('overworld', 'combate');
                })
            };
        });
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            if(fromScene.scene.key == 'combate'){
                this.time.delayedCall(duration + 200, ()=>{
                    this.scene.transition({target: 'overworld', duration:100, sleep:true});
                });
            };
        });estos dos quedaron inutiles*/
    }
}