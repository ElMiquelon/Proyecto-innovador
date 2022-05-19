export default class transicionAMapa extends Phaser.Scene{
    constructor(){
        super({key:'transicionAMapa'});
    };

    create(){
        var xmapa;
        var ymapa;
        this.registry.events.on('mostrarmapa', (x,y)=>{
            this.scene.pause('overworld');
            xmapa = x;
            ymapa = y;
            this.scene.transition({target:'verMapa', duration:100, sleep:true});
        });

        this.events.on('transitioncomplete', (fromScene, duration)=>{
            this.scene.resume('overworld');
        });

        this.events.on('transitionout', ()=>{
            this.registry.events.emit('acomodominimapa', xmapa, ymapa);
        });
    };
}