import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


function Square(props) {
  return (
    <button className={"square" + props.side + "on" + props.background} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function revSide(side) {
  if (side === 'W') {
    return 'B'
  }
  else {
    return 'W'
  }
}

function currentSide(boolean) {
  if (boolean) {
    return 'W';
  }
  else {
    return 'B';
  }
}

function checkWinner(squares) {
  let b_win = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (squares[i][j].name === '♚' && squares[i][j].side === 'W') {
        b_win = false;
      }
    }
  }
  let w_win = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (squares[i][j].name === '♚' && squares[i][j].side === 'W') {
        w_win = false;
      }
    }
  }
  console.log(b_win, w_win);
  return [b_win, w_win];
}

class Piece {
  constructor() {
    this.name = '';
    this.side = '';
    this.cursed = false;
  }

  possible(i, j, squares) {
    let res = [];
    return res;
  }
}


class Pawn extends Piece {
  constructor(side) {
    super();
    this.name = '♟';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    let res = [];
    let side = squares[i][j].side;
    if (side === 'W') {
      if (i === 0) {
        return res
      }
      else {
        if (squares[i - 1][j].side !== 'W') {
          res.push([i - 1, j])
        }
      }
    }
    else {
      if (i === 7) {
        return res
      }
      else {
        if (squares[i + 1][j].side !== 'B') {
          res.push([i + 1, j])
        }
      }
    }
    return res;
  }
}

class Rook extends Piece {
  constructor(side) {
    super();
    this.name = '♜';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    let res = [];
    let side = squares[i][j].side;
    // Check four directions
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (let dir = 0; dir < 4; dir++) {
      for (let coef = 1; coef < 8; coef++) {
        let ii = i + directions[dir][0] * coef;
        let jj = j + directions[dir][1] * coef;
        if (ii >= 0 && ii < 8 && jj >= 0 && jj < 8) {
          if (squares[ii][jj].side === side) {
            break;
          }
          else {
            res.push([ii, jj]);
            if (squares[ii][jj].side !== '') {
              break;
            }
          }
        }
      }
    }
    return res;
  }
}

class Knight extends Piece {
  constructor(side) {
    super();
    this.name = '♞';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    let diffs = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    let res = [];
    let side = squares[i][j].side;
    for (let x = 0; x < diffs.length; x++) {
      if (i + diffs[x][0] >= 0 && i + diffs[x][0] < 8 && j + diffs[x][1] >= 0 && j + diffs[x][1] < 8) {
        if (squares[i + diffs[x][0]][j + diffs[x][1]].side !== side) {
          res.push([i + diffs[x][0], j + diffs[x][1]])
        }
      }
    }
    return res;
  }
}

class Bishop extends Piece {
  constructor(side) {
    super();
    this.name = '♝';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    // Check four directions
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    let res = [];
    let side = squares[i][j].side;
    for (let dir = 0; dir < 4; dir++) {
      for (let coef = 1; coef < 8; coef++) {
        let ii = i + directions[dir][0] * coef;
        let jj = j + directions[dir][1] * coef;
        if (ii >= 0 && ii < 8 && jj >= 0 && jj < 8) {
          if (squares[ii][jj].side === side) {
            break;
          }
          else {
            res.push([ii, jj]);
            if (squares[ii][jj].side !== '') {
              break;
            }
          }
        }
      }
    }
    return res;
  }
}

class King extends Piece {
  constructor(side) {
    super();
    this.name = '♚';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    // Check eight directions
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]];
    let res = [];
    let side = squares[i][j].side;
    for (let dir = 0; dir < 8; dir++) {
      let ii = i + directions[dir][0];
      let jj = j + directions[dir][1];
      if (ii >= 0 && ii < 8 && jj >= 0 && jj < 8) {
        if (squares[ii][jj].side !== side) {
          res.push([ii, jj]);
        }
      }
    }
    return res;
  }
}

class Queen extends Piece {
  constructor(side) {
    super();
    this.name = '♕';
    this.side = side;
    this.cursed = false;
  }

  possible(i, j, squares) {
    // Check four directions
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]];
    let res = [];
    let side = squares[i][j].side;
    for (let dir = 0; dir < 8; dir++) {
      for (let coef = 1; coef < 8; coef++) {
        let ii = i + directions[dir][0] * coef;
        let jj = j + directions[dir][1] * coef;
        if (ii >= 0 && ii < 8 && jj >= 0 && jj < 8) {
          if (squares[ii][jj].side === side) {
            break;
          }
          else {
            res.push([ii, jj]);
            if (squares[ii][jj].side !== '') {
              break;
            }
          }
        }
      }
    }
    return res;
  }
}

