import React, { Component } from 'reactn';
import 'App.scss';
import TextLoop from 'react-text-loop';
import Modal from 'react-modal';

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menutexts: [],
      maxPrice: 9000,
      minPrice: 0,
      destination: 0,
      isModalOpen: false,
    };
    this.placeChange = this.placeChange.bind(this);
    this.maxPriceChange = this.maxPriceChange.bind(this);
    this.minPriceChange = this.minPriceChange.bind(this);
  }

  render() {
    return (
      <div className="App" id="App">
        <header className="App-header">
          <h2>오늘 뭐먹을래?</h2>
          <TextLoop speed={300}>
            {this.state.menutexts.map((elMenu, idx) => <p key={idx.toString()}>{elMenu}</p>)}
          </TextLoop>
          <form onSubmit={e => e.preventDefault()} style={{marginTop: '200px'}}>
            <label>
              <input type="text" value={this.state.minPrice} onChange={this.minPriceChange}/>
              원 이상~<br />
              <input type="text" value={this.state.maxPrice} onChange={this.maxPriceChange}/>
              원 이하
            </label>
            <ul>
            {this.global.place.map((elPlace, idx) => 
              (<li key={elPlace.name}>
                <label>
                  <input type="radio"
                    value={idx}
                    name="places"
                    checked={this.state.destination===idx}
                    onChange={this.placeChange}/>
                  {elPlace}
                </label>
              </li>)
            )}
            </ul>
            <input type="submit" value="골라줘" onClick={this.openDialog}/>
          </form>
        </header>
        <div className="container">
          <Modal style={modalStyles} onRequestClose={this.closeDialog} isOpen={this.state.isDialogOpen}>
            { this.container() }
            <button onClick={this.closeDialog}>닫기</button>
          </Modal>
        </div>
      </div>
    );
  }

  openDialog = () => this.setState({ isDialogOpen: true })
  closeDialog = () => this.setState({ isDialogOpen: false })

  maxPriceChange(event) {
    const targetPrice = Number(event.target.value);
    this.setState({maxPrice: targetPrice});
  }

  minPriceChange(event) {
    const targetPrice = Number(event.target.value);
    this.setState({minPrice: targetPrice});
  }

  placeChange(event) {
    const targetPlace = event.target.value;
    this.setState({destination: Number(targetPlace)});
  }

  container() {
    try {
      const targets = this.global.menu.filter(elMenu => {
        if (this.state.destination !== 0) return elMenu.price >= this.state.minPrice && elMenu.price <= this.state.maxPrice && elMenu.type === this.state.destination;
        return elMenu.price >= this.state.minPrice && elMenu.price <= this.state.maxPrice;
      });
      const targetIdx = Math.floor(Math.random() * targets.length);
      const target = targets[targetIdx];
      return <div>
        <h2>{target.name}</h2>
        <p>{target.price}</p>
        <p>{this.global.place[target.type]}</p>
    </div>
    } catch (e) {
      return null;
    }
  }

  componentDidMount() {
    this.setState({menutexts: this.global.menu.map(el => el.name)});
  }
}

export default App;
