function Cell(lineNumber, x, y, width, height, isLast, isFirst){
    this.lineNumber = lineNumber;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isLast = isLast == true;
    this.isFirst = isFirst == true;
}

Cell.cells = [];
Cell.lastCells = [];
Cell.firstCells = [];
Cell.addCell = function(cell){
    Cell.cells.push(cell);
    if(cell.isLast) Cell.lastCells.push(cell);
    else if(cell.isFirst) Cell.firstCells.push(cell);
};

Cell.getRandomLastCell = function(){
    return Cell.lastCells[Game.getRandomInt(0, Cell.lastCells.length-1)];
};

Cell.getFirstCellByLine = function(lineNumber){
    var result = null;
    Cell.firstCells.some(function(item){
        if(item.lineNumber == lineNumber) {
            result = item;
            return true;
        }
    });
    return result;
};

Cell.getLastCellByLine = function(lineNumber){
    var result = null;
    Cell.lastCells.some(function(item){
        if(item.lineNumber == lineNumber) {
            result = item;
            return true;
        }
    });
    return result;
};

Cell.getRandomLastCells = function(count){
    var cells = [];
    for(var i = 0; i < count; i++){
        var cell = Cell.getRandomLastCell();
        if(cells.some(function(item){
                if(item.lineNumber == cell.lineNumber){
                    i--;
                    return true;
                }
            })) continue;
        cells.push(cell);
    }
    cells.sort(function(a, b){
        if(a.lineNumber < b.lineNumber) return -1;
        else return 1;
    });
    return cells;
};

Cell.getCellByCords = function(x, y){
    var result = null;
    Cell.cells.some(function(cell){
        if(x >= cell.x && x <= cell.x + cell.width && y >= cell.y && y <= cell.y + cell.height){
            result = cell;
            return true;
        }
    });
    return result;
};