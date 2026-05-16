// Função de colisão entre dois retângulos
function colisao(a,b){ // a = player; b = item/inimigo
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}