export default class edificioCP0 extends Phaser.Scene{
    constructor(){
        super({key:'edificioCP0'});
    }

    create(){
        //hitbox del edificio
        this.hitboxes = this.physics.add.staticGroup([
            this.add.rectangle(40,0,23,19).setOrigin(0),
            this.add.rectangle(78,0,20,19).setOrigin(0),
            this.add.rectangle(64,0,15,10).setOrigin(0),
            this.add.rectangle(113,0,54,19).setOrigin(0),
            this.add.rectangle(98,0,15,10).setOrigin(0),
            this.add.rectangle(182,0,36,19).setOrigin(0),
            this.add.rectangle(167,0,15,10).setOrigin(0),
            this.add.rectangle(233,0,38,19).setOrigin(0),
            this.add.rectangle(218,0,15,10).setOrigin(0),
            this.add.rectangle(312,0,61,19).setOrigin(0),
            this.add.rectangle(372,0,16,10).setOrigin(0),
            this.add.rectangle(388,0,41,19).setOrigin(0),
            this.add.rectangle(444,0,46,19).setOrigin(0),
            this.add.rectangle(429,0,15,10).setOrigin(0),
            this.add.rectangle(490,0,16,10).setOrigin(0),
            this.add.rectangle(506,0,52,19).setOrigin(0),
            this.add.rectangle().setOrigin(0)
        ]);

        //OVERLAP de las escaleras (de izquierda a derecha)
        this.escalera = this.add.zone(271,0,40,19).setOrigin(0);//esta la de en medio que sube
     
     
        this.physics.add.staticGroup([this.escalera1]);
        this.physics.add.overlap(this.jugador, this.escalera1, ()=>{
            console.log('subiste por la única escalera');
            this.registry.events.emit('bajarescalerac');
            this.input.keyboard.enabled = false;
            this.scene.transition({target:'edificioCP2', duration:300, sleep:true, moveBelow:true});
        });
        this.physics.add.collider(this.jugador, this.hitboxes);
    };
};