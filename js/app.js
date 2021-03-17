import Canvas from './params_and_init/Canvas.js';
import Utilitary from "./params_and_init/Utilitary.js";
import Game from './params_and_init/Game.js';
import GetItem from './params_and_init/GetItem.js';

const urls = ["index.html", "game.html"];

// init canvas :
const canvas = new Canvas('canvas');
canvas.make_grid();

// try get items in localeStorage
let beginItem;
try {
   beginItem = GetItem.getStartPlayer();
} catch (e) {
    console.error(e);
    // default value :
    beginItem = 'x';
}

let pathItems;
try {
    pathItems = GetItem.img_according_localStorage();;
} catch (err) {
    console.error(err);
    // default value :
    pathItems = ["../img/true.png", "../img/false.png"];
}
// init data game with items in localStorage and instance of canvas :
const game = new Game(pathItems , canvas , beginItem , Utilitary);
Utilitary.add_event(document.getElementById("options"), () => void window.location.assign(urls[0]));
Utilitary.add_event(document.getElementById("reload"), () => void window.location.assign(urls[1]));
Utilitary.add_event(canvas.canvas, (e) => void game.analyze_click_position(e, canvas.range));
