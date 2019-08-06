import React from 'react';

class Facts extends React.Component {

  componentDidMount() {
    this.props.getAllFacts();
  }

  render() {
    return(
      <div>
        <h1>Facts!</h1>
        { this.props.allFacts && 
          <ul>{this.props.allFacts.map((fact, index) => {
            return(
              <div key={index}>
                <li key={fact._id}>
                  <span>Fact - </span> {fact.text}
                </li>
                <li key={fact._id+1}>
                  <span>Date - </span> {fact.when}
                </li>
              </div>
            );
        })}</ul>
        }
      </div>
    );
  }

}

export default Facts;