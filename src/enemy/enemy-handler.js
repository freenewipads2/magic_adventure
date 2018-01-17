import { inject } from 'aurelia-framework';
import { Enemy } from 'enemy/enemy';

export class EnemyHandler{
  constructor(){
    this.enemies = [];
  }

  addEnemy(id){
    this.enemies.push(new Enemy(id));

  }

  removeEnemy(id){
    this.enemies = [];
  }

  setHealth(target,health){
    if(target.health + health > target.maxHealth){
      target.health = target.maxHealth;
    } else {
    target.health += health
    }

    if(target.health <= 0){
      this.dead();
    }
  }

  dead(id){
    this.enemies = [];
  }
}
