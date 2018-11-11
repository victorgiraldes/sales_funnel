import React from "react"
import moneyIcon from "images/money.png"

const AddCardButton = ({ onClick }) => (
  <button
    className=
      "bg-secondary text-white border-rounded padding-md box-shadow-inset"
    tabIndex="1"
    onClick={onClick}
  >
    <img
      src={moneyIcon}
      className="height-130 vertical-align-middle margin-right-md brightness-50"
    />
    <span className="vertical-align-middle margin-right-xl">
      Adicionar negócio
    </span>
  </button>
)

export default React.memo(AddCardButton)
