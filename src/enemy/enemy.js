export class Enemy{
  constructor(id){
    this.position = {
      x: 1,
      y: 2
    }

    this.id = id;
  }
  attached(){
    this.setPosition();
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
