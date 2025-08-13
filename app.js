let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let messageCont = document.querySelector(".message");
let message = document.querySelector(".winner-msg");

let turnO = true;
let count = 0;


const showWinner = (winner) => {
    message.innerText = `The winner is ${winner}`;
    messageCont.classList.remove("hide");
}
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }   
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner) gameDraw();
        
    });
})


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Value =  boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if(pos1Value == pos2Value && pos2Value == pos3Value) {
                console.log("Winner is player", pos1Value, '!');
                showWinner(pos1Value);
                disableBoxes();
                return true;
            }
        }
    }
    return false;
};

const resetGame = () => {
    enableBoxes();
    turnO = true;
    count = 0;
}

reset.addEventListener("click", () => {
    resetGame();
    messageCont.classList.add("hide");
});

const gameDraw = () => {
    disableBoxes();
    message.innerText = `The game is a draw`;
    messageCont.classList.remove("hide");
}