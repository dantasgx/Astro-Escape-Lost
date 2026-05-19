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