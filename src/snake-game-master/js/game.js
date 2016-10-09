/// <reference path="snake.ts"/>
'use strict';
var Game;
(function (Game) {
    var start = document.getElementById('start');
    var score = document.getElementById('score');
    var floor = new Game.Floor({
        parent: document.getElementById('container')
    });
    floor.initialize();
    var snake = new Game.Snake(floor);
    start.onclick = function () {
        snake.born();
        this.setAttribute('disabled', true);
    };
    var observer = function (changes) {
        changes.forEach(function (change) {
            if (change.name === 'score') {
                score.textContent = change.object[change.name];
            }
        });
    };
    Object.observe(snake, observer);
})(Game || (Game = {}));
