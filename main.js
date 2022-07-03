const MIN_ROWS = 2

var url = new URL(window.location.href);
var level = url.searchParams.get('level');
if (level) { 
   level = Math.min(Math.max(level, 1), 16) // TODO
} else {
    level = 1 
}

var boardSize = MIN_ROWS + level

var lightTarget = boardSize ** 2
var lightCurrent = 0

var gameBoard = Array(boardSize)
var boardContainer = document.getElementById("game-board")

var levelCount = document.getElementById('level')
var restart = document.getElementById('restart')

levelCount.innerHTML = level

restart.addEventListener('click', () => {
    ReInit(false)
})


function StartRound(){
    BuildBoard()
}

function BuildBoard(){

    boardContainer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`

    for(let i = 0; i < boardSize; i++){
        gameBoard[i] = Array(boardSize)

        for(let j = 0; j < boardSize; j++){
            gameBoard[i][j] = 0

            BuildLight(i, j)
        }
    }
    console.log("Board", gameBoard)
}

function BuildLight(x, y){
    let div = document.createElement('div')
    div.setAttribute('x', x)
    div.setAttribute('y', y)
    div.classList.add('light')

    div.addEventListener('click', () => {
        ToggleLight(div);
        ToggleSiblings(x, y)
        if(lightCurrent == lightTarget){
            ReInit()
        }
    })

    boardContainer.append(div)
}

function ToggleLight(light){
    let active = light.classList.contains('active')
    if(active){
        light.classList.remove('active')
        lightCurrent--
    } else {
        light.classList.add('active')
        lightCurrent++
    }
}

function ToggleSiblings(x, y){
    let top = document.querySelector(`.light[x="${x}"][y="${y-1}"]`)
    let right = document.querySelector(`.light[x="${x+1}"][y="${y}"]`)
    let bottom = document.querySelector(`.light[x="${x}"][y="${y+1}"]`)
    let left = document.querySelector(`.light[x="${x-1}"][y="${y}"]`)

    let siblings = [top, right, bottom, left].filter((sibling) => {
        return sibling
    })

    console.log('non null siblings', siblings)

    siblings.forEach((sibling) => {
        ToggleLight(sibling)
    })
}

function ReInit(progress = true){
    console.log("progess", progress)
    level = progress ? level + 1 : level

    levelCount.innerHTML = level
    boardSize = MIN_ROWS + level

    lightTarget = boardSize ** 2
    lightCurrent = 0

    gameBoard = Array(boardSize)
    boardContainer.innerHTML = ''

    BuildBoard()
}

StartRound()
