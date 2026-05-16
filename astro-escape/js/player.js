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

let direcaoPlayer = "direita";
let playerTomouDano = false

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

