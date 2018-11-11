import React from "react"
import Currency from "./Currency"

const ColumnHeader = ({ id, title, amount, count }) => {
  const bg = { closed: "bg-success", lost: "bg-failure" }

  return (
    <div className={bg[id] || "bg-default"}>
      <div className=
        "padding-md text-white text-bold text-italic text-larger"
      >
        <div>{title}</div>
      </div>
      <div className=
        "flex space-between padding-md text-white text-bold bg-darken-15"
      >
        <div className="text-italic">
          <Currency amount={amount} />
        </div>
        <div>
          {pluralize(count, "negócio", "negócios")}
        </div>
      </div>
    </div>
  )
}

const pluralize = (number, singular, plural) =>
  number + " " + (number > 1 ? plural : singular)

export default React.memo(ColumnHeader)
