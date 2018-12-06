 export enum Color {
  BLUE,
  RED ,
  BLACK ,
  GOLD,
}

export class Player {
  name: string;
  color: Color;
  wins: number;

  constructor(name: string, color: Color, wins: number) {
    this.name = name;
    this.color = color;
    this.wins = wins;
  }
}
