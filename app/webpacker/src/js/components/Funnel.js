import React from "react"
import { connect } from "react-redux"
import Column from "./Column"

const Funnel = (props) => (
  <div className="flex margin-top-lg">
    {props.columns.map((column, index) =>
      <Column
        key={column.id}
        id={column.id}
        index={index}
        title={column.title}
        cards={props.cards.filter(card => card.stage == column.id)}
      />
    )}
  </div>
)

export default connect(
  state => ({ columns: state.columns, cards: state.cards })
)(Funnel)
