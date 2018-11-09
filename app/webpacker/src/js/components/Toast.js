import React from "react"

const Toast = ({ text, onDismiss }) => (
  <div className="absolute top-0 left-0 width-100 margin-top-lg text-center">
    <div
      className={`
        inline-block bg-darken-40 text-white box-shadow border-pill padding-md
        padding-x-lg fade-in-out
      `}
      onAnimationEnd={onDismiss}
    >{text}</div>
  </div>
)

export default Toast
