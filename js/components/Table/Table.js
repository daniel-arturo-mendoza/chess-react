import React from "react";
import Row  from "../Row/Row";
import TableStore from "../../stores/TableStore";

export default class Table extends React.Component{
	
	constructor() {
		super();
		this.state = {
			piecePosX: TableStore.getPiecePositionX(),
			piecePosY: TableStore.getPiecePositionY(),
			yellowSquares: TableStore.getYellowSquares(),
		}
	}

	componentWillMount(){
		//Here is where the table listen for emited events from
		//the TableStore, following the Flux pattern.

		TableStore.on("PPChange", () => {
			//console.log("Entering PPChange");
			this.setState({
				piecePosX: TableStore.getPiecePositionX(),
				piecePosY: TableStore.getPiecePositionY()
			})
			this.render();
		});

		TableStore.on("Rollback", () => {
			//console.log("<Table> Entering ON Rollback function");
			//console.log("<Table> X: " + TableStore.getInitialPositionX());
			//console.log("<Table> Y: " + TableStore.getInitialPositionY());
			this.setState({
				piecePosX: TableStore.getInitialPositionX(),
				piecePosY: TableStore.getInitialPositionY()
			})
			//console.log("<Table> Calling render ");
			this.render();
		});		

		TableStore.on("YSChange", () => {
			//console.log("Entering YSChange");
			this.setState({
				yellowSquares: TableStore.getYellowSquares(),
			})
			this.render();
		});

		TableStore.on("YSClear", () => {
			//console.log("Entering YSClear");
			this.setState({
				yellowSquares: TableStore.getYellowSquares(),
			})
			this.render();
		});

		TableStore.on("UIniPos", () => {
			//console.log("Entering UIniPos");
			this.setState({
				rbckPosX: TableStore.getInitialPositionX(),
				rbckPosY: TableStore.getInitialPositionY()
			})
		});		
	}

	createRows(){
		//console.log("Creating Rows!!!!");	
		var pCoorX = this.state.piecePosX;
		var pCoorY = this.state.piecePosY;
		var rows = [];
		var startWithBlack = true;

		//create a table with eight rows in it
		for (var i=0; i < 8; i++) {
			//console.log("Pushing Row" + i);
			rows.push( <Row key={i} 
							swb={startWithBlack}
							ysq={this.state.yellowSquares} 
							y={i} 
							pCX={pCoorX} 
							pCY={pCoorY}
							pPos={this.state.piecePos}/>
					);		
			//console.log(this.state.yellowSquares);

			//toggle between black-white and white-black rows
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