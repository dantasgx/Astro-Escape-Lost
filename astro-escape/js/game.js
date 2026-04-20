
// ==================================================
// TESTE DE FASES
// ==================================================
let debugFase = 4; // muda aqui pra testar qualquer fase

// ===================================================
//    CANVAS
// ==================================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ------------------------------------------------
//    IMAGENS PLAYER
// ----------------------------------------------
// Player Parado
const imgPlayerParadoDireita = new Image();
imgPlayerParadoDireita.src = "assets/player/player-parado-direita.png"

const imgPlayerParadoEsquerda = new Image();
imgPlayerParadoEsquerda.src = "assets/player/player-parado-esquerda.png"

// Player Andando
const imgPlayerAndandoEsquerda = new Image();
imgPlayerAndandoEsquerda.src = "assets/player/player-andando-esquerda.png"

const imgPlayerAndandoDireita = new Image();
imgPlayerAndandoDireita.src = "assets/player/player-andando-direita.png"

// Player Pulando
const imgPlayerPuloDireita = new Image();
imgPlayerPuloDireita.src = "assets/player/player-pulo-direita.png"

const imgPlayerPuloEsquerda = new Image();
imgPlayerPuloEsquerda.src = "assets/player/player-pulo-esquerda.png"

// Player tomando Dano
const imgPlayerDanoEsquerda = new Image();
imgPlayerDanoEsquerda.src = "assets/player/player-dano-esquerda.png"

const imgPlayerDanoDireita = new Image();
imgPlayerDanoDireita.src = "assets/player/player-dano-direita.png"

// ---------------------------------------------------
//    IMAGENS ALIENS
// --------------------------------------------------
const imgAlienFase1 = new Image();
imgAlienFase1.src = "assets/inimigos/alien-fase1.png";

const imgAlienFase2 = new Image();
imgAlienFase2.src = "assets/inimigos/alien-fase2.png";

const imgAlienFase4 = new Image();
imgAlienFase4.src = "assets/inimigos/alien-fase4.png";

// ------------------------------------------------
//    IMAGENS ITENS
// ------------------------------------------------
const imgItem1 = new Image();
imgItem1.src = "assets/itens/item1.png";

const imgItem2 = new Image();
imgItem2.src = "assets/itens/item2.png";

const imgItem3 = new Image();
imgItem3.src = "assets/itens/item3.png";

const imgItem4 = new Image();
imgItem4.src = "assets/itens/item4.png";

const imgItem5 = new Image();
imgItem5.src = "assets/itens/item5.png";

const imgItem6 = new Image();
imgItem6.src = "assets/itens/item6.png";

const imgItem7 = new Image();
imgItem7.src = "assets/itens/item7.png";

const imgItem8 = new Image();
imgItem8.src = "assets/itens/item8.png";

// -----------------------------------------------
//   IMAGEM NAVE
// --------------------------------------------
const imgNave = new Image();
imgNave.src = "assets/nave/foguete.png";

// ----------------------------------------------
//    IMAGEM ESPINHOS
// ----------------------------------------------
const imgEspinho = new Image();
imgEspinho.src = "assets/espinhos/spikesLow.png";

// ------------------------------------------------
//   IMAGENS DAS FASES
// --------------------------------------------------
const imgFundoFase1 = new Image()
imgFundoFase1.src = "assets/fases/fundo-fase1.png"

const imgFundoFase2 = new Image()
imgFundoFase2.src = "assets/fases/fundo-fase2.png"

const imgFundoFase3 = new Image()
imgFundoFase3.src = "assets/fases/fundo-fase3.png"

const imgFundoFase4 = new Image()
imgFundoFase4.src = "assets/fases/fundo-fase4.png"

// ------------------------------------------------
//    IMAGEM MENU
// -----------------------------------------------
const imgMenu = new Image();
imgMenu.src = "assets/fases/menu.png";


// ===================================================
//    OBJETOS DA FASE 1
// ==================================================

// PLATAFORMAS


let chao = { // chão principal da fase
    x: 0,
    y: 350,
    w: 800,
    h: 50,
    color: "#2F6B5F"
};

// ===================================================
//    PLAYER
// ==================================================
// PLAYER - Guardar os dados dos personagens
let player = {
    x: 50,
    y: 300,
    w: 40,
    h: 40,
    color: "white",
    vy: 0, // velocidade vertical
    speed: 3.3 // velocidade horizontal
};

// ===================================================
//    ESTADO DO JOGO
// ==================================================

// Quantidadde de itens coletados
let itensColetados = 0; 

// Quantidade de vidas do jogador
let vidas = 2;

// Mensagem que aparece no topo do canvas
let mensagem = ""

