import React from "react"
import Form from "./Form"
import Card from "./Card"
import Currency from "./Currency"

const pluralize = (value, singular, plural) => (
  value + " " + (value > 1 ? plural : singular)
)

const Column = (props) => {
  const onDrop = (event) => {
    event.preventDefault()

    let data = JSON.parse(event.dataTransfer.getData("cardData"))

    if (data.sourceColumnId != props.id) {
      props.onDrop(data.id, data.sourceColumnId, props.id)
    }
  }

  let totalAmount = props.cards.reduce((acc, card) => acc + card.amount, 0)

  return (
    <div style={{flex: "0 1 16.67%", marginRight: 5, minHeight: "100vh"}} onDrop={onDrop} onDragOver={event => event.preventDefault()}>
      <div style={{color: "white"}}>
        <div style={{backgroundColor: "#6177a8", padding: 8, fontSize: "1.2em", fontWeight: "bold", fontStyle: "italic"}}>
          <div>{props.title}</div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", backgroundColor: "#556892", padding: 8, fontWeight: "bold"}}>
          <div>
            <Currency amount={totalAmount} />
          </div>
          <div>
            {pluralize(props.cards.length, "negócio", "negócios")}
          </div>
        </div>
      </div>
      <div style={{marginTop: 5}}>
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

export default Column
