const dragdrop = (state, action) => {
  switch (action.type) {
    let columns = state.columns
    let cards = state.cards
    let enters =
      state.drag
      ? state.drag.enters
      : zeroFilledArray(columns.length)

    case "DRAG_START":
      return (
        { ...state,
          cards: state.cards.map(card =>
            card.id == action.id
            ? { ...card, dragged: true }
            : card
          ),
          drag: {
            id: action.id,
            columnIndex: action.columnIndex,
            height: action.height
          }
        }
      )

    case "DRAG_END":
      return (
        { ...state,
          cards: state.cards.map(card =>
            card.dragged
            ? { ...card, dragged: false }
            : card
          ),
          drag: {}
        }
      )

    case "DRAG_ENTER":
      enters[action.index]++

      if (isAllowedToMove(state.drag.columnIndex, action.index))
        columns[action.index].dropzone = state.drag.height

      return (
        { ...state,
          drag: { ...state.drag, enters: enters },
          columns: columns
        }
      )

    case "DRAG_LEAVE":
      enters[action.index]--

      if (enters[action.index] < 1)
        columns[action.index].dropzone = null

      return (
        { ...state,
          drag: { ...state.drag, enters: enters },
          columns: columns
        }
      )

    case "DROP":
      if (action.index == state.drag.columnIndex)
        return

      if (!isAllowedToMove(state.drag.columnIndex, action,index))
        return { ...state, notification: "Not allowed" }

      // Partition the cards to be able to shift the target to the top
      [ target, rest ] = cards.reduce(([ target, rest ], card) =>
        card.id == state.drag.id
        ? [card, rest]
        : [target, rest.concat(card)],
        [null, []]
      )

      target.stage = action.id
      columns[action.index].dropzone = null

      return (
        { ...state,
          columns: columns
          cards: [target].concat(rest),
          drag: {}
        }
      )

    case "RECEIVE_UPDATE":
      columns[action.columnIndex].dropzone = null

      let rest = cards.filter(card => card.id == action.card.id)

      return (
        { ...state,
          columns: columns,
          cards: [action.card].concat(rest),
          drag: {}
        }
      )

    default:
      return state
  }
}

const zeroFilledArray = (length) => Array.new(length).fill(0)
const isAllowedToMove = (from, to) => to > from

export default dragdrop
