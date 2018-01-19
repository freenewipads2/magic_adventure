
import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';
import { NavigationHelper } from 'helpers/navigation-helper';
import { EnemyHandler } from 'enemy/enemy-handler';
@inject(PlayerState, NavigationHelper, EnemyHandler)
export class CombatHelper{
  constructor(playerState, navigationHelper, enemyHandler){
    this.playerState = playerState;
    this.navigationHelper = navigationHelper;
    this.enemyHandler = enemyHandler;
  }
}
