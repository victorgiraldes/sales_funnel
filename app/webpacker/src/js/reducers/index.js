import { SHOW_FORM } from "../actions"
import drag from "./drag"

const add = (state = { showForm: false }, action) => {
  switch (action.type) {
    case SHOW_FORM:
      return ({ ...state, showForm: true })

    default:
      return state
  }
}

export default drag
