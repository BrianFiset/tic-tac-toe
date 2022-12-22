// Start Menu and buttons

const playerFactory = (name, sign, ai1) =>{
    let turn = false;
    let win = false;
    const ai = ai1;
    let points = 0
    return { name:name, sign:sign, ai ,turn, win , points};
};

let player = {};

const startMenu = (()=> {
    const gameSelector = document.getElementsByClassName("game-selector")[0];
    const players = document.getElementsByClassName("players")[0];
    const pvp = document.querySelector(".pvp > button");
    const pve = document.querySelector(".pve > button");
    const startMenu = document.getElementsByClassName("container")[0];
    const startButton = document.getElementsByClassName("start-game")[0];
    const startPve = document.getElementsByClassName("start-pve")[0];
    const gameContainer = document.getElementsByClassName("game-container")[0];
    const player1 = document.getElementById("player1");
    const player11 = document.getElementById("player11");
    const player2 = document.getElementById("player2");
    const backbtn = document.querySelector(".go-back > div");
    const newRound = document.getElementsByClassName("new-round")[0];
    const newGame = document.getElementsByClassName("restart")[0];
    const player1Name = document.getElementsByClassName("player1-name")[0];
    const player2Name = document.getElementsByClassName("player2-name") [0];
    const winnerText = document.getElementsByClassName("winner")[0];
    const pveForm = document.getElementsByClassName("player-vs-ai")[0];

    const startGame = ()=>{
        document.getElementById("1").innerText = '';
        document.getElementById("2").innerText = '';
        document.getElementById("3").innerText = '';
        document.getElementById("4").innerText = '';
        document.getElementById("5").innerText = '';
        document.getElementById("6").innerText = '';
        document.getElementById("7").innerText = '';
        document.getElementById("8").innerText = '';
        document.getElementById("9").innerText = '';
        winnerText.innerText = '';
        player.one.win = false;
        player.two.win = false;
        player.two.turn = false;
        player.one.turn = true;
    }

    function removeStartMenu(){
        startMenu.style.visibility = 'hidden';
        gameContainer.style.visibility = 'visible';
        players.classList.remove("visible");
        gameSelector.style.visibility = 'hidden';
        pveForm.classList.remove("visible");
    }

    function addPlayerNames() {
        player1Name.innerText = `${player.one.name} : ${player.one.points}`
        player2Name.innerText = `${player.two.name} : ${player.two.points}`
    };

    pve.addEventListener('click', ()=> {
        players.classList.remove("visible");
        pveForm.classList.toggle("visible");
        
    });

    pvp.addEventListener('click', ()=> {
        pveForm.classList.remove("visible");
        players.classList.toggle("visible");
        
    });

    startButton.addEventListener('click', ()=>{
        if(player1.value !== '' && !player2.value !== '') {

            player = {
                one: playerFactory
            (player1.value, 'X'),
                two: playerFactory
            (player2.value, 'O'),
            }
            removeStartMenu();
            startGame();
            gameboard();
            addPlayerNames();
        }    
        return;
    });

    startPve.addEventListener('click', ()=>{
        if(player11.value !== '') {
            player = {
                one: playerFactory
            (player11.value, 'X'),
                two: playerFactory
            ('Ai', 'O', true),
            }
            removeStartMenu();
            startGame();
            gameboard();
            addPlayerNames();
        }    
        return;
    });

    backbtn.addEventListener('click', ()=> {
        startMenu.style.visibility = 'visible';
        gameContainer.style.visibility = 'hidden';
        gameSelector.style.visibility = 'visible';
        player1.value = '';
        player2.value = '';
        player.one.points = 0;
        player.two.points = 0;
    });

    newRound.addEventListener('click', ()=>{
        startGame();
    });

    newGame.addEventListener('click', ()=>{
        startGame();
        addPlayerNames();
        player.one.points = 0;
        player.two.points = 0;
    });
})();

// Game Logic

