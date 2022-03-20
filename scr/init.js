import menup from "./menu principal";

const config ={
    width: 500,
    height: 480,
    parent: "contenedor",
    type: Phaser.AUTO,
    scene:[menup],
    physics:{
        default: "arcade",
        arcade:{
            gravity:{
                y:300
            }
        }
    }
}

var game = new Phaser.Game(config);

