

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const btn = document.querySelector("#reset");

const winCondions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gamestate = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame(){
    cells.forEach(function(cell){
        cell.addEventListener("click",cellClicked);
    });

    btn.addEventListener("click",resetGame);
    statusText.textContent = currentPlayer + "'s turn";
    running = true;
}

function cellClicked(){
    const cellNumber = this.id;

    if(gamestate[cellNumber]!="" || !running)
        return;

    gamestate[cellNumber] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function changePlayer(){
    if((currentPlayer=="X"))
        currentPlayer = "O";
    else
       currentPlayer = "X";

       statusText.textContent = currentPlayer + "'s turn";
}

function checkWinner(){
    let roundWon = false;

    for(let i=0;i<winCondions.length;i++){
        const cellA = gamestate[winCondions[i][0]];
        const cellB = gamestate[winCondions[i][1]];
        const cellC = gamestate[winCondions[i][2]];
        
        if(cellA=="" || cellB=="" || cellC=="")
            continue;

        if(cellA==cellB && cellB==cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!gamestate.includes("")){
        statusText.textContent = "Draw";
        running = false;
    }
    else{
        changePlayer(); 
    }
}

function resetGame(){
     gamestate = ["","","","","","","","",""];
     currentPlayer = "X";
     statusText.textContent = `${currentPlayer}'s turn`;
     cells.forEach(function(cell){
        cell.textContent = "";
     });
     running =true;
}