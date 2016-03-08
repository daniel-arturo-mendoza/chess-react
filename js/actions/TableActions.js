import dispatcher from "../dispatcher/AppDispatcher"

/*
  All functions hete tells the  dispatcher to 
  dispatch specific events, following the Flux pattern
*/

//Event to put the piece on a determined position on the board
export function setPiecePosition(posX, posY){
	dispatcher.dispatch({
		type: "PPChange",
		piecePosX: posX,
		piecePosY: posY
	});
}

//Event to set the valid positions for the piece as yellow squares
export function setYellowSquares(ySqr) {
	dispatcher.dispatch({
		type: "YSChange",
		yellowSquares: ySqr
	});
}

//Event to remove the yellow squares from the board
export function clearYellowSquares(){
	dispatcher.dispatch({
		type: "YSClear",
	});
}

//Event to move the piece to the previous position. it has to receive
//the previous position. we may consolidate this method as one with
//the setPiecePosition later.
export function rollback(rbpX, rbpY){
	dispatcher.dispatch({
		type: "Rollback",
    rbckPosX: rbpX,
    rbckPosY: rbpY
	});
}

//Event to update the initial position of the piece
export function updateInitialPosition(iniPosX, iniPosY){
	//console.log("updateInitialPosition for [" + iniPosX + " , " + iniPosY + "]");
  dispatcher.dispatch({
		type: "UIniPos",
		rbckPosX: iniPosX,
		rbckPosY: iniPosY
	});
}

//this function does not dispatch an event
//it calculates the valid positions from a given position of a piece (knight)
export function updateValidCoordinates(xPos, yPos){
	//console.log("updateValidCoordinates for " + xPos + " , " + yPos);
	var x = xPos;
  var y = yPos;
  var validPos = [];
    
  if((x-1) >= 0){
  	if((y-2) >= 0){
  		validPos.push([x-1 , y-2]);
    }	
  	if((+y+2) < 8){
    	validPos.push([x-1, +y+2]);
  	}
  }

  if((x-2) >= 0){  	
  	if((y-1) >= 0){
  		  validPos.push([x-2 , y-1]);
    	}
    	if((+y+1) < 8){
    		validPos.push([x-2 , +y+1]);
    	}
  }

  if((+x+1) < 8){
  	if((y-2) >= 0){
    	validPos.push([+x+1 , y-2]);
    }
    if((+y+2) < 8){
    	validPos.push([+x+1 , +y+2]);
  	}
  }

  if((+x+2) < 8){
  	if((y-1) >= 0){
      validPos.push([+x+2 , y-1]);
    }
    if((+y+1) < 8){
    	validPos.push([+x+2 , +y+1]);
  	}
  }
    
  return validPos;
}