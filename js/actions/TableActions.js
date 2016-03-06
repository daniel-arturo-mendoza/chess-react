import dispatcher from "../dispatcher/AppDispatcher"

export function setPiecePosition(posX, posY){
	dispatcher.dispatch({
		type: "PPChange",
		piecePosX: posX,
		piecePosY: posY
	});
}

export function setYellowSquares(ySqr) {
	dispatcher.dispatch({
		type: "YSChange",
		yellowSquares: ySqr
	});
}

export function clearYellowSquares(){
	dispatcher.dispatch({
		type: "YSClear",
	});
}