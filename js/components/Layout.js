import React from "react";

import Footer from "./Footer";
import Header from "./Header";

import Table from "./Table/Table";

import Piece from "./Piece/Piece";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Chess",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  movePiece(pieceCoordX, pieceCoordY){
    pieceCoord = [pieceCoordX, pieceCoordY];

  }

  changeColorForSquare(point){
    render();
    console.log("changeColorForSquare");
  }

  render() {
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} 
                title={this.state.title} />
        <Table/>
      </div>
    );
  }
}
