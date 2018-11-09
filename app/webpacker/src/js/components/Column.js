import React from "react"
import Form from "./Form"
import Card from "./Card"
import Currency from "./Currency"
import Dropzone from "./Dropzone"

class Column extends React.Component {
  constructor(props) {
    super(props)

    this.state = { dragEnterCount: 0 }

    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)

    this.totalAmount = this.totalAmount.bind(this)
    this.bgClass = this.bgClass.bind(this)        
    this.isUnderDraggedCard = this.isUnderDraggedCard.bind(this)
  }

  onDragEnter(event) {
    let data = JSON.parse(event.dataTransfer.getData("cardData"))

    if (this.props.id != data.sourceColumnId) {
      this.setState(({ dragEnterCount }) => ({
        dragEnterCount: dragEnterCount + 1,
        dropzoneHeight: data.height
      }))
    }
  }

  onDragLeave() {
    this.setState(({ dragEnterCount }) => ({
      dragEnterCount: dragEnterCount > 0 ? dragEnterCount - 1 : 0
    }))
  }

  onDragOver(event) {
    event.preventDefault()
  }

  onDrop(event) {
    event.preventDefault()
    let data = JSON.parse(event.dataTransfer.getData("cardData"))

    this.setState({ dragEnterCount: 0 })

    if (data.sourceColumnId != this.props.id) {
      this.props.onDrop(data.id, data.sourceColumnId, this.props.id)
    }
  }

  isUnderDraggedCard() {
    return this.state.dragEnterCount > 0
  }

  totalAmount() {
    return this.props.cards.reduce((acc, card) => acc + card.amount, 0)
  }

  bgClass() {
    switch (this.props.id) {
      case "closed":
        return "bg-success"
      case "lost":
        return "bg-failure"
      default:
        return "bg-default"
    }
  }

  render() {
    return (
      <div
        className="margin-right-sm flex-grow full-height min-width-200"
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        <div className={this.bgClass()}>
          <div className="padding-md text-white text-bold text-italic text-larger">
            <div>{this.props.title}</div>
          </div>
          <div className="flex space-between padding-md text-white text-bold bg-darken-15">
            <div className="text-italic">
              <Currency amount={this.totalAmount()} />
            </div>
            <div>
              {pluralize(this.props.cards.length, "negócio", "negócios")}
            </div>
          </div>
        </div>

        <div className="margin-top-sm">
          {this.props.showForm &&
            <Form
              onSubmit={this.props.onSubmit}
              onCancel={this.props.onCancel}
            />
          }
          {this.isUnderDraggedCard() &&
            <Dropzone height={this.state.dropzoneHeight} />
          }
          {this.props.cards.map(card =>
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
}

const pluralize = (value, singular, plural) => (
  value + " " + (value > 1 ? plural : singular)
)

export default Column
