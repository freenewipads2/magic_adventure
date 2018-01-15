import 'jquery';
export class Game{
  constructor(){
    this.plates = 5000;
    this.texts = [];
    this.currentPos = {x: 0, y: 0};
    this.world = this.Create2DArray(20);
    this.moved = {x: 0, y: 0}
    this.moveLength = this.viewportToPixels(10);
  }
  generateWorld(){
    let sizeX = 20;
    let sizeY = 20;
    for(let y = 0; y != sizeY; y++){
      for(let x = 0; x != sizeX; x++){
        this.world[x][y] = this.type();
      }
    }
  }
  Create2DArray(rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
       arr[i] = [];
    }

    return arr;
  }
  attached(){
    let that = this;
    this.world = document.getElementById("world");
    document.onmousedown = function(e) {
      if(!e.target.id.includes(",")){
        return;
      }
      clearInterval(that.walk);
      let tmp = e.target.id.split(",");
      let pos = {x: parseInt(tmp[1]),y: parseInt(tmp[0])};
      e.target.style.boxShadow = "inset 0px 0px 0px 2px white";
      setTimeout(x =>{
        e.target.style.boxShadow = "";
      },200);

      if($(e.target).hasClass("water")){
        return;
      }
      that.goto(pos,e.target);
    };

    document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 13: //enter
                  if(that.input.length > 0){
                    that.texts.push(that.input);
                    that.input = "";
                  }
                  break;
          case 37: // <-
              that.goRight();
              break;
          case 38: //up
                that.goUp();
                break;
          case 39: // ->
              that.goLeft();
              break;
            case 40: //down
                that.goDown();
                break;
        }
    };
  }

  goto(pos,target){

    this.walk = setInterval( x=> {
      if(pos.x == this.currentPos.x && pos.y == this.currentPos.y){
        clearInterval(this.walk);
        return;
      }
      let delta = {x: pos.x - this.currentPos.x, y: pos.y - this.currentPos.y}

      if(delta.x > 0){
        this.goLeft();
      }
      else if(delta.x < 0){
        this.goRight()
      }
      else if(delta.y > 0){
        this.goDown();
      }
      else if(delta.y < 0){
        this.goUp();
      }
    },100);
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

  setPosition(pos){
    this.currentPos = pos;
    this.world.style.left = this.viewportToPixels(this.currentPos.x * 10)  + "px";
    this.world.style.top = this.viewportToPixels(this.currentPos.y * 10)  + "px";
  }
  goLeft(){
    this.currentPos.x++;
    document.getElementById("char").style.transform = 'rotate(0deg)';
    this.world.style.left = -this.viewportToPixels(this.currentPos.x * 10)  + "px";
  }
  goRight(){
    if(this.currentPos.x == 0){
      return;
    }
    this.currentPos.x--;
    document.getElementById("char").style.transform = 'rotate(180deg)';
    this.world.style.left = -this.viewportToPixels(this.currentPos.x * 10)  + "px"

  }
  goUp(){
    if(this.currentPos.y == 0 ){
      return;
    }
    this.currentPos.y--;
    this.world.style.top = -this.viewportToPixels(this.currentPos.y * 10)  + "px";
    document.getElementById("char").style.transform = 'rotate(270deg)';
  }
  goDown(){
    this.currentPos.y++;
    this.world.style.top = -this.viewportToPixels(this.currentPos.y * 10)  + "px";
    document.getElementById("char").style.transform = 'rotate(90deg)';
  }

  checkLeft(){
    if(document.getElementById((this.currentPos.x + 1).toString() + "," + (this.currentPos.y).toString()).className.includes("water")){
      return false;
    }
    return true;
  }

  getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: yPos,
      y: xPos
    };
  }

  select(e){
    console.log(e.target.id);
  }
  getTexts(){
    return this.texts.reverse();
  }
}
