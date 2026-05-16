// ==================================================
// TESTE DE FASES
// ==================================================
let debugFase = 4; // muda aqui pra testar qualquer fase

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

// ===================================================
//    TECLADO
// ==================================================

// Usado pra guardar o estado das teclas pressionadas
let teclas = {
    esquerda: false,
    direita: false
}
