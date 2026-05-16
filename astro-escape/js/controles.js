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