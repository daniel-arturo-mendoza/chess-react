import React from "react";
import Row  from "../Row/Row";
import TableStore from "../../stores/TableStore"

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
			console.log(this.state.yellowSquares);
		});
	}

	createRows(){
		const [pCoorX, pCoorY] = this.props.piecePos;	
	
		//console.log("this.props.piecePos = "+this.props.piecePos);
		//console.log("pCoorX = "+pCoorX);
		//console.log("pCoorY = "+pCoorY);

		var rows = [];
		var startWithBlack = true;

		for (var i=0; i < 8; i++) {

			rows.push(<Row key={i} swb={startWithBlack} y={i} 
						pCX={pCoorX} pCY={pCoorY}/>);
			
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