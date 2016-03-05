import React from "react";

import Cell from "../Cell/Cell";

export default class Row extends React.Component{
	
	createCells(){
		var cells = [];
		var startColor = "black";
		
		if(!this.props.swb){
			startColor = "white";
		}

		for (var i=0; i < 8; i++) {
			 
			cells.push( <Cell 	key={i}
								color={startColor} 
								x={i} 
								y={this.props.y}
								piece={( (i == this.props.pCX) && 
										 (this.props.y == this.props.pCY) ) ? 
										 true : false} />
						);

			
			if(startColor == "black"){
				startColor = "white";
			} else {
				startColor = "black";
			}
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




