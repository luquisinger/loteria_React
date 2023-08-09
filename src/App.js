
import "./App.css";
import React, {Component} from "react";
import web3 from './web3'
import lottery from './lottery'

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  }
  
  async componentDidMount(){
    const manager = await lottery.methods.manager().call() 
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState( { manager, players, balance })
  }
  render() {
    return (
      <div>
        <h2>Contrato de Loteria</h2>
        <p>
          Esse contrato é gerido por {this.state.manager}.
          Há no momento {this.state.players.length} pessoas que entraram,
          competindo para vencer {web3.utils.fromWei(this.state.balance, 'ether')} Ethereum.
        </p> 
        <hr />
        <form>
          <h4>Quer tentar a sua sorte?</h4>
          <div>
            <label>Quantidade de Ethereum para entrar</label>
            <input 
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}/>
          </div>
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}
export default App;
