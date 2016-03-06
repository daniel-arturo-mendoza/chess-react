import dispatcher from "../dispatcher/AppDispatcher"

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