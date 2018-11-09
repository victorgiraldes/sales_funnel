import React from "react"
import Column from "./Column"
import AddCardButton from "./AddCardButton"
import Toast from "./Toast"

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
    this.notify = this.notify.bind(this)
    this.onDismissNotification = this.onDismissNotification.bind(this)
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
          this.setState({ notification: "Ocorreu um erro ao mover o negócio." })
          return Promise.reject()
        }
      })
      .then((sale) => {
        this.setState(({ cards }) => (
          { cards: [sale].concat(cards.filter(card => card.id != cardId)) }
        ))
      })
  }

  notify(text) { this.setState({ notification: text }) }
  onDismissNotification() { this.setState({ notification: null }) }

  readCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]').content
  }

  render() {
    return (
      <div>
        <AddCardButton onClick={this.onAdd} />
        <div className="flex margin-top-lg">
          {this.props.columns.map((column, index) =>
            <Column
              key={column.id}
              id={column.id}
              position={index}
              title={column.title}
              cards={this.state.cards.filter(card => card.stage == column.id)}
              showForm={column.id == this.defaultColumnId && this.state.isAdding}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onDrop={this.onDrop}
              notify={this.notify}
            />
          )}
        </div>
        {this.state.notification &&
          <Toast
            text={this.state.notification}
            onDismiss={this.onDismissNotification}
          />
        }
      </div>
    )
  }
}

export default App
