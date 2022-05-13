export default class menup extends Phaser.Scene{

    constructor(){
        super({key: 'menup'});
    }

    preload(){
        this.load.image("mm", "./assets/mp.png");
    }

    create(){
        let graphics = this.add.graphics();
        this.mm = this.add.image(0,0,"mm").setOrigin(0,0);
        this.cursor = this.input.keyboard.createCursorKeys();
        
        //weas de debug que deberán ser eliminadas despues
        this.op = this.input.keyboard.addKey('P');
        var lvlup = this.cache.json.get('lvlup');
        console.log(this.registry.get('playerStats'));
        this.op.on('down', ()=>{
            this.registry.values.playerStats.hp += lvlup.hp[Phaser.Math.Between(0, lvlup.hp.length - 1)];
            this.registry.values.playerStats.atk += lvlup.atk[Phaser.Math.Between(0, lvlup.atk.length - 1)];
            this.registry.values.playerStats.def += lvlup.def[Phaser.Math.Between(0, lvlup.def.length - 1)];
            this.registry.values.playerStats.nxtlvl = Math.round(this.registry.values.playerStats.nxtlvl * 1.25);
            this.registry.values.playerStats.lvl += 1; 
            console.log(this.registry.get('playerStats'));
        });
        this.alSalon = this.input.keyboard.addKey('S');
        this.alSalon.on('down', ()=>{
            this.registry.events.emit('reconstruccionsalon');
            this.scene.switch('salon');
        })
        this.alA = this.input.keyboard.addKey('A');
        this.alA.on('down',()=>{
            this.registry.events.emit('reconstruccionA');
            this.scene.transition({target:'edificioAP0', duration:300});
        });
        this.alB = this.input.keyboard.addKey('B');
        this.alB.on('down',()=>{
            this.registry.events.emit('reconstruccionB');
            this.scene.transition({target:'edificioBP0', duration:300});
        });
        this.alC = this.input.keyboard.addKey('C');
        this.alC.on('down',()=>{
            this.registry.events.emit('reconstruccionC');
            this.scene.transition({target:'edificioCP0', duration:300});
        });
        this.alD = this.input.keyboard.addKey('D');
        this.alD.on('down',()=>{
            this.registry.events.emit('reconstruccionD');
            this.scene.transition({target:'edificioDP0', duration:300});
        });
        this.alE = this.input.keyboard.addKey('E');
        this.alE.on('down',()=>{
            this.registry.events.emit('reconstruccionE');
            this.scene.transition({target:'edificioEP0', duration:300});
        });
        this.alF = this.input.keyboard.addKey('F');
        this.alF.on('down',()=>{
            this.registry.events.emit('reconstruccionF');
            this.scene.transition({target:'edificioFP0', duration:300});
        });
        this.alBFFinal = this.input.keyboard.addKey('Z');
        this.alBFFinal.on('down',()=>{
            this.registry.events.emit('elfinal');
            this.scene.transition({target:'salonFinal', duration:300});
        });

        this.progresoUp = this.input.keyboard.addKey('U');
        this.progresoUp.on('down', ()=>{
            this.registry.values.progreso++;
            console.log(this.registry.values.progreso);
        });
    };

    update(time, delta){
        if (this.cursor.space.isDown){
            this.scene.start("tutorial").remove(this);
        } else if (this.cursor.shift.isDown) {
            /*this.registry.events.emit('comenzarBatalla', Phaser.Math.Between(1,2));
            console.log('Está es una pantalla de debug para el combate, ser removida para el final');*/
            this.scene.transition({target:'combateJefe', duration:4200});
        };
    };
}