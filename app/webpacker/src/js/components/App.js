import React from "react"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import reducer from "../reducers"
import Funnel from "../containers/Funnel"

const App = (props) => {
  const store = createStore(
    reducer,
    props,
    applyMiddleware(thunkMiddleware)
  )

  return (
    <Provider store={store}>
      <Funnel columns={props.columns} />
    </Provider>
  )
}

export default App