// Controla se a fase já foi concluida ou não
let faseConcluida = false   

// Informa se o jogador já morreu ou não
let morreu = false

// Diz se o jogador está no chão ou em alguma plataforma (pra permitir pulo)
let noChao = false;

let estadoJogo = "menu";

let modoJogo = "normal";

// usado pra evitar perder mais de 1 vida ao encostar no inimigo e espinho
let encostandoNoInimigo = false;
let podeTomarDano = true;
let encostandoNoEspinho = false;
let mortesTotais = 0;

let faseAtual = 1;

let plataformas = []
let itens = []
let inimigos = []
let espinhos = []
let nave = {}

let mostrandoIntroFase = true


let direcaoPlayer = "direita";
let playerTomouDano = false

// ===================================================
//    TECLADO
// ==================================================

// Usado pra guardar o estado das teclas pressionadas
let teclas = {
    esquerda: false,
    direita: false
}

// ===================================================
//    FUNÇÕES AUXILIARES
// ==================================================

// ------------------------------------------------
//    FUNÇÃO DESENHA PLAYER
// -----------------------------------------------
function desenhaPlayer() {
    let imagemAtual;

    // prioridade 1: dano
    if (playerTomouDano){
        if(direcaoPlayer == "direita"){
            imagemAtual = imgPlayerDanoDireita;
        } else {
            imagemAtual = imgPlayerDanoEsquerda;
        }
    }
    // prioridade 2: pulo
    else if(!noChao){
        if(direcaoPlayer == "direita"){
            imagemAtual = imgPlayerPuloDireita;
        } else {
            imagemAtual = imgPlayerPuloEsquerda;
        }
    }
    // prioridade 3: andando
    else if (teclas.esquerda || teclas.direita){
        if (direcaoPlayer == "direita"){
            imagemAtual = imgPlayerAndandoDireita
        } else {
            imagemAtual = imgPlayerAndandoEsquerda
        }
    }
    // prioridade 4: parado 
    else {
        if(direcaoPlayer == "direita"){
            imagemAtual = imgPlayerParadoDireita
        } else {
            imagemAtual = imgPlayerParadoEsquerda
        }
    }
    if (imagemAtual && imagemAtual.complete && imagemAtual.naturalWidth > 0){
        ctx.drawImage(imagemAtual, player.x, player.y, player.w, player.h);
    } else{
        desenha_retangulo(player)
    }
}

// -------------------------------------------
//    FUNÇÃO DESENHA    item
// ------------------------------------------
function desenhaItem(item) {
    if (item.img && item.img.complete && item.img.naturalWidth > 0) {
        ctx.drawImage(item.img, item.x, item.y, item.w, item.h);
    } else {
        desenha_retangulo(item);
    }
}

// -------------------------------------------
//   FUNÇÃO DESENHA ALIENS
// ------------------------------------------
function desenhaInimigo(inimigo) {
    let imgAlienAtual;

    if (faseAtual == 1) {
        imgAlienAtual = imgAlienFase1;
    } else if (faseAtual == 2) {
        imgAlienAtual = imgAlienFase2;
    } else if (faseAtual == 4) {
        imgAlienAtual = imgAlienFase4;
    }

    if (imgAlienAtual && imgAlienAtual.complete && imgAlienAtual.naturalWidth > 0) {
        ctx.drawImage(imgAlienAtual, inimigo.x, inimigo.y, inimigo.w, inimigo.h);
    } else {
        desenha_retangulo(inimigo);
    }
}

//  ----------------------------------------
//    FUNÇÃO DESENHA NAVE
// --------------------------------------
function desenhaNave() {
    if (imgNave.complete && imgNave.naturalWidth > 0) {
        ctx.drawImage(imgNave, nave.x, nave.y, nave.w, nave.h);
    } else {
        desenha_retangulo(nave);
    }
}

// ---------------------------------------------
//    FUNÇÃO DESENHA ESPINHOS
// ---------------------------------------------
function desenhaEspinho(espinho) {
    if (imgEspinho.complete && imgEspinho.naturalWidth > 0) {
        ctx.drawImage(imgEspinho, espinho.x, espinho.y, espinho.w, espinho.h);
    } else {
        desenha_retangulo(espinho);
    }
}


// Função que recebe um objeto (ret) e desenha ele no canvas
function desenha_retangulo(ret){
    ctx.beginPath();
    ctx.fillStyle = ret.color; // define a cor de preenchimento
    ctx.fillRect(ret.x, ret.y, ret.w, ret.h);
    ctx.closePath();
}

