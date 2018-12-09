import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color, Player} from "../player.model";
import {Logic} from "../logic";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameManagerComponent implements OnInit {
  board: Color[][];
  player1 ;
  player2 ;
  currentPlayer;
  winner: Player;
  columnFreeSpace: number[] = [5, 5, 5, 5, 5, 5, 5];
  gameOver = false;
  draw = false;
  private logic: Logic;
  coinAudio; winAudio;
  @Input() player1name;
  @Input() player2name;
  @Input() vsComputer;
  @Output() backToLobby = new EventEmitter();
  movesCounter = 0;
  totalMoves = 42;

  constructor(logic: Logic) {
    this.logic = logic;
  }
  ngOnInit() {
    this.initPlayers()
    this.initBoard();
    this.initAudio();
  }
  initPlayers() {
    this.player1 = new Player(this.player1name, Color.BLUE , 0);
    this.player2 = new Player(this.player2name, Color.RED , 0);
    this.currentPlayer =  this.player1;
  }
  initBoard() {
    this.board = [];
    for (let i = 0; i < 6; i++) {
      const columns = [];
      for (let j = 0; j < 7; j++) {
        columns.push(Color.BLACK);
      }
      this.board.push(columns);
    }
  }
  initAudio() {
    this.coinAudio = new Audio('../../../assets/audio/silver-coin.wav');
    this.winAudio = new Audio('\'../../../assets/audio/win-sound.wav');
  }
  playAudio() {
    if (!this.gameOver) {
      this.coinAudio.play();
    } else {
      this.winAudio.play();
    }
  }
  cellClicked(i, j) {
    if ((this.vsComputer && this.currentPlayer === this.player1 && !(this.gameOver)) || (!this.vsComputer && !(this.gameOver))) {
      if (this.columnFreeSpace[j] === i) {
        this.makeMove(i , j);
        this.checkIfGameOver(i, j);
      }
    }
  }
  makeMove(row, col) {
    this.playAudio();
    this.board[row][col] = this.currentPlayer.color;
    this.columnFreeSpace[col] = row - 1;
    this.movesCounter++;
  }
  checkIfGameOver(row , col) {
    if (!this.logic.checkIf4InARow(this.board, this.currentPlayer, row, col)) {
      if (this.movesCounter < this.totalMoves) {
        this.switchTurn();
      } else {
        this.drawGame();
      }
    } else {
      this.endGame();
    }
  }
  changePlayer() {
    this.currentPlayer === this.player1 ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;
  }
  switchTurn() {
    this.changePlayer();
    if (this.vsComputer === true && this.currentPlayer === this.player2) {
      this.makeComputerSmartMove();
    }
  }
  drawGame() {
    this.draw = true;
    this.gameOver = true;
  }
  endGame() {
      this.gameOver = true;
      this.playAudio();
      this.winner = this.currentPlayer;
      if (this.currentPlayer === this.player1) {
        this.player1.wins++;
      } else {
        this.player2.wins++;
      }
    }
  async makeComputerSmartMove() {
    await this.sleep(1000);
    const computerResponse = this.logic.computerLogic(this.board, this.player1, this.player2 , this.columnFreeSpace, this.movesCounter);
    const compRow = this.columnFreeSpace[computerResponse];
    const compCol = computerResponse;
    this.makeMove(compRow, compCol);
    this.checkIfGameOver(compRow, compCol);
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getBackgroundColor(i, j) {
    switch (this.board[i][j]) {
      case Color.BLACK:
        return 'black';
      case Color.BLUE:
        return 'darkBlue';
      case Color.RED:
        return 'red';
      case Color.GOLD:
        return 'darkGoldenRod';
    }
  }
  getPlayerColor() {
    let color;
    this.currentPlayer.color === Color.BLUE ? color = 'darkBlue' : color = 'red';
    return color;
  }

  restartGame() {
    this.initBoard();
    this.currentPlayer = this.player1;
    this.columnFreeSpace = [5, 5, 5, 5, 5, 5, 5];
    this.gameOver = false;
    this.draw = false;
    this.movesCounter = 0;
  }

  goBackToLobby() {
    this.backToLobby.emit();
  }
}

