import stages from './stages.js';
import Stage from './stage.js';

export default class Game {
    // добавляяем конструктор и указываем через реструктуризацию, что мы принимаем игровой мир и представления
    constructor({ input, view }) {
        // дальше мы их здесь сохраним
        this.input = input;
        this.view = view;
        
        this.stages = stages;
        this.player1 = null;
        this.player2 = null;
        this.stage = null;
        this.stageIndex = 0;
        this.frames = 0;
        this.lastFrame = 0;

        this.loop = this.loop.bind(this);
        this.onGameOver = this.onGameOver.bind(this);
    }

    async init() {
        await this.view.init();
    }

    start() {
        this.stage = new Stage(stages[this.stageIndex]);
        this.stage.number = this.stageIndex + 1;
        this.stage.on('gameOver', this.onGameOver);

        requestAnimationFrame(this.loop);
    }

    loop(currentFrame) {
        const frameDelta = currentFrame - this.lastFrame;

        this.stage.update(this.input, frameDelta);
        this.view.update(this.stage, this.player1, this.player2);
        this.frames = 0;

        this.lastFrame = currentFrame;

        requestAnimationFrame(this.loop);
    }

    onGameOver() {
        // show game over screen
        console.log('GAME OVER');
    }
}