// Função de colisão entre dois retângulos
function colisao(a,b){ // a = player; b = item/inimigo
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function TextoDaFase(){
    if(faseAtual == 1){
        return{
            titulo: "FASE 1 - PLANETA ORION",
            descricao1: "Fase inicial. Aprenda os comandos,",
            descricao2: "colete os itens e ative a nave."
        };
    }
    if(faseAtual ==2){
        return{
            titulo: "FASE 2 - PLANETA VOID-9",
            descricao1: "Um planeta em ruínas, sem chão seguro.",
            descricao2: "Cuidado com os pulos e ameaças."
        };
    }
    if(faseAtual == 3){
        return{
            titulo: "FASE 3 - PLANETA THORNIX",
            descricao1: "Um planeta hostil cheio de espinhos.",
            descricao2: "Atravesse com cuidado. Depois não diga que eu não avisei."
        }
    }
    if(faseAtual ==4){
        return{
            titulo: "FASE 4 - PLANETA UMBRA",
            descricao1: "Um planeta mergulhado na escuridão.",
            descricao2: "Siga apenas a luz ao seu redor e avance com cuidado."
        };
    

    }

    if (faseAtual == 5) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("PARABÉNS!", 300, 200);

        ctx.font = "20px Arial";
        ctx.fillText("Você zerou o jogo!", 270, 250);

        ctx.fillText("Mortes: " + mortesTotais, 300, 300);

        ctx.fillText("Pressione R para recomeçar", 230, 350);

        return;
    }
    return {
        titulo: "FASE",
        descricao1: "",
        descricao2: ""
    }
}

// ===================================================
//    FUNÇÕES PARA CARREGAR AS FASES DO JOGO
// ==================================================

// ----------------------------------------------
//    FUNÇÃO FASE 1
// ----------------------------------------------
function carregarFase1(){
    // PLATAFORMAS
    plataformas = [
        {x: 150, y: 260, w: 120, h: 20, color: "#2C8F6B"    },
        {x: 350, y: 280, w: 150, h: 20, color: "#5A4FCC"},
        {x: 550, y: 200, w: 120, h: 20, color:"#2C8F6B"}
    ];

    // ITENS
    itens = [
        {x: 210, y: 203, w: 20, h: 20, color: "yellow", coletado: false, img: imgItem1},
        {x: 635, y: 170, w: 20, h: 20, color: "yellow", coletado: false, img: imgItem5}
    ];

    // INIMIGOS
    inimigos = [
        {x: 400, y: 245, w: 45, h: 35, color: "red"}
    ]

    // ESPINHOS
    espinhos = [];

    // NAVE
    nave = {
        x: 700, y: 240, w: 50, h:110, color: "blue"
    }

    spawnX = 50;
    spawnY = 300;

    player.x = spawnX;
    player.y = spawnY;
    player.vy = 0;

}


// ----------------------------------------------
//    FUNÇÃO FASE 2
// ----------------------------------------------
function carregarFase2(){
    // PLATAFORMAS
    plataformas = [
        { x: 30,  y: 100, w: 120, h: 20, color: "#E0F7FF" },
        { x: 250, y: 125, w: 70,  h: 20, color: "#E0F7FF"},
        { x: 120, y: 225, w: 320, h: 20, color: "#E0F7FF" },
        { x: 300, y: 310, w: 135, h: 20, color: "#E0F7FF" },
        { x: 400, y: 165, w: 140, h: 20, color: "#E0F7FF" },
        { x: 700, y: 215, w: 60, h: 20, color: "#E0F7FF"},
        { x: 0, y: 365, w: 200, h: 20, color: "#E0F7FF" },
        { x: 600, y: 100, w: 70,  h: 20, color: "#E0F7FF" },
        { x: 550, y: 250, w: 92, h: 20, color: "#E0F7FF" },

    ];

    // ITENS 
    itens = [
        { x: 380, y: 275, w: 20, h: 20, color: "cyan", coletado: false, img: imgItem3 },
        { x: 645, y: 65, w: 20, h: 20, color: "cyan", coletado: false, img: imgItem6  }
    ];  

     // INIMIGOS 
    inimigos = [
        { x: 210, y: 190, w: 45, h: 35, color: "orange", speed: 1.0, direcao: 1, limiteEsquerdo: 120, limiteDireito: 440 },
        { x: 475, y: 130, w: 45, h: 35, color: "orange", speed: 0.5, direcao: 1, limiteEsquerdo: 400, limiteDireito: 540  },
        { x: 15, y: 330, w: 45, h: 35, color: "orange" , speed: 0.8, direcao: 1, limiteEsquerdo: 0, limiteDireito: 200  }

    ];

    // ESPINHOS
    espinhos = [];

    // NAVE
    nave = {
        x: 700,
        y: 105,
        w: 50,
        h: 110,
        color: "blue"
    };

    // resetar estados da fase
    itensColetados = 0;
    faseConcluida = false;
    mensagem = "";

    spawnX = 40;
    spawnY = 40;

    player.x = spawnX;
    player.y = spawnY;
    player.vy = 0;

}

