import combate from "../combate";

export default class transitionACombate extends Phaser.Scene{
    constructor(){
        super({key:'transicionACombate'});
    }

    create(){
        this.registry.events.on('transicionacombate', ()=>{
            this.scene.pause('overworld');
            this.scene.wake(this);
            if(this.scene.isActive('combate') == null){
                this.scene.add('combate', new combate);

            }
            this.time.delayedCall(100, ()=>{
                this.scene.transition({target:'combate', duration:4200, sleep: true});
                this.scene.moveAbove('combate', 'combateDialogos')
            })
        });

        this.registry.events.on('transicionaoverworld', ()=>{
            this.scene.wake(this);
            this.scene.wake('overworld').pause('overworld');
            this.scene.transition({target:'overworld', duration: 100, sleep:true})
        });

        //detalles a la hora de transicionar 
        this.events.on('transitionout', (targetScene, duration) =>{
            if(targetScene.scene.key == 'combate'){
                console.log('a peliar');
                this.cameras.main.fadeIn(200, 255, 255, 255);
            }else{
                this.cameras.main.fadeOut(duration, 0,0,0);
                this.time.delayedCall(duration - 100, ()=>{
                this.scene.remove('combate');
                });
            };
        }); 
        /*this.events.on('transitionstart', (fromScene, duration)=>{
            if(fromScene.scene.key == 'combate'){
                this.time.delayedCall(duration - 200,()=>{
                    this.scene.moveBelow('overworld', 'combate');
                })
            };
        });*/
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            if(fromScene.scene.key == 'combate'){
                this.time.delayedCall(duration + 200, ()=>{
                    this.scene.transition({target: 'overworld', duration:100, sleep:true});
                });
            };
        });
    }
}