import React from "react";
import changeColorForSquare from "../Table/Table";
import * as TableActions from "../../actions/TableActions";

var ReactDOM = require('react-dom');

export default class Piece extends React.Component {	
	
	constructor(){
		super();
		//this.state = {
      	//	validCoordinates : TableActions.getYellowSquares(),
    	//};
	}

	componentDidMount(){

		//var validCoordinates = this.getValidCoordinates();
		//console.log(validCoordinates);			

		var onStartListener = function listener (event) {
					console.log("onStart");

					var target = event.target;
					var ysCoordinates = TableActions.
											updateValidCoordinates(target.getAttribute('x'), target.getAttribute('y'));
					console.log(ysCoordinates);

					TableActions.setYellowSquares(ysCoordinates);	
		};

		var onMoveListener = function listener (event) {
					//console.log("onMove");
					
					var target = event.target,
          			// keep the dragged position in the data-x/data-y attributes
			        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			        //console.log("X: " + x + "   Y: " + y);					

			      	// translate the element
			      	target.style.webkitTransform =
			      	target.style.transform =
			        'translate(' + x + 'px, ' + y + 'px)';

			      	// update the posiion attributes
			      	target.setAttribute('data-x', x);
			      	target.setAttribute('data-y', y);
		};

		var onEndListener = function listener (event) {
					//console.log("onEnd");
		};

		var onHoldListener = function listener (event){
			console.log("holding piece");
			//changeColorForSquare([0,0]);
			/*var ysCoordinates = [ [0,1], [5,2], [3,4] ];
			TableActions.setYellowSquares(ysCoordinates);*/
		};

		var node = ReactDOM.findDOMNode(this);
		node.className = "draggable";

		//node.draggable = true;

		var piece = interact(node);
		
		piece.draggable({
			//manualStart: true,
			intertia: true,
			restrict: {	//restriction: node.parentElement.parentElement,
      					endOnly: true,
      					elementRect: { top: 0, left: 0, bottom: 1, right: 1 } },
      		autoscroll: true,
			onstart: onStartListener,
			onmove: onMoveListener,
			onend: onEndListener
		});
		
		piece.on('hold', onHoldListener);
		
		//console.log(piece);
	}

	render(){
		return(
			<div id="piece" 
				 style = { { width  : 18, 
							 height : 18,
							 backgroundColor : 'gray' } }
				 x= {this.props.x}
                 y= {this.props.x}>

				♘

			</div>
		);
	}
}

