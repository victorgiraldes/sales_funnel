import React from "react"
import Currency from "./Currency"
import companyIcon from "images/company.png"

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = { dragged: false }

    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragStart(event) {
    event.dataTransfer.setData(
      "cardData",
      JSON.stringify({
        id: this.props.id,
        sourceColumnId: this.props.stage,
        height: event.target.clientHeight
      })
    )

    this.setState({ dragged: true })
  }

  onDragEnd(event) {
    this.setState({ dragged: false })
  }

  render() {
    return (
      <div
        className={`
          padding-md border-rounded bg-white margin-bottom-sm break-word 
          box-shadow ${this.state.dragged && "opacity-6"}
        `}
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <div className="margin-top-sm margin-bottom-sm">
          {this.props.product}
        </div>
        <div>
          <img
            src={companyIcon}
            className={`
              margin-right-sm height-100 vertical-align-middle opacity-6
            `}
          />
          <span className="vertical-align-middle text-smaller">
            {this.props.customer}
          </span>
        </div>
        <div className="margin-top-md text-right text-smaller text-success">
          <Currency amount={this.props.amount} />
        </div>
      </div>
    )
  }
}

export default Card
