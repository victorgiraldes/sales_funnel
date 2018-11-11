import React from "react"
import { connect } from "react-redux"
import AddCardButton from "../components/AddCardButton"
import Column from "../components/Column"
import {
  showForm,
  dragStart,
  dragEnd,
  dragEnter,
  dragLeave,
  drop
} from "../actions"

const Funnel = (props) => (
  <div>
    <AddCardButton onClick={props.onClickAdd} />

    <div className="flex margin-top-lg">
      {props.columns.map((column, index) =>
        <Column
          key={column.id}
          id={column.id}
          index={index}
          title={column.title}
          cards={column.cards}
          dropzone={column.dropzone}
          onDragStart={props.onDragStart}
          onDragEnd={props.onDragEnd}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          onDrop={props.onDrop}
        />
      )}
    </div>
  </div>
)

export default connect(
  state => ({ columns: state.columns, cards: state.cards }),
  dispatch => ({
    onClickAdd: () => dispatch(showForm()),
    onDragStart: (columnIndex, id, height) => dispatch(dragStart(columnIndex, id, height)),
    onDragEnd: (columnIndex, id) => dispatch(dragEnd(columnIndex, id)),
    onDragEnter: (index) => dispatch(dragEnter(index)),
    onDragLeave: (index) => dispatch(dragLeave(index)),
    onDrop: (index) => dispatch(drop(index))
  })
)(React.memo(Funnel))
