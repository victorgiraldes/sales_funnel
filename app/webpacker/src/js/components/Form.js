import React from "react"
import checkIcon from "images/check.png"
import cancelIcon from "images/cancel.png"
import companyIcon from "images/company.png"

const Form = (props) => {
  const onChange = (event) => {
    let input = event.target
    props.onChange(input.name, input.value)
  }

  const onChangeAmount = (event) => {
    let amount = parseFloat(event.target.value) * 100
    props.onChange("amount", amount)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onSubmit()
  }

  return (
    <form
      className=
        {`padding-md border-rounded box-shadow bg-white margin-bottom-sm
        ${props.disabled && "opacity-6"}`}
      onSubmit={onSubmit}
    >
      <fieldset className="min-width-0" disabled={props.disabled}>
        <div className="flex margin-top-sm margin-bottom-md">
          <input
            name="title"
            className="flex-grow min-width-0"
            type="text"
            placeholder="Título do negócio"
            required
            tabIndex="1"
            autoFocus
            autoComplete="off"
            onChange={onChange}
          />
          <button type="submit" tabIndex="4">
            <img src={checkIcon} className="height-100 vertical-align-middle" />
          </button>
          <button type="reset" onClick={props.onCancel} tabIndex="5">
            <img src={cancelIcon} className="height-100 vertical-align-middle" />
          </button>
        </div>
        <div className="flex">
          <img
            src={companyIcon}
            className=
              "height-100 vertical-align-middle opacity-6 margin-right-sm"
          />
          <input
            name="customer"
            className="text-smaller flex-grow vertical-align-middle"
            type="text"
            placeholder="Nome do cliente"
            required
            tabIndex="2"
            autoComplete="off"
            onChange={onChange}
          />
        </div>
        <input
          name="amount"
          className="text-smaller text-right margin-top-md width-100"
          type="number"
          step="0.01"
          min="0"
          max={MAX_AMOUNT}
          placeholder="R$ 0,00"
          required
          tabIndex="3"
          autoComplete="off"
          onChange={onChangeAmount}
        />
      </fieldset>
    </form>
  )
}

// Backend amount is a 4-byte signed integer
const MAX_AMOUNT = (Math.pow(2, 31) - 1) / 100

export default React.memo(Form)
