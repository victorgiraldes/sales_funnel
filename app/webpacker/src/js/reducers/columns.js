import {
  RECEIVE_NEW_CARD,
  MOVE_CARD,
} from "../actions"

const initialState = []

export const columns = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_NEW_CARD:
      return state.map(column =>
        column.id == action.card.stage
        ? { ...column, cards: [action.card].concat(column.cards) }
        : column
      )

    case MOVE_CARD:
      let card = state[action.from].cards.find(card => card.id == action.id)

      return state.map((column, index) => {
        if (index == action.from)
          return (
            { ...column,
              cards: removeCard(column.cards, action.id)
            }
          )
        else if(index == action.to)
          return (
            { ...column,
              cards: [{ ...card, stage: column.id }]
                .concat(removeCard(column.cards, action.id))
            }
          )
        else
          return column
      })

    default:
      return state
  }
}

const removeCard = (cards, id) => cards.filter(card => card.id != id)

export default columns
