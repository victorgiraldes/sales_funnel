import {
  DRAG_START,
  DRAG_END,
  DRAG_ENTER,
  DRAG_LEAVE,
  DRAG_FINISH,
  DROP_START
} from "../actions"

const initialState = {
  dragging: false,
  id: null,
  from: null,
  to: null,
  height: null,
  enters: {},
  status: "none"
}

const drag = (state = initialState, action) => {
  let previousCount, newCount, targetColumn, status

  switch (action.type) {
    case DRAG_START:
      return (
        {
          ...state,
          dragging: true,
          id: action.id,
          from: action.columnIndex,
          height: action.height,
        }
      )

    case DRAG_END:
      return initialState

    case DRAG_ENTER:
      previousCount = getPreviousCount(state, action)
      newCount = previousCount + 1

      return (
        {
          ...updateDropTarget(state, action),
          enters: { ...state.enters, [action.index]: newCount }
        }
      )

    case DRAG_LEAVE:
      previousCount = getPreviousCount(state, action)
      newCount = previousCount > 1 ? previousCount - 1 : 0

      const didntLeave = newCount > 0

      return (
        {
          ...state,
          to:     didntLeave ? state.to : null,
          status: didntLeave ? state.status : "none",
          enters: { ...state.enters, [action.index]: newCount }
        }
      )

    case DRAG_FINISH:
      return initialState

    case DROP_START:
      return updateDropTarget(state, action)

    default:
      return state
  }
}

const updateDropTarget = (state, action) => (
  {
    ...state,
    to: action.index,
    status:
      state.to == action.index
      ? state.status
      : validate({ from: state.from, to: action.index })
  }
)

const validate = ({ from, to }) => {
  if (to > from)
    return "valid"
  else if (to == from)
    return "none"
  else
    return "invalid"
}

const getPreviousCount = (state, action) => state.enters[action.index] || 0

export default drag

