import React from "react"
import moneyIcon from "images/money.png"

const AddCardButton = ({ onClick }) => (
  <button
    className="bg-secondary text-white rounded-border padding-md box-shadow-inset"
    tabIndex="1"
    onClick={onClick}
  >
    <img
      src={moneyIcon}
      className="height-icon-md vertical-align-middle margin-right-md brightness-50"
    />
    <span
      className="vertical-align-middle"
      style={{ marginRight: 26 }}
    >
      Adicionar negócio
    </span>
  </button>
)

export default AddCardButton
