import { inject } from 'aurelia-framework';
import { PlayerState } from 'player/player-state';

@inject(PlayerState)
export class Player{
  constructor(playerState){
    this.playerState = playerState;
    console.log(this.playerState);
  }
}
