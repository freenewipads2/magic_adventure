export class PlayerState{
  constructor(){

    //move to stats-component
    this.health = 100;
    this.mana = 100;

    this.maxHealth = 100;
    this.maxMana = 100;

    this.speed = 200;

    //other
    this.position = {x: 0, y: 0};
    this.target = null;
  }

  watchHealth(){
    this.healthWatcher = setTimeout(x => {
      if(this.health < this.maxHealth){
        this.setHealth(1);
      }
    },1000);
  }

  watchMana(){
    this.manaWatcher = setTimeout(x => {
      if(this.mana < this.maxMana){
        this.setMana(1);
      }
    },1000);
  }

  stopWatching(){
    clearInterval(this.healthWatcher);
    clearInterval(this.manaWatcher);
  }

  setHealth(health){
    if(this.health + health > this.maxHealth){
      this.health = this.maxHealth;
    } else if(this.health + health <= 0){
      this.dead();
    } else {
    this.health += health
    }
  }
  setMana(mana){
    if(this.mana + mana > this.maxMana){
      this.mana = this.maxMana;
    } else {
    this.mana += mana
    }
  }
  isClose(){
    if(this.position.x + 1 == this.target.position.x && (this.position.y + 1 == this.target.position.y || this.position.y - 1 == this.target.position.y || this.position.y == this.target.position.y)){
      return true
    }
    else if(this.position.x - 1 == this.target.position.x && (this.position.y + 1 == this.target.position.y || this.position.y - 1 == this.target.position.y || this.position.y == this.target.position.y)){
      return true
    }
    return false;
  }
setPosition(position) { this.position = position  }
dead(){ }
}
