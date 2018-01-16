import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';
import { NavigationHelper } from 'helpers/navigation-helper';
@inject(PlayerState, NavigationHelper)
export class Player{
  constructor(playerState, navigationHelper){
    this.playerState = playerState;
    this.navigationHelper = navigationHelper;
  }

  attached(){
    document.onmousedown = (e) => {
      if(e.target.id.includes("enemy")){
        this.target(e.target.id);
      }
      if(!e.target.id.includes(",")){
        return;
      }
      clearInterval(this.walk);
      let tmp = e.target.id.split(",");
      let pos = {x: parseInt(tmp[1]),y: parseInt(tmp[0])};

      if($(e.target).hasClass("water")){
        e.target.style.boxShadow = "inset 0px 0px 0px 2px red";
        setTimeout(x =>{
          e.target.style.boxShadow = "";
        },200);
        return;
      } else {
        e.target.style.boxShadow = "inset 0px 0px 0px 2px green";
        setTimeout(x =>{
          e.target.style.boxShadow = "";
        },200);
      }
      this.navigationHelper.goto(pos,e.target);
    };

    document.onkeydown = (e) => {
      if(this.navigationHelper.canWalk){
        this.navigationHelper.step(e);
      }
    };

  }

  target(e){

  }


}
