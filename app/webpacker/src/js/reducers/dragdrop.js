const dragdrop = (state, action) => {
  switch (action.type) {
    case "DRAG_START":
      return (
        { ...state,
          draggedCardId: action.id,
          draggedCardColumnIndex: action.columnIndex,
          draggedCardHeight: action.height
        }
      )

    case "DRAG_END":
      return (
        { ...state,
          draggedCardId: null,
          draggedCardColumnIndex: null,
          draggedCardHeight: null
        }
      )

    case "DRAG_ENTER":
      return (
        { ...state,
          columns: state.columns.map((column, index) =>
            index == action.index
            ? { ...column, dragEnterCount: (column.dragEnterCount || 0) + 1 }
            : column
          )
        }
      )

    case "DRAG_LEAVE":
      return (
        { ...state,
          columns: state.columns.map((column, index) =>
            index == action.index && column.dragEnterCount && column.dragEnterCount > 0
            ? { ...column, dragEnterCount: column.dragEnterCount - 1 }
            : column
          )
        }
      )

    case "DROP":
      if (action.index < state.draggedCardColumnIndex)
        return { ...state, notification: "Invalid drop" }

      if (action.index == state.draggedCardColumnIndex)
        return state

      let target = state.cards.find(card => card.id == state.draggedCardId)
      let rest = state.cards.filter(card => card.id != state.draggedCardId)

      target.stage = action.id

      return (
        { ...state,
          draggedCardId: null,
          draggedCardColumnIndex: null,
          draggedCardHeight: null,
          columns: state.columns.map(column => ({ ...column, dragEnterCount: 0 })),
          cards: [target].concat(rest)
        }
      )

    default:
      return state
  }
}

export default dragdrop
