import {
  SHOW_FORM,
  HIDE_FORM,
  UPDATE_FORM,
  ADD_REQUEST_STARTED,
  ADD_REQUEST_FINISHED
} from "../actions"

const initialState = {
  show: false,
  waiting: false,
  title: "",
  customer: "",
  amount: 0
}

export const form = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FORM:
      return ({ ...state, show: true })

    case HIDE_FORM:
      return ({ ...state, show: false })

    case UPDATE_FORM:
      return ({ ...state, [action.name]: action.value })

    case ADD_REQUEST_STARTED:
      return ({ ...state, waiting: true })

    case ADD_REQUEST_FINISHED:
      return ({ ...state, waiting: false })

    default:
      return state
  }
}

export default form
