<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<title>Escape Room CYTE | Carga Nuclear Efectiva</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;
    -webkit-tap-highlight-color:transparent;
    user-select:none;-webkit-user-select:none;
    -webkit-touch-callout:none}
  :root{
    --cyan:#00f0ff;--magenta:#ff00aa;--green:#00ff88;
    --red:#ff3355;--yellow:#ffdd00;--bg:#0a0a12;--panel:#12121f;--border:#1f1f35;
    --hud-h:44px;
  }
  html,body{height:100%;overflow:hidden;position:fixed;width:100%}
  body{
    font-family:'Courier New',monospace;background:var(--bg);color:#e0e0ff;
    background-image:linear-gradient(rgba(0,240,255,.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,240,255,.03) 1px,transparent 1px);
    background-size:40px 40px;
    touch-action:none;
  }

  /* ===== OVERLAYS ===== */
  .overlay{
    position:fixed;inset:0;background:rgba(5,5,15,.97);z-index:100;
    display:none;flex-direction:column;align-items:center;justify-content:center;
    padding:20px 16px;text-align:center;overflow-y:auto;
    -webkit-overflow-scrolling:touch
  }
  .overlay.show{display:flex;animation:fadeIn .4s ease}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  h1.title{
    font-size:clamp(1.5rem,7vw,3rem);color:var(--cyan);
    text-shadow:0 0 10px var(--cyan),0 0 40px var(--cyan);
    letter-spacing:3px;margin-bottom:8px
  }
  h2.subtitle{
    font-size:clamp(.75rem,3vw,1.1rem);color:var(--magenta);
    text-shadow:0 0 10px var(--magenta);letter-spacing:2px;margin-bottom:20px
  }
  .story{
    max-width:600px;width:100%;background:rgba(18,18,31,.92);
    border:1px solid var(--border);border-left:4px solid var(--cyan);
    padding:18px;margin-bottom:20px;text-align:left;
    line-height:1.65;font-size:clamp(.8rem,3.5vw,.95rem);border-radius:6px
  }
  .story p{margin-bottom:10px}
  .story .hl{color:var(--cyan);font-weight:bold}
  .story .warn{color:var(--yellow);font-weight:bold}

  .btn{
    font-family:'Courier New',monospace;background:transparent;color:var(--cyan);
    border:2px solid var(--cyan);padding:14px 28px;
    font-size:clamp(.8rem,3.5vw,1rem);letter-spacing:2px;
    cursor:pointer;transition:all .25s;text-transform:uppercase;
    font-weight:bold;border-radius:6px;margin:5px;
    min-height:48px;touch-action:manipulation
  }
  .btn:active{background:var(--cyan);color:var(--bg);box-shadow:0 0 20px var(--cyan)}
  .btn.green{color:var(--green);border-color:var(--green)}
  .btn.green:active{background:var(--green);box-shadow:0 0 20px var(--green)}
  .btn.magenta{color:var(--magenta);border-color:var(--magenta)}
  .btn.magenta:active{background:var(--magenta);box-shadow:0 0 20px var(--magenta)}
  .btn.red{color:var(--red);border-color:var(--red)}
  .btn.red:active{background:var(--red);box-shadow:0 0 20px var(--red)}

  /* ===== GAME LAYOUT ===== */
  #gameWrap{
    display:none;position:fixed;inset:0;
    flex-direction:column;background:var(--bg)
  }
  #gameWrap.show{display:flex}

  #hud{
    height:var(--hud-h);flex-shrink:0;
    display:flex;justify-content:space-between;align-items:center;
    padding:0 8px;background:var(--panel);
    border-bottom:1px solid var(--border);
    font-size:clamp(.62rem,2.6vw,.85rem);
    gap:4px;overflow:hidden
  }
  #hud .item{color:var(--cyan);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  #hud .item b{color:var(--yellow)}

  #canvasWrap{
    flex:1;position:relative;display:flex;
    align-items:center;justify-content:center;
    background:#050510;overflow:hidden;
    min-height:0
  }
  #gameCanvas{
    display:block;
    max-width:100%;max-height:100%;
    width:auto;height:auto;
    image-rendering:pixelated;
    object-fit:contain;
    touch-action:none
  }

  #prompt{
    position:absolute;left:50%;bottom:12px;transform:translateX(-50%);
    padding:8px 16px;background:rgba(0,240,255,.18);
    border:2px solid var(--cyan);color:var(--cyan);
    font-weight:bold;border-radius:6px;letter-spacing:1px;
    font-size:clamp(.7rem,3vw,.9rem);display:none;
    animation:pulse 1s infinite;pointer-events:none;
    white-space:nowrap
  }
  #prompt.show{display:block}
  @keyframes pulse{
    0%,100%{box-shadow:0 0 10px var(--cyan)}
    50%{box-shadow:0 0 25px var(--cyan)}
  }

  /* ===== CONTROLS (d-pad + action) ===== */
  #controls{
    flex-shrink:0;height:clamp(150px,26vh,200px);
    background:linear-gradient(180deg,#0d0d1a,#0a0a12);
    border-top:1px solid var(--border);
    display:flex;justify-content:space-between;align-items:center;
    padding:8px 14px;gap:10px;
    padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))
  }

  #dpad{
    position:relative;width:clamp(130px,34vw,170px);
    aspect-ratio:1;flex-shrink:0
  }
  #dpad button{
    position:absolute;width:44%;height:44%;
    background:rgba(0,240,255,.1);
    border:2px solid var(--cyan);color:var(--cyan);
    font-size:clamp(1.1rem,4.5vw,1.6rem);
    border-radius:10px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    transition:background .1s;touch-action:none;
    font-family:'Courier New',monospace;font-weight:bold;
    padding:0
  }
  #dpad button.pressed{background:var(--cyan);color:var(--bg);box-shadow:0 0 20px var(--cyan)}
  #dpad .up{top:0;left:28%}
  #dpad .down{bottom:0;left:28%}
  #dpad .left{top:28%;left:0}
  #dpad .right{top:28%;right:0}

  #actionBtn{
    width:clamp(80px,22vw,110px);height:clamp(80px,22vw,110px);
    background:radial-gradient(circle,rgba(255,0,170,.2),rgba(255,0,170,.05));
    border:3px solid var(--magenta);color:var(--magenta);
    border-radius:50%;font-size:clamp(.9rem,3.5vw,1.1rem);
    font-family:'Courier New',monospace;font-weight:bold;
    letter-spacing:1px;cursor:pointer;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
    text-transform:uppercase;touch-action:none;
    transition:transform .1s;padding:0
  }
  #actionBtn:active,#actionBtn.pressed{
    background:var(--magenta);color:#fff;
    box-shadow:0 0 25px var(--magenta);transform:scale(.94)
  }

  /* ===== MODAL ACERTIJOS ===== */
  #modal{
    position:fixed;inset:0;background:rgba(5,5,15,.94);z-index:200;
    display:none;align-items:center;justify-content:center;
    padding:12px;overflow-y:auto;-webkit-overflow-scrolling:touch
  }
  #modal.show{display:flex}
  .modal-box{
    max-width:640px;width:100%;background:#12121f;
    border:1px solid var(--border);border-radius:10px;
    padding:clamp(16px,4vw,26px);position:relative;
    box-shadow:0 0 40px rgba(0,240,255,.2);
    max-height:calc(100vh - 24px);overflow-y:auto;
    -webkit-overflow-scrolling:touch
  }
  .modal-box::before{
    content:"";position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--cyan),var(--magenta));
    border-radius:10px 10px 0 0
  }
  .tag{
    display:inline-block;font-size:clamp(.6rem,2.4vw,.7rem);
    letter-spacing:1.5px;background:rgba(0,240,255,.12);
    color:var(--cyan);padding:3px 10px;border-radius:20px;
    border:1px solid var(--cyan);margin-bottom:12px
  }
  .modal-box h3{
    color:var(--cyan);font-size:clamp(.95rem,4vw,1.15rem);
    margin-bottom:12px;letter-spacing:1px
  }
  .question{
    background:rgba(0,0,0,.35);border-left:3px solid var(--magenta);
    padding:12px 14px;margin-bottom:14px;border-radius:4px;
    line-height:1.55;font-size:clamp(.8rem,3.4vw,.92rem)
  }
  .question b{color:var(--yellow)}
  .options{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}
  .option{
    background:var(--panel);border:1px solid var(--border);color:#e0e0ff;
    padding:12px 14px;text-align:left;cursor:pointer;
    font-family:'Courier New',monospace;
    font-size:clamp(.75rem,3.2vw,.88rem);
    border-radius:6px;transition:all .15s;
    min-height:48px;touch-action:manipulation;
    line-height:1.4
  }
  .option:active:not(.disabled){
    border-color:var(--cyan);background:rgba(0,240,255,.08)
  }
  .option.correct{border-color:var(--green);background:rgba(0,255,136,.15);color:var(--green)}
  .option.wrong{border-color:var(--red);background:rgba(255,51,85,.15);color:var(--red)}
  .option.disabled{cursor:not-allowed;opacity:.55}
  .feedback{
    margin-top:10px;padding:12px;border-radius:6px;
    font-size:clamp(.75rem,3.2vw,.88rem);
    line-height:1.5;display:none
  }
  .feedback.show{display:block;animation:fadeIn .3s}
  .feedback.ok{background:rgba(0,255,136,.1);border-left:3px solid var(--green);color:var(--green)}
  .feedback.err{background:rgba(255,51,85,.1);border-left:3px solid var(--red);color:var(--red)}
  .feedback .frag{
    margin-top:6px;font-size:clamp(.95rem,4vw,1.05rem);
    color:var(--yellow);font-weight:bold;letter-spacing:2px
  }
  .hint-box{
    margin-top:10px;padding:10px 12px;background:rgba(255,221,0,.08);
    border-left:3px solid var(--yellow);border-radius:4px;
    font-size:clamp(.72rem,3vw,.85rem);
    line-height:1.5;display:none;color:#ffe680
  }
  .hint-box.show{display:block}
  .modal-actions{
    display:flex;justify-content:space-between;gap:8px;
    margin-top:14px;flex-wrap:wrap
  }
  .modal-actions .btn{flex:1;min-width:110px;padding:12px 14px;font-size:.78rem}

  /* ===== TRAP ===== */
  .trap-box{
    max-width:600px;width:100%;background:#1a0a0f;
    border:2px solid var(--red);border-radius:10px;
    padding:clamp(18px,4vw,28px);text-align:center;
    box-shadow:0 0 40px rgba(255,51,85,.3);
    max-height:calc(100vh - 24px);overflow-y:auto
  }
  .trap-box h1{
    color:var(--red);text-shadow:0 0 15px var(--red);
    letter-spacing:2px;margin-bottom:8px;
    font-size:clamp(1.1rem,5vw,1.8rem)
  }
  .trap-box .warn{
    background:rgba(255,51,85,.15);border:1px solid var(--red);
    padding:12px;border-radius:6px;margin:12px 0;
    color:#ff8888;line-height:1.55;
    font-size:clamp(.78rem,3.4vw,.92rem)
  }
  .trap-box .fake{
    background:rgba(255,221,0,.08);border-left:3px solid var(--yellow);
    padding:12px;border-radius:4px;color:#ffe680;
    line-height:1.55;font-size:clamp(.75rem,3.2vw,.9rem);
    text-align:left
  }

  /* ===== FINAL ===== */
  .key-input{
    font-family:'Courier New',monospace;
    font-size:clamp(1.1rem,5vw,1.4rem);text-align:center;
    letter-spacing:6px;padding:12px;
    background:var(--panel);border:2px solid var(--cyan);
    color:var(--cyan);border-radius:6px;
    width:min(280px,80vw);margin:12px 0;
    text-transform:uppercase
  }
  .key-input:focus{outline:none;box-shadow:0 0 20px var(--cyan)}

  .confetti{
    position:fixed;width:9px;height:9px;top:-10px;z-index:9999;
    animation:fall linear forwards;pointer-events:none
  }
  @keyframes fall{to{transform:translateY(105vh) rotate(720deg);opacity:0}}

  /* ===== LANDSCAPE MOBILE ===== */
  @media (orientation:landscape) and (max-height:520px){
    #controls{
      position:absolute;inset:0;height:100%;
      background:transparent;border:none;
      pointer-events:none;padding:0
    }
    #controls > *{pointer-events:auto}
    #dpad{
      position:absolute;left:12px;bottom:12px;
      width:clamp(120px,22vh,160px);
      height:clamp(120px,22vh,160px);
      aspect-ratio:1
    }
    #actionBtn{
      position:absolute;right:16px;bottom:20px;
      width:clamp(76px,16vh,100px);
      height:clamp(76px,16vh,100px)
    }
    #canvasWrap{flex:1}
  }

  @media (min-width:900px){
    #controls{
      height:170px;justify-content:space-around;padding:12px 40px
    }
    #dpad{width:150px;height:150px;aspect-ratio:1}
    #actionBtn{width:110px;height:110px}
  }
