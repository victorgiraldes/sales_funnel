import React from "react"

const Modal = (props) => {

  return (
    <div className="absolute top-0 left-0 width-100 margin-top-lg text-center">
      <div
        className={`max-width-300`}>
          <span>
            {props.product}
          </span>
          <span>
            {props.customer}
          </span>
          <span>
            {props.amount}
          </span>
        </div>
    </div>
  )

}

export default React.memo(Modal)