const gameboard = ()=>{
    player.one.turn = true;
    const input = document.querySelectorAll(".game-board > div");

    input.forEach(item => item.addEventListener('click', ()=> {
        if(item.innerText != '') {
            return
        } else if(player.one.win === true || player.two.win === true){
            return
        }
        else if(player.one.turn === true ){
            item.innerText = player.one.sign;
            game()
            if(player.two.ai === true){
                if (player.one.win !== true) {
                    computerTurn()
                    game()
                } return
            } else {
                player.one.turn = false;
                player.two.turn = true;
                game()
            }
        } else if (player.two.turn === true ){
            item.innerText = player.two.sign;
            player.two.turn = false;
            player.one.turn = true;
            game()
        };
        return
    }));
};

const game = ()=>{
    const player1Name = document.getElementsByClassName("player1-name")[0];
    const player2Name = document.getElementsByClassName("player2-name") [0];  
    const winnerText = document.getElementsByClassName("winner")[0];

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

    const gameResult = document.querySelector(".game-board > p");
    if (box[1] === player.one.sign && box[2] === player.one.sign && box[3] === player.one.sign ||
        box[4] === player.one.sign && box[5] === player.one.sign && box[6] === player.one.sign ||
        box[7] === player.one.sign && box[8] === player.one.sign && box[9] === player.one.sign ||
        box[1] === player.one.sign && box[4] === player.one.sign && box[7] === player.one.sign ||
        box[2] === player.one.sign && box[5] === player.one.sign && box[8] === player.one.sign ||
        box[3] === player.one.sign && box[6] === player.one.sign && box[9] === player.one.sign ||
        box[1] === player.one.sign && box[5] === player.one.sign && box[9] === player.one.sign ||
        box[3] === player.one.sign && box[5] === player.one.sign && box[7] === player.one.sign) {
        
        player.one.points += 1;
        player.one.win = true;
        player1Name.innerText = `${player.one.name} : ${player.one.points}`
        winnerText.innerText = `${player.one.name} Wins`

    } else  if(box[1] === player.two.sign && box[2] === player.two.sign && box[3] === player.two.sign ||
        box[4] === player.two.sign && box[5] === player.two.sign && box[6] === player.two.sign ||
        box[7] === player.two.sign && box[8] === player.two.sign && box[9] === player.two.sign ||
        box[1] === player.two.sign && box[4] === player.two.sign && box[7] === player.two.sign ||
        box[2] === player.two.sign && box[5] === player.two.sign && box[8] === player.two.sign ||
        box[3] === player.two.sign && box[6] === player.two.sign && box[9] === player.two.sign ||
        box[1] === player.two.sign && box[5] === player.two.sign && box[9] === player.two.sign ||
        box[3] === player.two.sign && box[5] === player.two.sign && box[7] === player.two.sign){

            player.two.points += 1;
            player.two.win = true;
            player2Name.innerText = `${player.two.name} : ${player.two.points}`
            winnerText.innerText = `${player.two.name} Wins`

    } else if(box[1] !== '' && box[2] !== '' && box[3] !== '' && box[4] !== '' 
    && box[5] !== '' && box[6] !== ''  && box[7] !== '' && box[8] !== '' 
    && box[9] !== '' ){
        winnerText.innerText = 'Tied';
    };
    

};


// Ai
const computerTurn = ()=>{
    const box = [
        document.getElementById("1"),
        document.getElementById("2"),
        document.getElementById("3"),
        document.getElementById("4"),
        document.getElementById("5"),
        document.getElementById("6"),
        document.getElementById("7"),
        document.getElementById("8"),
        document.getElementById("9"),
    ];
    let box1 = [];
    
    for(let i = 0; i < box.length; i += 1) {
        if(box[i].innerText === '') {
            box1.push(box[i])
        }
    }
    if (box1[1] === '') {
        return

    }else if (box1[1] !==''){
        let random = Math.floor(Math.random() * box1.length);
        let obj = box1[random];
        obj.innerText = player.two.sign;
    }
    return
};