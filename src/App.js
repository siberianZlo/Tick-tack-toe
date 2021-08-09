import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      xWin: 0,
      oWin: 0,
      whoIs: 0
    }

    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

  }

  // Основная функция, отслеживающая клик в игровой области.
  clickHandler = (event, s) => {
    let data = event.target.getAttribute('data');
    let currentSquares = this.state.squares;
    s = (this.state.count % 2 === 0) ? 'X' : 'O';

    if (currentSquares[data] === null) {
      currentSquares[data] = s;
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currentSquares });
    }
    else {
      alert('Нельзя изменить свой ход!');
    }

    this.isWinner(s);
  }

  // Проверка на победный результат.
  isWinner = (s) => {
    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];

      if (this.state.squares[line[0]] === s
        && this.state.squares[line[1]] === s
        && this.state.squares[line[2]] === s) {
        alert(s + ' win');

        this.whoIs(s);
        this.newGame();
        return true;
      }
    }

    this.drawGame();
  }

  // Выевляет ничейный результат.
  drawGame = () => {
    if (this.state.whoIs === 1) {
      if (this.state.count === 9) {
        alert('Ничья');
        this.newGame();
      }
    }
    else {
      if (this.state.count === 8) {
        alert('Ничья');
        this.newGame();
      }
    }
  }

  // Запускает новую игру.
  newGame = () => {
    this.setState({ squares: Array(9).fill(null) });
    this.setState({ count: 0 });
    this.setState({ whoIs: 0 });
    let redCollection = document.querySelectorAll('.ttt-grid');

    this.hideOpen();
  }

  // Счетчик побед Х и О.
  whoIs = (s) => {
    if (s === 'X') this.setState({ xWin: this.state.xWin + 1 });
    else if (s === 'O') this.setState({ oWin: this.state.oWin + 1 });
  }

  // Выбираем начальный ход Х или О.
  ferstMotion = (event) => {
    let dataGame = event.target.getAttribute('data');

    if (dataGame === '0') {
      this.setState({ count: this.state.count + 1 });
      this.setState({ whoIs: this.state.whoIs + 1 });
    }

    this.hideOpen();
  }

  // Открытие / закрытие выбора начального хода.
  hideOpen = () => {
    let divMotion = document.querySelector('.motion');
    let buttonNewGame = document.querySelector('.button-new-game');

    divMotion.classList.toggle("none-motion");
    buttonNewGame.classList.toggle("none-motion");
  }

  render() {
    return (
      <div>
        <div className='motion'>
          <p>Первый ход:</p>
          <div className='motion-block'>
            <button onClick={this.ferstMotion} data='1'>X</button>
            <button onClick={this.ferstMotion} data='0'>O</button>
          </div>
        </div>
        <div className='tic-tac-toe'>
          <div className='ttt-grid' data='0' onClick={this.clickHandler}>{this.state.squares[0]}</div>
          <div className='ttt-grid' data='1' onClick={this.clickHandler}>{this.state.squares[1]}</div>
          <div className='ttt-grid' data='2' onClick={this.clickHandler}>{this.state.squares[2]}</div>
          <div className='ttt-grid' data='3' onClick={this.clickHandler}>{this.state.squares[3]}</div>
          <div className='ttt-grid' data='4' onClick={this.clickHandler}>{this.state.squares[4]}</div>
          <div className='ttt-grid' data='5' onClick={this.clickHandler}>{this.state.squares[5]}</div>
          <div className='ttt-grid' data='6' onClick={this.clickHandler}>{this.state.squares[6]}</div>
          <div className='ttt-grid' data='7' onClick={this.clickHandler}>{this.state.squares[7]}</div>
          <div className='ttt-grid' data='8' onClick={this.clickHandler}>{this.state.squares[8]}</div>
        </div>
        <div>
          <button className='button-new-game none-motion' onClick={this.newGame}>Начать новую игру</button>
        </div>
        <div className='description'>
          <span>Количество Побед</span>
          <p>Крестики {this.state.xWin} : {this.state.oWin} Нолики</p>
          <p></p>
        </div>
      </div>
    )
  }
}

export default App;
