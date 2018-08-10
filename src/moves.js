export function get_moves(pieces, active) {
    let piece = pieces[active]
    let moves = []
    if (piece.name.includes("king")) {
        moves = king_moves(piece.row, piece.column);
    }
    else if (piece.name.includes("queen")) {
        moves = bishop_moves(piece.row, piece.column);
        moves = moves.concat(rook_moves(piece.row, piece.column))
    }
    else if (piece.name.includes("bishop")) {
        moves = bishop_moves(piece.row, piece.column);
    }
    else if (piece.name.includes("knight")) {
        moves = knight_moves(piece.row, piece.column, piece.color);
    }
    else if (piece.name.includes("rook")) {
        moves = rook_moves(piece.row, piece.column);
    }
    else if (piece.name.includes("pawn")) {
        moves = pawn_moves(piece.row, piece.column, piece.color);
    }
    return moves
}

function king_moves(row, column) {
    var moves = []
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
    return moves
}

function bishop_moves(row, column) {
    var moves = []
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
    return moves;
}

function knight_moves(row, column) {
    var moves = []
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
    return moves
}

function rook_moves(row, column) {
    var moves = []
    let i = row;
    let j = column;
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
    return moves;
}

function pawn_moves(row, column, color) {
    var moves = []
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
    return moves
}