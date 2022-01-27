import React from "react"

const DetailCardButton = ({ onClick }) => (
  <button
    className=
      "bg-secondary text-white border-rounded padding-md box-shadow-inset"
    tabIndex="1"
    onClick={onClick}
  >
    <span className="vertical-align-middle margin-right-xl">
      detalhar
    </span>
  </button>
)

export default React.memo(DetailCardButton)
