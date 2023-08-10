
import "./App.css";
import React, {Component} from "react";
import web3 from './web3'
import lottery from './lottery'

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }
  
  async componentDidMount(){
    const manager = await lottery.methods.manager().call() 
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState( { manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const accounts = await web3.eth.getAccounts()

    this.setState({message: 'Esperando a transação ser completa...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({message: 'Você entrou no sorteio!'})
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({ message: 'Esperando a transação ser completa...'})

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'Um vencedor foi escolhido!'})
  }

  render() {
    return (
      <div className="container">
        <h2>Contrato de Loteria</h2>
        <p>
          Esse contrato é gerido por {this.state.manager}.
          Há no momento {this.state.players.length} pessoas que entraram,
          competindo para vencer {web3.utils.fromWei(this.state.balance, 'ether')} Ethereum.
        </p> 

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Quer testar a sua sorte?</h4>
          <div>
            <label>Quantidade de Ethereum para entrar</label>
            <input 
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}/>
          </div>
          <button>Entrar</button>
        </form>

        <hr />

          <h4>Pronto para escolher um vencedor?</h4>
          <button onClick={this.onClick}>Escolha um vencedor!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
