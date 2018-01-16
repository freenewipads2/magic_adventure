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
