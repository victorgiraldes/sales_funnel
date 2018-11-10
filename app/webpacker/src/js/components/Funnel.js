import React from "react"
import { connect } from "react-redux"
import Column from "./Column"
import * as Actions from "../actions/index"

const Funnel = (props) => (
  <div className="flex margin-top-lg">
    {props.columns.map((column, index) =>
      <Column
        key={column.id}
        id={column.id}
        index={index}
        title={column.title}
        cards={props.cards.filter(card => card.stage == column.id)},
        dropzone={props.dropzone}
        onDragStart={props.onDragStart},
        onDragEnd={props.onDragEnd}
        onDragEnter={props.onDragEnter(index)}
        onDragLeave={props.onDragLeave(index)}
        onDrop={props.onDrop(column.id, index)}
      />
    )}
  </div>
)

export default connect(
  state => ({ columns: state.columns, cards: state.cards }),
  dispatch => ({
    onDragStart: (columnIndex, id) =>
      (height) => dispatch(Actions.dragStart(columnIndex, id, height)),
    onDragEnd: () => dispatch(Actions.dragEnd()),
    onDragEnter: (index) => () => dispatch(Actions.dragEnter(index)),
    onDragLeave: (index) => () => dispatch(Actions.dragLeave(index)),
    onDrop: (id, index) => () => dispatch(Actions.drop(id, index))
  })
)(Funnel)
