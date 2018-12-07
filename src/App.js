import React, { Component } from 'reactn';
import logo from './logo.svg';
import './App.css';
import TextLoop from 'react-text-loop';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menutexts: [],
      maxPrice: 9000,
      destination: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>오늘 뭐먹을래?</h2>
          <TextLoop speed={300}>
            {this.state.menutexts.map(elMenu => <p>{elMenu}</p>)}
          </TextLoop>
          <form onSubmit={this.submit}>
            <label><input type="text" value={this.state.maxPrice} onChange={this.priceChange}/>원 이하</label>
            <ul>
            {this.global.place.map((elPlace, idx) => 
              (<li>
                <label>
                  <input type="radio" value={idx} name="places" checked={this.state.destination===idx} onchange={this.placeChange}/>{elPlace}
                </label>
              </li>)
            )}
            </ul>
            <input type="submit" value="골라줘"/>
          </form>
        </header>
      </div>
    );
  }

  priceChange(event) {
    const targetPrice = Number(event.target.value);
    this.setState({maxPrice: targetPrice});
  }

  placeChange(event) {
    const targetPlace = event.target.value;
    this.setState({destination: targetPlace});
  }

  submit() {
    
  }

  componentDidMount() {
    this.setState({menutexts: this.global.menu.map(el => el.name)});
  }
}

export default App;
