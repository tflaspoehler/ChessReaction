export function get_moves(pieces, active, squares, all=false) {
    let piece = pieces[active]
    let moves = []
    all = all || false
    if (piece.name.includes("king")) {
        moves = king_moves(pieces, active, squares, all);
    }
    else if (piece.name.includes("queen")) {
        moves = bishop_moves(pieces, active, squares, all);
        moves = moves.concat(rook_moves(pieces, active, squares, all))
    }
    else if (piece.name.includes("bishop")) {
        moves = bishop_moves(pieces, active, squares, all);
    }
    else if (piece.name.includes("knight")) {
        moves = knight_moves(pieces, active, squares, all);
    }
    else if (piece.name.includes("rook")) {
        moves = rook_moves(pieces, active, squares, all);
    }
    else if (piece.name.includes("pawn")) {
        moves = pawn_moves(pieces, active, squares, all);
    }
    return moves
}

function king_moves(pieces, active, squares, all) {
    const row = pieces[active].row
    const column = pieces[active].column
    var moves = []
    if (all) {
        if (row < 8) {
            moves.push([row+1, column])
            if (column < 8) {moves.push([row+1, column+1])}
            if (column > 1) {moves.push([row+1, column-1])}
        }
        if (row > 1) {
            moves.push([row-1, column])
            if (column < 8) {moves.push([row-1, column+1])}
            if (column > 1) {moves.push([row-1, column-1])}
        }
        if (column < 8) {moves.push([row, column+1])}
        if (column > 1) {moves.push([row, column-1])}
    }
    else {
        if (row < 8) {
            if (squares[row][column-1] === -1 || pieces[squares[row][column-1]].color !== pieces[active].color) {moves.push([row+1, column])}
            if (squares[row][column]   === -1 || pieces[squares[row][column]].color   !== pieces[active].color) if (column < 8) {moves.push([row+1, column+1])}
            if (squares[row][column-2] === -1 || pieces[squares[row][column-2]].color !== pieces[active].color) if (column > 1) {moves.push([row+1, column-1])}
        }
        if (row > 1) {
            if (squares[row-2][column-1] === -1 || pieces[squares[row-2][column-1]].color !== pieces[active].color) moves.push([row-1, column])
            if (squares[row-2][column]   === -1 || pieces[squares[row-2][column]].color   !== pieces[active].color) if (column < 8) {moves.push([row-1, column+1])}
            if (squares[row-2][column-2] === -1 || pieces[squares[row-2][column-2]].color !== pieces[active].color) if (column > 1) {moves.push([row-1, column-1])}
        }
        if (squares[row-1][column]   === -1 || pieces[squares[row-1][column]].color   !== pieces[active].color) if (column < 8) {moves.push([row, column+1])}
        if (squares[row-1][column-2] === -1 || pieces[squares[row-1][column-2]].color !== pieces[active].color) if (column > 1) {moves.push([row, column-1])}
    }
    return moves
}

