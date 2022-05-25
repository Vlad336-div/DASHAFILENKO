import Input from './src/input.js';
import View from './src/view.js';
import Game from './src/game.js';
import Sprite from './src/sprite.js';

// доступ к холсту
const canvas = document.querySelector('canvas');
const sprite = new Sprite('./sounds/sprite.png');

const game = new Game({
    input: new Input(),
    // отправляем в view холст и спрайты
    view: new View(canvas, sprite)
});

game.init().then(() => game.start());

console.log(game);