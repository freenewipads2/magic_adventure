import 'jquery';
export class Game{
  constructor(){
    this.plates = 5000;
    this.types = ["water","concrete"];
    this.texts = [];
    this.currentPos = {x: 0, y: 0};
    this.world = this.Create2DArray(20);
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
    this.generateWorld();
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
        let top = document.getElementById("char").style.top.split("px")[0];
        let left = document.getElementById("char").style.left.split("px")[0];
        let result;
        let speed = 20;
        console.log(e.keyCode);
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

  goLeft(){
    this.currentPos.x++;
    let newTarget = document.getElementById((this.currentPos.x + "," + this.currentPos.y).toString());
    if(!newTarget){
      return false;
    }
    document.getElementById("char").style.left = this.getPosition(newTarget).x + "px";
    document.getElementById("char").style.transform = 'rotate(0deg)';

  }
  goRight(){
    this.currentPos.x--;
    let newTarget = document.getElementById((this.currentPos.x + "," + this.currentPos.y).toString());
    if(!newTarget){
      return false;
    }
    document.getElementById("char").style.left = this.getPosition(newTarget).x + "px";
    document.getElementById("char").style.transform = 'rotate(180deg)';

  }
  goUp(){
    this.currentPos.y--;
    let newTarget = document.getElementById((this.currentPos.x + "," + this.currentPos.y).toString());
    if(!newTarget){
      return false;
    }
    document.getElementById("char").style.top = this.getPosition(newTarget).y + "px";
    document.getElementById("char").style.transform = 'rotate(270deg)';
  }
  goDown(){
    this.currentPos.y++;
    let newTarget = document.getElementById((this.currentPos.x + "," + this.currentPos.y).toString());
    if(!newTarget){
      return false;
    }
    document.getElementById("char").style.top = this.getPosition(newTarget).y + "px";
    document.getElementById("char").style.transform = 'rotate(90deg)';
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

  type(){
    let i = Math.floor(Math.random() * 2);
    return this.types[i];
  }
  select(e){
    console.log(e.target.id);
  }
  getTexts(){
    return this.texts.reverse();
  }
}
