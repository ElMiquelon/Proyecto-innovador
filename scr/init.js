import menup from "./menu principal";

const config ={
    width: 500,
    height: 480,
    parent: "contenedor",
    type: Phaser.AUTO,
    scene:[menup],
    physics:{
        default: "arcade",
        
    }
}

var game = new Phaser.Game(config);

