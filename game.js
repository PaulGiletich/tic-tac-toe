var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    boardColsLength = 3,
    boardRowsLength = 3,
    cellWidth = 50,
    cellHeight = 50,
    boardWidth = boardRowsLength * cellWidth,
    boardHeight = boardColsLength * cellHeight,
    boardCells = [],
    youTurn = true;

function Cell(row, col) {
    this.row = row;
    this.col = col;
    this.mark = 'empty';
}

function getCursorPosition(e) {
    var x = e.pageX,
        y = e.pageY;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x = Math.min(x, boardColsLength * cellWidth);
    y = Math.min(y, boardRowsLength * cellHeight);

    var cell = new Cell(Math.floor(y/cellHeight), Math.floor(x/cellWidth));

    return cell;
}

function drawBoard() {
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    for (var x = 0; x <= boardWidth; x += cellWidth) {
        ctx.moveTo(0.5 + x, 0);
        ctx.lineTo(0.5 + x, boardHeight);
    }

    for (var y = 0; y <= boardHeight; y += cellHeight) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(boardWidth, y + 0.5);
    }

    ctx.strokeStyle = '#ccc';
    ctx.stroke();
}

function initCells() {
    for (var i = 0; i < boardColsLength; i++) {
        for (var j = 0; j < boardRowsLength; j++) {
            var boardCell = new Cell(i, j);

            boardCells.push(boardCell);
        }
    }
    return boardCells;
}

function drawCells() {
    for (var i = 0; i < boardCells.length; i++) {
        var cellCol = boardCells[i].col,
            cellRow = boardCells[i].row;

        if (boardCells[i].mark == 'xMark') {
            drawX(cellRow, cellCol);
        } else if (boardCells[i].mark == 'oMark') {
            drawO(cellRow, cellCol);
        }
    }
}

function drawX(row, col) {
    var x1 = col * cellWidth + 3,
        y1 = row * cellHeight + 3,
        x2 = col * cellWidth + cellWidth - 3,
        y2 = row * cellHeight + cellHeight - 3;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#bbb";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.moveTo(x2, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke();
}

function drawO(row, col) {
    var centerX = Math.round((col * cellWidth * 2 + cellWidth) / 2),
        centerY = Math.round((row * cellHeight * 2 + cellHeight) / 2),
        radius = Math.round((cellWidth / 2) - 3);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#bbb";
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function addItem(e) {
    var cellItem = getCursorPosition(e);

    if (!youTurn) {
        return false;
    } else {
        for (var i = 0; i < boardCells.length; i++) {
            if (cellItem.col == boardCells[i].col && cellItem.row == boardCells[i].row) {
                if (boardCells[i].mark == 'empty') {
                    boardCells[i].mark = 'xMark';
                    drawCells();
                    youTurn = false;
                    console.log(boardCells, boardCells[i]);
                    return boardCells[i];
                } else {
                    return false;
                }
            }
        }
    }
}

function init() {
    drawBoard();
    initCells();
    drawCells();

    canvas.addEventListener("click", addItem);
}

window.addEventListener("load", function() {
    init();
});