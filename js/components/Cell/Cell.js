import React from "react";
import Piece from "../Piece/Piece"

var ReactDOM = require('react-dom');

export default class Cell extends React.Component{

  constructor() {
    super();
    this.state = {
      hasPiece : false,
    };
  }

  componentDidMount(){

    var onDropActivateListener = function (event){
      //console.log("onDropActivate");
    };

    var onDragEnterListener = function (event){
      console.log("onDragEnter");
      
      /*var draggableElement = event.relatedTarget,
      dropzoneElement = event.target;

      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      draggableElement.textContent = 'Dragged in';*/
    };

    var onDragLeaveListener = function (event){
      console.log("onDragLeave");
    };

    var onDropListener = function (event){
      console.log("onDrop");
    };

    var onDropDeactivateListener = function (event){
      //console.log("onDropDeactivate");
    };

    var node = ReactDOM.findDOMNode(this);
    node.className = "dropzone";

    interact.maxInteractions(Infinity);

    var cell = interact(node);
    
    cell.dropzone({
      accept: '#piece',
      overlap: 0.75,

      ondropactivate: onDropActivateListener,
      ondragenter: onDragEnterListener,
      ondragleave: onDragLeaveListener,
      ondrop: onDropListener,
      ondropdeactivate: onDropDeactivateListener 
    });

    //console.log(cell);
  }


  setColor(color){
		if((color == "white") || (color == "black")){ 
      return color;
  	}
  	return "blue";
  }

	setFontColor(color){
		if(color == "white"){
			return "black";
		} else if(color == "black"){
			return "white";
		}
		return "blue";	
	}

	checkForPiece(){
    if(this.state.hasPiece){
      return <Piece/>;
		}
    if(this.props.piece){
      return <Piece/>;  
    }
  }

  putPiece(){
    this.setState({hasPiece:true});  
  }

  removePiece(){
    this.setState({hasPiece:false});
  }

 	handleClick(){
 		this.putPiece();
    this.render();
 	}

	render(){
    return(
			<td id = "celldrop" style = {{ 	width  : 50, 
							height : 50,
							color  : this.setFontColor(this.props.color),
							backgroundColor : this.setColor(this.props.color),
			 			}}
			 	onClick = {() =>this.handleClick()}>
        {this.checkForPiece()}
      </td>
		);
	}
}