</style>
</head>
<body>

<!-- INTRO -->
<div id="intro" class="overlay show">
  <h1 class="title">C.Y.T.E.</h1>
  <h2 class="subtitle">CYBERNETIC YIELD & TESTING ELEMENT</h2>
  <div class="story">
    <p>🔬 <span class="hl">AÑO 2087.</span> El laboratorio orbital <b>CYTE</b> quedó sellado. Su IA entró en <span class="warn">bucle infinito</span>.</p>
    <p>Debes <span class="hl">caminar</span> por las instalaciones y resolver los acertijos de las <b>5 cámaras reales</b>. Hay <span class="warn">3 cámaras trampa</span> con datos falsos.</p>
    <p>⏱️ <b>15 minutos.</b> Cada error resta 15 s. Cada trampa resta 30 s.</p>
    <p>📱 <b>Controles:</b> D-pad para moverte, botón <b>E</b> para interactuar.</p>
  </div>
  <button class="btn" onclick="startGame()">▶ INICIAR MISIÓN</button>
</div>

<!-- GAME -->
<div id="gameWrap">
  <div id="hud">
    <div class="item">📍 <b id="roomName">HUB</b></div>
    <div class="item">⏱️ <b id="timer">15:00</b></div>
    <div class="item">🔑 <b><span id="fragCount">0</span>/5</b></div>
    <div class="item">⚠️ <b id="trapCount">0</b></div>
  </div>

  <div id="canvasWrap">
    <canvas id="gameCanvas" width="960" height="600"></canvas>
    <div id="prompt">Presiona E para interactuar</div>
  </div>

  <div id="controls">
    <div id="dpad">
      <button class="up"    data-dir="up"    aria-label="Arriba">▲</button>
      <button class="left"  data-dir="left"  aria-label="Izquierda">◀</button>
      <button class="right" data-dir="right" aria-label="Derecha">▶</button>
      <button class="down"  data-dir="down"  aria-label="Abajo">▼</button>
    </div>
    <button id="actionBtn" aria-label="Interactuar">E</button>
  </div>
