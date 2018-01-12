import 'jquery';
export class Game{
  constructor(){
    this.plates = 5000;
    this.types = ["water","concrete"];
    this.texts = [];
  }
  attached(){
    let that = this;
    document.onmousedown = function(e) {
      if(!e.target.id.includes("tile")){
        return;
      }
      console.log(e.target.id);
      e.target.style.boxShadow = "inset 0px 0px 0px 1px red";
    };

    document.onkeydown = function(e) {
        let top = document.getElementById("char").style.top.split("px")[0];
        let left = document.getElementById("char").style.left.split("px")[0];
        let result;
        let speed = 20;
        switch (e.keyCode) {
          case 13: //enter
                  if(that.input.length > 0){
                    that.texts.push(that.input);
                    that.input = "";
                  }
                  break;
          case 37:
              result = Math.floor(parseInt(left) - speed) + "px";
              document.getElementById("char").style.left = result;
              document.getElementById("char").style.transform = 'rotate(180deg)';
              break;
          case 38:
                result = Math.floor(parseInt(top) - speed) + "px";
                document.getElementById("char").style.top =  result;
                document.getElementById("char").style.transform = 'rotate(270deg)';
                break;
          case 39:
              result = Math.floor(parseInt(left) + speed) + "px";
              document.getElementById("char").style.left = result;
              document.getElementById("char").style.transform = 'rotate(0deg)';
              break;
            case 40:
                result = Math.floor(parseInt(top) + speed) + "px";
                document.getElementById("char").style.top = result;
                document.getElementById("char").style.transform = 'rotate(90deg)';
                break;
        }
    };
  }

  getTopPos(el) {
      for (var topPos = 0;
          el != null;
          topPos += el.offsetTop, el = el.offsetParent);
      return topPos;
  }

  getLeftPos(el) {
    for (var leftPos = 0;
        el != null;
        leftPos += el.offsetLeft, el = el.offsetParent);
    return leftPos;
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