class Board extends React.Component {
  renderSquare(i, j) {
    let background;
    if (this.props.squares[i][j].cursed) {
      background = 'R'
    }
    else if ((i + j) % 2 === 0) {
      background = 'W'
    }
    else {
      background = 'G'
    }

    return <Square
      value={this.props.squares[i][j].name}
      side={this.props.squares[i][j].side}
      background={background}
      onClick={() => this.props.onClick(i, j)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
          {this.renderSquare(0, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
          {this.renderSquare(1, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
          {this.renderSquare(2, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
          {this.renderSquare(3, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
          {this.renderSquare(4, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
          {this.renderSquare(5, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 0)}
          {this.renderSquare(6, 1)}
          {this.renderSquare(6, 2)}
          {this.renderSquare(6, 3)}
          {this.renderSquare(6, 4)}
          {this.renderSquare(6, 5)}
          {this.renderSquare(6, 6)}
          {this.renderSquare(6, 7)}
        </div>
        <div className="board-row">
          {this.renderSquare(7, 0)}
          {this.renderSquare(7, 1)}
          {this.renderSquare(7, 2)}
          {this.renderSquare(7, 3)}
          {this.renderSquare(7, 4)}
          {this.renderSquare(7, 5)}
          {this.renderSquare(7, 6)}
          {this.renderSquare(7, 7)}
        </div>
      </div>
    );
  }

}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(8).fill(null),
      xIsNext: true,
      moveReady: false,
      selected: null,
      cursed: null,
      warning: null,
    };
    for (let i = 0; i < 8; i++) {
      this.state.squares[i] = new Array(8);
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.state.squares[i][j] = new Piece();
      }
    }

    for (let j = 0; j < 8; j++) {
      this.state.squares[1][j] = new Pawn('B');
    }

    for (let j = 0; j < 8; j++) {
      this.state.squares[6][j] = new Pawn('W');
    }

    this.state.squares[0][0] = new Rook('B');
    this.state.squares[0][1] = new Knight('B');
    this.state.squares[0][2] = new Bishop('B');
    this.state.squares[0][3] = new King('B');
    this.state.squares[0][4] = new Queen('B');
    this.state.squares[0][5] = new Bishop('B');
    this.state.squares[0][6] = new Knight('B');
    this.state.squares[0][7] = new Rook('B');


    this.state.squares[7][0] = new Rook('W');
    this.state.squares[7][1] = new Knight('W');
    this.state.squares[7][2] = new Bishop('W');
    this.state.squares[7][4] = new King('W');
    this.state.squares[7][3] = new Queen('W');
    this.state.squares[7][5] = new Bishop('W');
    this.state.squares[7][6] = new Knight('W');
    this.state.squares[7][7] = new Rook('W');

  }

  handleClick(i, j, squares) {
    if (!this.state.moveReady) {

      if (this.state.squares[i][j].side === revSide(currentSide(this.state.xIsNext))) {
        return;
      }

      // If nothing is currently selected, we are gonna hightlight the possible next positions from this piece.
      const squares = this.state.squares.slice();

      if (this.state.squares[i][j].side === '') {
        return;
      }

      let possibles = this.state.squares[i][j].possible(i, j, squares);

      console.log(possibles);
      for (let x = 0; x < possibles.length; x++) {
        squares[possibles[x][0]][possibles[x][1]].cursed = true;
      }
      this.setState({
        squares: squares,
        xIsNext: this.state.xIsNext,
        moveReady: true,
        selected: [i, j],
        cursed: possibles,
        warning: null,
      });
    }
    else {
      if (this.state.squares[i][j].side === "" || this.state.squares[i][j].side === revSide(this.state.squares[this.state.selected[0]][this.state.selected[1]].side)) {

        let flag = false;
        for (let x = 0; x < this.state.cursed.length; x++) {
          if (this.state.cursed[x][0] === i && this.state.cursed[x][1] === j) {
            flag = true;
          }
        }
        if (!flag) {
          return;
        }

        const squares = this.state.squares.slice();
        let x = this.state.selected[0];
        let y = this.state.selected[1];

        squares[i][j] = squares[x][y];
        squares[x][y] = new Piece();


        // Clear every cursed
        for (let x = 0; x < this.state.cursed.length; x++) {
          squares[this.state.cursed[x][0]][this.state.cursed[x][1]].cursed = false;
        }

        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
          moveReady: false,
          selected: null,
          cursed: null,
          warning: null,
        });
      }
      else {
        const squares = this.state.squares.slice();
        let possibles = this.state.squares[i][j].possible(i, j, squares);

        // Clear every cursed
        for (let x = 0; x < this.state.cursed.length; x++) {
          squares[this.state.cursed[x][0]][this.state.cursed[x][1]].cursed = false;
        }

        // Set new cursed
        for (let x = 0; x < possibles.length; x++) {
          squares[possibles[x][0]][possibles[x][1]].cursed = true;
        }
        this.setState({
          squares: squares,
          xIsNext: this.state.xIsNext,
          moveReady: true,
          selected: [i, j],
          cursed: possibles,
          warning: null,
        });
        console.log(this.state.squares);

      }
    }
  }

  render() {
    const board = this.state.squares;
    const warning = this.state.warning;
    let status;
    let win_status = checkWinner(board);
    if (win_status[0]) {
      status = "Black has won";
    }
    else if (win_status[1]) {
      status = "White has won";
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'W' : 'B');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={board}
            onClick={(i, j) => this.handleClick(i, j, this.state.squares)}
          />
        </div>
        <div className="game-info">
          <div>{warning}</div>
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