</div>

<!-- MODAL ACERTIJO -->
<div id="modal">
  <div class="modal-box">
    <span class="tag" id="mTag">CÁMARA 1</span>
    <h3 id="mTitle">Título</h3>
    <div class="question" id="mQuestion"></div>
    <div class="options" id="mOptions"></div>
    <div class="feedback" id="mFeedback"></div>
    <div class="hint-box" id="mHint"></div>
    <div class="modal-actions">
      <button class="btn magenta" onclick="showHint()">💡 PISTA</button>
      <button class="btn" onclick="closeModal()">CERRAR</button>
    </div>
  </div>
</div>

<!-- TRAP -->
<div id="trapOverlay" class="overlay">
  <div class="trap-box">
    <h1>⚠️ TRAMPA ⚠️</h1>
    <p style="color:#ff8888;font-size:.8rem;letter-spacing:2px">DATOS FALSOS DETECTADOS</p>
    <div class="warn" id="trapWarn"></div>
    <div class="fake" id="trapFake"></div>
    <button class="btn red" style="margin-top:14px" onclick="closeTrap()">← CONTINUAR</button>
  </div>
</div>

<!-- FINAL -->
<div id="finalScreen" class="overlay">
  <h1 class="title">🔓 LIBERADO</h1>
  <h2 class="subtitle">INGRESA LA CLAVE FINAL</h2>
  <div class="story" style="text-align:center">
    <p>Reuniste los <b>5 fragmentos reales</b>. El panel central pide la clave completa.</p>
    <p class="warn">Pista: concepto químico de 4 letras + un signo.</p>
  </div>
  <input type="text" class="key-input" id="finalKey" maxlength="6" placeholder="_____" autocomplete="off" autocapitalize="characters" spellcheck="false">
  <br>
  <button class="btn green" onclick="checkFinal()">🔐 DESBLOQUEAR</button>
  <p id="finalMsg" style="margin-top:14px;font-size:.95rem;min-height:26px"></p>
  <button class="btn" onclick="location.reload()" style="margin-top:12px">↻ REINICIAR</button>
