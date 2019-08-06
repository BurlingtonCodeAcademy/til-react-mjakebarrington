import React from 'react';
import './App.css';
import Facts from './Facts';
import Fact from './Fact'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      facts:[],
      currentFact: undefined,
      factDidLoad: false
    }

    // Bind methods for class App constructor.
    this.getAllFacts = this.getAllFacts.bind(this);
    this.getAFact = this.getAFact.bind(this);
  }


  // Retrive all facts from DB.
  async getAllFacts() {
    const response = await fetch('/facts');
    const result = await response.json();
    this.setState({
      facts: result
    });
  }
  
  // Retrieve single fact from DB.
  async getAFact(path) {
    const response = await fetch(path);
    const result = await response.json();
    this.setState({
      currentFact: result
    });
  }

  render() {
    const path = document.location.pathname;
    if(path === '/'){
      return (  
        <div className="App">
          <h1>Today I Learned</h1>
          <li><a href='/facts' >ALL FACTS</a></li>
          <li><a href='/fact' >FACT</a></li>
          <h2>What did you learn?</h2>
          <form method="POST" action="/facts">
            <input type="text" name="text"></input>
            <input type="submit"></input>
          </form>
        </div>
      );
    } else if (path === '/facts') {
      return(
        <div>
          <Facts allFacts={this.state.facts} getAllFacts={this.getAllFacts}/>
        </div>
      );
    } else if (path === '/fact') {
      return(
        <div>
          <Fact getAFact={this.getAFact} path={path}
                   theFact={this.state.currentFact} />
        </div>
      );
    }
  }
}

export default App;