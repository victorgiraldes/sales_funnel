import React from "react"
import Currency from "./Currency"

const Card = ({ id, stage, product, customer, amount }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "cardData",
      JSON.stringify({ id: id, sourceColumnId: stage })
    ) 
  }

  let style = {
    padding: 8,
    borderRadius: 5,
    boxShadow: "0 0 2px rgba(0, 0, 0, 0.15)",
    backgroundColor: "white",
    marginBottom: 5,
    cursor: "grab"
  }

  return (
    <div draggable="true" onDragStart={onDragStart} style={style}>
      <div style={{padding: "5px 0"}}>
        {product}
      </div>
      <div style={{fontSize: ".95em"}}>
        {customer}
      </div>
      <div style={{textAlign: "right", color: "#66cc34", fontSize: ".95em"}}>
        <Currency amount={amount} />
      </div>
    </div>
  )
}

export default Card
