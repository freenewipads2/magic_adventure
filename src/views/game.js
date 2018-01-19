import 'jquery';
import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';
import { GameConfig } from 'config/game-config';
import { NavigationHelper } from 'helpers/navigation-helper';
import { CombatHelper } from 'helpers/combat-helper';
@inject(PlayerState, GameConfig, NavigationHelper, CombatHelper)
export class Game{
  constructor(playerState, gameConfig, navigationHelper, combatHelper){
    this.playerState = playerState;
    this.config = gameConfig;
    this.navigationHelper = navigationHelper;
    this.combatHelper = combatHelper;

    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.scrollDirection = null;


  }

  attached(){
    this.navigationHelper.enable();
    let width = Math.round(screen.width/2).toString().substr(0,2);
    let height = Math.round(screen.height/2).toString().substr(0,1);
    this.navigationHelper.setPosition({x: parseInt(width), y: parseInt(height)});
    console.log("loaded");
  }

  startScrolling(dir){
    this.scrollDirection = dir;
    $("#" + this.scrollDirection + "_move").toggleClass("showScrollDirection");
    this.scroll = setInterval(x =>{
      if(this.scrollDirection == "bottom"){
        this.scrollTop--;
        document.getElementById("world").style.top = this.scrollTop + "px";
      }
      else if(this.scrollDirection == "top"){
        this.scrollTop++;
        document.getElementById("world").style.top = this.scrollTop + "px";
      }
      else if(this.scrollDirection == "left"){
        this.scrollLeft--;
        document.getElementById("world").style.left = this.scrollLeft + "px";
      }
      else if(this.scrollDirection == "right"){
        this.scrollLeft++;
        document.getElementById("world").style.left = this.scrollLeft + "px";
      }
    },1);
  }

  stopScrolling(){
    $("#" + this.scrollDirection + "_move").toggleClass("showScrollDirection");
    clearInterval(this.scroll);
  }
}
