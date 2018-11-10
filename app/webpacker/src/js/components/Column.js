import React from "react"
import ColumnHeader from "./ColumnHeader"
import Dropzone from "./Dropzone"
import Card from "./Card"

const Column = (props) => {
  const onDrop = event => {
    event.preventDefault()
    props.onDrop()
  }

  return (
    <div
      className="margin-right-sm flex-grow full-height min-width-200"
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDragOver={event => event.preventDefault()}
      onDrop={onDrop}
    >
      <ColumnHeader
        id={props.id}
        title={props.title}
        amount={props.cards.reduce((acc, card) => acc + card.amount)}
        count={props.cards.length}
      />

      <div className="margin-top-sm">
        {props.dropzone && <Dropzone height={props.dropzone} />

        {props.cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            columnId={card.stage}
            columnIndex={props.index}
            title={card.product}
            customerName={card.customer}
            amount={card.amount}
            dragged={card.dragged}
            onDragStart={props.onDragStart(props.index, card.id)}
            onDragEnd={props.onDragEnd}
          />
        )}
      </div>
    </div>
  )
}

export default Column
