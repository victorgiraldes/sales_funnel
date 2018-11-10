import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import dragdrop from "../reducers/dragdrop"
import Funnel from "./Funnel"

const App = (props) => {
  const store = createStore(dragdrop, props)

  return (
    <Provider store={store}>
      <Funnel columns={props.columns} cards={props.cards} />
    </Provider>
  )
}

export default App

