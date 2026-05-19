// FUNÇÃO TEXTO DAS FASES
// --------------------------------------------------------------
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

    
}

function desenhaMenu() {
    if (imgMenu.complete && imgMenu.naturalWidth > 0) {
        ctx.drawImage(imgMenu, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function desenhaTelaVitoriaFinal() {
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
}

function desenhaTelaFaseConcluida() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FASE CONCLUÍDA", canvas.width / 2, canvas.height / 2);

    ctx.font = "24px Arial";
    ctx.fillText("Pressione ENTER para continuar", canvas.width / 2, canvas.height / 2 + 50);
}

function desenhaTelaMorte() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("VOCÊ PERDEU", canvas.width / 2, canvas.height / 2);
}

function desenhaIntroFase() {
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
