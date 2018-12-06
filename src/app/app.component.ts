import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  player1name = 'Player1';
  player2name = 'COMPUTER';
  vsComputer = true;
  startGame = false;
  lobbyAudio;

  ngOnInit() {
    this.initAudio();
  }

  initAudio() {
    this.lobbyAudio = new Audio('../../../assets/audio/looby.mp3');
    this.lobbyAudio.play();
    this.lobbyAudio.loop = true;
  }

  start() {
    this.startGame = true;
    this.lobbyAudio.pause();
  }

  loadLobby(event) {
    this.startGame = false;
    this.lobbyAudio.play();
  }
  checkboxClicked() {
      document.getElementById('twoPlayersGame').style.color = this.vsComputer ?  'darkBlue' : 'grey';
      document.getElementById('player2Name').style.color = this.vsComputer ?  'red' : 'grey';
      this.vsComputer === true ? this.player2name =  'player2' : this.player2name =  'COMPUTER';
  }
}

