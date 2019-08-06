import React from 'react';

class Fact extends React.Component {

  componentDidMount() {
    this.props.getFact(this.props.path);
  }

  render() {
    
    if(this.props.theFact) {
      return(
        <div>
          <h2>Fact - {this.props.theFact.text}</h2>
          <h3>Date - {this.props.theFact.when}</h3>
        </div>
      );
    } else {
      return(
        <h1>H</h1>
      );
    }
  }
}

export default Fact;