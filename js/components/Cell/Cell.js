import React from "react";
import Piece from "../Piece/Piece"
import * as TableActions from "../../actions/TableActions";
import TableStore from "../../stores/TableStore";

var ReactDOM = require('react-dom');

export default class Cell extends React.Component{

  constructor() {
    super();
    this.state = {
      hasPiece : false,
    };
  }

  componentDidMount(){
    //Here we define the functions to be executed when a Drop event happens

    var onDropActivateListener = function (event){
      //console.log("onDropActivate");
    };

    var onDragEnterListener = function (event){
      //console.log("onDragEnter");
    };

    var onDragLeaveListener = function (event){
      //console.log("onDragLeave");
    };

    var onDropListener = function (event){
      //console.log("onDrop");
      
      //obtain the coordinates of the cell receiving the drop
      var target = event.target;
      var xpos = target.getAttribute('x');
      var ypos=  target.getAttribute('y');

      //obtain the valid positions, we already have them as yellow squares
      var ysqr = TableStore.getYellowSquares();

      //look for the cell within the yellow ones
      for (var i = 0; i < ysqr.length; i++) {
        //if we find it, it is a valid position
        if((ysqr[i][0] == xpos) && (ysqr[i][1] == ypos)){
          TableActions.setPiecePosition(xpos, ypos);
          //console.log("SUPERVALID POSITION!!!");
          return;
        }
      }
      //If we reach here it means the position is invalid
      /*console.log("INVALID POSITION!!! Need to roll back to: [" 
                              + TableStore.getInitialPositionX() 
                              + ", " + TableStore.getInitialPositionY() +"]");*/

      //we need to set the piece into the position to follow the process...
      TableActions.setPiecePosition(xpos, ypos);
      //...then we roll back the action
      TableActions.rollback(TableStore.getInitialPositionX(), TableStore.getInitialPositionY());

    };

    var onDropDeactivateListener = function (event){
      //console.log("onDropDeactivate"); 

      //after the drag finishes we clean up the board  
      TableActions.clearYellowSquares(); 
    };

    //obtain the DOM of the cell to make it a drop zone with interact.js
    var node = ReactDOM.findDOMNode(this);
    node.className = "dropzone";
    interact.maxInteractions(Infinity);
    var cell = interact(node);
    
    //configure the dropzone
    cell.dropzone({
      accept: '#piece',
      overlap: 0.75,
      //assign the DnD event to a function to be executed
      ondropactivate: onDropActivateListener,
      ondragenter: onDragEnterListener,
      ondragleave: onDragLeaveListener,
      ondrop: onDropListener,
      ondropdeactivate: onDropDeactivateListener 
    });

    //console.log(cell);
  }

  //here we define the color of the cell
  setColor(color){
    //define blue as default. if a cell is blue something went very wrong!!
    var c = "blue";

    //check if the cell is going to be yellow
    if(this.props.isYw){
      c = "yellow";
    }//of white or black
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

  //checks if the cell should have a piece allocated
	checkForPiece(){
    //this state was not used, but preserveing it as reference
    if(this.state.hasPiece){
      return <Piece x= {this.props.x}
                    y= {this.props.y}/>;
		}
    //if the piece flag is true, this cell must have a piece
    if(this.props.piece){
      return <Piece x= {this.props.x}
                    y= {this.props.y}/>;  
    }
  }

  //REMOVE ME
  putPiece(){
    //this.setState({hasPiece:true});  
  }

  //REMOVE ME
  removePiece(){
    //this.setState({hasPiece:false});
  }

  //does nothiing
 	handleClick(){
 		//this.putPiece();
    //this.render();
 	}

	render(){
    return(
			<td id = "celldrop" 
          style = { {  width  : 50, 
          		         height : 50,
							         color  : this.setFontColor(this.props.color),
							         backgroundColor : this.setColor(this.props.color),
			 			      } }
          x= {this.props.x}
          y= {this.props.y}
			 	  onClick = {() =>this.handleClick()}>

        {this.checkForPiece()}
      
      </td>
		);
	}
}