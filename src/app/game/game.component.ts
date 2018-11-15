import { Component, OnInit } from '@angular/core';
import {Player} from "../player.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: string[][];
  player1 = new Player('Or', 'B');
  player2 = new Player('Computer', 'R');
  winner: Player;
  currentPlayer: Player = this.player1;
  columnFreeSpace: number[] = [5, 5, 5, 5, 5, 5, 5];
  gameOver = false;

  constructor() {
  }
  ngOnInit() {
    this.initBoard();
  }

  initBoard() {
    this.board = [];
    for (let i = 0; i < 6; i++) {
      const columns = [];
      for (let j = 0; j < 7; j++) {
        columns.push('0');
      }
      this.board.push(columns);
    }
  }

  makeMove(i, j) {
    if (this.currentPlayer === this.player1) {
      if (this.columnFreeSpace[j] === i) {
        this.board[i][j] = this.currentPlayer.value;
        this.columnFreeSpace[j] = i - 1;
        if (!this.checkIf4InARow()) {
          this.changePlayer();
          this.makeComputerMove();
        } else {
          this.winner = this.player1;
          this.changePlayer(); /// temp bug fix
        }
      }
    }
  }
  async makeComputerMove() {
    await this.sleep(1000);
    let randomCol = Math.floor(Math.random() * 7) + 0;
    while (this.columnFreeSpace[randomCol] === -1) {
      randomCol = Math.floor(Math.random() * 7) + 0;
    }
    this.board[this.columnFreeSpace[randomCol]][randomCol] = this.currentPlayer.value;
    this.columnFreeSpace[randomCol] = this.columnFreeSpace[randomCol] - 1;
    if (!this.checkIf4InARow()) {
      this.changePlayer();
    } else {
      this.winner = this.player2;
    }
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  changePlayer() {
    this.currentPlayer.value === 'B' ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
  }

  getBackgroundColor(i, j) {
    switch (this.board[i][j]) {
      case '0':
        return 'black';
      case 'B':
        return 'darkBlue';
      case 'R':
        return 'red';
    }
  }

  checkIf4InARow(): boolean {
    this.checkRow();
    if (!this.gameOver) {
      this.checkCol();
    }
    if (!this.gameOver) {
      this.checkDiagonal();
    }
    if (!this.gameOver) {
      this.checkDiagonal2();
    }
    if (this.gameOver) {
      return true;
    } else {
      return false;
    }

  }

  checkRow() {
    let count;
    for (let i = 0; i < 6; i++) {
      count = 0;
      for (let j = 0; j < 7; j++) {
        if (this.board[i][j] === this.currentPlayer.value) {
          count++;
          if (count === 4) {
            this.gameOver = true;
            return;
          }
        } else {
          count = 0;
        }
      }
    }
  }
  checkCol() {
    let count;
    for (let j = 0; j < 7; j++) {
      count = 0;
      for (let i = 0; i < 6; i++) {
        if (this.board[i][j] === this.currentPlayer.value) {
          count++;
          if (count === 4) {
            this.gameOver = true;
            return;
          }
        } else {
          count = 0;
        }
      }
    }
  }

  checkDiagonal() {
    let i = 0;
    while (i < 6) {
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 6;
        let line = i;
        while (count < 4 && line < 6) {
          if (this.board[line][k] === this.currentPlayer.value) {
            count++;
            if (count === 4) {
              this.gameOver = true;
              return;
            }
          } else {
            count = 0;
          }
          line++;
          k--;
        }
      } else {
        k = 0;
        let line = i;
        while (count < 4 && line >= 0) {
          if (this.board[line][k] === this.currentPlayer.value) {
            count++;
            if (count === 4) {
              this.gameOver = true;
              return;
            }
          } else {
            count = 0;
          }
          line--;
          k++;
        }
      }
      i++;
    }
  }

  checkDiagonal2() {
    let i = 0;
    while (i < 6) {
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 0;
        let line = i;
        while (count < 4 && line < 6) {
          if (this.board[line][k] === this.currentPlayer.value) {
            count++;
            if (count === 4) {
              this.gameOver = true;
              return;
            }
          } else {
            count = 0;
          }
          line++;
          k++;
        }
      } else {
        k = 6;
        let line = i;
        while (count < 4 && line >= 0) {
          if (this.board[line][k] === this.currentPlayer.value) {
            count++;
            if (count === 4) {
              this.gameOver = true;
              return;
            }
          } else {
            count = 0;
          }
          line--;
          k--;
        }
      }
      i++;
    }
  }

  restartGame() {
    this.initBoard();
    this.currentPlayer = this.player1;
    this.columnFreeSpace = [5, 5, 5, 5, 5, 5, 5];
    this.gameOver = false;
  }
}

