export class PlayerState{
  constructor(){
    this.health = 100;
    this.mana = 100;

    this.maxHealth = 100;
    this.maxMana = 100;
    this.position = {x: 0, y: 0};
  }

  setHealth(health){ this.health += health }
  setMana(mana){ this.mana += mana }
  setPosition(position) { this.position = position  }
}
