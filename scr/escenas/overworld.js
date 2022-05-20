var pelea;
export default class overworld extends Phaser.Scene{
    constructor(){
        super({key: 'overworld'});
    }
    preload(){
        //no estoy seguro si los sonidos será mejor cargarlos aquí o en la pantalla de carga.
        //por ahora estan en la pantalla de carga 24/04/22
    }

    create(){
        //detalles de la camara, limites del mundo, BG y BGM
        this.cameras.main.setBounds(0,0,2000,2000);
        //this.cameras.main.setZoom(.7); esta madre es mas que nada de debug
        this.add.image(0,0, 'polimapa').setOrigin(0,0);
        this.physics.world.setBounds(0,0,2000,2000);
        this.bgm = this.sound.add('BGMOverworld', {loop:true});
        this.bgm.play();


        //estructuración del mapa para evitar que salga, traspase edificios, etc.
        this.edificios = this.physics.add.staticGroup([
            //rectangulos del A
            this.add.rectangle(432,955,106,48).setOrigin(0,0),
            this.add.rectangle(582,955,530,48).setOrigin(0,0),
            //rectangulos del B
            this.add.rectangle(217,699,260,59).setOrigin(0,0),
            this.add.rectangle(476,638,83,120).setOrigin(0,0),
            this.add.rectangle(595,638,39,44).setOrigin(0,0),
            this.add.rectangle(595,710,39,48).setOrigin(0,0),
            this.add.rectangle(634,710,479,36).setOrigin(0,0),
            this.add.rectangle(217,758,233,45).setOrigin(0,0),
            //rectangulos del C
            this.add.rectangle(785,486,339,73).setOrigin(0,0),
            //rectangulos del D
            this.add.rectangle(524,307,105,94).setOrigin(0,0),
            this.add.rectangle(658,336,458,66).setOrigin(0,0),
            //rectangulos del E
            this.add.rectangle(566,125,551,63).setOrigin(0,0),
            //rectangulo del F
            this.add.rectangle(1291,296,429,59).setOrigin(0,0),
            //rectangulo de P.C. (protección civil)
            this.add.rectangle(1515,663,100,75).setOrigin(0,0),
            //rectangulos no me acuerdo qué es (creo que era algo de fundición)
            this.add.rectangle(1236,766,420,204).setOrigin(0,0),
            //rectangulos de la otra cooperativa (blanca¿)
            this.add.rectangle(1235,1011,460,242).setOrigin(0,0),
            //rectangulos de ni idea (creo que es el edificio administrativo que no han terminado)
            this.add.rectangle(1272,1121,295,111).setOrigin(0,0),
            //rectangulos de la cancha
            /*this.add.rectangle(974,1165,113,210).setOrigin(0,0), ea, esta madre no es necesaria o sí?*/
            //rectangulos de mecanicos
            this.add.rectangle(1229,446, 425,198).setOrigin(0,0),

            //rectangulos de emprendurismo
            this.add.rectangle(1438,1420, 11,11).setOrigin(0,0),
            this.add.rectangle(1430,1415, 11,11).setOrigin(0,0),
            this.add.rectangle(1424,1410, 11,11).setOrigin(0,0),
            this.add.rectangle(1418,1405, 11,11).setOrigin(0,0),
            this.add.rectangle(1412,1400, 11,11).setOrigin(0,0),
            this.add.rectangle(1406,1395, 11,11).setOrigin(0,0),
            this.add.rectangle(1398,1390, 11,11).setOrigin(0,0),
            this.add.rectangle(1390,1385, 11,11).setOrigin(0,0),
            this.add.rectangle(1382,1380, 11,11).setOrigin(0,0),
            this.add.rectangle(1374,1375, 11,11).setOrigin(0,0),
            this.add.rectangle(1366,1370, 11,11).setOrigin(0,0),
            this.add.rectangle(1358,1365, 11,11).setOrigin(0,0),
            this.add.rectangle(1350,1360, 11,11).setOrigin(0,0),
            this.add.rectangle(1342,1355, 11,11).setOrigin(0,0),
            this.add.rectangle(1334,1350, 11,11).setOrigin(0,0),
            this.add.rectangle(1326,1345, 11,11).setOrigin(0,0),
            this.add.rectangle(1318,1340, 11,11).setOrigin(0,0),
            this.add.rectangle(1310,1335, 11,11).setOrigin(0,0),
            this.add.rectangle(1302,1330, 11,11).setOrigin(0,0),
            this.add.rectangle(1294,1325, 11,11).setOrigin(0,0),
            this.add.rectangle(1286,1319, 11,11).setOrigin(0,0),
            this.add.rectangle(1279,1315, 11,11).setOrigin(0,0),
            this.add.rectangle(1271,1305, 11,11).setOrigin(0,0),
            this.add.rectangle(1263,1304, 11,11).setOrigin(0,0),
            this.add.rectangle(1255,1298, 11,11).setOrigin(0,0),

            this.add.rectangle(1247,1291, 11,11).setOrigin(0,0),
            this.add.rectangle(1241,1300, 11,11).setOrigin(0,0),
            this.add.rectangle(1235,1309, 11,11).setOrigin(0,0),
            this.add.rectangle(1229,1318, 11,11).setOrigin(0,0),
            this.add.rectangle(1223,1327, 11,11).setOrigin(0,0),
            this.add.rectangle(1217,1336, 11,11).setOrigin(0,0),
            this.add.rectangle(1211,1345, 11,11).setOrigin(0,0),
            this.add.rectangle(1205,1354, 11,11).setOrigin(0,0),
            this.add.rectangle(1199,1363, 11,11).setOrigin(0,0),
            this.add.rectangle(1193,1372, 11,11).setOrigin(0,0),
            this.add.rectangle(1187,1381, 11,11).setOrigin(0,0),
            this.add.rectangle(1179,1390, 11,11).setOrigin(0,0),
            this.add.rectangle(1172,1399, 11,11).setOrigin(0,0),
            this.add.rectangle(1167,1408, 11,11).setOrigin(0,0),
            this.add.rectangle(1161,1417, 11,11).setOrigin(0,0),
            this.add.rectangle(1155,1426, 11,11).setOrigin(0,0),
            this.add.rectangle(1150,1435, 11,11).setOrigin(0,0),
            this.add.rectangle(1143,1444, 11,11).setOrigin(0,0),
            this.add.rectangle(1135,1453, 11,11).setOrigin(0,0),
            this.add.rectangle(1130,1462, 11,11).setOrigin(0,0),
            this.add.rectangle(1120,1471, 11,11).setOrigin(0,0),
            this.add.rectangle(1125,1480, 11,11).setOrigin(0,0),
            this.add.rectangle(1115,1485, 11,11).setOrigin(0,0),
            this.add.rectangle(1110,1489, 11,11).setOrigin(0,0),
            this.add.rectangle(1105,1498, 11,11).setOrigin(0,0),
            this.add.rectangle(1095,1507, 11,11).setOrigin(0,0),
            this.add.rectangle(1090,1516, 11,11).setOrigin(0,0),
            this.add.rectangle(1085,1525, 11,11).setOrigin(0,0),
            this.add.rectangle(1080,1534, 11,11).setOrigin(0,0),
            this.add.rectangle(1075,1543, 11,11).setOrigin(0,0),
            this.add.rectangle(1070,1552, 11,11).setOrigin(0,0),
            this.add.rectangle(1065,1561, 11,11).setOrigin(0,0),
            this.add.rectangle(1060,1570, 11,11).setOrigin(0,0),
            this.add.rectangle(1053,1579, 11,11).setOrigin(0,0),
            this.add.rectangle(1045,1588, 11,11).setOrigin(0,0),
            this.add.rectangle(1040,1597, 11,11).setOrigin(0,0),
            this.add.rectangle(1035,1606, 11,11).setOrigin(0,0),
            this.add.rectangle(1030,1615, 11,11).setOrigin(0,0),
            this.add.rectangle(1020,1624, 11,11).setOrigin(0,0),
            this.add.rectangle(1015,1633, 11,11).setOrigin(0,0),
            this.add.rectangle(1012,1642, 11,11).setOrigin(0,0),
            this.add.rectangle(1005,1651, 11,11).setOrigin(0,0),
            this.add.rectangle(1000,1660, 11,11).setOrigin(0,0),
            this.add.rectangle(990,1665, 11,11).setOrigin(0,0),
            this.add.rectangle(980,1669, 11,11).setOrigin(0,0),
            this.add.rectangle(975,1678, 11,11).setOrigin(0,0),
            this.add.rectangle(972,1687, 11,11).setOrigin(0,0),
            this.add.rectangle(965,1696, 11,11).setOrigin(0,0),
            this.add.rectangle(960,1707, 11,11).setOrigin(0,0),
            this.add.rectangle(954,1716, 11,11).setOrigin(0,0),
            this.add.rectangle(948,1725, 11,11).setOrigin(0,0),
            this.add.rectangle(935,1734, 11,11).setOrigin(0,0),

            this.add.rectangle(930,1736, 11,11).setOrigin(0,0),
            this.add.rectangle(940,1742, 11,11).setOrigin(0,0),
            this.add.rectangle(950,1748, 11,11).setOrigin(0,0),
            this.add.rectangle(960,1754, 11,11).setOrigin(0,0),
            this.add.rectangle(970,1760, 11,11).setOrigin(0,0),
            this.add.rectangle(980,1766, 11,11).setOrigin(0,0),
            this.add.rectangle(990,1772, 11,11).setOrigin(0,0),
            this.add.rectangle(1000,1778, 11,11).setOrigin(0,0),
            this.add.rectangle(1010,1784, 11,11).setOrigin(0,0),
            this.add.rectangle(1020,1792, 11,11).setOrigin(0,0),
            this.add.rectangle(1030,1798, 11,11).setOrigin(0,0),
            this.add.rectangle(1040,1804, 11,11).setOrigin(0,0),
            this.add.rectangle(1050,1810, 11,11).setOrigin(0,0),
            this.add.rectangle(1060,1816, 11,11).setOrigin(0,0),
            this.add.rectangle(1070,1822, 11,11).setOrigin(0,0),
            this.add.rectangle(1080,1828, 11,11).setOrigin(0,0),
            this.add.rectangle(1090,1834, 11,11).setOrigin(0,0),
            this.add.rectangle(1100,1840, 11,11).setOrigin(0,0),
            this.add.rectangle(1110,1846, 11,11).setOrigin(0,0),

            //a partir de aquí, son rectangulos de "frontera", que evitan la salida del jugador a donde no debe.
            this.add.rectangle(143,0, 1104,40).setOrigin(0,0),
            this.add.rectangle(1247,0, 494,230).setOrigin(0,0),
            this.add.rectangle(1741,230, 9,142).setOrigin(0,0),
            this.add.rectangle(1656,425, 344,406).setOrigin(0,0),
            
            this.add.rectangle(1657,424, 1,1).setOrigin(0,0),
            this.add.rectangle(1657,424, 1,1).setOrigin(0,0),
            this.add.rectangle(1659,423, 1,1).setOrigin(0,0),
            this.add.rectangle(1662,421, 1,1).setOrigin(0,0),
            this.add.rectangle(1662,421, 1,1).setOrigin(0,0),
            this.add.rectangle(1664,420, 1,1).setOrigin(0,0),
            this.add.rectangle(1662,421, 1,1).setOrigin(0,0),
            this.add.rectangle(1667,418, 1,1).setOrigin(0,0),
            this.add.rectangle(1669,417, 1,1).setOrigin(0,0),
            this.add.rectangle(1672,415, 1,1).setOrigin(0,0),
            this.add.rectangle(1675,413, 1,1).setOrigin(0,0),
            this.add.rectangle(1678,411, 1,1).setOrigin(0,0),
            this.add.rectangle(1681,409, 1,1).setOrigin(0,0),
            this.add.rectangle(1684,407, 1,1).setOrigin(0,0),
            this.add.rectangle(1687,405, 1,1).setOrigin(0,0),
            this.add.rectangle(1690,403, 1,1).setOrigin(0,0),
            this.add.rectangle(1694,401, 1,1).setOrigin(0,0),
            this.add.rectangle(1697,399, 1,1).setOrigin(0,0),
            this.add.rectangle(1797,399, 1,1).setOrigin(0,0),
            this.add.rectangle(1700,397, 1,1).setOrigin(0,0),
            this.add.rectangle(1703,395, 1,1).setOrigin(0,0),
            this.add.rectangle(1707,393, 1,1).setOrigin(0,0),
            this.add.rectangle(1711,390, 1,1).setOrigin(0,0),
            this.add.rectangle(1715,388, 1,1).setOrigin(0,0),
            this.add.rectangle(1719,385, 1,1).setOrigin(0,0),
            this.add.rectangle(1724,382, 1,1).setOrigin(0,0),
            this.add.rectangle(1728,379, 1,1).setOrigin(0,0),
            this.add.rectangle(1732,376, 1,1).setOrigin(0,0),
            this.add.rectangle(1736,374, 1,1).setOrigin(0,0),

            this.add.rectangle(1711,1079, 54,36).setOrigin(0,0),
            this.add.rectangle(1765,1084, 41,18).setOrigin(0,0),
            this.add.rectangle(1807,1089, 31,16).setOrigin(0,0),
            this.add.rectangle(1839,1094, 32,13).setOrigin(0,0),

            this.add.rectangle(91,23, 59,51).setOrigin(0,0),
            this.add.rectangle(150,74, 3,47).setOrigin(0,0),
            this.add.rectangle(153,110, 3,46).setOrigin(0,0),
            this.add.rectangle(156,143, 3,45).setOrigin(0,0),
            this.add.rectangle(159,182, 3,45).setOrigin(0,0),
            this.add.rectangle(162,219, 3,42).setOrigin(0,0),
            this.add.rectangle(165,261, 3,37).setOrigin(0,0),
            this.add.rectangle(168,298, 3,36).setOrigin(0,0),
            this.add.rectangle(171,334, 3,37).setOrigin(0,0),
            this.add.rectangle(174,371, 3,36).setOrigin(0,0),
            this.add.rectangle(177,407, 3,37).setOrigin(0,0),
            this.add.rectangle(180,444, 3,37).setOrigin(0,0),
            this.add.rectangle(183,481, 3,36).setOrigin(0,0),
            this.add.rectangle(186,517, 3,37).setOrigin(0,0),
            this.add.rectangle(189,554, 3,36).setOrigin(0,0),
            this.add.rectangle(192,590, 3,45).setOrigin(0,0),
            this.add.rectangle(195,635, 3,43).setOrigin(0,0),
            this.add.rectangle(199,678, 5,64).setOrigin(0,0),
            this.add.rectangle(204,742, 4,42).setOrigin(0,0),
            this.add.rectangle(208,784, 4,49).setOrigin(0,0),
            this.add.rectangle(212,833, 5,60).setOrigin(0,0),
            this.add.rectangle(216,893, 5,50).setOrigin(0,0),
            this.add.rectangle(221,943, 4,48).setOrigin(0,0),
            this.add.rectangle(225,991, 4,49).setOrigin(0,0),
            this.add.rectangle(229,1040, 4,50).setOrigin(0,0),
            this.add.rectangle(233,1090, 6,67).setOrigin(0,0),
            this.add.rectangle(238,1157, 4,52).setOrigin(0,0),
            this.add.rectangle(241,1209, 5,52).setOrigin(0,0),
            this.add.rectangle(245,1261, 5,52).setOrigin(0,0),
            this.add.rectangle(249,1313, 5,42).setOrigin(0,0),

            this.add.rectangle(253,1358, 11,11).setOrigin(0,0),
            this.add.rectangle(259,1369, 11,11).setOrigin(0,0),
            this.add.rectangle(266,1373, 11,11).setOrigin(0,0),
            this.add.rectangle(272,1377, 11,11).setOrigin(0,0),
            this.add.rectangle(280,1381, 11,11).setOrigin(0,0),
            this.add.rectangle(286,1386, 11,11).setOrigin(0,0),
            this.add.rectangle(295,1392, 11,11).setOrigin(0,0),
            this.add.rectangle(302,1397, 11,11).setOrigin(0,0),
            this.add.rectangle(309,1401, 11,11).setOrigin(0,0),
            this.add.rectangle(317,1407, 11,11).setOrigin(0,0),
            this.add.rectangle(325,1412, 11,11).setOrigin(0,0),
            this.add.rectangle(333,1418, 11,11).setOrigin(0,0),
            this.add.rectangle(343,1424, 11,11).setOrigin(0,0),
            this.add.rectangle(352,1430, 11,11).setOrigin(0,0),
            this.add.rectangle(361,1436, 11,11).setOrigin(0,0),
            this.add.rectangle(370,1442, 11,11).setOrigin(0,0),
            this.add.rectangle(378,1447, 11,11).setOrigin(0,0),
            this.add.rectangle(387,1453, 11,11).setOrigin(0,0),
            this.add.rectangle(397,1460, 11,11).setOrigin(0,0),
            this.add.rectangle(407,1466, 11,11).setOrigin(0,0),
            this.add.rectangle(415,1472, 11,11).setOrigin(0,0),
            this.add.rectangle(424,1478, 11,11).setOrigin(0,0),
            this.add.rectangle(434,1484, 11,11).setOrigin(0,0),
            this.add.rectangle(444,1491, 11,11).setOrigin(0,0),
            this.add.rectangle(454,1498, 11,11).setOrigin(0,0),
            this.add.rectangle(464,1505, 11,11).setOrigin(0,0),
            this.add.rectangle(474,1511, 11,11).setOrigin(0,0),
            this.add.rectangle(484,1518, 11,11).setOrigin(0,0),
            this.add.rectangle(494,1525, 11,11).setOrigin(0,0),
            this.add.rectangle(504,1532, 11,11).setOrigin(0,0),
            this.add.rectangle(514,1539, 11,11).setOrigin(0,0),
            this.add.rectangle(524,1546, 11,11).setOrigin(0,0),
            this.add.rectangle(534,1557, 11,11).setOrigin(0,0),
            this.add.rectangle(544,1560, 11,11).setOrigin(0,0),
            this.add.rectangle(554,1567, 11,11).setOrigin(0,0),
            this.add.rectangle(564,1574, 11,11).setOrigin(0,0),
            this.add.rectangle(574,1581, 11,11).setOrigin(0,0),
            this.add.rectangle(584,1588, 11,11).setOrigin(0,0),
            this.add.rectangle(594,1595, 11,11).setOrigin(0,0),
            this.add.rectangle(604,1602, 11,11).setOrigin(0,0),
            this.add.rectangle(614,1609, 11,11).setOrigin(0,0),
            this.add.rectangle(624,1616, 11,11).setOrigin(0,0),
            this.add.rectangle(634,1619, 11,11).setOrigin(0,0),
            this.add.rectangle(644,1623, 11,11).setOrigin(0,0),
            this.add.rectangle(654,1632, 11,11).setOrigin(0,0),
            this.add.rectangle(664,1640, 11,11).setOrigin(0,0),
            this.add.rectangle(674,1647, 11,11).setOrigin(0,0),
            this.add.rectangle(684,1654, 11,11).setOrigin(0,0),
            this.add.rectangle(694,1661, 11,11).setOrigin(0,0),
            this.add.rectangle(704,1668, 11,11).setOrigin(0,0),
            this.add.rectangle(714,1675, 11,11).setOrigin(0,0),
            this.add.rectangle(724,1680, 11,11).setOrigin(0,0),
            this.add.rectangle(734,1685, 11,11).setOrigin(0,0),
            this.add.rectangle(744,1690, 11,11).setOrigin(0,0),
            this.add.rectangle(754,1700, 11,11).setOrigin(0,0),
            this.add.rectangle(764,1705, 11,11).setOrigin(0,0),
            this.add.rectangle(774,1715, 11,11).setOrigin(0,0),
            this.add.rectangle(784,1720, 11,11).setOrigin(0,0),
            this.add.rectangle(794,1730, 11,11).setOrigin(0,0),
            this.add.rectangle(804,1735, 11,11).setOrigin(0,0),
            this.add.rectangle(814,1740, 11,11).setOrigin(0,0),
            this.add.rectangle(824,1745, 11,11).setOrigin(0,0),
            this.add.rectangle(834,1755, 11,11).setOrigin(0,0),
            this.add.rectangle(844,1760, 11,11).setOrigin(0,0),
            this.add.rectangle(854,1765, 11,11).setOrigin(0,0),
            this.add.rectangle(864,1775, 11,11).setOrigin(0,0),
            this.add.rectangle(874,1780, 11,11).setOrigin(0,0),
            this.add.rectangle(884,1785, 11,11).setOrigin(0,0),
            this.add.rectangle(894,1795, 11,11).setOrigin(0,0),
            this.add.rectangle(904,1800, 11,11).setOrigin(0,0),
            this.add.rectangle(914,1805, 11,11).setOrigin(0,0),
            this.add.rectangle(924,1815, 11,11).setOrigin(0,0),
            this.add.rectangle(934,1820, 11,11).setOrigin(0,0),
            this.add.rectangle(944,1825, 11,11).setOrigin(0,0),
            this.add.rectangle(954,1835, 11,11).setOrigin(0,0),
            this.add.rectangle(964,1840, 11,11).setOrigin(0,0),
            this.add.rectangle(974,1845, 11,11).setOrigin(0,0),
            this.add.rectangle(984,1855, 11,11).setOrigin(0,0),
            this.add.rectangle(994,1860, 11,11).setOrigin(0,0),
            this.add.rectangle(1004,1865, 11,11).setOrigin(0,0),
            this.add.rectangle(1014,1875, 11,11).setOrigin(0,0),
            this.add.rectangle(1024,1880, 11,11).setOrigin(0,0),
            this.add.rectangle(1034,1885, 11,11).setOrigin(0,0),
            this.add.rectangle(1044,1895, 11,11).setOrigin(0,0),
            this.add.rectangle(1054,1900, 11,11).setOrigin(0,0),
            this.add.rectangle(1064,1905, 11,11).setOrigin(0,0),
            this.add.rectangle(1074,1915, 11,11).setOrigin(0,0),
            this.add.rectangle(1081,1897, 11,11).setOrigin(0,0),
            this.add.rectangle(1095,1879, 11,11).setOrigin(0,0),
            this.add.rectangle(1101,1871, 11,11).setOrigin(0,0),
        ]);

        //estructuracion del mapa.1 - zonas que llevarán al jugador a un escenario mas detallado del edificio.
        
        //poliplaza
        this.aPoliplaza1 = this.add.zone(217,803,231,1).setOrigin(0,0);
        this.physics.add.existing(this.aPoliplaza1,true);

        this.aPoliplaza2 = this.add.zone(450,758,1,45).setOrigin(0,0);
        this.physics.add.existing(this.aPoliplaza2,true);

        //edificio A 
        this.alEdificioA1 = this.add.rectangle(538, 955, 44, 48, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA1);
        this.alEdificioA1.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionA');
            this.scene.transition({target:'coop', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioA2 = this.add.rectangle(432, 927, 680, 28, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA2);
        this.alEdificioA2.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionA');
            this.scene.transition({target:'edificioAP0', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioA3 = this.add.rectangle(432, 1003, 680, 28, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioA3);
        this.alEdificioA3.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionA');
            this.scene.transition({target:'coop', duration:300, sleep:true, moveBelow:true});
        });


        //edificio B no se confundan porque dice "B1" o "B2", es así porque son 2 rectangulos
        this.alEdificioB1 = this.add.rectangle(559,638,36,120,0xffffff).setOrigin(0,0);
        this.alEdificioB2 = this.add.rectangle(595,682,518,28,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioB1);
        this.physics.add.existing(this.alEdificioB2);
        this.alEdificioB1.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionBespecial');
            this.scene.transition({target:'edificioBP00', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioB2.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionB');
            this.scene.transition({target:'edificioBP0', duration:300, sleep:true, moveBelow:true});
        });

        //edificio C
        this.alEdificioC = this.add.rectangle(785,560, 340, 28, 0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioC);
        this.alEdificioC.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionC');
            this.scene.transition({target:'edificioCP0', duration:300, sleep:true, moveBelow:true});
        });

        //edificio D, misma mierda que con el B
        this.alEdificioD1 = this.add.rectangle(630,307,27,96,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD1);
        this.alEdificioD1.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionD');
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });
        this.alEdificioD2 = this.add.rectangle(657,307,460,28,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioD2);
        this.alEdificioD2.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionD');
            this.scene.transition({target:'edificioDP0', duration:300, sleep:true, moveBelow:true});
        });

        //edificio E
        this.alEdificioE = this.add.rectangle(566,190,552,34,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioE);
        this.alEdificioE.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionE');
            this.scene.transition({target:'edificioEP0', duration:300, sleep:true, moveBelow:true});
        });

        //edificio F
        this.alEdificioF = this.add.rectangle(1291,268,429,28,0xffffff).setOrigin(0,0);
        this.physics.add.existing(this.alEdificioF);
        this.alEdificioF.on('pointerdown', ()=>{
            this.bgm.pause();
            this.registry.events.emit('reconstruccionF');
            this.scene.transition({target:'edificioFP0', duration:300, sleep:true, moveBelow:true});
        })


        //estructuración del mapa.2 - zonas donde apareceran enemigos genericos
        this.zonasDeBatalla = this.physics.add.staticGroup([
            //zona entre el B y el A
            this.add.zone(590,801,492,99).setOrigin(0,0), 
            //camellones(? debajo del A
            this.add.zone(434,1091,287,15).setOrigin(0,0),
            //Polipasto (arriba del E)
            this.add.zone(149,41,1029,83).setOrigin(0,0),
            this.add.zone(243,1158,498,193).setOrigin(0,0),
            this.add.zone(396,1350,280,106).setOrigin(0,0),
            this.add.zone(677,1350,40,42).setOrigin(0,0),
            this.add.zone(677,1393,17,35).setOrigin(0,0),
            this.add.zone(677,1429,8,13).setOrigin(0,0),
            this.add.zone(484,1457,155,56).setOrigin(0,0),
            this.add.zone(1118,125,54,278).setOrigin(0,0),
            this.add.zone(565,224,552,82).setOrigin(0,0),
            this.add.zone(172,125,393,180).setOrigin(0,0),
            this.add.zone(172,306,351,96).setOrigin(0,0),
            this.add.zone(586,436,152,134).setOrigin(0,0),
            this.add.zone(742,485,42,22).setOrigin(0,0),
            this.add.zone(742,435,334,49).setOrigin(0,0),
            this.add.zone(196,402,327,173).setOrigin(0,0),
            this.add.zone(524,403,25,165).setOrigin(0,0),
            this.add.zone(1208,41,37,403).setOrigin(0,0),
            this.add.zone(1246,230,494,36).setOrigin(0,0),
            this.add.zone(1246,387,407,47).setOrigin(0,0),
            this.add.zone(1717,267,23,101).setOrigin(0,0),
            this.add.zone(1654,360,20,49).setOrigin(0,0),
            this.add.zone(1655,360,48,31).setOrigin(0,0),
            this.add.zone(1704,356,15,26).setOrigin(0,0),
            this.add.zone(1246,267,44,119).setOrigin(0,0),
            this.add.zone(1686,205,54,24).setOrigin(0,0),
            this.add.zone(1650,207,35,22).setOrigin(0,0),
            this.add.zone(1615,209,34,20).setOrigin(0,0),
            this.add.zone(1564,212,50,17).setOrigin(0,0),
            this.add.zone(1517,215,46,13).setOrigin(0,0),
            this.add.zone(813,1088,236,11).setOrigin(0,0),
            this.add.zone(842,1163,131,212).setOrigin(0,0),
            this.add.zone(1088,1163,145,145).setOrigin(0,0),
            this.add.zone(1088,1309,143,4).setOrigin(0,0),
            this.add.zone(1088,1314,139,4).setOrigin(0,0),
            this.add.zone(1088,1319,97,56).setOrigin(0,0),
            this.add.zone(1186,1319,4,49).setOrigin(0,0),
            this.add.zone(1191,1319,4,42).setOrigin(0,0),
            this.add.zone(1196,1319,5,35).setOrigin(0,0),
            this.add.zone(1202,1319,5,27).setOrigin(0,0),
            this.add.zone(1202,1319,5,27).setOrigin(0,0),
            this.add.zone(1208,1319,4,19).setOrigin(0,0),
            this.add.zone(1213,1319,5,11).setOrigin(0,0),
            this.add.zone(1224,1314,3,4).setOrigin(0,0),
            this.add.zone(1207,446,27,638).setOrigin(0,0),
            this.add.zone(1235,971,423,56).setOrigin(0,0),
            this.add.zone(1235,645,421,17).setOrigin(0,0),
            this.add.zone(1235,663,279,101).setOrigin(0,0),
            this.add.zone(1515,739,142,29).setOrigin(0,0),
            this.add.zone(1616,663,40,75).setOrigin(0,0),
            this.add.zone(1479,638,177,6).setOrigin(0,0)
        ]);

        //creacion de NPCs
        this.martha = this.physics.add.staticSprite(395, 1050, 'spritemilia').setInteractive();
        this.patch = this.physics.add.staticSprite(334, 1020, 'spriteknowledge').setInteractive();
        this.eli = this.physics.add.staticSprite(1194,914,'eliSprite',4).setInteractive();
        this.eli.anims.play('stalleli');
        this.maria = this.physics.add.staticSprite(997,1348,'mariaSprite').setInteractive();
        this.maria.anims.play('stallmariaow');

        //interacciones de los NPCs al ser clickeados (dialogos)
        this.data.set('patchFirstTalk', true);
        this.patch.on('pointerdown',()=>{
            if(this.data.get('patchFirstTalk') == true){
                this.registry.events.emit('dialogarmulti', 1, this.scene.key);
                this.data.set('patchFirstTalk', false);
                this.registry.values.progreso ++;
            }else{
                this.registry.events.emit('dialogar', 1,this.scene.key);    
            }
        });

        this.data.set('marthaFirstTalk', true);
        this.martha.on('pointerdown', ()=>{
            if (this.registry.values.progreso >= 3){
                if(this.data.get('marthaFirstTalk') == false && this.registry.values.progreso == 3){
                    this.registry.events.emit('dialogarprogresomulti', 2, this.scene.key,2);
                    this.data.set('marthaFirstTalk', true);
                    this.registry.values.progreso++;
                }else{
                    this.registry.events.emit('dialogarprogreso', 2,this.scene.key,2);    
                };
            }else{
                if(this.data.get('marthaFirstTalk') == true && this.registry.values.progreso == 1){
                    this.registry.events.emit('dialogarprogresomulti', 2, this.scene.key, 1);
                    this.data.set('marthaFirstTalk', false);
                    this.registry.values.progreso++;
                }else{
                    this.registry.events.emit('dialogarprogreso', 2,this.scene.key, 1);    
                };
            };
        });

        this.data.values.eliFT = true;
        this.eli.on('pointerdown', ()=>{
            if (this.registry.values.progreso == 6 && this.data.values.eliFT == true){
                this.registry.events.emit('dialogarmulti', 0, this.scene.key);
                this.data.values.eliFT = false
            }else{
                if(Phaser.Math.Between(0,50) == 1){
                    this.registry.events.emit('dialogareli', true, this.scene.key);
                    this.eli.anims.play('polloeli');
                    this.time.delayedCall(150,()=>{
                        this.eli.anims.play('stalleli');
                    })
                }else{
                    this.registry.events.emit('dialogareli', false, this.scene.key);
                };
            };
        });

        this.data.values.mariaFT = true;
        this.maria.on('pointerdown',()=>{//atención, esto es importante para los demás jefes
            if(this.registry.values.playerStats.lvl >= 7 && this.registry.values.progreso == 6){//primero se comprueba tanto si el jugador alcanzó la bandera necesaria para poder enfrentarse a él como si cumple el nivel para ello
                this.registry.events.emit('dialogarprejefe',this.scene.key,true, 3);//en caso de cumplir ambas, comienza un dialogoprejefe, enviando la key de esta escena, un true de que es true va a peliar y su ID
                this.time.delayedCall(200, ()=>{//y 200 ms despues de haber cerrado la caja 
                    this.bgm.pause();
                    this.registry.events.emit('transicionacombatejefe', this.scene.key, 3);//comienza el combate, dando la key de esta escena y el ID del jefe
                });
            }else if(this.registry.values.playerStats.lvl <= 7){//sino, si el jugador no tiene el nivel adecuado
                this.registry.events.emit('dialogarprejefe',this.scene.key,false, 3);//llama un dialogo prejefe; dando la key de la escena, diciendo que no peleará y dando su ID
                //aviso: no sé que suceda si vas a hablar con él sin haber cumplido las banderas
            }else if(this.registry.values.progreso >= 7 && this.data.values.mariaFT == true){//entonces, si ya lo derrotaste y hablas con él
                this.registry.events.emit('dialogarpostjefe',this.scene.key,true, 3);//lanzará un monologo con lore
                this.data.values.mariaFT = false;//y dirá "simon, el wey ya hablo conmigo"
                this.eli.destroy();
                this.registry.values.eliEnE=true;
            }else{//sino
                this.registry.events.emit('dialogarpostjefe',this.scene.key,false, 3);//te da un dialogo generico
            };
        })

        //creacion del this.jugador y detalles
        this.jugador = this.physics.add.sprite(294, 983, 'playersprite');
        this.jugador.setBodySize(12,18, true);
        this.jugador.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.jugador,[this.martha, this.patch, this.eli, this.maria/*y todos los demas objetos/personajes que se agreguen*/]);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.on('animationrepeat', ()=>{
            //esta madre es para los pasos, necesitará acomodarse según los assets finales 
            this.sound.play('stone' + Phaser.Math.Between(1,6), {rate:1.5});
        });
        //estructuracion del mapa.0.1 - el COLLIDER que evitará que el jugador traspase lo que no debe
        this.physics.add.collider(this.jugador,this.edificios);

        //estructuracion del mapa.1.1 - el OVERLAP entre el jugador y los rectangulos de los edificios;
        this.physics.add.collider(this.jugador, this.aPoliplaza1,() =>{
            this.jugador.setPosition(this.jugador.getBounds().centerX, this.jugador.getBounds().centerY + 10);
            this.registry.events.emit('aviso', 'Poliplaza, nada interesante ahí.');
            /*this.bgm.pause();
            this.registry.events.emit('reconstruccionPP');
            this.scene.transition({target:'poliplaza0', duration:300, sleep:true, sleep:true, moveBelow:true});*/
        });

        this.physics.add.collider(this.jugador, this.aPoliplaza2,() =>{
            this.jugador.setPosition(this.jugador.getBounds().centerX + 10, this.jugador.getBounds().centerY);
            this.registry.events.emit('aviso', 'Poliplaza, nada interesante ahí.');
            /*this.bgm.pause();
            this.registry.events.emit('reconstruccionPP');
            this.scene.transition({target:'poliplaza0', duration:300, sleep:true, moveBelow:true});*/
        });
        this.physics.add.overlap(this.jugador,[this.alEdificioA1, this.alEdificioA2, this.alEdificioA3, this.alEdificioB1, this.alEdificioB2,this.alEdificioC,this.alEdificioD1, this.alEdificioD2,this.alEdificioE, this.alEdificioF]);
       
        //estructuración del mapa.2.1 - creacion del OVERLAP en las zonas de batalla y su funcion.
        /*explicacion: aqui, al momento del jugador estar sobre las zonas, se genera un numero y si cumple el if, se verifica que la 
        escena de combate exista, sino, llama a un evento que la crea*/
        this.physics.add.overlap(this.jugador, this.zonasDeBatalla, ()=>{
            console.log('esta contando');
            pelea = Phaser.Math.Between(0,1250/*no se un buen numero*/) 
            if(pelea >= 40 && pelea <= 43){
                if(this.scene.isActive('combate') != null){
                    this.bgm.pause();
                    this.registry.events.emit('transicionacombate');
                }else{
                    this.registry.events.emit('repararcombate');
                }
            };
        });

        //creacion del overlay de edificios
        this.polimapaOverlay = this.add.image(0,0,'polimapaOverlay').setOrigin(0,0);

        //Input jaja
        this.mov = this.input.keyboard.createCursorKeys();
        
        
        //Tecla para abrir el mapa
        this.map = this.input.keyboard.addKey('M');
        this.map.on('down', ()=>{
            this.registry.events.emit('mostrarmapa', this.jugador.getBounds().centerX, this.jugador.getBounds().centerY)
        });

        //detalles de las transiciones
        this.events.on('transitioncomplete', (fromScene, duration)=>{
            if(fromScene.scene.key == 'transicionACombate'){
                this.cameras.main.fadeFrom(400, 0, 0, 0);
                this.bgm.resume();
                this.scene.resume(this);
                
            }else{
                this.registry.events.emit('destruccion' + fromScene.scene.key);
                this.cameras.main.fadeFrom(400, 0, 0, 0);
                this.bgm.resume();
            };
        });

        this.events.on('transitionout',(targetScene, duration)=>{
            this.cameras.main.fadeOut(duration, 0,0,0);
        });

    };

    update(time, delta){
        //overlay de edificios
        this.polimapaOverlay.setAlpha(.3);
        if(this.alEdificioA1.body.touching.none && !this.alEdificioA1.body.embedded.valueOf() && this.alEdificioA2.body.touching.none && !this.alEdificioA2.body.embedded.valueOf() && this.alEdificioA3.body.touching.none && !this.alEdificioA3.body.embedded.valueOf() && this.alEdificioB1.body.touching.none && !this.alEdificioB1.body.embedded.valueOf() && this.alEdificioB2.body.touching.none && !this.alEdificioB2.body.embedded.valueOf() && this.alEdificioC.body.touching.none && !this.alEdificioC.body.embedded.valueOf() && this.alEdificioD1.body.touching.none && !this.alEdificioD1.body.embedded.valueOf() && this.alEdificioD2.body.touching.none && !this.alEdificioD2.body.embedded.valueOf() && this.alEdificioE.body.touching.none && !this.alEdificioE.body.embedded.valueOf()&& this.alEdificioF.body.touching.none && !this.alEdificioF.body.embedded.valueOf()){
            this.polimapaOverlay.setAlpha(1);
        };
        //Lineas relacionadas al transporte del jugador        
        this.alEdificioA1.setVisible(true).setInteractive();
        this.alEdificioA2.setVisible(true).setInteractive();
        this.alEdificioA3.setVisible(true).setInteractive();
        if(this.alEdificioA1.body.touching.none && !this.alEdificioA1.body.embedded.valueOf() && this.alEdificioA2.body.touching.none && !this.alEdificioA2.body.embedded.valueOf() && this.alEdificioA3.body.touching.none && !this.alEdificioA3.body.embedded.valueOf()){
            this.alEdificioA1.setVisible(false).disableInteractive();
            this.alEdificioA2.setVisible(false).disableInteractive();
            this.alEdificioA3.setVisible(false).disableInteractive();
        };

        this.alEdificioB1.setVisible(true).setInteractive();
        this.alEdificioB2.setVisible(true).setInteractive();
        if(this.alEdificioB1.body.touching.none && !this.alEdificioB1.body.embedded.valueOf() && this.alEdificioB2.body.touching.none && !this.alEdificioB2.body.embedded.valueOf()){
            this.alEdificioB1.setVisible(false).disableInteractive();
            this.alEdificioB2.setVisible(false).disableInteractive();
        };

        this.alEdificioC.setVisible(true).setInteractive();
        if(this.alEdificioC.body.touching.none && !this.alEdificioC.body.embedded.valueOf()){
            this.alEdificioC.setVisible(false).disableInteractive();
        };

        this.alEdificioD1.setVisible(true).setInteractive();
        this.alEdificioD2.setVisible(true).setInteractive();
        if(this.alEdificioD1.body.touching.none && !this.alEdificioD1.body.embedded.valueOf() && this.alEdificioD2.body.touching.none && !this.alEdificioD2.body.embedded.valueOf()){
            this.alEdificioD1.setVisible(false).disableInteractive();
            this.alEdificioD2.setVisible(false).disableInteractive();
        };

        this.alEdificioE.setVisible(true).setInteractive();
        if(this.alEdificioE.body.touching.none && !this.alEdificioE.body.embedded.valueOf()){
            this.alEdificioE.setVisible(false).disableInteractive();
        };

        this.alEdificioF.setVisible(true).setInteractive();
        if(this.alEdificioF.body.touching.none && !this.alEdificioF.body.embedded.valueOf()){
            this.alEdificioF.setVisible(false).disableInteractive();
        };

        //Cosas relacionadas al movimiento del jugador
        this.jugador.body.setVelocity(0);
        if (this.mov.right.isDown){
            this.jugador.body.setVelocityX(500);
            this.jugador.anims.play('right_walk',true);
        }else if (this.mov.left.isDown){
            this.jugador.body.setVelocityX(-500);
            this.jugador.anims.play('left_walk', true);
        }else if (this.mov.up.isDown){
            this.jugador.body.setVelocityY(-500);
            this.jugador.anims.play('top_walk', true);
        }else if (this.mov.down.isDown){
            this.jugador.body.setVelocityY(500);
            this.jugador.anims.play('bot_walk', true);
        }else{
            this.jugador.anims.pause();
            //this.jugador.anims.play('stall', true); esta es una opción, principalmente en caso de tener un sprite para eso
        };

    }
}