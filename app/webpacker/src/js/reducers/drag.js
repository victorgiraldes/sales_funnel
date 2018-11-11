import {
  DRAG_START,
  DRAG_END,
  DRAG_ENTER,
  DRAG_LEAVE,
  DRAG_FINISH
} from "../actions"

const initialState = {
  dragging: false,
  id: null,
  source: null,
  target: null,
  height: null,
  enters: {},
  status: "none"
}

const drag = (state = initialState, action) => {
  let previousCount, newCount

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
          ...state,
          to: action.index,
          status: validate({ from: state.from, to: action.index }),
          enters: { ...state.enters, [action.index]: newCount }
        }
      )

    case DRAG_LEAVE:
      previousCount = getPreviousCount(state, action)
      newCount = previousCount > 1 ? previousCount - 1 : 0

      return (
        { ...state,
          enters: { ...state.enters, [action.index]: newCount }
        }
      )

    case DRAG_FINISH:
      return initialState

    default:
      return state
  }
}

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

