const rooms = {
hub:{id:'hub', name:'CENTRO DE CONTROL', theme:'hub',
walls:[
// Solo bordes con huecos para puertas
{x:0,y:0,w:120,h:T},{x:210,y:0,w:120,h:T},{x:420,y:0,w:120,h:T},
{x:630,y:0,w:120,h:T},{x:840,y:0,w:120,h:T},
{x:0,y:H-T,w:120,h:T},{x:210,y:H-T,w:120,h:T},{x:420,y:H-T,w:120,h:T},
{x:630,y:H-T,w:120,h:T},{x:840,y:H-T,w:120,h:T},
{x:0,y:0,w:T,h:H},{x:W-T,y:0,w:T,h:H},
// Columnas sueltas (nunca se tocan entre sí)
{x:200,y:180,w:40,h:40},
{x:720,y:180,w:40,h:40},
{x:200,y:380,w:40,h:40},
{x:720,y:380,w:40,h:40},
{x:460,y:180,w:40,h:40},
{x:460,y:380,w:40,h:40},
{x:300,y:280,w:80,h:40},
{x:580,y:280,w:80,h:40}
],
doors:[
{x:120,y:0,w:90,h:55,target:'cam1',label:'CAM 1'},
{x:330,y:0,w:90,h:55,target:'trap1',label:'LAB-0X'},
{x:540,y:0,w:90,h:55,target:'cam2',label:'CAM 2'},
{x:750,y:0,w:90,h:55,target:'trap2',label:'ARCH-2'},
{x:120,y:H-55,w:90,h:55,target:'cam3',label:'CAM 3'},
{x:330,y:H-55,w:90,h:55,target:'trap3',label:'SERV-9'},
{x:540,y:H-55,w:90,h:55,target:'cam4',label:'CAM 4'},
{x:750,y:H-55,w:90,h:55,target:'cam5',label:'CAM 5'}
],
enemies:[{ax:150,ay:290, bx:800,by:290, speed:80, t:0.2, dir:1, x:150, y:290}],
lasers:[],
objects:[], spawn:{x:450,y:290}
},
cam1:{id:'cam1',name:'CAMARA 1 - ACTIVACION',theme:'cam1',
walls:[
...simpleWalls(),
// Columnas dispersas que crean pasillos anchos
{x:180,y:120,w:40,h:40},{x:380,y:120,w:40,h:40},{x:580,y:120,w:40,h:40},{x:760,y:120,w:40,h:40},
{x:180,y:480,w:40,h:40},{x:380,y:480,w:40,h:40},{x:580,y:480,w:40,h:40},{x:760,y:480,w:40,h:40},
{x:280,y:240,w:40,h:40},{x:480,y:240,w:40,h:40},{x:680,y:240,w:40,h:40},
{x:280,y:360,w:40,h:40},{x:480,y:360,w:40,h:40},{x:680,y:360,w:40,h:40},
{x:80,y:290,w:40,h:40},{x:880,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:0}],
enemies:[
{ax:200,ay:200, bx:750,by:200, speed:120, t:0, dir:1, x:200, y:200},
{ax:200,ay:440, bx:750,by:440, speed:130, t:0.5, dir:-1, x:200, y:440}
],
lasers:[
{x:100,y:290,w:80,h:8,period:2.4,phase:0,duty:0.55},
{x:750,y:290,w:100,h:8,period:2,phase:0.4,duty:0.5}
],
objects:[
{x:400,y:400,w:140,h:100,type:'terminal',puzzle:'cam1',label:'TERMINAL 1'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:810,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam2:{id:'cam2',name:'CAMARA 2 - DIAGNOSTICO',theme:'cam2',
walls:[
...simpleWalls(),
{x:200,y:140,w:40,h:40},{x:400,y:140,w:40,h:40},{x:600,y:140,w:40,h:40},{x:760,y:140,w:40,h:40},
{x:200,y:440,w:40,h:40},{x:400,y:440,w:40,h:40},{x:600,y:440,w:40,h:40},{x:760,y:440,w:40,h:40},
{x:100,y:290,w:40,h:40},{x:300,y:290,w:40,h:40},{x:500,y:290,w:40,h:40},{x:700,y:290,w:40,h:40},
{x:400,y:290,w:40,h:40},{x:600,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:2}],
enemies:[
{ax:200,ay:220, bx:750,by:220, speed:140, t:0, dir:1, x:200, y:220},
{ax:200,ay:400, bx:750,by:400, speed:130, t:0.5, dir:-1, x:200, y:400}
],
lasers:[
{x:100,y:220,w:80,h:8,period:2.2,phase:0,duty:0.5},
{x:750,y:400,w:100,h:8,period:2.6,phase:0.3,duty:0.55}
],
objects:[
{x:400,y:180,w:140,h:100,type:'terminal',puzzle:'cam2',label:'TERMINAL 2'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:810,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam3:{id:'cam3',name:'CAMARA 3 - ANALISIS',theme:'cam3',
walls:[
...simpleWalls(),
{x:140,y:140,w:40,h:40},{x:340,y:140,w:40,h:40},{x:540,y:140,w:40,h:40},{x:740,y:140,w:40,h:40},
{x:140,y:440,w:40,h:40},{x:340,y:440,w:40,h:40},{x:540,y:440,w:40,h:40},{x:740,y:440,w:40,h:40},
{x:240,y:290,w:40,h:40},{x:440,y:290,w:40,h:40},{x:640,y:290,w:40,h:40},
{x:800,y:290,w:40,h:40},{x:80,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:4}],
enemies:[
{ax:200,ay:200, bx:720,by:200, speed:150, t:0, dir:1, x:200, y:200},
{ax:200,ay:400, bx:720,by:400, speed:140, t:0.5, dir:-1, x:200, y:400}
],
lasers:[
{x:100,y:240,w:100,h:8,period:2.4,phase:0.2,duty:0.55},
{x:760,y:360,w:120,h:8,period:2,phase:0.5,duty:0.5}
],
objects:[
{x:760,y:180,w:140,h:100,type:'terminal',puzzle:'cam3',label:'TERMINAL 3'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam4:{id:'cam4',name:'CAMARA 4 - APLICACION',theme:'cam4',
walls:[
...simpleWalls(),
{x:160,y:160,w:40,h:40},{x:360,y:160,w:40,h:40},{x:560,y:160,w:40,h:40},{x:760,y:160,w:40,h:40},
{x:160,y:440,w:40,h:40},{x:360,y:440,w:40,h:40},{x:560,y:440,w:40,h:40},{x:760,y:440,w:40,h:40},
{x:260,y:290,w:40,h:40},{x:460,y:290,w:40,h:40},{x:660,y:290,w:40,h:40},
{x:80,y:290,w:40,h:40},{x:860,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:6}],
enemies:[
{ax:200,ay:220, bx:400,by:220, speed:140, t:0, dir:1, x:200, y:220},
{ax:560,ay:220, bx:720,by:220, speed:160, t:0.5, dir:-1, x:560, y:220},
{ax:200,ay:400, bx:400,by:400, speed:130, t:0.2, dir:-1, x:200, y:400},
{ax:560,ay:400, bx:720,by:400, speed:150, t:0.7, dir:1, x:560, y:400}
],
lasers:[
{x:100,y:290,w:80,h:8,period:2,phase:0,duty:0.5},
{x:800,y:290,w:80,h:8,period:2.4,phase:0.3,duty:0.55}
],
objects:[
{x:400,y:330,w:160,h:100,type:'terminal',puzzle:'cam4',label:'TERMINAL 4'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:810,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam5:{id:'cam5',name:'CAMARA 5 - VERIFICACION',theme:'cam5',
walls:[
...simpleWalls(),
{x:140,y:140,w:40,h:40},{x:340,y:140,w:40,h:40},{x:540,y:140,w:40,h:40},{x:740,y:140,w:40,h:40},
{x:140,y:440,w:40,h:40},{x:340,y:440,w:40,h:40},{x:540,y:440,w:40,h:40},{x:740,y:440,w:40,h:40},
{x:240,y:290,w:40,h:40},{x:440,y:290,w:40,h:40},{x:640,y:290,w:40,h:40},
{x:80,y:290,w:40,h:40},{x:840,y:290,w:40,h:40},
{x:440,y:200,w:40,h:40},{x:440,y:380,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:7}],
enemies:[
{ax:200,ay:200, bx:720,by:200, speed:170, t:0, dir:1, x:200, y:200},
{ax:200,ay:400, bx:720,by:400, speed:150, t:0.5, dir:-1, x:200, y:400},
{ax:400,ay:300, bx:520,by:300, speed:180, t:0, dir:1, x:400, y:300}
],
lasers:[
{x:100,y:240,w:100,h:8,period:2,phase:0.1,duty:0.5},
{x:760,y:360,w:100,h:8,period:2.4,phase:0.4,duty:0.55},
{x:340,y:290,w:80,h:8,period:2,phase:0.7,duty:0.5}
],
objects:[
{x:400,y:480,w:140,h:80,type:'terminal',puzzle:'cam5',label:'TERMINAL 5'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:810,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
trap1:{id:'trap1',name:'LAB-0X - TRAMPA',theme:'trap1',
walls:[
...simpleWalls(),
{x:200,y:160,w:40,h:40},{x:400,y:160,w:40,h:40},{x:600,y:160,w:40,h:40},
{x:200,y:420,w:40,h:40},{x:400,y:420,w:40,h:40},{x:600,y:420,w:40,h:40},
{x:300,y:290,w:40,h:40},{x:500,y:290,w:40,h:40},{x:700,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:1}],
enemies:[
{ax:280,ay:220, bx:700,by:220, speed:130, t:0, dir:1, x:280, y:220},
{ax:280,ay:380, bx:700,by:380, speed:140, t:0.5, dir:-1, x:280, y:380}
],
lasers:[{x:100,y:290,w:100,h:8,period:2.2,phase:0.3,duty:0.5}],
objects:[
{x:400,y:250,w:140,h:100,type:'console',trap:'trap1',label:'CONSOLA SOSPECHOSA'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'?'},
{x:810,y:520,w:90,h:70,type:'decoy',label:'?'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}},
trap2:{id:'trap2',name:'ARCH-2 - TRAMPA',theme:'trap2',
walls:[
...simpleWalls(),
{x:160,y:140,w:40,h:40},{x:360,y:140,w:40,h:40},{x:560,y:140,w:40,h:40},{x:760,y:140,w:40,h:40},
{x:160,y:440,w:40,h:40},{x:360,y:440,w:40,h:40},{x:560,y:440,w:40,h:40},{x:760,y:440,w:40,h:40},
{x:260,y:290,w:40,h:40},{x:460,y:290,w:40,h:40},{x:660,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:3}],
enemies:[
{ax:180,ay:220, bx:780,by:220, speed:160, t:0, dir:1, x:180, y:220},
{ax:180,ay:400, bx:780,by:400, speed:170, t:0.4, dir:-1, x:180, y:400}
],
lasers:[
{x:100,y:290,w:100,h:8,period:2,phase:0.2,duty:0.5},
{x:760,y:290,w:100,h:8,period:2.4,phase:0.5,duty:0.55}
],
objects:[
{x:400,y:180,w:140,h:100,type:'console',trap:'trap2',label:'ARCHIVO CORRUPTO'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'?'},
{x:810,y:520,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}},
trap3:{id:'trap3',name:'SERV-9 - TRAMPA',theme:'trap3',
walls:[
...simpleWalls(),
{x:180,y:140,w:40,h:40},{x:380,y:140,w:40,h:40},{x:580,y:140,w:40,h:40},
{x:180,y:440,w:40,h:40},{x:380,y:440,w:40,h:40},{x:580,y:440,w:40,h:40},
{x:280,y:290,w:40,h:40},{x:480,y:290,w:40,h:40},{x:680,y:290,w:40,h:40}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:5}],
enemies:[
{ax:200,ay:220, bx:620,by:220, speed:160, t:0, dir:1, x:200, y:220},
{ax:200,ay:400, bx:620,by:400, speed:150, t:0.5, dir:-1, x:200, y:400}
],
lasers:[
{x:100,y:290,w:100,h:8,period:2.2,phase:0.3,duty:0.5},
{x:760,y:290,w:100,h:8,period:2.4,phase:0.6,duty:0.5}
],
objects:[
{x:400,y:280,w:160,h:100,type:'console',trap:'trap3',label:'SERVIDOR SOSPECHOSO'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'?'},
{x:810,y:520,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}}
};
