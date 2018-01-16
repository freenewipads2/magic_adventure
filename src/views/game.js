import 'jquery';
import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';
import { GameConfig } from 'config/game-config';
import { NavigationHelper } from 'helpers/navigation-helper';
@inject(PlayerState, GameConfig, NavigationHelper)
export class Game{
  constructor(playerState, gameConfig, navigationHelper){
    this.playerState = playerState;
    this.config = gameConfig;
    this.navigationHelper = navigationHelper;
    

  }

  attached(){
    this.navigationHelper.enable();
    this.navigationHelper.setPosition({x: 4, y: 4});
  }

 

  select(e){
    console.log(e.target.id);
  }
  getTexts(){
    return this.texts.reverse();
  }
}