// ----------------------------------------------
//    FUNÇÃO FASE 3
// ----------------------------------------------
function carregarFase3(){
    // PLATAFORMAS
    plataformas = [
        {x: 0, y: 320, w: 120, h: 80, color: "#8E3B3B"}, // ok
        {x: 190, y: 300, w: 150, h: 110, color: "#5C1F1F"}, // ok
        {x: 425, y: 345, w: 160, h: 80, color: "#8E3B3B"}, // ok
        {x: 660, y: 310, w: 160, h: 100, color: "#5C1F1F"}, // ok
        {x: 720, y: 275 , w: 100, h: 35, color: "#5C1F1F"}, // ok

        {x: 170, y: 205, w: 120, h: 10, color: "#5C1F1F"}, //ok
        {x: 330, y: 250, w: 110, h: 10, color: "#8E3B3B"}, // ok
        {x: 570, y: 235, w: 85, h:10, color: "#5C1F1F"}, // ok
    

        {x: 0, y: 165, w: 140, h:10, color: "#8E3B3B"}, // ok
        {x: 470, y: 210, w: 80, h:10, color: "#5C1F1F"}, //ok
        {x: 150, y: 105, w: 650, h:10, color: "#8E3B3B"}, // ok
    ]
    
    // ITENS
    itens = [
        {x: 10, y:135, w:20, h: 20, color: "cyan", coletado: false, img: imgItem7 }, //ok
        {x: 715, y:25, w:20, h: 20, color: "cyan", coletado: false, img: imgItem2 }, //
    ]

    // INIMIGOS
    inimigos =[]

    // ESPINHOS
    espinhos = [
        { x: 120, y: 385, w: 70, h: 15, color: "silver" }, // ok
        { x: 340, y: 385, w: 85, h: 15, color: "silver" }, // ok
        { x: 290, y: 285, w: 50, h: 15, color: "silver" }, // ok
        { x: 480, y: 330, w: 50, h: 15, color: "silver" }, // ok
        { x: 585, y: 385, w: 75, h: 15, color: "silver" }, // ok
        {x: 55, y: 150, w: 35, h:15, color: "silver"}, // ok

        {x: 600, y: 220, w: 25, h:15, color: "silver"}, // ok

        { x: 200, y: 90, w: 55, h: 15, color: "silver" }, // ok
        { x: 310, y: 90, w: 55, h: 15, color: "silver" }, // ok
        { x: 420, y: 90, w: 55, h: 15, color: "silver" }, // ok
        { x: 530, y: 90, w: 55, h: 15, color: "silver" }, // ok
        { x: 640, y: 90, w: 55, h: 15, color: "silver" }, // ok
        { x: 760, y: 90, w: 50, h: 15, color: "silver" }, // ok
        

        { x: 500, y: 195, w: 25, h: 15, color: "silver" },

        { x: 365,  y: 235, w: 40, h: 15, color: "silver" },// ok
        { x: 210, y: 190, w: 40, h: 15, color: "silver" }, //  ok
    ]

    // NAVE
    nave = {
        x: 735, y: 165, w:50, h:110, color: "blue"
    }

    // SPAWN PLAYER
    spawnX = 20;
    spawnY = 260;

    player.x = spawnX;
    player.y = spawnY
    player. vy = 0;

    // RESETAR FASE
    itensColetados = 0;
    faseConcluida = false;
    mensagem = "";
}

