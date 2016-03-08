import {EventEmitter}  from "events";
import dispatcher from "../dispatcher/AppDispatcher";

var piecePosX, piecePosY;
var rbckPosX, rbckPosY;
var yellowSquares = {};


class TableStore extends EventEmitter {

	constructor(){
		super();
		piecePosX = 3;
		piecePosY = 3;

		///
		//rbckPosX = 3;
		//rbckPosY = 3;
		///

		yellowSquares = [];
		
	}

	setPiecePosition(posX, posY){
		piecePosX = posX;
		piecePosY = posY;
		console.log("<TableStore><setPiecePosition>" + piecePosX + "," + piecePosY );
		this.emit("PPChange");
	}

	setPiecePositionFromRollback(pX, pY){
		piecePosX = pX;
		piecePosY = pY;
		console.log("<TableStore><setPiecePositionFromRollback>" + piecePosX + "," + piecePosY );
		console.log("<TableStore><setPiecePositionFromRollback> emiting Rollback event");
		this.emit("Rollback");
	}

	getPiecePositionX(){
		return piecePosX;
	}

	getPiecePositionY(){
		return piecePosY;
	}

	updateInitialPosition(iniPosX, iniPosY){
		console.log("<TableStore> Updating initial position for Rollback");
		rbckPosX = iniPosX;
		rbckPosY = iniPosY;
		this.emit("UIniPos");
	}
	
	getInitialPositionX(){
		return rbckPosX;
	}

	getInitialPositionY(){
		return rbckPosY;
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
				//console.log("YSChange!!!");
				this.setYellowSquares(action.yellowSquares);
				break;
			}
			case "YSClear": {
				//console.log("YSClear!!!");
				this.clearYellowSquares();
				break;
			}
			case "PPChange": {
				console.log("PPChange!!!");
				this.setPiecePosition(action.piecePosX, action.piecePosY);
				//this.setPiecePosition(action.posX, action.posY);
				break;
			}
			case "UIniPos": {
				this.updateInitialPosition(action.rbckPosX, action.rbckPosY);
				break;
			}
			
			case "Rollback": {
				console.log("<TableStore> Rollback CASE: action.rbckPosX="+ action.rbckPosX + 
					" action.rbckPosY=" + action.rbckPosY);
				this.setPiecePositionFromRollback(action.rbckPosX, action.rbckPosY);
				break;
			}	
		}
	}
}

const tableStore = new TableStore;

dispatcher.register(tableStore.handleActions.bind(tableStore));

//window.dispatcher = dispatcher;

export default tableStore;

