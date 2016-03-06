import {EventEmitter}  from "events";

var yellowSquares = {}, yellowSquaresVisible = false;



function setYellowSquaresVisible(isVisible){
	yellowSquaresVisible = isVisible;
}

function cleanYellowSquares(){
	yellowSquares = {};
}

class TableStore extends EventEmitter {

	constructor(){
		super();
		yellowSquares = [1,0];
	}

	setYellowSquares(squares){
		yellowSquares = squares;
		this.emit("YSChange");
	}

	getYellowSquares(){
		return yellowSquares;
	}
}

const tableStore = new TableStore;

window.tableStore = tableStore;

export default tableStore;

