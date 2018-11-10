import React from "react"
import checkIcon from "images/check.png"
import cancelIcon from "images/cancel.png"
import companyIcon from "images/company.png"

const Form = (props) => {
  let inputs = []

  const onSubmit = (event) => {
    event.preventDefault()
    props.onSubmit(inputs[0].value, inputs[1].value, parseAmount(inputs[2].value))
  }

  return (
    <form
      className="padding-md rounded-border box-shadow bg-white margin-bottom-sm"
      onSubmit={onSubmit}
    >
      <div className="flex margin-top-sm margin-bottom-md">
        <input
          className="flex-grow min-width-0"
          type="text"
          ref={input => inputs[0] = input}
          placeholder="Título do negócio"
          required
          tabIndex="1"
          autoFocus
        />
        <button type="submit" tabIndex="4">
          <img src={checkIcon} className="height-100 vertical-align-middle" />
        </button>
        <button onClick={props.onCancel} tabIndex="5">
          <img src={cancelIcon} className="height-100 vertical-align-middle" />
        </button>
      </div>
      <div className="flex">
        <img src={companyIcon} className="height-100 vertical-align-middle opacity-6 margin-right-sm" />
        <input
          className="text-smaller flex-grow vertical-align-middle"
          type="text"
          ref={input => inputs[1] = input}
          placeholder="Nome do cliente"
          required
          tabIndex="2"
        />
      </div>
      <input
        className="text-smaller text-right margin-top-md width-100"
        type="number"
        step="0.01"
        ref={input => inputs[2] = input}
        placeholder="R$ 0,00"
        required
        tabIndex="3"
      />
    </form>
  )
}

const parseAmount = amountStr => parseFloat(amountStr) * 100

export default Form
