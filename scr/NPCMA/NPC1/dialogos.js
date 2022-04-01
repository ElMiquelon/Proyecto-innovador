export default class npc1dialogue{
    method(ft){
        let dialog = ["Hola, nos acabamos de conocer", "hay confianza, chinga tu madre", "ola eli", "son solo 3"];
        var random = Phaser.Math.Between(1,4);
        if (ft == false){
            return dialog[0];
        }else{
            return dialog[random];
        }
    }
}