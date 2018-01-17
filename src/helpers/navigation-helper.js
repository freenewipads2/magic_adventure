import 'jquery';
import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';
import { GameConfig } from 'config/game-config';
@inject(PlayerState, GameConfig)
export class NavigationHelper{
    constructor(playerState, gameConfig){
        this.playerState = playerState;
        this.config = gameConfig;
        this.plates = 5000;
        this.texts = [];

        this.moved = {x: 0, y: 0}
        this.moveLength = this.viewportToPixels(10);
        this.canWalk = true;
        this.worldPosition  = {x: 0, y: 0}
      }
      enable(){
        this.world = document.getElementById("world");
        this.char = document.getElementById("char");
        this.world.style.transition = "all " + (this.playerState.speed/1000).toString() + "s";
        this.char.style.transition = "all " + (this.playerState.speed/1000).toString() + "s";
      }

      step(e){
        this.canWalk = false;
        setTimeout(x =>{
        switch (e.keyCode) {
          case 13: //enter
                  if(this.input.length > 0){
                    this.texts.push(this.input);
                    this.input = "";
                  }
                  break;
          case 37: // <-
              this.goRight();
              break;
          case 38: //up
                this.goUp();
                break;
          case 39: // ->
              this.goLeft();
              break;
            case 40: //down
                this.goDown();
                break;
        }
        this.canWalk = true;
        },this.playerState.speed);
      }
      selectEnemy(e){
          console.log("selected");
          e.target.style.boxShadow = "inset 0px 0px 0px 2px black";
      }
      goto(pos,target){

        this.walk = setInterval( x=> {
          if(pos.x == this.playerState.position.x && pos.y == this.playerState.position.y){
            clearInterval(this.walk);
            return;
          }
          let delta = {x: pos.x - this.playerState.position.x, y: pos.y - this.playerState.position.y}

          if(delta.x > 0){
            this.goLeft();
          }
          else if(delta.x < 0){
            this.goRight()
          }
          else if(delta.y > 0){
            this.goDown();
          }
          else if(delta.y < 0){
            this.goUp();
          }
        },this.playerState.speed);
      }
      viewportToPixels(value) {
        var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight|| e.clientHeight|| g.clientHeight;

        var result = (y*value)/100;
        return(result);
      }

      setPosition(pos){
        this.playerState.position = pos;
        this.char.style.left = this.viewportToPixels(this.playerState.position.x * 10)  + "px";
        this.char.style.top = this.viewportToPixels(this.playerState.position.y * 10)  + "px";
      }
      goLeft(){
        if(!this.checkLeft()){
          return;
        }
        this.playerState.position.x++;
        this.worldPosition.x--;
        document.getElementById("char").style.transform = 'rotate(0deg)';
        this.char.style.left = this.viewportToPixels(this.playerState.position.x * 10)  + "px";
        if(this.playerState.position.x < 30){
          this.world.style.left = this.viewportToPixels( (this.worldPosition.x ) * 10)  + "px";
        }
      }
      goRight(){
        if(this.playerState.position.x == 0){
          return;
        }
        if(!this.checkRight()){
          return;
        }
        this.playerState.position.x--;
        this.worldPosition.x++;
        document.getElementById("char").style.transform = 'rotate(180deg)';
        this.char.style.left = this.viewportToPixels(this.playerState.position.x * 10)  + "px";
        if(this.playerState.position.x > 10){
          this.world.style.left = this.viewportToPixels( (this.worldPosition.x ) * 10)  + "px";
        }

      }
      goUp(){
        if(!this.checkTop()){
          return;
        }
        if(this.playerState.position.y == 0 ){
          return;
        }
        this.playerState.position.y--;
        this.worldPosition.y++;
        this.char.style.top = this.viewportToPixels(this.playerState.position.y * 10)  + "px";
        if(this.playerState.position.y > 4){
        this.world.style.top = this.viewportToPixels(this.worldPosition.y * 10)  + "px";
        }
        document.getElementById("char").style.transform = 'rotate(270deg)';
      }
      goDown(){
        if(!this.checkDown()){
          return;
        }
        this.playerState.position.y++;
        this.worldPosition.y--;
        this.char.style.top = this.viewportToPixels(this.playerState.position.y * 10)  + "px";
        this.world.style.top = this.viewportToPixels(this.worldPosition.y * 10)  + "px";
        document.getElementById("char").style.transform = 'rotate(90deg)';
      }

      checkLeft(){
        let tmpX = (this.playerState.position.x +1).toString();
        let tmpY = (this.playerState.position.y).toString();
        if(document.getElementById( tmpY + "," + tmpX ).className.includes("water")){
          return false;
        }
        return true;
      }
      checkRight(){
        let tmpX = (this.playerState.position.x - 1).toString();
        let tmpY = (this.playerState.position.y).toString();
        if(document.getElementById( tmpY + "," + tmpX ).className.includes("water")){
          return false;
        }
        return true;
      }
      checkTop(){
        let tmpX = (this.playerState.position.x).toString();
        let tmpY = (this.playerState.position.y-1).toString();
        if(document.getElementById( tmpY + "," + tmpX ).className.includes("water")){
          return false;
        }
        return true;
      }
      checkDown(){
        let tmpX = (this.playerState.position.x).toString();
        let tmpY = (this.playerState.position.y + 1).toString();
        if(document.getElementById( tmpY + "," + tmpX ).className.includes("water")){
          return false;
        }
        return true;
      }

      getPosition(el) {
        var xPos = 0;
        var yPos = 0;

        while (el) {
          if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
          } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
          }

          el = el.offsetParent;
        }
        return {
          x: yPos,
          y: xPos
        };
      }
}
