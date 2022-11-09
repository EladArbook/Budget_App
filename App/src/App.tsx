import React, { Component } from 'react';
import './App.css';
import AddIncome from './Components/AddIncome/AddIncome';
//import AddOutcome from './Components/AddOutcome/AddOutcome';
import ViewIncomes from './Components/ViewIncomes/ViewIncomes';
//import Income from './Models/Income';
//import Outcome from './Models/Outcome';

class App extends Component {
  incomeCounter: number = 0;
  outcomeCounter: number = 0;
  // import from database (if exist);

/*   refreshAll = () => {
    console.log("\/\_ RENDERING EVERYTHING ! _/\/");
    this.setState({});
  } */


  render(): JSX.Element {

    return (
      <div className="App">
        <hr />
        <h1> Budget App </h1>

        {/*  <hr />
        <AddOutcome /> */}
        <hr />
        <AddIncome />
        {/*  */}
        <hr />
        <ViewIncomes />
        <hr />



      </div>
    );
  }
}

export default App;
