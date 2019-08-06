import React from 'react';

class Fact extends React.Component {

  componentDidMount() {
    this.props.getFact(this.props.path);
  }

  render() {
    
    if(this.props.theFact) {
      return(
        <div>
          {/* Retrieves text body of fact from DB */}
          <h2>Fact - {this.props.theFact.text}</h2>
          {/* Retrieves date of fact from DB */}
          <h3>Date - {this.props.theFact.when}</h3>
        </div>
      );
    } else {
      /* Error handling */
      return(
        <p>There was an error.</p>
      );
    }
  }
}

export default Fact;