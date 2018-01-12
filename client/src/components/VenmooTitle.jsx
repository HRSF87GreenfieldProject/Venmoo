import React from "react";
import reactstrap from 'reactstrap'

export default class VenmooTitle extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <div className="navbar">
        <h1 className="title">
          Welcome to VenMOO: MOOOOOve your MOOney
        </h1>
    </div>
    );
  }
}

