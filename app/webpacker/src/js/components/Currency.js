import React from "react"

const Currency = ({ amount }) => (
  // If the locale was dynamic, we would have to receive it from the props
  // instead of using it hardcoded like it is now.
  (amount / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
)

export default React.memo(Currency)