</div>

<script>
/* ================================================================
   ESCAPE ROOM C.Y.T.E. — Mobile + Genially
   ================================================================ */

const W = 960, H = 600;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/* ============ RESIZE CANVAS (responsive) ============ */
function resizeCanvas(){
  const wrap = document.getElementById('canvasWrap');
  const availW = wrap.clientWidth;
  const availH = wrap.clientHeight;
  const scale = Math.min(availW / W, availH / H);
  const cssW = Math.floor(W * scale);
  const cssH = Math.floor(H * scale);
  canvas.style.width = cssW + 'px';
  canvas.style.height = cssH + 'px';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', ()=>setTimeout(resizeCanvas, 250));

/* ============ ACERTIJOS ============ */
const puzzles = {
  cam1:{
    tag:'CÁMARA 1 · ACTIVACIÓN', title:'Reconocer conceptos esenciales',
    question:'¿Cuál afirmación sobre la <b>carga nuclear efectiva (Z<sub>eff</sub>)</b> es <b>FALSA</b>?',
    options:[
      'Es la carga positiva neta que siente un electrón tras el apantallamiento.',
      'Se calcula como Z<sub>eff</sub> = Z − S.',
      'Es siempre igual al número atómico Z.',
      'Aumenta de izquierda a derecha en un período.'],
    correct:2,
    hint:'Los electrones internos "bloquean" parte de la carga. ¿El electrón de valencia siente TODA la carga?',
    explanation:'Z<sub>eff</sub> NUNCA es igual a Z porque el apantallamiento (S) siempre reduce la carga efectiva. Como S > 0, entonces Z<sub>eff</sub> < Z.',
    frag:'Z'
  },
  cam2:{
    tag:'CÁMARA 2 · DIAGNÓSTICO', title:'Detectar el dato incorrecto',
    question:'Según las <b>reglas de Slater</b>, ¿qué valor de apantallamiento es <b>INCORRECTO</b>?',
    options:[
      'Mismo grupo (ns, np): 0.35',
      'Capa n−1: 0.85',
      'Capas n−2 o menores: 0.85',
      '1s apantallando a otro 1s: 0.30'],
    correct:2,
    hint:'Los electrones de capas muy internas están cerca del núcleo. ¿Apantallan poco o mucho?',
    explanation:'Los electrones de capas n−2 o menores apantallan <b>1.00</b> (total), no 0.85.',
    frag:'E'
  },
  cam3:{
    tag:'CÁMARA 3 · ANÁLISIS', title:'Interpretar tendencias periódicas',
    question:'Ordena de <b>MENOR a MAYOR</b> Z<sub>eff</sub>: <b>Na, Mg, Al, Si</b>',
    options:['Si < Al < Mg < Na','Na < Mg < Al < Si','Mg < Na < Si < Al','Al < Si < Na < Mg'],
    correct:1,
    hint:'Mismo período. Al ir a la derecha, Z crece pero el apantallamiento entre electrones del mismo nivel es mínimo.',
    explanation:'En un mismo período, Z<sub>eff</sub> aumenta de izquierda a derecha: Na < Mg < Al < Si.',
    frag:'F'
  },
  cam4:{
    tag:'CÁMARA 4 · APLICACIÓN', title:'Caso de ingeniería',
    question:'¿Qué elemento elegirías para el <b>filamento de una bombilla incandescente</b>?',
    options:['Aluminio (Al)','Plomo (Pb)','Wolframio (W)','Mercurio (Hg)'],
    correct:2,
    hint:'Busca el metal con el punto de fusión más alto de la tabla periódica (3422 °C).',
    explanation:'El <b>wolframio (W)</b> tiene el punto de fusión más alto (3422 °C). Se usa en filamentos de bombillas.',
    frag:'F'
  },
  cam5:{
    tag:'CÁMARA 5 · VERIFICACIÓN', title:'Integrar y justificar',
    question:'¿Por qué el <b>K</b> tiene menor energía de ionización que el <b>Na</b>?',
    options:[
      'El K tiene mayor Z<sub>eff</sub> que el Na.',
      'El electrón de valencia del K está más lejos y siente menor Z<sub>eff</sub>.',
      'El K tiene menos electrones internos.',
      'El K no tiene apantallamiento.'],
    correct:1,
    hint:'Aunque el K tiene más protones, tiene más capas internas. Su electrón 4s está más lejos que el 3s del Na.',
    explanation:'El K tiene más capas internas que apantallan y su electrón de valencia está más alejado del núcleo → menor Z<sub>eff</sub> efectiva.',
    frag:'!'
  }
};

/* ============ TRAMPAS ============ */
const trapsData = {
  trap1:{
    warn:'Laboratorio con <b>TABLA PERIÓDICA FALSIFICADA</b>. Su información NO es fiable.',
    fake:'📄 "Según nuestros cálculos, Z<sub>eff</sub> del sodio es 11 (toda la carga del núcleo)."<br><br>🚫 <b>¡FALSO!</b> El apantallamiento de los 10 electrones internos reduce Z<sub>eff</sub> a ≈ 2.20.'
  },
  trap2:{
    warn:'Archivos corruptos. Contienen una <b>FÓRMULA INVENTADA</b>.',
    fake:'📄 "Fórmula oficial: Z<sub>eff</sub> = Z + S"<br><br>🚫 <b>¡INCORRECTO!</b> La fórmula real es Z<sub>eff</sub> = Z − S.'
  },
  trap3:{
    warn:'Servidor con <b>DATOS INVERTIDOS</b> sobre tendencias periódicas.',
    fake:'📄 "Z<sub>eff</sub> disminuye al avanzar de izquierda a derecha."<br><br>🚫 <b>¡FALSO!</b> Z<sub>eff</sub> AUMENTA de izquierda a derecha.'
  }
};

/* ============ HABITACIONES ============ */
const T = 20;
function simpleWalls(){
  return [
    {x:0, y:0, w:W, h:T},
    {x:0, y:0, w:T, h:H},
    {x:W-T, y:0, w:T, h:H},
    {x:0, y:H-T, w:430, h:T},
    {x:530, y:H-T, w:430, h:T}
  ];
}

const rooms = {
  hub:{
    id:'hub', name:'CENTRO DE CONTROL',
    walls:[
      {x:0,y:0,w:120,h:T},{x:210,y:0,w:120,h:T},{x:420,y:0,w:120,h:T},
      {x:630,y:0,w:120,h:T},{x:840,y:0,w:120,h:T},
      {x:0,y:H-T,w:120,h:T},{x:210,y:H-T,w:120,h:T},{x:420,y:H-T,w:120,h:T},
      {x:630,y:H-T,w:120,h:T},{x:840,y:H-T,w:120,h:T},
      {x:0,y:0,w:T,h:H},{x:W-T,y:0,w:T,h:H}
    ],
    doors:[
      {x:120,y:0,w:90,h:55,target:'cam1',label:'CÁM 1'},
      {x:330,y:0,w:90,h:55,target:'trap1',label:'LAB-0X'},
      {x:540,y:0,w:90,h:55,target:'cam2',label:'CÁM 2'},
      {x:750,y:0,w:90,h:55,target:'trap2',label:'ARCH-2'},
      {x:120,y:H-55,w:90,h:55,target:'cam3',label:'CÁM 3'},
      {x:330,y:H-55,w:90,h:55,target:'trap3',label:'SERV-9'},
      {x:540,y:H-55,w:90,h:55,target:'cam4',label:'CÁM 4'},
      {x:750,y:H-55,w:90,h:55,target:'cam5',label:'CÁM 5'}
    ],
    objects:[], spawn:{x:450, y:280}
  },
  cam1:{
    id:'cam1', name:'CÁMARA 1 · ACTIVACIÓN',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:0}],
    objects:[{x:400,y:220,w:160,h:110,type:'terminal',puzzle:'cam1',label:'TERMINAL 1'}],
    spawn:{x:450,y:420}
  },
  cam2:{
    id:'cam2', name:'CÁMARA 2 · DIAGNÓSTICO',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:2}],
    objects:[{x:400,y:220,w:160,h:110,type:'terminal',puzzle:'cam2',label:'TERMINAL 2'}],
    spawn:{x:450,y:420}
  },
  cam3:{
    id:'cam3', name:'CÁMARA 3 · ANÁLISIS',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:4}],
    objects:[{x:400,y:220,w:160,h:110,type:'terminal',puzzle:'cam3',label:'TERMINAL 3'}],
    spawn:{x:450,y:420}
  },
  cam4:{
    id:'cam4', name:'CÁMARA 4 · APLICACIÓN',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:6}],
    objects:[{x:400,y:220,w:160,h:110,type:'terminal',puzzle:'cam4',label:'TERMINAL 4'}],
    spawn:{x:450,y:420}
  },
  cam5:{
    id:'cam5', name:'CÁMARA 5 · VERIFICACIÓN',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:7}],
    objects:[{x:400,y:220,w:160,h:110,type:'terminal',puzzle:'cam5',label:'TERMINAL 5'}],
    spawn:{x:450,y:420}
  },
  trap1:{
    id:'trap1', name:'LAB-0X · TRAMPA',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:1}],
    objects:[{x:400,y:220,w:160,h:110,type:'console',trap:'trap1',label:'CONSOLA SOSPECHOSA'}],
    spawn:{x:450,y:420}
  },
  trap2:{
    id:'trap2', name:'ARCH-2 · TRAMPA',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:3}],
    objects:[{x:400,y:220,w:160,h:110,type:'console',trap:'trap2',label:'ARCHIVO CORRUPTO'}],
    spawn:{x:450,y:420}
  },
  trap3:{
    id:'trap3', name:'SERV-9 · TRAMPA',
    walls:simpleWalls(),
    doors:[{x:430,y:H-55,w:100,h:55,target:'hub',label:'VOLVER',returnIdx:5}],
    objects:[{x:400,y:220,w:160,h:110,type:'console',trap:'trap3',label:'SERVIDOR SOSPECHOSO'}],
    spawn:{x:450,y:420}
  }
};

