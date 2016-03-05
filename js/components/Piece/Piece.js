import React from "react";
import getTable from "../Table/Table";

//import interact from "../../DragTest"
var ReactDOM = require('react-dom');

export default class Piece extends React.Component {	
	
	constructor(){
		super();
	}
	

	componentDidMount(){
		
		var onStartListener = function listener (event) {
  					//console.log("onStart");
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
		
		/*piece.on('hold', function (event) {
										var interaction = event.interaction;

		    							if (!interaction.interacting()) {
		      								interaction.start( { name: 'drag' },
		                        							   event.interactable,
		                        							   event.currentTarget
		                        							 );
		    							}
		    						}
		    );
		*/
		console.log(piece);
	}

	render(){
		return(
			<div id="piece" style = { { width  : 20, 
										height : 20 } }>
				♘
			</div>
		);
	}
}