// ----------------------------------------------
//    FUNÇÃO FASE 4
// ----------------------------------------------
function carregarFase4(){
    // PLATAFORMAS
    plataformas = [
        { x: 0,   y: 340, w: 50, h: 60, color: "#4A4F6B", solido: true },// ok
        { x: 50,   y: 370, w: 60, h: 40, color:     "#4A4F6B", solido: true},// ok
        { x: 190,   y: 370, w: 360, h: 40, color: "#4A4F6B", solido: true},// ok
        { x: 550,   y: 395, w: 155, h: 5, color: "#4A4F6B",  solido: true},// ok
        { x: 705,   y: 370, w: 50, h:30, color: "#4A4F6B",  solido: true},// ok
        { x: 755,   y: 320, w: 50, h:90, color: "#4A4F6B",solido: true },// ok
        { x: 150, y: 260, w: 80, h: 30, color: "#4A4F6B" }, // ok
        { x: 110, y: 280, w: 40, h: 10, color: "#4A4F6B",  }, // ok
        { x: 230, y: 260, w: 360, h: 15, color: "#4A4F6B", solido: true }, // ok
        { x: 700, y: 225, w: 100, h: 20, color: "#4A4F6B", solido: true }, //ok
        { x: 680, y: 225, w: 20, h: 75, color: "#4A4F6B", solido: true }, //      ok
        { x: 560, y: 275, w: 120, h: 25, color: "#4A4F6B",solido: true  }, // ok
        
        { x: 0, y: 200, w: 150, h:20, color: "#4A4F6B", solido: true  }, // ok
        { x: 0, y: 180, w: 25, h:25, color: "#4A4F6B", solido: true  }, // ok
        
        { x: 90, y: 120, w: 90, h: 15, color: "#4A4F6B" },
        { x: 235, y: 75, w: 110, h: 15, color:"#4A4F6B" },
        { x: 290, y:140, w: 100, h: 15, color: "#4A4F6B" },
        { x: 440, y:100, w: 60, h: 15, color: "#4A4F6B"},
        { x: 550, y:50, w: 60, h: 15, color: "#4A4F6B"},
        { x: 690, y:80, w: 30, h: 30, color: "#4A4F6B", solido: true},
        { x: 765, y:150, w: 30, h: 30, color: "#4A4F6B", solido: true},
        { x: 690, y:200 , w: 30, h: 30, color: "#4A4F6B", solido: true },
    ];

    // ITENS
    itens = [
        { x: 765, y: 265, w: 20, h: 20, color: "cyan", coletado: false, img: imgItem4 },
        { x: 695, y: 25,  w: 20, h: 20, color: "cyan", coletado: false , img: imgItem8 }
    ];

    // INIMIGOS
    inimigos = [
        {
            x: 360,
            y: 230,
            w: 40,
            h: 30,
            color: "purple",
            speed: 0.6,
            direcao: 1,
            limiteEsquerdo: 185,
            limiteDireito: 560
        },
        {
            x: 320,
            y: 340  ,
            w: 40,
            h: 30,
            color: "purple",
            speed: 0.6,
            direcao: 1,
            limiteEsquerdo: 240,
            limiteDireito: 510
        }
    ];

    // ESPINHOS
    espinhos = [
        { x: 110, y: 390, w: 80, h: 10, color: "silver" },// ok
        // { x: 220, y: 180, w: 40, h: 15, color: "silver" },
        // { x: 420, y: 140, w: 40, h: 15, color: "silver" }
        { x: 25, y: 190, w: 45, h:10, color: "silver"}, // ok
        { x: 720, y: 215, w: 80, h:10, color: "silver"}, // ok  
        { x: 630, y: 265, w: 50, h:10, color: "silver"}, // ok   
    ];

    // NAVE
    nave = {
        x: 270,
        y: -35,
        w: 50,
        h: 110,
        color: "blue"
    };

    // SPAWN
    spawnX = 80;
    spawnY = 150;

    player.x = spawnX;
    player.y = spawnY;
    player.vy = 0;

    // RESET DA FASE
    itensColetados = 0;
    faseConcluida = false;
    mensagem = "";
}
// ===================================================
//    FUNÇÃO DE REINICIO
// ==================================================
// Reinicia a fase atual
function reiniciarJogo() {
    if (faseAtual == 1) {
        carregarFase1();
    }

    if (faseAtual == 2) {
        carregarFase2();
    }
    if (faseAtual == 3) {
        carregarFase3()
    }

    if (faseAtual ==4){
        carregarFase4()
    }

    vidas = 2;
    mensagem = "";
    faseConcluida = false;
    morreu = false;
    noChao = false;
    encostandoNoInimigo = false;
    encostandoNoEspinho = false
    mostrandoIntroFase = false;

    player.x = spawnX;
    player.y = spawnY;
    player.vy = 0;
}

// ===================================================
//    LOOP PRINCIPAL DO JOGO
// ==================================================

