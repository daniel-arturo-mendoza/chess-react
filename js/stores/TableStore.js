import {EventEmitter}  from "events";
import dispatcher from "../dispatcher/AppDispatcher";

var piecePosX, piecePosY;
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
		piecePosX = 3;
		piecePosY = 3;
		yellowSquares = [];
	}

	setPiecePosition(posX, posY){
		piecePosX = posX
		piecePosY = posY;
		console.log("<TableStore> " + piecePosX + "," + piecePosY );
		this.emit("PPChange");
	}

	getPiecePositionX(){
		return piecePosX;
	}

	getPiecePositionY(){
		return piecePosY;
	}

	setYellowSquares(squares){
		yellowSquares = squares;
		this.emit("YSChange");
	}

	clearYellowSquares(){
		yellowSquares = [];
		this.emit("YSClear");
	}

	getYellowSquares(){
		return yellowSquares;
	}

	handleActions(action){
		switch(action.type){
			case "YSChange": {
				console.log("YSChange!!!");
				this.setYellowSquares(action.yellowSquares);
				break;
			}
			case "YSClear": {
				console.log("YSClear!!!");
				this.clearYellowSquares();
				break;
			}
			case "PPChange": {
				console.log("PPChange!!!");
				//this.setPiecePosition(action.piecePosX, action.piecePosY);
				this.setPiecePosition(action.posX, action.posY);
				break;
			}
		}
	}
}

const tableStore = new TableStore;

dispatcher.register(tableStore.handleActions.bind(tableStore));

window.dispatcher = dispatcher;

export default tableStore;

