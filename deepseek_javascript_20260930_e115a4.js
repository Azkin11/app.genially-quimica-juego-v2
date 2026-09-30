const rooms = {
hub:{id:'hub', name:'CENTRO DE CONTROL', theme:'hub',
walls:[
// Border con huecos para puertas
{x:0,y:0,w:120,h:T},{x:210,y:0,w:120,h:T},{x:420,y:0,w:120,h:T},
{x:630,y:0,w:120,h:T},{x:840,y:0,w:120,h:T},
{x:0,y:H-T,w:120,h:T},{x:210,y:H-T,w:120,h:T},{x:420,y:H-T,w:120,h:T},
{x:630,y:H-T,w:120,h:T},{x:840,y:H-T,w:120,h:T},
{x:0,y:0,w:T,h:H},{x:W-T,y:0,w:T,h:H},
// Obstaculos libres (NO forman cajas)
{x:100,y:200,w:180,h:20},{x:100,y:380,w:180,h:20},
{x:600,y:200,w:260,h:20},{x:600,y:380,w:260,h:20},
{x:280,y:100,w:20,h:120},{x:280,y:380,w:20,h:120},
{x:660,y:100,w:20,h:120},{x:660,y:380,w:20,h:120},
{x:400,y:280,w:160,h:20},{x:400,y:200,w:20,h:80},
{x:540,y:300,w:20,h:80},{x:180,y:520,w:150,h:20},
{x:620,y:520,w:150,h:20}
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
enemies:[{ax:150,ay:150, bx:800,by:150, speed:80, t:0.2, dir:1, x:150, y:150}],
lasers:[],
objects:[], spawn:{x:450,y:340}
},
cam1:{id:'cam1',name:'CAMARA 1 - ACTIVACION',theme:'cam1',
walls:[
...simpleWalls(),
{x:120,y:100,w:20,h:200},{x:120,y:100,w:160,h:20},
{x:300,y:180,w:20,h:180},{x:300,y:180,w:200,h:20},
{x:500,y:100,w:20,h:200},{x:500,y:100,w:200,h:20},
{x:700,y:180,w:20,h:200},
{x:120,y:380,w:160,h:20},
{x:300,y:420,w:20,h:120},
{x:500,y:380,w:20,h:120},{x:520,y:380,w:200,h:20},
{x:200,y:480,w:150,h:20}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:0}],
enemies:[
{ax:200,ay:230, bx:450,by:230, speed:120, t:0, dir:1, x:200, y:230},
{ax:600,ay:450, bx:850,by:450, speed:130, t:0.5, dir:-1, x:600, y:450}
],
lasers:[
{x:200,y:320,w:80,h:8,period:2.4,phase:0,duty:0.55},
{x:540,y:240,w:140,h:8,period:2,phase:0.4,duty:0.5}
],
objects:[
{x:400,y:250,w:140,h:100,type:'terminal',puzzle:'cam1',label:'TERMINAL 1'},
{x:760,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:760,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:500}},
cam2:{id:'cam2',name:'CAMARA 2 - DIAGNOSTICO',theme:'cam2',
walls:[
...simpleWalls(),
{x:100,y:100,w:20,h:200},{x:100,y:100,w:180,h:20},
{x:280,y:100,w:20,h:180},{x:280,y:100,w:200,h:20},
{x:480,y:100,w:20,h:180},{x:480,y:100,w:280,h:20},
{x:760,y:100,w:20,h:200},
{x:100,y:380,w:20,h:150},{x:100,y:380,w:200,h:20},
{x:300,y:380,w:20,h:150},
{x:500,y:380,w:20,h:150},{x:500,y:380,w:280,h:20},
{x:760,y:380,w:20,h:150}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:2}],
enemies:[
{ax:220,ay:220, bx:700,by:220, speed:140, t:0, dir:1, x:220, y:220},
{ax:220,ay:520, bx:700,by:520, speed:130, t:0.5, dir:-1, x:220, y:520}
],
lasers:[
{x:120,y:300,w:160,h:8,period:2.2,phase:0,duty:0.5},
{x:300,y:200,w:180,h:8,period:2.6,phase:0.3,duty:0.55},
{x:520,y:480,w:240,h:8,period:2,phase:0.6,duty:0.5}
],
objects:[
{x:400,y:250,w:140,h:100,type:'terminal',puzzle:'cam2',label:'TERMINAL 2'},
{x:760,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam3:{id:'cam3',name:'CAMARA 3 - ANALISIS',theme:'cam3',
walls:[
...simpleWalls(),
{x:100,y:100,w:260,h:20},{x:100,y:100,w:20,h:200},
{x:360,y:100,w:20,h:180},{x:360,y:260,w:180,h:20},
{x:540,y:100,w:20,h:180},
{x:100,y:380,w:20,h:150},{x:100,y:380,w:200,h:20},
{x:300,y:380,w:20,h:150},{x:300,y:520,w:200,h:20},
{x:500,y:380,w:20,h:150},{x:500,y:380,w:280,h:20},
{x:780,y:380,w:20,h:150},
{x:200,y:240,w:150,h:20}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:4}],
enemies:[
{ax:180,ay:200, bx:680,by:200, speed:150, t:0, dir:1, x:180, y:200},
{ax:180,ay:480, bx:680,by:480, speed:140, t:0.5, dir:-1, x:180, y:480}
],
lasers:[
{x:120,y:320,w:200,h:8,period:2.4,phase:0.2,duty:0.55},
{x:560,y:200,w:220,h:8,period:2,phase:0.5,duty:0.5},
{x:120,y:450,w:180,h:8,period:2.6,phase:0,duty:0.5}
],
objects:[
{x:760,y:180,w:140,h:100,type:'terminal',puzzle:'cam3',label:'TERMINAL 3'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:60,y:240,w:80,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam4:{id:'cam4',name:'CAMARA 4 - APLICACION',theme:'cam4',
walls:[
...simpleWalls(),
{x:120,y:120,w:20,h:200},{x:120,y:120,w:180,h:20},
{x:300,y:120,w:20,h:180},{x:300,y:220,w:180,h:20},
{x:480,y:120,w:20,h:180},{x:480,y:120,w:280,h:20},
{x:760,y:120,w:20,h:180},
{x:120,y:400,w:20,h:150},{x:120,y:400,w:200,h:20},
{x:320,y:400,w:20,h:150},{x:320,y:520,w:200,h:20},
{x:520,y:400,w:20,h:150},{x:520,y:400,w:280,h:20},
{x:800,y:400,w:20,h:150},
{x:400,y:300,w:20,h:100},{x:560,y:300,w:20,h:100}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:6}],
enemies:[
{ax:200,ay:240, bx:420,by:240, speed:140, t:0, dir:1, x:200, y:240},
{ax:540,ay:240, bx:720,by:240, speed:160, t:0.5, dir:-1, x:540, y:240},
{ax:220,ay:460, bx:420,by:460, speed:130, t:0.2, dir:-1, x:220, y:460},
{ax:540,ay:460, bx:720,by:460, speed:150, t:0.7, dir:1, x:540, y:460}
],
lasers:[
{x:120,y:340,w:200,h:8,period:2,phase:0,duty:0.5},
{x:500,y:140,w:260,h:8,period:2.4,phase:0.3,duty:0.55},
{x:140,y:410,w:180,h:8,period:2.2,phase:0.6,duty:0.5},
{x:540,y:410,w:260,h:8,period:2,phase:0.1,duty:0.5}
],
objects:[
{x:400,y:330,w:160,h:100,type:'terminal',puzzle:'cam4',label:'TERMINAL 4'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:820,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
cam5:{id:'cam5',name:'CAMARA 5 - VERIFICACION',theme:'cam5',
walls:[
...simpleWalls(),
{x:80,y:100,w:240,h:20},{x:80,y:100,w:20,h:220},
{x:320,y:100,w:20,h:180},{x:320,y:180,w:160,h:20},
{x:480,y:100,w:20,h:120},
{x:480,y:100,w:280,h:20},{x:760,y:100,w:20,h:220},
{x:80,y:400,w:20,h:180},{x:80,y:400,w:260,h:20},
{x:340,y:400,w:20,h:180},{x:340,y:560,w:200,h:20},
{x:540,y:400,w:20,h:180},{x:540,y:400,w:260,h:20},
{x:800,y:400,w:20,h:180},
{x:200,y:260,w:22,h:120},{x:200,y:360,w:140,h:20},
{x:540,y:260,w:22,h:120},{x:540,y:260,w:160,h:20},
{x:640,y:380,w:22,h:120}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:7}],
enemies:[
{ax:180,ay:180, bx:600,by:180, speed:170, t:0, dir:1, x:180, y:180},
{ax:180,ay:500, bx:280,by:500, speed:140, t:0.4, dir:-1, x:180, y:500},
{ax:600,ay:500, bx:720,by:500, speed:150, t:0.6, dir:1, x:600, y:500},
{ax:420,ay:320, bx:500,by:320, speed:180, t:0, dir:1, x:420, y:320}
],
lasers:[
{x:100,y:220,w:200,h:8,period:2,phase:0.1,duty:0.5},
{x:300,y:140,w:160,h:8,period:2.4,phase:0.4,duty:0.55},
{x:600,y:220,w:140,h:8,period:2,phase:0.7,duty:0.5},
{x:100,y:480,w:240,h:8,period:2.2,phase:0.2,duty:0.5},
{x:560,y:480,w:240,h:8,period:2.6,phase:0.5,duty:0.5},
{x:400,y:360,w:140,h:8,period:2,phase:0,duty:0.5}
],
objects:[
{x:400,y:200,w:140,h:100,type:'terminal',puzzle:'cam5',label:'TERMINAL 5'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'},
{x:820,y:520,w:90,h:70,type:'decoy',label:'TERMINAL?'}
],spawn:{x:60,y:530}},
trap1:{id:'trap1',name:'LAB-0X - TRAMPA',theme:'trap1',
walls:[
...simpleWalls(),
{x:200,y:120,w:20,h:200},{x:200,y:120,w:200,h:20},
{x:400,y:120,w:20,h:180},{x:400,y:220,w:180,h:20},
{x:600,y:120,w:20,h:200},
{x:200,y:400,w:20,h:150},{x:200,y:400,w:200,h:20},
{x:400,y:400,w:20,h:150},{x:400,y:520,w:200,h:20},
{x:600,y:400,w:20,h:150}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:1}],
enemies:[
{ax:280,ay:300, bx:560,by:300, speed:130, t:0, dir:1, x:280, y:300},
{ax:280,ay:480, bx:560,by:480, speed:140, t:0.5, dir:-1, x:280, y:480}
],
lasers:[{x:400,y:250,w:180,h:8,period:2.2,phase:0.3,duty:0.5}],
objects:[
{x:400,y:250,w:140,h:100,type:'console',trap:'trap1',label:'CONSOLA SOSPECHOSA'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'?'},
{x:800,y:520,w:90,h:70,type:'decoy',label:'?'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}},
trap2:{id:'trap2',name:'ARCH-2 - TRAMPA',theme:'trap2',
walls:[
...simpleWalls(),
{x:100,y:120,w:20,h:200},{x:100,y:120,w:200,h:20},
{x:300,y:120,w:20,h:180},{x:300,y:280,w:180,h:20},
{x:480,y:120,w:20,h:180},
{x:600,y:120,w:20,h:200},{x:600,y:120,w:280,h:20},
{x:800,y:120,w:20,h:200},
{x:200,y:400,w:20,h:150},{x:200,y:400,w:200,h:20},
{x:400,y:400,w:20,h:150},{x:400,y:520,w:280,h:20},
{x:680,y:400,w:20,h:150}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:3}],
enemies:[
{ax:180,ay:200, bx:280,by:200, speed:160, t:0, dir:1, x:180, y:200},
{ax:420,ay:460, bx:560,by:460, speed:170, t:0.4, dir:-1, x:420, y:460},
{ax:680,ay:200, bx:780,by:200, speed:150, t:0.2, dir:1, x:680, y:200}
],
lasers:[
{x:120,y:380,w:180,h:8,period:2,phase:0.2,duty:0.5},
{x:600,y:380,w:180,h:8,period:2.4,phase:0.5,duty:0.55},
{x:340,y:260,w:200,h:8,period:2.6,phase:0,duty:0.5}
],
objects:[
{x:400,y:180,w:140,h:100,type:'console',trap:'trap2',label:'ARCHIVO CORRUPTO'},
{x:60,y:60,w:90,h:70,type:'decoy',label:'?'},
{x:820,y:520,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}},
trap3:{id:'trap3',name:'SERV-9 - TRAMPA',theme:'trap3',
walls:[
...simpleWalls(),
{x:80,y:140,w:260,h:20},{x:80,y:140,w:20,h:200},
{x:320,y:140,w:20,h:160},{x:320,y:240,w:180,h:20},
{x:480,y:140,w:20,h:160},
{x:480,y:140,w:320,h:20},{x:780,y:140,w:20,h:200},
{x:80,y:420,w:20,h:160},{x:80,y:420,w:200,h:20},
{x:260,y:420,w:20,h:160},{x:260,y:540,w:200,h:20},
{x:440,y:420,w:20,h:160},{x:440,y:420,w:280,h:20},
{x:700,y:420,w:20,h:160}
],
doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:5}],
enemies:[
{ax:200,ay:220, bx:620,by:220, speed:160, t:0, dir:1, x:200, y:220},
{ax:200,ay:480, bx:620,by:480, speed:150, t:0.5, dir:-1, x:200, y:480}
],
lasers:[
{x:100,y:360,w:240,h:8,period:2.2,phase:0.3,duty:0.5},
{x:500,y:360,w:300,h:8,period:2.4,phase:0.6,duty:0.5}
],
objects:[
{x:400,y:280,w:160,h:100,type:'console',trap:'trap3',label:'SERVIDOR SOSPECHOSO'},
{x:60,y:520,w:90,h:70,type:'decoy',label:'?'},
{x:800,y:520,w:90,h:70,type:'decoy',label:'?'}
],spawn:{x:60,y:530}}
};