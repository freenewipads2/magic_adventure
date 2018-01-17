import { Enemy } from 'enemy/enemy';

export class EnemyManager{
  costructor(){
    console.log("trigg");
    this.enemies = [];
  }

  addEnemy(id){
    this.enemies[id] = new Enemy(1);

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
