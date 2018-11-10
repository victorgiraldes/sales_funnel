import React from "react"
import { connect } from "react-redux"
import companyIcon from "images/company.png"
import * from "../actions"

const Card = (props) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData("id", props.id)
    props.onDragStart(props.id, props.columnIndex, event.target.clientHeight)
  }

  return (
    <div
      className={`
        padding-md border-rounded bg-white margin-bottom-sm break-word box-shadow
        ${props.dragged && "opacity-6"}
      `}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={props.onDragEnd}
    >
      <div className="margin-top-sm margin-bottom-sm">
        {props.title}
      </div>
      <div>
        <img
          src={companyIcon}
          className="margin-right-sm height-100 vertical-align-middle opacity-6"
        />
        <span className="vertical-align-middle text-smaller">
          {props.customerName}
        </span>
      </div>
      <div className="margin-top-md text-right text-smaller text-success">
        {props.amount}
      </div>
    </div>
  )
}

export default connect(
  (state, ownProps) => ({ dragged: state.draggedCardId == ownProps.id }),
  dispatch => ({
    onDragStart: (id, col, height) => dispatch(dragStart(id, col, height)
    onDragEnd: () => dispatch(dragEnd())
  })
)(Card)
