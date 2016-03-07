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

export function updateValidCoordinates(xPos, yPos){
	console.log("updateValidCoordinates for " + xPos + " , " + yPos);
	var x = xPos;
    var y = yPos;
    var aux;
    		
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