// LOOP
function desenhar(){
    // ------------------------------------------------
    //    LIMPAR TELA
    // ------------------------------------------------

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (estadoJogo == "menu") {

        // desenha imagem de fundo
        if (imgMenu.complete && imgMenu.naturalWidth > 0) {
            ctx.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
        } else {
            // fallback caso não carregue
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // texto extra (opcional)
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";


        requestAnimationFrame(desenhar);
        return;
    }

    if (estadoJogo == "vitoria") {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        ctx.font = "42px Arial";
        ctx.fillText("PARABÉNS!", canvas.width / 2, 150);

        ctx.font = "24px Arial";
        ctx.fillText("Você conseguiu escapar de todos os planetas", canvas.width / 2, 210);
        ctx.fillText("e completar a missão!", canvas.width / 2, 245);

        ctx.font = "22px Arial";
        ctx.fillText("Mortes totais: " + mortesTotais, canvas.width / 2, 300);

        ctx.font = "18px Arial";
        ctx.fillText("Pressione R para voltar ao menu", canvas.width / 2, 360);

        requestAnimationFrame(desenhar);
        return;
    }


    // FUNDO DA FASE 1
    if (faseAtual == 1 && imgFundoFase1.complete && imgFundoFase1.naturalWidth > 0) {
        ctx.drawImage(imgFundoFase1, 0, 0, canvas.width, canvas.height);
    }

     // FUNDO DA FASE 2
    if (faseAtual == 2 && imgFundoFase2.complete && imgFundoFase2.naturalWidth > 0) {
        ctx.drawImage(imgFundoFase2, 0, 0, canvas.width, canvas.height);
    }

    // FUNDO DA FASE 3
    if (faseAtual == 3 && imgFundoFase3.complete && imgFundoFase3.naturalWidth > 0) {
        ctx.drawImage(imgFundoFase3, 0, 0, canvas.width, canvas.height);
    }

    // FUNDO DA FASE 4
    if (faseAtual == 4 && imgFundoFase4.complete && imgFundoFase4.naturalWidth > 0) {
        ctx.drawImage(imgFundoFase4, 0, 0, canvas.width, canvas.height);
    }

    // ------------------------------------------------
    //    FISICA DO PLAYER
    // ------------------------------------------------
    //GRAVIDADE
    player.vy += 0.5; // gravidade (vai acelerando pra baixo)
    player.y += player.vy; // aplica movimento
    noChao = false
    // colisão com chão
    if (faseAtual == 1 ){
        if (player.y + player.h > chao.y){
            player.y = chao.y - player.h; // topo do chão - altura player
            player.vy = 0; //  para de cair
            noChao = true;
        }
    }

    // Colisão com as plataformnas
    for(let plat of plataformas) {
        if (
            player.y + player.h <= plat.y + player.vy &&
            player.y + player.h + player.vy >= plat.y &&
            player.x + player.w > plat.x &&
            player.x < plat.x + plat.w
        ) {
            player.y = plat.y - player.h;
            player.vy = 0;
            noChao = true
            solido: true
        }
    }

    // QUEDA NO VAZIO (fase 2)
    if (faseAtual == 2 && player.y > canvas.height) {
        vidas = 0;

        // volta pro começo da fase
        player.x = spawnX;
        player.y = spawnY;
        player.vy = 0;
    }

    // ------------------------------------------------
    //    MOVIMENTO DO PLAYER
    // ------------------------------------------------

    if (!faseConcluida && !morreu && !mostrandoIntroFase) {
        let novoX = player.x;

        if (teclas.esquerda) {
            novoX -= player.speed;
        }

        if (teclas.direita) {
            novoX += player.speed;
        }

        // colisão lateral com blocos sólidos
        for (let plat of plataformas) {
            if (plat.solido) {
                let colideHorizontal =
                    novoX < plat.x + plat.w &&
                    novoX + player.w > plat.x &&
                    player.y < plat.y + plat.h &&
                    player.y + player.h > plat.y;

                if (colideHorizontal) {
                    // bateu pela esquerda do bloco
                    if (player.x + player.w <= plat.x) {
                        novoX = plat.x - player.w;
                    }

                    // bateu pela direita do bloco
                    if (player.x >= plat.x + plat.w) {
                        novoX = plat.x + plat.w;
                    }
                }
            }
        }

        player.x = novoX;
    }
    // -------------------------------------------
    // LIMITES DO MAPA
    // --------------------------------------------
    if (player.x < 0){
        player.x = 0;
    }
    if (player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }

    // ------------------------------------------------
    //    INTERAÇÃO COM ITENS
    // ------------------------------------------------
    for (let item of itens) {
        if (!item.coletado && colisao(player, item)) {
            item.coletado = true;
            itensColetados++;
        }
    }

    
    // ------------------------------------------------
    //    MOVIMENTO - INIMIGOS
    // ------------------------------------------------
    if (faseAtual == 2 || faseAtual == 4) {
        for (let inimigo of inimigos) {
            inimigo.x += inimigo.speed * inimigo.direcao;

            if (inimigo.x <= inimigo.limiteEsquerdo) {
                inimigo.direcao = 1;
            }

            if (inimigo.x + inimigo.w >= inimigo.limiteDireito) {
                inimigo.direcao = -1;
            }
        }
    }

    
    // ------------------------------------------------
    //    INTERAÇÃO COM INIMIGOS
    // ------------------------------------------------
    //inimigo
    let tocandoInimigo = false;

    for (let inimigo of inimigos) {
        if (colisao(player, inimigo)) {
            tocandoInimigo = true;
        }
    }

    if (tocandoInimigo) {
        if (!encostandoNoInimigo) {
            vidas--;
            encostandoNoInimigo = true;
            playerTomouDano = true;

            setTimeout(() => {
                playerTomouDano = false;
            }, 250);
        }
    } else {
        encostandoNoInimigo = false;
    }

    // ------------------------------------------------
    //    INTERAÇÃO COM ESPINHOS
    // ------------------------------------------------
    let tocandoEspinho = false;

    for (let espinho of espinhos) {
        let hitboxEspinho = {
            x: espinho.x + 4,
            y: espinho.y,
            w: espinho.w - 8,
            h: 8
        };

        if (colisao(player, hitboxEspinho)) {
            tocandoEspinho = true;
        }
    }
   if (tocandoEspinho) {
        if (!encostandoNoEspinho) {
            vidas--;
            encostandoNoEspinho = true;
            playerTomouDano = true;

            setTimeout(() => {
                playerTomouDano = false;
            }, 250);

            player.x = spawnX;
            player.y = spawnY;
            player.vy = 0;
        }
    } else {
        encostandoNoEspinho = false;
    }

    // ------------------------------------------------
    //    VERIFICAR MORTE
    // ------------------------------------------------
    if (vidas <= 0 && !morreu){
        morreu = true;
        mortesTotais++;
        setTimeout(() => {
            if (modoJogo == "dificil") {
            faseAtual = 1;
            }
            reiniciarJogo();
        }, 1000);
    }
    
    // ------------------------------------------------
    //    VERIFICAR NAVE OU VITORIA
    // ------------------------------------------------
    // testar se pode ou não avançar de fase - lógica nave
    if (colisao(player, nave)) {
        if (itensColetados < 2) {
            mensagem = "Faltam peças para ativar a nave";
        } else {
            if (faseAtual == 4) {
                estadoJogo = "vitoria";
            } else {
                faseConcluida = true;
            }
        }
    } else {
        mensagem = "";
    }

    if(faseConcluida){
        ctx.fillStyle = "white"
        ctx.font = "24px Arial"
        ctx.fontAlign = "center"
    }

    // ------------------------------------------------
    //    ATUALIZAR HUD
    // ------------------------------------------------
    document.getElementById("itens").textContent = itensColetados;
    document.getElementById("vidas").textContent = vidas;
    document.getElementById("fase").textContent = faseAtual;
    document.getElementById("mortes").textContent = mortesTotais;

    // ------------------------------------------------
    //    DESENHAR CENÁRIO
    // ------------------------------------------------
    if (faseAtual == 1){
        desenha_retangulo(chao);
    }
    
    for (let inimigo of inimigos) {
        desenhaInimigo(inimigo);
    }
    for (let plat of plataformas) {
        desenha_retangulo(plat);
    }
    desenhaNave()

    for (let item of itens) {
        if (!item.coletado) {
            desenhaItem(item);
        }
    }

    for (let espinho of espinhos){
        desenhaEspinho(espinho);
    }

    // Desenhar player apenas se não morreu ou passou de fase
    if (!faseConcluida && !morreu){
        desenhaPlayer(); // desenha o player na nova posição
    } 

    //---------------------------------
    // ESCURIDÃO DA FASE 4
    // ---------------------------------
        if (faseAtual == 4) {
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.beginPath();

            // camada preta na tela inteira
            ctx.rect(0, 0, canvas.width, canvas.height);

            // luz do player
            let raioPlayer = 50;
            let cxPlayer = player.x + player.w / 2;
            let cyPlayer = player.y + player.h / 2;
            ctx.moveTo(cxPlayer + raioPlayer, cyPlayer);
            ctx.arc(cxPlayer, cyPlayer, raioPlayer, 0, Math.PI * 2);

            // luz dos itens
            for (let item of itens) {
                if (!item.coletado) {
                    let raioItem = 20;
                    let cxItem = item.x + item.w / 2;
                    let cyItem = item.y + item.h / 2;
                    ctx.moveTo(cxItem + raioItem, cyItem);
                    ctx.arc(cxItem, cyItem, raioItem, 0, Math.PI * 2);
                }
            }

            // luz da nave
            let raioNave = 30;
            let cxNave = nave.x + nave.w / 2;
            let cyNave = nave.y + nave.h / 2;
            ctx.moveTo(cxNave + raioNave, cyNave);
            ctx.arc(cxNave, cyNave, raioNave, 0, Math.PI * 2);

            ctx.fill("evenodd");
            ctx.restore();
        }

    // ------------------------------------------------
    //    MENSAGEM DO TOPO
    // ------------------------------------------------
    ctx.fillStyle = "white";
    ctx.font = "23px Arial";
    ctx.textAlign = "center";

    ctx.strokeStyle = "black"
    ctx.lineWidth = 3;
    ctx.strokeText(mensagem, canvas.width/2, 50);
    ctx.fillText(mensagem, canvas.width / 2, 50);

    // ------------------------------------------------
    //    TELA DE VITORIA
    // ------------------------------------------------
    if (faseConcluida && faseAtual < 4) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("FASE CONCLUÍDA", canvas.width / 2, canvas.height / 2);

        ctx.font = "24px Arial";
        ctx.fillText("Pressione ENTER para continuar", canvas.width / 2, canvas.height / 2 + 50);
    }

    // ------------------------------------------------
    //    TELA DE MORTE
    // ------------------------------------------------
    if(morreu){
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("VOCÊ PERDEU", canvas.width / 2, canvas.height / 2);
    }

    if(mostrandoIntroFase){
        let textoFase = TextoDaFase();

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(20, 20, 20, 0.85)";
        ctx.fillRect(100, 110, 600, 200);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.font = "36px Arial";
        ctx.fillText(textoFase.titulo, canvas.width / 2, 160);

        ctx.font = "20px Arial";
        ctx.fillText(textoFase.descricao1, canvas.width / 2, 210);
        ctx.fillText(textoFase.descricao2, canvas.width / 2, 240);

        ctx.font = "18px Arial";
        ctx.fillText("Pressione qualquer tecla para começar", canvas.width / 2, 280);
    }

    // ------------------------------------------------
    //    REPETIR O LOOP
    // ------------------------------------------------
    // chama a função de novo (loop infinito)
    requestAnimationFrame(desenhar);

}
// ===================================================
//    INICIAR O JOGO - MOMENTO DE TESTES    
// ==================================================

