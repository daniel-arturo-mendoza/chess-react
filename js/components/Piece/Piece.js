import React from "react";
import changeColorForSquare from "../Table/Table";
import * as TableActions from "../../actions/TableActions";
import TableStore from "../../stores/TableStore";

var ReactDOM = require('react-dom');

export default class Piece extends React.Component {	
	
	constructor(){
		super();
	}

	componentDidMount(){
		//Here we define the functions for the drag behavior for the piece.

		//console.log(validCoordinates);			
		var onStartListener = function listener (event) {
					//console.log("onStart");

					//calculate valid positions for the piece
					var target = event.target;
					var ysCoordinates = TableActions.
											updateValidCoordinates(
												target.getAttribute('x'), 
												target.getAttribute('y'));
					//adding the yellow squares to the board
					TableActions.setYellowSquares(ysCoordinates);

					//updating the initial piece position in case a rollback 
					TableActions.updateInitialPosition( target.getAttribute('x'), 
														target.getAttribute('y'));
					//console.log(ysCoordinates);
		};

		var onMoveListener = function listener (event) {
					//console.log("onMove");		
					var target = event.target,
          			// keep the dragged position in the data-x/data-y attributes
			        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			        // translate the element
			      	target.style.webkitTransform =
			      	target.style.transform =
			        'translate(' + x + 'px, ' + y + 'px)';

			      	// update the position attributes
			      	target.setAttribute('data-x', x);
			      	target.setAttribute('data-y', y);
		};

		var onEndListener = function listener (event) {
			//console.log("onEnd");
		};

		var onHoldListener = function listener (event){
			//console.log("holding piece");
		};

		//obtain the DOM for to Piece to make it draggable with interact.js
		var node = ReactDOM.findDOMNode(this);
		node.className = "draggable";
		var piece = interact(node);
		
		//configure drag actions 
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
		
		//adding a behavior on hold action
		//it was not used in practice.
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
                 y= {this.props.y}>

				♘

			</div>
		);
	}
}

