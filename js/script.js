const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart');

let score = 0;
let gameLoop;

const jumpSound = new Audio('audio/jump.mp3');
const gameOverSound = new Audio('audio/game-over.mp3');

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        jumpSound.play();

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const startGame = () => {
    score = 0;
    scoreElement.textContent = score;
    
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = ''; 
    
  
    mario.style.animation = '';
    mario.src = 'img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0'; 
    mario.style.marginLeft = '0';

    restartButton.style.display = 'none';

    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            gameOverSound.play();

            clearInterval(gameLoop);
            restartButton.style.display = 'block';
        }

        score++;
        scoreElement.textContent = score;
    }, 10);
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

restartButton.addEventListener('click', startGame);

startGame();
