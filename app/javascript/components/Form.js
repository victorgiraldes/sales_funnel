import React from "react"
import checkIcon from "images/check.png"
import cancelIcon from "images/cancel.png"

const Form = (props) => {
  let inputs = []

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(inputs[2].value)
    props.onSubmit(inputs[0].value, inputs[1].value, parseFloat(inputs[2].value) * 100)
  }

  let style = {
      padding: 8,
      borderRadius: 5,
      boxShadow: "0 0 2px rgba(0, 0, 0, 0.15)",
      backgroundColor: "white",
      color: "#777",
      marginBottom: 10
    }

  let buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer"
  }

  let imgStyle ={
    height: "1em",
    verticalAlign: "middle"
  }

  return (
    <form onSubmit={onSubmit} style={style}>
      <div style={{display: "flex", margin: "8px 0"}}>
        <input
          style={{minWidth: 0, width: "100%", flex: 1}}
          type="text"
          ref={input => inputs[0] = input}
          placeholder="Título do negócio"
          required
          tabIndex="1"
        />
        <button type="submit" tabIndex="4" style={buttonStyle}>
          <img src={checkIcon} style={imgStyle} />
        </button>
        <button onClick={props.onCancel} tabIndex="5" style={buttonStyle}>
          <img src={cancelIcon} style={imgStyle} />
        </button>
      </div>
      <input
        style={{width: "100%", fontSize: ".95em"}}
        type="text"
        ref={input => inputs[1] = input}
        placeholder="Nome do cliente"
        required
        tabIndex="2"
      />
      <input
        style={{width: "100%", textAlign: "right", fontSize: ".95em"}}
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

export default Form
