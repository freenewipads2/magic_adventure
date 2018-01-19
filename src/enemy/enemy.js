import {Container} from 'aurelia-framework';
import { CombatHelper } from 'helpers/combat-helper';
export class Enemy{
  constructor(data){
    this.combatHelper = Container.instance.get(CombatHelper);
    this.position = {
      x: 5,
      y: 5
    }
    this.position =  data.position;
    this.range = 5;


    this.speed = 1000;
    this.id = data.id;
    this.health = 20;
    this.maxHealth = 20;
    this.target = null;
    setTimeout(x =>{
      this.setPosition();
      document.getElementById("enemy_" + this.id).style.transition = "all " + (this.speed/1000).toString() + "s";
    },100);
    this.walk();
  }
  setPosition(){

    document.getElementById("enemy_" + this.id).style.left = this.viewportToPixels(this.position.x * 10)  + "px";
    document.getElementById("enemy_" + this.id).style.top = this.viewportToPixels(this.position.y * 10)  + "px";
  }

  walk(){
    setInterval(x=>{
      this.targetPlayer();
      if(!this.target){
        this.idleWalk();
      } else {
        if(this.isClose()){
          this.target.setHealth(-10);
        }
      }
    },this.speed);
  }
  viewportToPixels(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    var result = (y*value)/100;
    return(result);
  }

  targetPlayer(){
    if(this.aggroRange()){
      this.target = this.combatHelper.playerState;
      this.followTarget();
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
  aggroRange(){
    if(this.position.x + this.range == this.combatHelper.playerState.position.x && (this.position.y + this.range == this.combatHelper.playerState.position.y || this.position.y - this.range == this.combatHelper.playerState.position.y || this.position.y == this.combatHelper.playerState.position.y)){
      return true
    }
    else if(this.position.x - this.range == this.combatHelper.playerState.position.x && (this.position.y + this.range == this.combatHelper.playerState.position.y || this.position.y - this.range == this.combatHelper.playerState.position.y || this.position.y == this.combatHelper.playerState.position.y)){
      return true
    }
    return false;
  }

  followTarget(){
    setInterval(x=>{
      if(!this.isClose()){
      if(this.position.x > this.target.position.x && this.position.x != this.target.position.x){
        this.position.x--;
      } else if(this.position.x < this.target.position.x && this.position.x != this.target.position.x){
        this.position.x++;
      } else if(this.position.y > this.target.position.y && this.position.y != this.target.position.y){
        this.position.y--;
      } else if(this.position.y < this.target.position.y && this.position.y != this.target.position.y){
        this.position.y++;
      }


        this.setPosition();
      }

    },this.speed);
  }

  idleWalk(){
    let directionX = Math.floor((Math.random() * 0) + 2);
    let directionY= Math.floor((Math.random() * 0) + 2);
    let directions = [-1,0,1];
    this.position.x += directions[directionX];
    this.position.y += directions[directionY];
    this.setPosition();
  }

}
