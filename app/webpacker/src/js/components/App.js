import React from "react"
import Column from "./Column"
import AddCardButton from "./AddCardButton"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdding: false,
      cards: this.props.cards,
      notification: null
    }

    this.defaultColumnId = this.props.columns[0].id

    this.onAdd = this.onAdd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onAdd() {
    this.setState({ isAdding: true })
  }

  onSubmit(product, customer, amount) {
    fetch("/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Csrf-Token": this.readCsrfToken() },
      body: JSON.stringify({ sale: { product: product, customer: customer, amount: amount } })
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        else {
          this.setState({ notification: "Ocorreu um erro ao criar o negócio." })
          return Promise.reject()
        }
      })
      .then((sale) => {
        this.setState(previousState => {
          return ({
            isAdding: false,
            cards: [{
              id: sale.id,
              product: sale.product,
              customer: sale.customer,
              amount: sale.amount,
              stage: sale.stage
            }].concat(previousState.cards)
          })
        })
      })
  }

  onCancel() {
    this.setState({ isAdding: false })
  }

  onDrop(cardId, sourceColumnId, targetColumnId) {
    fetch("/sales/" + cardId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-Csrf-Token": this.readCsrfToken() },
      body: JSON.stringify({ sale: { stage: targetColumnId } })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          this.setState({ notification: "Não foi possível mover o negócio para a etapa selecionada." })
          return Promise.reject()
        }
      })
      .then((sale) => {
        this.setState(({ cards }) => (
          { cards: [sale].concat(cards.filter(card => card.id != cardId)) }
        ))
      })
  }

  readCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').content
  }

  render() {
    return (
      <div>
        <AddCardButton onClick={this.onAdd} />
        <div className="flex-container margin-top-lg">
          {this.props.columns.map(column =>
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={this.state.cards.filter(card => card.stage == column.id)}
              showForm={column.id == this.defaultColumnId && this.state.isAdding}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onDrop={this.onDrop}
            />
          )}
        </div>
        {this.state.notification &&
          <div className="notification" onAnimationEnd={() => this.setState({ notification: null })}>{this.state.notification}</div>
        }
      </div>
    )
  }
}

export default App
