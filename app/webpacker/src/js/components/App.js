import React from "react"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { createLogger } from "redux-logger"
import reducer from "../reducers"
import Funnel from "../containers/Funnel"

const App = (props) => {
  const logger = createLogger({ duration: true, diff: true })
  const store = createStore(
    reducer,
    props
  )

  return (
    <Provider store={store}>
      <Funnel columns={props.columns} cards={props.cards} />
    </Provider>
  )
}

export default App

