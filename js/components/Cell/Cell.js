import React from "react";
import Piece from "../Piece/Piece"
import * as TableActions from "../../actions/TableActions";

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
      TableActions.clearYellowSquares();
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
    var c = "blue";

    //console.log(this.props.namida);
		if(this.props.namida){
      c = "yellow";
    }
    else if((color == "white") || (color == "black")){ 
      c = color;
  	}
  	//console.log("creating cell [" + this.props.x + "," + this.props.y + "] color: " + c);
    return c;
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
      return <Piece x= {this.props.x}
                    y= {this.props.x}/>;
		}
    if(this.props.piece){
      return <Piece x= {this.props.x}
                    y= {this.props.y}/>;  
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
			<td id = "celldrop" 
          style = { {  width  : 50, 
          		         height : 50,
							         color  : this.setFontColor(this.props.color),
							         backgroundColor : this.setColor(this.props.color),
			 			      } }
			 	  onClick = {() =>this.handleClick()}>

        {this.checkForPiece()}
      
      </td>
		);
	}
}