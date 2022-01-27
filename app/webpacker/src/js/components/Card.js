import React from "react"
import Currency from "./Currency"
import companyIcon from "images/company.png"
import DetailCardButton from "./DetailCardButton"

const Card = (props) => {
  const onDragStart = (event) => {
    // Without this, some browsers don't trigger dragEnd
    event.dataTransfer.setData("id", props.id)
    props.onDragStart(props.columnIndex, props.id, event.target.clientHeight)
  }

  const onClickCard = () => {
    props.onClickCard(props)
  }

  return (
    <div
      id={`card-${props.id}`}
      className={`
        padding-md border-rounded bg-white margin-bottom-sm break-word
        box-shadow ${props.dragged && "opacity-6"}
      `}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={() => props.onDragEnd(props.columnIndex, props.id)}
    >
      <div className="margin-top-sm margin-bottom-sm text-tight">
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
        <Currency amount={props.amount} />
      </div>
      <div className="margin-top-md text-right text-smaller text-success">
        <DetailCardButton onClick={props.onClickCard} />
      </div>
    </div>
  )
}

export default React.memo(Card)
