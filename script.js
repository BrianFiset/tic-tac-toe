const CreatePlayer = (name, sign) =>{
    let turn = false;
    let Win = false;
    return { name, sign, turn, Win };
};

const player ={
    player1: CreatePlayer('player1', 'X'),
    player2: CreatePlayer('player2', 'O'),
}

const gameboard = (()=>{
    player.player1.turn = true;
    const input = document.querySelectorAll(".game-board > div");
    input.forEach(item => item.addEventListener('click', ()=> {
        if(item.innerText != '') {
            return
        } else if(player.player1.Win === true || player.player2.Win === true){
            return
        }
        else if(player.player1.turn === true ){
            item.innerText = player.player1.sign;
            player.player1.turn = false;
            player.player2.turn = true;
            game()
        } else if (player.player2.turn === true ){
            item.innerText = player.player2.sign;
            player.player2.turn = false;
            player.player1.turn = true;
            game()
        };
        return
    }));
})();

const game = ()=>{
    const box = {
        1: document.getElementById("1").innerText,
        2: document.getElementById("2").innerText,
        3: document.getElementById("3").innerText,
        4: document.getElementById("4").innerText,
        5: document.getElementById("5").innerText,
        6: document.getElementById("6").innerText,
        7: document.getElementById("7").innerText,
        8: document.getElementById("8").innerText,
        9: document.getElementById("9").innerText,
    };

    const gameWin = [
        box[1] === box[2] === box[3],
    ];
    const gameResult = document.querySelector(".game-board > p");
    if (box[1] === player.player1.sign && box[2] === player.player1.sign && box[3] === player.player1.sign ||
        box[4] === player.player1.sign && box[5] === player.player1.sign && box[6] === player.player1.sign ||
        box[7] === player.player1.sign && box[8] === player.player1.sign && box[9] === player.player1.sign ||
        box[1] === player.player1.sign && box[4] === player.player1.sign && box[7] === player.player1.sign ||
        box[2] === player.player1.sign && box[5] === player.player1.sign && box[8] === player.player1.sign ||
        box[3] === player.player1.sign && box[6] === player.player1.sign && box[9] === player.player1.sign ||
        box[1] === player.player1.sign && box[5] === player.player1.sign && box[9] === player.player1.sign ||
        box[3] === player.player1.sign && box[5] === player.player1.sign && box[7] === player.player1.sign) {

        player.player1.Win = true;
        gameResult.innerText = 'player 1 Win';
    } else  if(box[1] === player.player2.sign && box[2] === player.player2.sign && box[3] === player.player2.sign ||
        box[4] === player.player2.sign && box[5] === player.player2.sign && box[6] === player.player2.sign ||
        box[7] === player.player2.sign && box[8] === player.player2.sign && box[9] === player.player2.sign ||
        box[1] === player.player2.sign && box[4] === player.player2.sign && box[7] === player.player2.sign ||
        box[2] === player.player2.sign && box[5] === player.player2.sign && box[8] === player.player2.sign ||
        box[3] === player.player2.sign && box[6] === player.player2.sign && box[9] === player.player2.sign ||
        box[1] === player.player2.sign && box[5] === player.player2.sign && box[9] === player.player2.sign ||
        box[3] === player.player2.sign && box[5] === player.player2.sign && box[7] === player.player2.sign){
            player.player2.Win = true;
            gameResult.innerText = 'player 2 Win';
    };

};