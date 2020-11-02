window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    }
    document.getElementById('youWin-button').onclick = () => {
        winAgain();
    }
    document.getElementById('tryagain-button').onclick = () => {
        tryAgain();
    }
}

function startGame () {
    const divDisplay = document.querySelector('#gameStart')
    divDisplay.style.display = 'none'
    const scoreDisplay = document.querySelector('.score')
    scoreDisplay.style.display = 'block'
    game.init('canvas')
}


function tryAgain () {
    const GOdivDisplay = document.querySelector('#GOdiv')
    GOdivDisplay.style.display = 'none'
    console.log(this.bricks)
    game.reset('canvas')
}

function winAgain() {
    const YWdivDisplay = document.querySelector('#windiv')
    YWdivDisplay.style.display = 'none'
    console.log(this.bricks)
    game.reset('canvas')
}