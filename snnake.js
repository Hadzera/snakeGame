var Snnake = /** @class */ (function () {
    function Snnake() {
        this.GAME = document.getElementById('game');
        this.fields = 30;
        this.dx = 0;
        this.dy = 0;
        this.snake = [
            { y: 5, x: 7 },
            { y: 5, x: 6 },
            { y: 5, x: 5 }
        ];
        this.food = {
            x: 12, y: 8
        };
        this.score = document.getElementById('score');
    }
    Snnake.prototype.renderScreen = function () {
        this.GAME.innerHTML = '';
        for (var y = 0; y < this.fields; y++) {
            for (var x = 0; x < this.fields; x++) {
                var div = document.createElement('div');
                div.className = "field";
                if (this.isSnakeOnScreen(x, y)) {
                    div.classList.add('snake');
                }
                if (this.isSnakeHead(x, y)) {
                    div.classList.add('snake-head');
                }
                if (this.isFoodOnScreen(x, y)) {
                    div.classList.add('food');
                }
                this.GAME.appendChild(div);
            }
        }
    };
    Snnake.prototype.isSnakeOnScreen = function (x, y) {
        for (var i = 0; i < this.snake.length; i++) {
            if (this.snake[i].x === x && this.snake[i].y === y) {
                return true;
            }
        }
    };
    Snnake.prototype.isFoodOnScreen = function (x, y) {
        if (this.food.x === x && this.food.y === y) {
            return true;
        }
    };
    Snnake.prototype.isSnakeHead = function (x, y) {
        var head = this.getSnakeHead();
        if (head.x === x && head.y === y) {
            return true;
        }
    };
    Snnake.prototype.getSnakeHead = function () {
        return this.snake[0];
    };
    Snnake.prototype.handleSnakeDirection = function (event) {
        switch (event.keyCode) {
            case 37:
                console.log('MOVE LEFT');
                if (this.dx !== 1)
                    this.moveSnake('LEFT');
                break;
            case 38:
                console.log('MOVE UP');
                if (this.dy !== 1)
                    this.moveSnake('UP');
                break;
            case 39:
                console.log('MOVE RIGHT');
                if (this.dx !== -1)
                    this.moveSnake('RIGHT');
                break;
            case 40:
                console.log('MOVE DOWN');
                if (this.dy !== -1)
                    this.moveSnake('DOWN');
                break;
        }
    };
    Snnake.prototype.moveSnake = function (direction) {
        switch (direction) {
            case "LEFT":
                this.dx = -1;
                this.dy = 0;
                break;
            case "RIGHT":
                this.dx = 1;
                this.dy = 0;
                break;
            case "UP":
                this.dy = -1;
                this.dx = 0;
                break;
            case "DOWN":
                this.dy = 1;
                this.dx = 0;
                break;
        }
    };
    Snnake.prototype.goSnake = function () {
        if (this.dx === 0 && this.dy === 0) {
            return;
        }
        var head = this.getSnakeHead();
        var newX = head.x + this.dx;
        newX = newX % this.fields;
        if (newX < 0) {
            newX = this.fields;
        }
        var newY = head.y + this.dy;
        newY = newY % this.fields;
        if (newY < 0) {
            newY = this.fields;
        }
        this.snake.unshift({ x: newX, y: newY });
        this.snake.pop();
    };
    Snnake.prototype.playGame = function () {
        var _this = this;
        this.goSnake();
        var head = this.getSnakeHead();
        if (head.x === this.food.x && head.y === this.food.y) {
            this.eatFood();
            this.food = { x: Math.floor(Math.random() * this.fields), y: Math.floor(Math.random() * this.fields) };
        }
        this.renderScreen();
        var INTERVAL = 400;
        if (this.snake.length > 5) {
            INTERVAL = 300;
        }
        if (this.snake.length > 8) {
            INTERVAL = 200;
        }
        if (this.snake.length > 11) {
            INTERVAL = 100;
        }
        setTimeout(function () {
            _this.playGame();
        }, INTERVAL);
        this.gameOver();
        this.snake;
    };
    Snnake.prototype.eatFood = function () {
        var head = this.getSnakeHead();
        var newX = head.x + this.dx;
        var newY = head.y + this.dy;
        this.snake.unshift({ x: newX, y: newY });
        this.score.innerHTML = this.snake.length - 3 + '';
    };
    Snnake.prototype.gameOver = function () {
        var head = this.getSnakeHead();
        for (var i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                alert('GAME OVER');
                this.snake = [];
            }
        }
    };
    return Snnake;
}());
