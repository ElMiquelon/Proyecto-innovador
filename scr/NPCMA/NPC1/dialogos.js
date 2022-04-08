export default function dialogue1(ft){
    let dialog = ["Hola, nos acabamos de conocer\nte quiero", "hay confianza,\nchinga tu madre", "ola josu", "son solo 3"];
    var random = Phaser.Math.Between(1,3);
    if (ft == true){
        return dialog[0];
    }else{
        return dialog[random];
    }
    
}