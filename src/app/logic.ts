import {Color} from './player.model';

function Point(x, y) {
  this.x = x;
  this.y = y;
}

export class Logic {
  checkIf4InARow(board, currentPlayer, row, col): boolean {
    let isGameOver = true;
    if (!this.checkRow(board, currentPlayer, row)) {
      if (!this.checkCol(board, currentPlayer, col)) {
        if (!this.checkDiagonal(board, currentPlayer)) {
         if (!this.checkDiagonal2(board, currentPlayer)) {
          isGameOver = false;
         }
        }
      }
    }
    return isGameOver;
  }
  checkRow(board, currentPlayer, row): boolean {
    let points = [];
    let count = 0 ;
      for (let j = 0; j < 7; j++) {
        if (board[row][j] === currentPlayer.color) {
          count++;
          const point = new Point(row, j);
          points.push(point);
          if (count === 4) {
            points.forEach(function (value) {
              board[value.x][value.y] = Color.GOLD;
            });
            return true;
          }
        } else {
          points = [];
          count = 0;
        }
      }
    return false;
  }

  checkCol(board, currentPlayer , col): boolean {
    let points = [];
    let count = 0;
      for (let i = 0; i < 6; i++) {
        if (board[i][col] === currentPlayer.color) {
          count++;
          const point = new Point(i, col);
          points.push(point);
          if (count === 4) {
            points.forEach(function (value) {
              board[value.x][value.y] = Color.GOLD;
            });
            return true;
          }
        } else {
          points = [];
          count = 0;
        }
      }
    return false;
  }

