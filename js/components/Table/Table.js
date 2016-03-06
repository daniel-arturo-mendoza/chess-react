import React from "react";
import Row  from "../Row/Row";
import TableStore from "../../stores/TableStore";
//import * as TableActions from "../../actions/TableActions";

export default class Table extends React.Component{
	
	constructor() {
		super();
		this.state = {
			yellowSquares: TableStore.getYellowSquares(),
		}
	}

	componentWillMount(){
		TableStore.on("YSChange", () => {
			this.setState({
				yellowSquares: TableStore.getYellowSquares(),
			})
			var [p1, p2, p3] = this.state.yellowSquares;
			console.log([p1, p2, p3]);
			//console.log(p1);
			//console.log(p2);
			//console.log(p3);
			this.render();
		});
	}

	createRows(){
		//console.log("Creating Rows!!!!");
			
		const [pCoorX, pCoorY] = this.props.piecePos;	
	
		//console.log("this.props.piecePos = "+this.props.piecePos);
		//console.log("pCoorX = "+pCoorX);
		//console.log("pCoorY = "+pCoorY);

		var rows = [];
		var startWithBlack = true;

		for (var i=0; i < 8; i++) {
			//console.log("Pushing Row" + i);
			rows.push( <Row key={i} 
							swb={startWithBlack}
							ysq={this.state.yellowSquares} 
							y={i} 
							pCX={pCoorX} 
							pCY={pCoorY}/>
					);		
			//console.log(this.state.yellowSquares);
			startWithBlack = !startWithBlack;
		}
		return <tbody>{rows}</tbody>;
	}

	render(){
		return(
			<table>
				{this.createRows()}
	     	</table>
	    );
	}
}