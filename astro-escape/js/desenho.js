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
