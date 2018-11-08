import React from "react"

const Currency = ({ amount }) => (
  (amount / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
)

export default Currency
