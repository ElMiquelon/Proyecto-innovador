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
        });
        //luego, un evento que pausa el overworld para evitar se mueva el personaje o genere mas numeros
        this.registry.events.on('transicionacombate', ()=>{
            this.scene.pause('overworld');
            this.scene.wake(this);//se "despierta" a sí misma 
            this.scene.transition({target:'combate', duration:4200, sleep: true});
            //y realiza la transición a combate, ademas de mover la escena de dialogos encima de la de combate
            this.scene.moveAbove('combate', 'combateDialogos')
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
        });

        //y esta servirá de transición universal entre cualquier escena y un combate de jefe (en teoría)
        this.registry.events.on('transicionacombatejefe', (origen, id)=>{
            laEscena = origen;
            this.scene.pause(laEscena);
            this.scene.wake(this);//se "despierta" a sí misma 
            this.scene.transition({target:'combateJefe', duration:4200, sleep: true});
            //y realiza la transición a combate, ademas de mover la escena de dialogos encima de la de combate
            this.scene.moveAbove('combateJefe', 'combateDialogos');
            this.registry.events.emit('comenzarBatallaJefe', origen, id);//ademas de ejecutar este evento para lograr definir las stats
        });

        //esta será una transición universal entre el combateJefe y la escena de donde viene
        this.registry.events.on('victoriajefe', ()=>{
            this.scene.wake(this);//despierta esta escena 
            this.scene.wake(laEscena);//despierta y pausa la escena origen
            console.log(laEscena);
            this.scene.transition({target: laEscena, duration: 100, sleep:true})//y transiciona a dicha
        });

        //detalles a la hora de transicionar 
        this.events.on('transitionout', (targetScene, duration) =>{//al momento de iniciar una trnsición
            if(targetScene.scene.key == 'combate' || targetScene.scene.key == 'combateJefe'){//se revisa si va a combate
                console.log('a peliar');
                elCombate = targetScene.scene.key;
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