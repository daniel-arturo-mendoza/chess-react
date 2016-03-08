import React from "react";

import Cell from "../Cell/Cell";

export default class Row extends React.Component{
	
	createCells(){
		//console.log("Creating Cells!!");		
			
		var cells = [];
		var startColor = "black";
		var isYellow = false;
		
		if(!this.props.swb){
			startColor = "white";
		}
		//console.log("Start color: " + startColor);
		for (var i=0; i < 8; i++) {

			for(var j=0, len = this.props.ysq.length; j < len; j++){
				
				var [auxX, auxY] = [i, this.props.y];	
				//console.log("Comparing " + this.props.ysq[j] + " and " + [auxX, auxY]);
				/*console.log(
					(this.props.ysq[j][0] ==  auxX) &&
					(this.props.ysq[j][1] ==  auxY)
					);*/
				
				if( (this.props.ysq[j][0] ==  auxX) &&
					  (this.props.ysq[j][1] ==  auxY) ){
					isYellow = true;
				}
			}
			//console.log("is Yellow?? " + isYellow);
			//console.log("pushing cells");
			cells.push( <Cell 	key= {i}
								color= {startColor} 
								namida = {isYellow}
								x= {i} 
								y= {this.props.y}
								piece= {( (i == this.props.pCX) && 
										  (this.props.y == this.props.pCY) ) ? 
										  true : false} />
						);
			if(startColor == "black"){
				startColor = "white";
			} else {
				startColor = "black";
			}
			isYellow = false;
		}

		return cells;
	}

	render(){
		return(
			<tr>
				{this.createCells()}
			</tr>
		);
	}
}




