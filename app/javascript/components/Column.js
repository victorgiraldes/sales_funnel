import React from "react"
import Form from "./Form"
import Card from "./Card"
import Currency from "./Currency"

const Column = (props) => {
  const onDrop = (event) => {
    event.preventDefault()

    let data = JSON.parse(event.dataTransfer.getData("cardData"))

    if (data.sourceColumnId != props.id)
      props.onDrop(data.id, data.sourceColumnId, props.id)
  }

  let totalAmount = props.cards.reduce((acc, card) => acc + card.amount, 0)
  let bgClass = props.id == "closed" ? "success" : props.id == "lost" ? "failure" : "default"

  return (
    <div className="margin-right-sm flex-item-grow full-height" onDrop={onDrop} onDragOver={preventDefault}>
      <div className={"bg-" + bgClass}>
        <div className="padding-md text-white text-bold text-italic text-larger">
          <div>{props.title}</div>
        </div>
        <div className="flex-container-space-between padding-md text-white text-bold bg-darken">
          <div className="text-italic">
            <Currency amount={totalAmount} />
          </div>
          <div>
            {pluralize(props.cards.length, "negócio", "negócios")}
          </div>
        </div>
      </div>

      <div className="margin-top-sm">
        {props.showForm &&
          <Form
            onSubmit={props.onSubmit}
            onCancel={props.onCancel}
          />
        }
        {props.cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            stage={card.stage}
            product={card.product}
            customer={card.customer}
            amount={card.amount}
          />
        )}
      </div>
    </div>
  )
}

const preventDefault = event => event.preventDefault()

const pluralize = (value, singular, plural) => (
  value + " " + (value > 1 ? plural : singular)
)

export default Column
