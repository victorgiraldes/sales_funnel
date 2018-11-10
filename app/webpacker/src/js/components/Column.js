import React from "react"
import { connect } from "react-redux"
import Card from "./Card"
import * from "../actions"

const Column = (props) => {
  const onDrop = event => {
    event.preventDefault()
    props.onDrop(props.id, props.index)
  }

  const bg = { closed: "bg-success", lost: "bg-failure" }

  return (
    <div
      className="margin-right-sm flex-grow full-height min-width-200"
      onDragEnter={() => props.onDragEnter(props.index)}
      onDragLeave={() => props.onDragLeave(props.index)}
      onDragOver={event => event.preventDefault()}
      onDrop={onDrop}
    >
      <div className={bg[props.id] || "bg-default"}>
        <div className="padding-md text-white text-bold text-italic text-larger">
          <div>{props.title}</div>
        </div>
        <div className="flex space-between padding-md text-white text-bold bg-darken-15">
          <div className="text-italic">
            {props.cards.reduce((acc, card) => acc + card.amount, 0)}
          </div>
          <div>
            {props.cards.length} negócios
          </div>
        </div>
      </div>

      <div className="margin-top-sm">
        {props.dropzone &&
          <div
            className="border-rounded bg-darken-10 margin-bottom-sm"
            style={{ height: props.dropzone }}
          >
          </div>
        }

        {props.cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            columnId={card.stage}
            columnIndex={props.index}
            title={card.product}
            customerName={card.customer}
            amount={card.amount}
          />
        )}
      </div>
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    dropzone:
      state.columns[ownProps.index].dragEnterCount > 0
      && ownProps.index > state.draggedCardColumnIndex
      && state.draggedCardHeight
  }),
  dispatch => ({
    onDragEnter: (index) => dispatch(dragEnter(index)),
    onDragLeave: (index) => dispatch(dragLeave(index)),
    onDrop:      (id, index) => dispatch(drop(id, index))
  })
)(Column)
