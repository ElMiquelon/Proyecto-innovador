export default class edificioCP1 extends Phaser.Scene{
    constructor(){
        super({key:'edificioCP1'});
    }
    create(){
        this.hitboxes = this.physics.add.staticGroup([
this.add.rectangle(40,0,58,20).setOrigin(0),
this.add.rectangle(98,0,16,10).setOrigin(0),
this.add.rectangle(114,0,104,20).setOrigin(0),
this.add.rectangle(233,19,37,20).setOrigin(0),
this.add.rectangle(218,0,15,10).setOrigin(0),
this.add.rectangle(312,0,60,20).setOrigin(0),
this.add.rectangle(387,0,42,20).setOrigin(0),
this.add.rectangle(372,0,15,10).setOrigin(0),
this.add.rectangle(444,0,46,20).setOrigin(0),
this.add.rectangle(429,0,15,10).setOrigin(0),
this.add.rectangle(505,0,53,20).setOrigin(0),
this.add.rectangle(490,0,15,10).setOrigin(0),
]);

this.physics.add.collider(this.jugador, this.hitboxes);
 //overlap de las escaleras
 this.escalera = this.add.zone(270,0,42,32).setOrigin(0);
 

 this.physics.add.staticGroup([this.escalera,]);
 this.physics.add.overlap(this.jugador, this.escalera, ()=>{
     console.log('bajaste por escalera ');
     this.registry.events.emit('subirescalerac');
     this.input.keyboard.enabled = false;
     this.scene.transition({target:'edificioCP1', duration:300, sleep:true, moveBelow:true});
 });
 this.physics.add.overlap(this.jugador, this.escalera, ()=>{
     console.log('bajaste por escalera');
     this.registry.events.emit('bajarescalerac');
     this.input.keyboard.enabled = false;
     this.scene.transition({target:'edificioCP1', duration:300, sleep:true, moveBelow:true});
 });
 }
 }