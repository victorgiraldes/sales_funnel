import React from "react"
import { createStore } from "redux"
import { Provider, connect } from "react-redux"

const init = {
  showNewCard: true,
  cards: []
}

const store = createStore((state = init, action) => {
  switch (action.type) {
    case "SHOW_NEW_CARD":
      return({ ...state, showNewCard: true })
    case "ADD_NEW_CARD":
      // Make a request to server
      // Show a notification
      // If success, add the new card
      // Otherwise, make the fields red
      return({
        showNewCard: false,
        cards: [
          ...state.cards,
          {
            title: action.title,
            customerName: action.customer_name,
            amount: action.amount
          }
        ]
      })
    case "MOVE_CARD":
      // make request to server updating stage
      // on success, change card stage accordingly
      // on failure, show notification
      return state
    default:
      return state
  }
})

const NewCardForm = ({ onSubmit }) => {
  let title_input, customer_input, amount_input
  
  const onSubmit_ = (event) => {
    event.preventDefault();
    onSubmit(title_input.value, customer_input.value, amount_input.value)
  }

  return (
    <form onSubmit={onSubmit_}>
      <input placeholder="Título do negócio" ref={input => title_input = input} />
      <input placeholder="Nome do cliente" ref={input => customer_input = input} />
      <input placeholder="R$ 0,00" ref={input => amount_input = input} />
      <button type="submit">Salvar</button>
    </form>
  )
}

const Card = ({ title, customerName, amount }) => (
  <div>
    <div>{title}</div>
    <div>{customerName}</div>
    <div>{amount}</div>
  </div>
)

const Column = ({ showNewCard, cards, onClick, onSubmit }) => (
  <div>
    <button onClick={onClick}>Adicionar negócio</button>
    {showNewCard && <NewCardForm onSubmit={onSubmit} />}
    {cards.map(card =>
      <Card
        key={card.title}
        title={card.title}
        customerName={card.customerName}
        amount={card.amount}
      />
    )}
  </div>
)

const ConnectedColumn = connect(
  state => state,
  dispatch => ({
    onClick: () => ( dispatch({ type: "SHOW_NEW_CARD" }) ),
    onSubmit: (title, customer_name, amount) => {
      dispatch({
        type: "ADD_NEW_CARD",
        title: title,
        customer_name: customer_name,
        amount: amount
      })
    }
  })
)(Column)

const App = () => (
  <Provider store={store}>
    <ConnectedColumn />
  </Provider>
)

export default App
