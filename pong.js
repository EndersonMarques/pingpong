var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var teclas = {};

var bola = 
{
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    altura: 30,
    largura: 30,
    dirx: -1,
    diry: 1,
    mod: 0,
    velocidade: 0
};

var Player1 = 
{
    x: 10,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 15
};

var Player2 = 
{
    x: canvas.width - 40,
    y: canvas.height / 2 - 60,
    altura: 120,
    largura: 30,
    pontos: 0,
    velocidade: 15
};

document.addEventListener("keydown", function(e){
    teclas[e.keyCode] = true;
    //  alert(e.keyCode);
});

document.addEventListener("keyup", function(e){
    delete teclas[e.keyCode];
});

function movePlayer()
{
    if(87 in teclas && Player1.y > 0)
        Player1.y = Player1.y - Player1.velocidade;

    if(83 in teclas && (Player1.y + Player1.altura) < canvas.height)
        Player1.y = Player1.y + Player1.velocidade;

    if(38 in teclas && Player2.y > 0)
        Player2.y = Player2.y - Player2.velocidade;

    if(40 in teclas && (Player2.y + Player2.altura) < canvas.height)
        Player2.y = Player2.y + Player2.velocidade;
}

function moveBola()
{
    if(bola.y + bola.altura >=  Player1.y && bola.y <= Player1.y + Player1.altura && bola.x <= Player1.x + Player1.largura)
    {
        bola.dirx = 1;
        bola.mod += 0.2;
    }

    else if(bola.y + bola.largura >= Player2.y && bola.y <= Player2.altura + Player2.y && bola.x + bola.largura >= Player2.x)
    {
        bola.dirx = -1;
        bola.mod += 0.2;
    }

    if(bola.y <= 0)
    {
        bola.diry = 1;
        // bola.mod += 0.2;
    }

    else if(bola.y + bola.altura >= canvas.height)
    {
        bola.diry = -1;
        // bola.mod += 0.2;
    }

    bola.x += (bola.velocidade + bola.mod) * bola.dirx;
    bola.y += (bola.velocidade + bola.mod) * bola.diry;

    if(bola.x < Player1.x + Player1.largura - 15)
    {
        newGame("Player2");
    }
    else if(bola.x + bola.largura > Player2.x  + 15)
    {
        newGame("Player1");
    }
}

function newGame(winner)
{
    if(winner == "Player1")
    {
        Player1.pontos++;
    }
    else
    {
        Player2.pontos++;
    }

    Player1.y = canvas.height/2 + Player1.altura/2;
    Player2.y = Player1.y;
    bola.y = canvas.height / 2 - bola.altura/2;
    bola.x = canvas.width/2 - bola.largura/2;
    bola.mod = 0;
}

function desenha()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    moveBola();

    ctx.fillStyle = "white";
    ctx.fillRect(Player1.x, Player1.y, Player1.largura, Player1.altura);
    ctx.fillRect(Player2.x, Player2.y, Player2.largura, Player2.altura);
    ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

    ctx.font = "20px Arial";
    ctx.fillText("Player 1: " + Player1.pontos, 50, 20);
    ctx.fillText("Player 2: " + Player2.pontos, canvas.width - 150, 20);

}

setInterval(desenha, 5);