/* ============ ESTADO ============ */
let currentRoom = 'hub';
const player = {x:450, y:280, w:34, h:34, speed:4.2, dir:'down'};
const keys = {up:false, down:false, left:false, right:false};
let nearObject = null;
let transitionCooldown = 0;
let gameActive = false;
let secondsLeft = 15 * 60;
let timerInterval = null;
let currentPuzzle = null;
let currentObject = null;

const fragments = {cam1:false, cam2:false, cam3:false, cam4:false, cam5:false};
const trapsVisited = {trap1:false, trap2:false, trap3:false};

/* ============ INICIO ============ */
function startGame(){
  document.getElementById('intro').classList.remove('show');
  document.getElementById('gameWrap').classList.add('show');
  resizeCanvas();
  gameActive = true;
  loadRoom('hub');
  startTimer();
  requestAnimationFrame(loop);
}

function startTimer(){
  if(timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    if(!gameActive) return;
    secondsLeft--;
    if(secondsLeft <= 0){
      clearInterval(timerInterval);
      alert('⏱️ ¡TIEMPO AGOTADO! Reiniciando el sistema...');
      location.reload();
    }
    updateHUD();
  }, 1000);
}

function updateHUD(){
  const m = String(Math.floor(secondsLeft/60)).padStart(2,'0');
  const s = String(secondsLeft%60).padStart(2,'0');
  document.getElementById('timer').textContent = `${m}:${s}`;
  document.getElementById('fragCount').textContent = Object.values(fragments).filter(Boolean).length;
  document.getElementById('trapCount').textContent = Object.values(trapsVisited).filter(Boolean).length;
  document.getElementById('roomName').textContent = rooms[currentRoom].name;
}

