import React from "react"
import Currency from "./Currency"
import companyIcon from "images/company.png"

const Card = ({ id, stage, product, customer, amount }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "cardData",
      JSON.stringify({
        id: id,
        sourceColumnId: stage,
        height: event.target.clientHeight
      })
    )
  }

  return (
    <div
      className="padding-md rounded-border bg-white margin-bottom-sm break-word box-shadow"
      draggable="true"
      onDragStart={onDragStart}
    >
      <div className="margin-top-sm margin-bottom-sm">
        {product}
      </div>
      <div>
        <img src={companyIcon} className="margin-right-sm height-icon-sm vertical-align-middle opacity-6" />
        <span className="vertical-align-middle text-smaller">{customer}</span>
      </div>
      <div className="margin-top-md text-right text-smaller text-success">
        <Currency amount={amount} />
      </div>
    </div>
  )
}

export default Card
