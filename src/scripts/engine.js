const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#lives"),
        modal: document.querySelector("dialog"),
        reset: document.querySelector("#reset"),
        scoreDia: document.querySelector("#scoreDialog")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        currentTime: 60,
        liveUp: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function modalOpen(){
    state.view.modal.showModal()
    state.view.scoreDia.textContent = state.values.result;
}

function modalClose() {
    state.view.modal.close()
    window.location.reload()
    // alert("clicou!")
}

state.view.reset.addEventListener("click", modalClose)

document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        window.location.reload()
        state.values.liveUp = 3
        state.values.hitPosition = 0
        state.values.result = 0
        state.values.currentTime = 60
        state.values.gameVelocity = 1000
        state.actions.timerId = setInterval(randomSquare, 1000)
        state.actions.countDownTimerId = setInterval(countDown, 1000)

    }
});

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0 || state.values.liveUp === 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.view.score.textContent = state.values.result
        state.view.live.textContent = state.values.liveUp
        // alert("Game Over! O seu resultado foi: "+ state.values.result )
        
        modalOpen()
        // window.location.reload()
    }
}

function playSound(audioName, format = "m4a", volume = 0.5) {
    let audio = new Audio(`./src/audios/${audioName}.${format}`)
    audio.volume = volume
    audio.play()
}

// function playSound2(audiowro) {
//     let audio2 = new Audio(`./src/audios/${audiowro}.mp3`)
//     audio2.volume = 0.5
//     audio2.play()
// }

function randomSquare() {
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() *9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit", "m4a", 0.2)
            } else {
                state.values.liveUp--;
                console.log(state.values.liveUp)
                state.view.live.textContent = state.values.liveUp;
                playSound("wrong", "mp3", 0.5)
            }
        })
    })
}

function initialize() {
    addListenerHitBox()

}

initialize();