  checkDiagonal(board, currentPlayer): boolean {
    let points = [];
    let i = 0;
    while (i < 6) {
      points = [];
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 6;
        let line = i;
        while (line < 6) {
          if (board[line][k] === currentPlayer.color) {
            count++;
            const point = new Point(line, k);
            points.push(point);
            if (count === 4) {
              points.forEach(function (value) {
                board[value.x][value.y] = Color.GOLD;
              });
              return true;
            }
          } else {
            points = [];
            count = 0;
          }
          line++;
          k--;
        }
      } else {
        k = 0;
        let line = i;
        while (line >= 0) {
          if (board[line][k] === currentPlayer.color) {
            count++;
            const point = new Point(line, k);
            points.push(point);
            if (count === 4) {
              points.forEach(function (value) {
                board[value.x][value.y] = Color.GOLD;
              });
              return true;
            }
          } else {
            points = [];
            count = 0;
          }
          line--;
          k++;
        }
      }
      i++;
    }
    return false;
  }

  checkDiagonal2(board, currentPlayer): boolean {
    let points = [];
    let i = 0;
    while (i < 6) {
      points = [];
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 0;
        let line = i;
        while (line < 6) {
          if (board[line][k] === currentPlayer.color) {
            count++;
            const point = new Point(line, k);
            points.push(point);
            if (count === 4) {
              points.forEach(function (value) {
                board[value.x][value.y] = Color.GOLD;
              });
              return true;
            }
          } else {
            points = [];
            count = 0;
          }
          line++;
          k++;
        }
      } else {
        k = 6;
        let line = i;
        while (line >= 0) {
          if (board[line][k] === currentPlayer.color) {
            count++;
            const point = new Point(line, k);
            points.push(point);
            if (count === 4) {
              points.forEach(function (value) {
                board[value.x][value.y] = Color.GOLD;
              });
              return true;
            }
          } else {
            points = [];
            count = 0;
          }
          line--;
          k--;
        }
      }
      i++;
    }
    return false;
  }
  computerLogic(board, human, comp, columnFreeSpace): number {
    let value = this.computerAttack(board, comp, columnFreeSpace);
    if (value === -1) {
      value = this.computerDefence(board, human, columnFreeSpace);
    }
     if (value === -1) {
       value = this.compCheck2Rows(board, comp, columnFreeSpace);
    }
    if (value === -1) {
      value = this.getRandomInt(0, 6);
      while (columnFreeSpace[value] === -1) {
        value = this.getRandomInt(0, 6);
      }
    }
    return value;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  computerAttack(board, comp, columnFreeSpace): number {
    let value = this.compCheck3Rows(board, comp, columnFreeSpace);
    if (value === -1) {
      value = this.compCheckCols(board, comp);
    }
    if (value === -1) {
      value = this.compCheckDiagonal1(board, comp, columnFreeSpace);
    }
    if (value === -1) {
      value = this.compCheckDiagonal2(board, comp, columnFreeSpace);
    }
    return value;
  }
  computerDefence(board, human, columnFreeSpace): number {
    let value = this.compCheck3Rows(board, human, columnFreeSpace);
    if (value === -1) {
      value = this.compCheckCols(board, human);
    }
    if (value === -1) {
      value = this.compCheckDiagonal1(board, human, columnFreeSpace);
    }
    if (value === -1) {
      value = this.compCheckDiagonal2(board, human, columnFreeSpace);
    }
    if (value === -1) {
      value = this.compCheck2Rows(board, human, columnFreeSpace);
    }
    return value;
  }
  compCheck3Rows(board, player, columnFreeSpace): number {
    let count = 0 ;
    for (let i = 0; i < 6; i++) {
      count = 0 ;
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === player.color) {
          count++;
          if (count === 3) {
            if (j + 1 <= 6) {
              if (columnFreeSpace[j + 1] === i) {
                if (board[i][j + 1] === Color.BLACK) {
                  return j + 1;
                }
              }
            } if (j - 3 >= 0) {
                if (columnFreeSpace[j - 3] === i) {
                  if (board[i][j - 3] === Color.BLACK) {
                    return j - 3;
                  }
                }
              }
            }
        } else {
          count = 0;
        }
      }
    }
    return -1;
  }
  compCheck2Rows(board, player, columnFreeSpace): number {
    let count = 0 ;
    for (let i = 0; i < 6; i++) {
      count = 0 ;
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === player.color) {
          count++;
          if (count === 2) {
            if (j + 1 <= 6) {
              if (columnFreeSpace[j + 1] === i) {
                if (board[i][j + 1] === Color.BLACK) {
                  return j + 1;
                }
              }
            } if (j - 2 >= 0) {
              if (columnFreeSpace[j - 2] === i) {
                if (board[i][j - 2] === Color.BLACK) {
                  return j - 2;
                }
              }
            }
          }
        } else {
          count = 0;
        }
      }
    }
    return -1;
  }
  compCheckCols(board, player): number {
    let count = 0 ;
    for (let j = 0; j < 7; j++) {
      count = 0 ;
    for (let i = 0; i < 6; i++) {
        if (board[i][j] === player.color) {
          count++;
          if (count === 3) {
            if (i - 3 >= 0) {
              if (board[i - 3][j] === Color.BLACK) {
                return j;
              }
            }
          }
        } else {
          count = 0;
        }
      }
    }
    return -1;
  }
  compCheckDiagonal1(board, player, columnFreeSpace): number {
    let i = 0;
    while (i < 6) {
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 6;
        let line = i;
        while (line < 6) {
          if (board[line][k] === player.color) {
            count++;
            if (count === 3) {
              if (k + 3 <= 6) {
                if (columnFreeSpace[k + 3] === line - 3) {
                  if (board[line - 3][k + 3] === Color.BLACK) {
                    return k + 3;
                  }
                }
              }
              if (line + 1 <= 5) {
                if (columnFreeSpace[k - 1] === line + 1 ) {
                  if (board[line + 1][k - 1] === Color.BLACK) {
                    return k - 1;
                  }
                }
              }
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
        while (line >= 0) {
          if (board[line][k] === player.color) {
            count++;
            if (count === 3) {
              if (line - 1 >= 0) {
                if (columnFreeSpace[k + 1] === line - 1) {
                  if (board[line - 1][k + 1] === Color.BLACK) {
                    return k + 1;
                  }
                }
              }
                if (k - 3 >= 0) {
                  if (columnFreeSpace[k - 3] === line + 3 ) {
                    if (board[line + 3][k - 3] === Color.BLACK) {
                      return k - 3;
                    }
                  }
                }
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
    return -1;
  }
  compCheckDiagonal2(board, player, columnFreeSpace): number {
    let i = 0;
    while (i < 6) {
      let count = 0;
      let k;
      if (i >= 0 && i <= 2) {
        k = 0;
        let line = i;
        while (line < 6) {
          if (board[line][k] === player.color) {
            count++;
            if (count === 3) {
              if (line + 1 <= 5) {
                if (columnFreeSpace[k + 1] === line + 1) {
                  if (board[line + 1 ][k + 1] === Color.BLACK) {
                    return k + 1;
                  }
                }
              }
              if (k - 3 >= 0) {
                if (columnFreeSpace[k - 3] === line - 3) {
                  if (board[line - 3][k - 3] === Color.BLACK) {
                    return k - 3;
                  }
                }
              }
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
        while (line >= 0) {
          if (board[line][k] === player.color) {
            count++;
            if (count === 3) {
              if (line - 1 >= 0) {
                if (columnFreeSpace[k - 1] === line - 1) {
                  if (board[line - 1 ][k - 1] === Color.BLACK) {
                    return k - 1;
                  }
                }
              }
              if (k + 3 <= 6) {
                if (columnFreeSpace[k + 3] === line + 3) {
                  if (board[line + 3][k + 3] === Color.BLACK) {
                    return k + 3;
                  }
                }
              }
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
    return -1;
  }
}