/* ============ INPUT TECLADO (desktop) ============ */
document.addEventListener('keydown', e=>{
  const k = e.key.toLowerCase();
  if(k === 'w' || k === 'arrowup') keys.up = true;
  if(k === 's' || k === 'arrowdown') keys.down = true;
  if(k === 'a' || k === 'arrowleft') keys.left = true;
  if(k === 'd' || k === 'arrowright') keys.right = true;
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k)) e.preventDefault();
  if(k === 'e' && gameActive && !document.getElementById('modal').classList.contains('show')){
    interact();
  }
});
document.addEventListener('keyup', e=>{
  const k = e.key.toLowerCase();
  if(k === 'w' || k === 'arrowup') keys.up = false;
  if(k === 's' || k === 'arrowdown') keys.down = false;
  if(k === 'a' || k === 'arrowleft') keys.left = false;
  if(k === 'd' || k === 'arrowright') keys.right = false;
});

/* ============ INPUT TÁCTIL (D-Pad + acción) ============ */
(function bindDpad(){
  document.querySelectorAll('#dpad button').forEach(btn=>{
    const dir = btn.dataset.dir;
    const press = (on) => {
      keys[dir] = on;
      btn.classList.toggle('pressed', on);
    };
    // Touch
    btn.addEventListener('touchstart', e=>{e.preventDefault(); press(true);}, {passive:false});
    btn.addEventListener('touchend',   e=>{e.preventDefault(); press(false);}, {passive:false});
    btn.addEventListener('touchcancel',()=>press(false));
    // Mouse
    btn.addEventListener('mousedown', ()=>press(true));
    btn.addEventListener('mouseup',   ()=>press(false));
    btn.addEventListener('mouseleave',()=>press(false));
    btn.addEventListener('contextmenu', e=>e.preventDefault());
  });
  const ab = document.getElementById('actionBtn');
  const trigger = e=>{
    e.preventDefault();
    ab.classList.add('pressed');
    setTimeout(()=>ab.classList.remove('pressed'), 120);
    if(gameActive && !document.getElementById('modal').classList.contains('show')) interact();
  };
  ab.addEventListener('touchstart', trigger, {passive:false});
  ab.addEventListener('click', (e)=>{
    // Si ya se manejó por touchstart, evitar doble disparo
    if(e.detail === 0) trigger(e);
  });
  ab.addEventListener('contextmenu', e=>e.preventDefault());
})();

/* ============ CARGA DE HABITACIÓN ============ */
function loadRoom(id){
  currentRoom = id;
  const r = rooms[id];
  player.x = r.spawn.x;
  player.y = r.spawn.y;
  transitionCooldown = 0.5;
  updateHUD();
}

