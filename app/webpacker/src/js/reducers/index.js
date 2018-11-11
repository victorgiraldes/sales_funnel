import { combineReducers } from "redux"
import columns from "./columns"
import drag from "./drag"
import form from "./form"
import notification from "./notification"

export default combineReducers({ columns, drag, form, notification })
