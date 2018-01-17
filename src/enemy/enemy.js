
export class Enemy{
  constructor(id){
    this.position = {
      x: 4,
      y: 4
    }

    this.id = id;
    this.health = 20;
    this.maxHealth = 20;
    setTimeout(x =>{
      this.setPosition();
    },100);
  }
  setPosition(){

    document.getElementById("enemy_" + this.id).style.left = this.viewportToPixels(this.position.x * 10)  + "px";
    document.getElementById("enemy_" + this.id).style.top = this.viewportToPixels(this.position.y * 10)  + "px";
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

}