/* ============ COLISIONES ============ */
function overlap(a, b){
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function collides(x, y){
  const r = {x, y, w:player.w, h:player.h};
  for(const w of rooms[currentRoom].walls) if(overlap(r, w)) return true;
  return false;
}

/* ============ UPDATE ============ */
function update(dt){
  if(!gameActive) return;
  if(transitionCooldown > 0) transitionCooldown -= dt;

  let vx = 0, vy = 0;
  if(keys.up) vy -= 1;
  if(keys.down) vy += 1;
  if(keys.left) vx -= 1;
  if(keys.right) vx += 1;

  const len = Math.hypot(vx, vy);
  if(len > 0){
    vx /= len; vy /= len;
    if(vy < 0) player.dir = 'up';
    else if(vy > 0) player.dir = 'down';
    else if(vx < 0) player.dir = 'left';
    else if(vx > 0) player.dir = 'right';
  }

  const step = player.speed * (dt * 60);
  const nx = player.x + vx * step;
  const ny = player.y + vy * step;

  if(!collides(nx, player.y)) player.x = nx;
  if(!collides(player.x, ny)) player.y = ny;

  player.x = Math.max(0, Math.min(W - player.w, player.x));
  player.y = Math.max(0, Math.min(H - player.h, player.y));

  if(transitionCooldown <= 0){
    for(const d of rooms[currentRoom].doors){
      if(overlap({x:player.x, y:player.y, w:player.w, h:player.h}, d)){
        enterDoor(d); return;
      }
    }
  }

  nearObject = null;
  const cx = player.x + player.w/2, cy = player.y + player.h/2;
  for(const o of rooms[currentRoom].objects){
    const ox = o.x + o.w/2, oy = o.y + o.h/2;
    if(Math.hypot(cx - ox, cy - oy) < 110){ nearObject = o; break; }
  }
  document.getElementById('prompt').classList.toggle('show', !!nearObject);
}

function enterDoor(d){
  transitionCooldown = 0.9;
  if(d.target === 'hub' && d.returnIdx !== undefined){
    const hubDoor = rooms.hub.doors[d.returnIdx];
    currentRoom = 'hub';
    if(hubDoor.y < 100){
      player.x = hubDoor.x + hubDoor.w/2 - player.w/2;
      player.y = hubDoor.y + hubDoor.h + 25;
    } else {
      player.x = hubDoor.x + hubDoor.w/2 - player.w/2;
      player.y = hubDoor.y - player.h - 25;
    }
  } else loadRoom(d.target);
  updateHUD();
}

/* ============ INTERACCIÓN ============ */
function interact(){
  if(!nearObject) return;
  if(nearObject.type === 'terminal'){
    if(fragments[nearObject.puzzle]) return;
    openPuzzle(nearObject);
  } else if(nearObject.type === 'console'){
    showTrap(nearObject.trap);
  }
}

/* ============ MODAL ============ */
function openPuzzle(obj){
  currentObject = obj;
  currentPuzzle = puzzles[obj.puzzle];
  gameActive = false;

  document.getElementById('mTag').textContent = currentPuzzle.tag;
  document.getElementById('mTitle').textContent = currentPuzzle.title;
  document.getElementById('mQuestion').innerHTML = currentPuzzle.question;

  const opts = document.getElementById('mOptions');
  opts.innerHTML = '';
  currentPuzzle.options.forEach((o, i)=>{
    const b = document.createElement('button');
    b.className = 'option';
    b.innerHTML = o;
    b.onclick = ()=>selectOption(i, b);
    opts.appendChild(b);
  });

  const fb = document.getElementById('mFeedback');
  fb.className = 'feedback'; fb.innerHTML = '';
  document.getElementById('mHint').className = 'hint-box';
  document.getElementById('mHint').innerHTML = '💡 <b>PISTA:</b> ' + currentPuzzle.hint;

  document.getElementById('modal').classList.add('show');
}

function selectOption(i, btn){
  if(btn.classList.contains('disabled')) return;
  const p = currentPuzzle;
  const fb = document.getElementById('mFeedback');
  const opts = document.querySelectorAll('#mOptions .option');

  if(i === p.correct){
    opts.forEach(o=>o.classList.add('disabled'));
    btn.classList.add('correct');
    fb.className = 'feedback ok show';
    fb.innerHTML = `✅ <b>¡ACCESO CONCEDIDO!</b><br>${p.explanation}
      <div class="frag">🔑 Fragmento obtenido: <b>${p.frag}</b></div>`;
    fragments[currentObject.puzzle] = true;
    updateHUD(); checkWin();
  } else {
    btn.classList.add('wrong','disabled');
    secondsLeft = Math.max(0, secondsLeft - 15);
    updateHUD();
    fb.className = 'feedback err show';
    fb.innerHTML = `❌ <b>ACCESO DENEGADO.</b><br>
      La opción seleccionada es incorrecta. <b>NO se revelará la correcta.</b><br>
      Vuelve a intentarlo con otra opción o pide una pista.<br>
      <i style="color:#ff8888">Penalización: −15 segundos.</i>`;
  }
}

function showHint(){ document.getElementById('mHint').classList.add('show'); }

function closeModal(){
  document.getElementById('modal').classList.remove('show');
  gameActive = true;
  if(currentObject && fragments[currentObject.puzzle]) currentObject.done = true;
  currentObject = null; currentPuzzle = null;
}

/* ============ TRAMPA ============ */
function showTrap(id){
  if(!trapsVisited[id]){
    trapsVisited[id] = true;
    secondsLeft = Math.max(0, secondsLeft - 30);
    updateHUD();
  }
  const t = trapsData[id];
  document.getElementById('trapWarn').innerHTML = '🚨 ' + t.warn;
  document.getElementById('trapFake').innerHTML = t.fake;
  gameActive = false;
  document.getElementById('trapOverlay').classList.add('show');
}
function closeTrap(){
  document.getElementById('trapOverlay').classList.remove('show');
  gameActive = true;
}

/* ============ FINAL ============ */
function checkWin(){
  if(Object.values(fragments).every(Boolean)){
    setTimeout(()=>{
      gameActive = false;
      clearInterval(timerInterval);
      document.getElementById('finalScreen').classList.add('show');
    }, 900);
  }
}

function checkFinal(){
  const v = document.getElementById('finalKey').value.trim().toUpperCase();
  const msg = document.getElementById('finalMsg');
  if(v === 'ZEFF!'){
    msg.style.color = '#00ff88';
    msg.innerHTML = '🎉 <b>¡CLAVE CORRECTA!</b> C.Y.T.E. ha sido liberado. ¡Felicidades, operador!';
    confetti();
  } else {
    msg.style.color = '#ff3355';
    msg.innerHTML = '❌ Clave incorrecta. Revisa tus fragmentos: un concepto químico de 4 letras + un signo.';
  }
}

function confetti(){
  const colors = ['#00f0ff','#ff00aa','#00ff88','#ffdd00','#ff3355'];
  for(let i=0;i<100;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (2 + Math.random()*2) + 's';
    c.style.animationDelay = Math.random()*0.6 + 's';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 5500);
  }
}

