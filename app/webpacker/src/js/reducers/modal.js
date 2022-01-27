import {
  SHOW_MODAL,
  HIDE_MODAL
} from "../actions"

const initialState = {
  product: null,
  customer: null,
  amount: null,
  stages: []
}

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return ({ ...state, show: true })
    case HIDE_MODAL:
      return ({ show: false })

    default:
      return state
  }
}

export default modal
