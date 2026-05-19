// ===================================================
//    CANVAS
// ==================================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
            desenhaMenu();
            requestAnimationFrame(desenhar);
            return;
        } else {
            // fallback caso não carregue
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        requestAnimationFrame(desenhar);
        return;
    }

    if (estadoJogo == "vitoria") {
        desenhaTelaVitoriaFinal();
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
        desenhaTelaFaseConcluida();
    }

    // ------------------------------------------------
    //    TELA DE MORTE
    // ------------------------------------------------
    if(morreu){
        desenhaTelaMorte();
    }

    if(mostrandoIntroFase){
        desenhaIntroFase();
    }

    // ------------------------------------------------
    //    REPETIR O LOOP
    // ------------------------------------------------
    // chama a função de novo (loop infinito)
    requestAnimationFrame(desenhar);

}
// ===================================================
//    INICIAR O JOGO  MOMENTO DE TESTES    
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