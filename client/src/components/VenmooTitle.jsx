import React from "react";
import reactstrap from 'reactstrap'

export default class VenmooTitle extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <div>
        <h1 className="text-primary">
          Welcome to VenMOO: MOOOOOve your MOOney
        </h1>
    </div>
    );
  }
}

