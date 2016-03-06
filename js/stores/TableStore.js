import {EventEmitter}  from "events";
import dispatcher from "../dispatcher/AppDispatcher";

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

	handleActions(action){
		switch(action.type){
			case "YSChange": {
				console.log("YSChange!!!");
				this.setYellowSquares(action.yellowSquares);
			}
		}
	}
}

const tableStore = new TableStore;

dispatcher.register(tableStore.handleActions.bind(tableStore));

//window.dispatcher = dispatcher;

export default tableStore;

