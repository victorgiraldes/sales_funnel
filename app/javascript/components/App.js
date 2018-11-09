import React from "react"
import Column from "./Column"
import AddCardButton from "./AddCardButton"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdding: false,
      cards: this.props.cards
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
    // TODO
    // make request
    //on success, add new card to state, on error, show notification.
    this.setState(previousState => {
      return ({
        isAdding: false,
        cards: previousState.cards.concat({
          id: product,
          product: product,
          customer: customer,
          amount: amount,
          stage: this.defaultColumnId
        })
      })
    })
  }

  onCancel() {
    this.setState({ isAdding: false })
  }

  onDrop(cardId, sourceColumnId, targetColumnId) {
    // TODO
    // make request
    // on success, change card in state, on error, show notification
    this.setState(previousState => {
      // this is gonna come from the server response
      let targetCard = { ...previousState.cards.find(card => card.id == cardId), stage: targetColumnId }
      let notModified = card => card.id != cardId

      return ({
        cards: previousState.cards.filter(notModified).concat(targetCard)
      })
    })
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
      </div>
    )
  }
}

export default App
