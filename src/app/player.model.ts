 export enum Color {
  BLUE,
  RED ,
  BLACK ,
  GOLD,
}

export class Player {
  name: string;
  color: Color;

  constructor(name: string, color: Color) {
    this.name = name;
    this.color = color;
  }
}
