export class World{
  constructor(){
    this.width = 100;
    this.height = 100;
        this.types = ["water","concrete"];
  }
  type(){
    let i = Math.floor(Math.random() * 2);
    return this.types[i];
  }
}