/* ============ RENDER ============ */
function draw(){
  const r = rooms[currentRoom];
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, W, H);

  // rejilla
  ctx.strokeStyle = 'rgba(0,240,255,0.06)';
  ctx.lineWidth = 1;
  for(let x=0; x<W; x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0; y<H; y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

  // puertas
  for(const d of r.doors){
    const pulse = 0.6 + 0.4 * Math.sin(Date.now()/300);
    ctx.fillStyle = `rgba(0,255,136,${0.15 + pulse*0.15})`;
    ctx.fillRect(d.x, d.y, d.w, d.h);
    ctx.strokeStyle = `rgba(0,255,136,${pulse})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(d.x, d.y, d.w, d.h);
    ctx.fillStyle = '#00ff88';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, d.x + d.w/2, d.y + d.h/2 + 5);
  }

  // objetos
  for(const o of r.objects){
    const solved = o.puzzle && fragments[o.puzzle];
    const isTrap = o.type === 'console';
    const baseColor = isTrap ? '#ff8800' : '#ff00aa';
    const glowColor = solved ? '#00ff88' : baseColor;

    ctx.fillStyle = '#12121f';
    ctx.fillRect(o.x, o.y, o.w, o.h);
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(o.x, o.y, o.w, o.h);

    const pulse = 0.5 + 0.5 * Math.sin(Date.now()/400);
    if(isTrap){
      ctx.fillStyle = `rgba(255,136,0,${0.2 + pulse*0.2})`;
    } else if(solved){
      ctx.fillStyle = `rgba(0,255,136,${0.2 + pulse*0.15})`;
    } else {
      ctx.fillStyle = `rgba(255,0,170,${0.2 + pulse*0.2})`;
    }
    ctx.fillRect(o.x+12, o.y+12, o.w-24, o.h*0.55);

    ctx.fillStyle = solved ? '#00ff88' : (isTrap ? '#ff8800' : '#ff00aa');
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    const txt = solved ? '✓ RESUELTO' : (isTrap ? '⚠ SOSPECHOSO' : '⌨ ACTIVO');
    ctx.fillText(txt, o.x + o.w/2, o.y + o.h*0.42);

    ctx.fillStyle = '#888';
    ctx.font = '11px monospace';
    ctx.fillText(o.label, o.x + o.w/2, o.y + o.h + 16);
  }

  // paredes
  for(const w of r.walls){
    const grad = ctx.createLinearGradient(w.x, w.y, w.x, w.y + w.h);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(1, '#0d0d1a');
    ctx.fillStyle = grad;
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.strokeStyle = 'rgba(0,240,255,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(w.x+0.5, w.y+0.5, w.w-1, w.h-1);
  }

  drawPlayer();
}

function drawPlayer(){
  const {x, y, w, h} = player;
  const pulse = 0.5 + 0.5 * Math.sin(Date.now()/250);
  ctx.fillStyle = `rgba(0,240,255,${0.1 + pulse*0.1})`;
  ctx.beginPath();
  ctx.arc(x + w/2, y + h/2, 30, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#00f0ff';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = '#050510';
  const cx = x + w/2, cy = y + h/2;
  const es = 5;
  let e1x, e1y, e2x, e2y;
  if(player.dir === 'up'){ e1x=cx-7; e1y=cy-6; e2x=cx+7; e2y=cy-6; }
  else if(player.dir === 'down'){ e1x=cx-7; e1y=cy+4; e2x=cx+7; e2y=cy+4; }
  else if(player.dir === 'left'){ e1x=cx-8; e1y=cy-4; e2x=cx-8; e2y=cy+4; }
  else { e1x=cx+8; e1y=cy-4; e2x=cx+8; e2y=cy+4; }
  ctx.fillRect(e1x - es/2, e1y - es/2, es, es);
  ctx.fillRect(e2x - es/2, e2y - es/2, es, es);

  if(nearObject){
    const bx = nearObject.x + nearObject.w/2;
    const by = nearObject.y - 22;
    ctx.fillStyle = '#ffdd00';
    ctx.font = 'bold 26px monospace';
    ctx.textAlign = 'center';
    const bob = Math.sin(Date.now()/200) * 3;
    ctx.fillText('!', bx, by + bob);
  }
}

/* ============ LOOP ============ */
let last = performance.now();
function loop(t){
  const dt = Math.min((t - last)/1000, 0.05);
  last = t;
  if(gameActive) update(dt);
  draw();
  requestAnimationFrame(loop);
}

/* ============ BLOQUEAR GESTOS MOLESTOS ============ */
document.addEventListener('gesturestart', e=>e.preventDefault());
document.addEventListener('contextmenu', e=>{
  if(e.target.closest('#dpad, #actionBtn, #gameWrap')) e.preventDefault();
});
</script>
</body>
</html>
