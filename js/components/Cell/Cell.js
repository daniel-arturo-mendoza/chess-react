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
      console.log("onDrop");
      
      var target = event.target;
      var xpos = target.getAttribute('x');
      var ypos=  target.getAttribute('y');

      var ysqr = TableStore.getYellowSquares();

      for (var i = 0; i < ysqr.length; i++) {
        
        if((ysqr[i][0] == xpos) && (ysqr[i][1] == ypos)){
          
          TableActions.setPiecePosition(xpos, ypos);
          console.log("SUPERVALID POSITION!!!");
          return;
        }
      }
      
      console.log("INVALID POSITION!!! Need to roll back to: [" 
                              + TableStore.getInitialPositionX() 
                              + ", " + TableStore.getInitialPositionY() +"]");
      TableActions.setPiecePosition(xpos, ypos);
      //TableActions.rollback(TableStore.getInitialPositionX(), TableStore.getInitialPositionY());

    };

    var onDropDeactivateListener = function (event){
      //console.log("onDropDeactivate");   
      TableActions.clearYellowSquares(); 
      /*
      var target = event.target;
      var xpos = target.getAttribute('x');
      var ypos=  target.getAttribute('y');
      var ysqr = TableStore.getYellowSquares();
      for (var i = 0; i < ysqr.length; i++) {
        if((ysqr[i][0] == xpos) && (ysqr[i][1] == ypos)){   
          TableActions.setPiecePosition(xpos, ypos);
          console.log("SUPERVALID POSITION!!!");
          return;
        }
      }
      console.log("INVALID POSITION!!! rolling back to: [" 
                              + TableStore.getInitialPositionX() 
                              + ", " + TableStore.getInitialPositionY() +"]");
      TableActions.rollback(TableStore.getInitialPositionX(), TableStore.getInitialPositionY());      
      */
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
                    y= {this.props.y}/>;
		}
    if(this.props.piece){
      return <Piece x= {this.props.x}
                    y= {this.props.y}/>;  
    }
  }

  putPiece(){
    //this.setState({hasPiece:true});  
  }

  removePiece(){
    //this.setState({hasPiece:false});
  }

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