import {
  DRAG_START,
  DRAG_END,
  DRAG_ENTER,
  DRAG_LEAVE,
  DRAG_FINISH
} from "../actions"

const drag = (state = { columns: [] }, action) => {
  let columns = state.columns
  let enters =
    state.drag
    ? state.drag.enters
    : zeroFilledArray(state.columns.length)

  switch (action.type) {
    case DRAG_START:
      // When a drag starts, we save the relevant properties in the state so
      // that we can highlight how it's gonna look like when it's dropped.
      // The `dragged` prop is inserted in the array of cards so it can be
      // easily passed to the specific card. The others are added to a separate
      // object inside the state.
      return (
        { ...state,
          columns: state.columns.map((column, index) =>
            dragFromColumn(column, index, action)
          ),
          drag: {
            id: action.id,
            columnIndex: action.columnIndex,
            height: action.height,
            enters: zeroFilledArray(state.columns.length)
          }
        }
      )

    case DRAG_END:
      // This action will only happen if there was a drag that started and was
      // cancelled before a drop, meaning the dragged card was dropped somewhere
      // invalid. We then reset the `dragged` property of the card to false
      // and reset the other drag-related properties.
      return (
        { ...state,
          columns: state.columns.map((column, index) =>
            dragFromColumn(column, index, action)
          ),
          drag: null
        }
      )

    case DRAG_ENTER:
      // This action happens when a dragged card enters a column where it could
      // be dropped. In order to highlight the current drop target, we have to
      // count how many times it was entered and how many times it was left;
      // that is because its children nodes also receive the dragenter and
      // dragleave events, so the *difference* between these counts has to be
      // more than 1 to highlight the column.
      // Since this action adds 1, and the count is never negative, this action
      // can always add the dropzone to the target column if it is valid.
      // To avoid re-checking if the target column is valid in the DROP action,
      // we could save that to the state here.
      if (
        isAllowedToMove(state.drag.columnIndex, action.index)
        && !state.columns[action.index].dropzone
      )
        columns = updateAt(
          state.columns,
          action.index,
          column => ({ ...column, dropzone: state.drag.height })
        )

      return (
        { ...state,
          columns: columns,
          drag: {
            ...state.drag,
            enters: updateAt(enters, action.index, count => count + 1)
          }
        }
      )

    case DRAG_LEAVE:
      // As pointed out in DRAG_ENTER, on a DRAG_LEAVE, the column will have
      // its dropzone removed if the "balance" between dragenters and
      // dragleaves is less than 1.
      enters = updateAt(enters, action.index, count => count - 1)

      if (enters[action.index] < 1 && state.columns[action.index].dropzone)
        columns = updateAt(
          state.columns,
          action.index,
          column => ({ ...column, dropzone: null })
        )

      return (
        { ...state,
          columns: columns,
          drag: { ...state.drag, enters: enters }
        }
      )

    case DRAG_FINISH:
      // This is the initial part of a DROP, which updates the state so that
      // the drop target column stops shoing a dropzone.
      // The dragged card is not actually moved to the target column yet
      // because that depends on the server response.
      if (columns[action.index].dropzone)
        columns = updateAt(
          state.columns,
          action.index,
          column => ({ ...column, dropzone: null })
        )

      return (
        { ...state,
          columns: columns,
          drag: null
        }
      )

    default:
      return state
  }
}

const dragFromColumn = (column, index, action) => {
  if (index != action.columnIndex)
    return column

  switch (action.type) {
    case DRAG_START:
      return (
        { ...column,
          cards: column.cards.map(card =>
            card.id == action.id
            ? { ...card, dragged: true }
            : card
          )
        }
      )

    case DRAG_END:
      return (
        { ...column,
          cards: column.cards.map(card =>
            card.dragged
            ? { ...card, dragged: false }
            : card
          )
        }
      )

    default:
      return column
  }
}

const zeroFilledArray = (length) => Array(length).fill(0)
const isAllowedToMove = (from, to) => to > from
const updateAt = (array, index, updateFunc) => (
  array.map((item, i) => i == index ? updateFunc(item) : item)
)

export default drag
