
interface Cordinate {
    x:number,
    y:number
}

class Snnake {
   GAME: HTMLElement = document.getElementById('game');
   fields:number = 30;
   dx:number = 0;
   dy:number = 0;
   snake:Cordinate[] = [
       {y:5, x:7},
       {y:5, x:6},
       {y:5, x:5}
   ];
   food:Cordinate = {
       x:12, y:8
   };
   score: HTMLElement = document.getElementById('score');

   renderScreen(){
       this.GAME.innerHTML = '';
       for (let y = 0; y < this.fields; y++) {
         for (let x = 0; x < this.fields; x++) {
            let div = document.createElement('div');
            div.className="field";
            if(this.isSnakeOnScreen(x,y)){
              div.classList.add('snake');
            }
            if(this.isSnakeHead(x,y)){
              div.classList.add('snake-head');
            }
            if(this.isFoodOnScreen(x,y)){
              div.classList.add('food');
            }
            this.GAME.appendChild(div);
             
         } 
       }
   }

   private isSnakeOnScreen(x:number,y:number): boolean{
       for (let i = 0; i < this.snake.length; i++) {
          if(this.snake[i].x === x && this.snake[i].y === y){
              return true;
          }
      
       }
   }

   private isFoodOnScreen(x:number, y:number):boolean {
     if(this.food.x === x && this.food.y === y){
        return true;
     }
   }

  private isSnakeHead(x:number,y:number):boolean{
       let head = this.getSnakeHead();
       if(head.x === x && head.y === y){
           return true;
       }
   }

  private getSnakeHead(){
       return this.snake[0];
   }

   handleSnakeDirection(event){
       switch(event.keyCode){
           case 37:
           console.log('MOVE LEFT');
           if(this.dx !== 1)
           this.moveSnake('LEFT')
           break;
           case 38:
           console.log('MOVE UP');
           if(this.dy !== 1)
           this.moveSnake('UP')
           break;
           case 39:
           console.log('MOVE RIGHT');
           if(this.dx !== -1)
           this.moveSnake('RIGHT')
           break;
           case 40:
           console.log('MOVE DOWN');
           if(this.dy !== -1)
           this.moveSnake('DOWN')
           break;
           
       } 
   }

   moveSnake(direction:string){
        switch(direction){

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
      
   }

   goSnake(){

    if(this.dx === 0 && this.dy === 0){
        return;
    }

    let head = this.getSnakeHead();
    let newX = head.x + this.dx;
    newX = newX % this.fields;
    if(newX < 0){
        newX = this.fields;
    } 
    let newY = head.y + this.dy;

    newY = newY % this.fields;
    if(newY < 0){
        newY = this.fields;
    } 
    this.snake.unshift({x:newX, y:newY});
    this.snake.pop();
    
   }

   playGame(){
       this.goSnake();
       let head = this.getSnakeHead();
       if(head.x === this.food.x && head.y === this.food.y){
         this.eatFood();
         this.food = {x: Math.floor(Math.random()*this.fields), y: Math.floor(Math.random()*this.fields)};
       }
       this.renderScreen();

       let INTERVAL = 400;

       if(this.snake.length > 5){
           INTERVAL = 300;
       }
       if(this.snake.length > 8){
        INTERVAL = 200;
       }
       if(this.snake.length > 11){
        INTERVAL = 100;
       }
       setTimeout(()=> {
           this.playGame()
       },INTERVAL)

       this.gameOver();
       this.snake;


   }

private eatFood() {
       
    let head = this.getSnakeHead();
    let newX = head.x + this.dx;
    let newY = head.y + this.dy;
    this.snake.unshift({x:newX, y:newY});
    this.score.innerHTML = this.snake.length -3 + '';
   }

private gameOver(){
    let head = this.getSnakeHead();
    for (let i = 1; i < this.snake.length; i++) {
     if(head.x === this.snake[i].x && head.y === this.snake[i].y){
         alert('GAME OVER');
         this.snake = [];
         
     }
        
    }
}

}