function bishop_moves(pieces, active, squares, all) {
    const row = pieces[active].row
    const column = pieces[active].column
    var moves = []
    if (all) {
        let i = row;
        let j = column;
        while (i < 8 && j < 8) {
            i++;
            j++;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (i < 8 && j > 1) {
            i++;
            j--;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (i > 1 && j < 8) {
            i--;
            j++;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (i > 1 && j > 1) {
            i--;
            j--;
            moves.push([i,j])
        }
    }
    else {
        let i = row;
        let j = column;
        while (i < 8 && j < 8) {
            i++;
            j++;
            if (squares[i-1][j-1] === -1 ) {
                moves.push([i, j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
                break;
            }
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (i < 8 && j > 1) {
            i++;
            j--;
            if (squares[i-1][j-1] === -1 ) {
                moves.push([i, j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
                break;
            }
        }
        i = row;
        j = column;
        while (i > 1 && j < 8) {
            i--;
            j++;
            if (squares[i-1][j-1] === -1 ) {
                moves.push([i, j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
                break;
            }
        }
        i = row;
        j = column;
        while (i > 1 && j > 1) {
            i--;
            j--;
            if (squares[i-1][j-1] === -1 ) {
                moves.push([i, j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
                break;
            }
        }
    }
    return moves;
}

function knight_moves(pieces, active, squares, all) {
    const row = pieces[active].row
    const column = pieces[active].column
    var moves = []
    var i
    var j
    if (all) {
        if (row < 8 && column < 7) {
            moves.push([row + 1, column + 2])
        }
        if (row < 7 && column < 8) {
            moves.push([row + 2, column + 1])
        }
        if (row > 1 && column < 7) {
            moves.push([row - 1, column + 2])
        }
        if (row > 2 && column < 8) {
            moves.push([row - 2, column + 1])
        }
        if (row > 1 && column > 2) {
            moves.push([row - 1, column - 2])
        }
        if (row > 2 && column > 1) {
            moves.push([row - 2, column - 1])
        }
        if (row < 8 && column > 2) {
            moves.push([row + 1, column - 2])
        }
        if (row < 7 && column > 1) {
            moves.push([row + 2, column - 1])
        }
    }
    else {
        if (row < 8 && column < 7) {
            i = row + 1, j = column + 2
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row < 7 && column < 8) {
            i = row + 2, j = column + 1
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row > 1 && column < 7) {
            i = row - 1, j = column + 2
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row > 2 && column < 8) {
            i = row - 2, j = column + 1
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row > 1 && column > 2) {
            i = row - 1, j = column - 2
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row > 2 && column > 1) {
            i = row - 2, j = column - 1
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row < 8 && column > 2) {
            i = row + 1, j = column - 2
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
        if (row < 7 && column > 1) {
            i = row + 2, j =column - 1
            if (squares[i-1][j-1] === -1 || pieces[squares[i-1][j-1]].color !== pieces[active].color) {moves.push([i, j])}
        }
    }
    return moves
}

function rook_moves(pieces, active, squares, all) {
    const row = pieces[active].row
    const column = pieces[active].column
    var moves = []
    let i = row;
    let j = column;
    if (all) {
        while (i < 8) {
            i++;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (j > 1) {
            j--;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (i > 1) {
            i--;
            moves.push([i,j])
        }
        i = row;
        j = column;
        while (j < 8) {
            j++;
            moves.push([i,j])
        }
    }
    else {
        while (i < 8) {
            i++;
            if (squares[i-1][j-1] === -1) {
                moves.push([i,j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {
                    moves.push([i,j])
                }
                break;
            }
        }
        i = row;
        j = column;
        while (j > 1) {
            j--;
            if (squares[i-1][j-1] === -1) {
                moves.push([i,j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {
                    moves.push([i,j])
                }
                break;
            }            
        }
        i = row;
        j = column;
        while (i > 1) {
            i--;
            if (squares[i-1][j-1] === -1) {
                moves.push([i,j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {
                    moves.push([i,j])
                }
                break;
            }
        }
        i = row;
        j = column;
        while (j < 8) {
            j++;
            if (squares[i-1][j-1] === -1) {
                moves.push([i,j])
            }
            else {
                if (pieces[squares[i-1][j-1]].color !== pieces[active].color) {
                    moves.push([i,j])
                }
                break;
            }
        }
    }
    return moves;
}

function pawn_moves(pieces, active, squares, all) {
    const row = pieces[active].row
    const column = pieces[active].column
    const color = pieces[active].color
    var moves = []
    if (all) {
        if (color === 'white') {
            moves.push([row+1, column])
            if (column < 8) {moves.push([row+1, column+1])}
            if (column > 1) {moves.push([row+1, column-1])}
            if (row === 2) {
                moves.push([row+2, column])
            }
        }
        else {
            moves.push([row-1, column])
            if (column < 8) {moves.push([row-1, column+1])}
            if (column > 1) {moves.push([row-1, column-1])}
            if (row === 7) {
                moves.push([row-2, column])
            
            }
        }    
    }    
    else {
        if (color === 'white') {
            if (squares[row][column-1] === -1) {
                moves.push([row+1, column])
                if (row === 2 && squares[row+1][column-1] === -1) {moves.push([row+2, column])}
            }
            if (column < 8 && squares[row][column]   !== -1 && pieces[squares[row][column]].color   !== pieces[active].color) {moves.push([row+1, column+1])}
            if (column > 1 && squares[row][column-2] !== -1 && pieces[squares[row][column-2]].color !== pieces[active].color) {moves.push([row+1, column-1])}
        }
        else {
            if (squares[row-2][column-1] === -1) {
                moves.push([row-1, column])
                if (row === 7 && squares[row-3][column-1] === -1) {moves.push([row-2, column])}
            }
            if (column < 8 && squares[row-2][column]   !== -1 && pieces[squares[row-2][column]].color   !== pieces[active].color) {moves.push([row-1, column+1])}
            if (column > 1 && squares[row-2][column-2] !== -1 && pieces[squares[row-2][column-2]].color !== pieces[active].color) {moves.push([row-1, column-1])}
        }
    } 

    return moves
}