// carregarFase1();
// if (debugFase == 1) carregarFase1();
// if (debugFase == 2) carregarFase2();
// if (debugFase == 3) carregarFase3();
// if(debugFase == 4) carregarFase4();

faseAtual = 1;
estadoJogo = "menu";
mostrandoIntroFase = false;
desenhar();
// ===================================================
//    EVENTOS DO TECLADO
// ==================================================
// quando aperta a tecla
document.addEventListener("keydown", function(evento){

    // MENU
    if (estadoJogo == "menu") {
        if (evento.key == "1") {
            modoJogo = "normal";
            estadoJogo = "jogando";
            faseAtual = 1;
            carregarFase1();
            mostrandoIntroFase = true;
        }

        if (evento.key == "2") {
            modoJogo = "dificil";
            estadoJogo = "jogando";
            faseAtual = 1;
            carregarFase1();
            mostrandoIntroFase = true;
        }

        return;
    }

    // TELA FINAL
    if (estadoJogo == "vitoria") {
        if (evento.key == "r" || evento.key == "R") {
            estadoJogo = "menu";
            faseAtual = 1;
            mortesTotais = 0;
            vidas = 2;
            mostrandoIntroFase = false;
        }
        return;
    }

    // INTRO DA FASE
    if (mostrandoIntroFase) {
        mostrandoIntroFase = false;
        return;
    }

    if (evento.key == "a" || evento.key == "A") {
        teclas.esquerda = true;
        direcaoPlayer = "esquerda";
    }

    if (evento.key == "d" || evento.key == "D") {
        teclas.direita = true;
        direcaoPlayer = "direita";
    }

    if ((evento.key == "w" || evento.key == "W") && noChao && !faseConcluida && !morreu) {
        if (faseAtual == 3 || faseAtual == 4) {
            player.vy = -8.25;
        } else {
            player.vy = -9.5;
        }
    }

    if (evento.key == "Enter" && faseConcluida){
        faseAtual++;

        if (faseAtual == 2){
            carregarFase2();
            mostrandoIntroFase = true;
        }
        else if (faseAtual == 3){
            carregarFase3();
            mostrandoIntroFase = true;
        }
        else if (faseAtual == 4){
            carregarFase4();
            mostrandoIntroFase = true;
        }
        else if (faseAtual == 5){
            estadoJogo = "vitoria";
        }
    }
});
// Quando solta a tecla
document.addEventListener("keyup", function(evento){ //conseguir apertar 2 teclas "ao mesmo tempo"
    if (evento.key == "a" || evento.key == "A"){
        teclas.esquerda = false;
    }

    if (evento.key == "d" || evento.key == "D"){
        teclas.direita = false;
    }
})









