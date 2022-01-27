import React from "react"
import { connect } from "react-redux"
import AddCardButton from "../components/AddCardButton"
import Column from "../components/Column"
import Toast from "../components/Toast"
import Sale from "./containers"
import {
  showForm, hideForm, updateForm, submitForm,
  dragStart, dragEnd, dragEnter, dragLeave, dropStart, drop,
  dismissNotification
} from "../actions"

const Funnel = (props) => (
  <div>
    {props.notification &&
      <Toast
        text={props.notification}
        onDismiss={props.onDismissNotification}
      />
    }

    {props.onClickCard &&
      <Sale
        props={props}
      />
    }

    <AddCardButton onClick={props.onClickAdd} />

    <div className="flex margin-top-lg">
      {props.columns.map((column, index) =>
        <Column
          key={column.id}
          id={column.id}
          index={index}
          title={column.title}
          cards={column.cards}
          dropzone={column.dropzone}
          showForm={props.showForm && index == 0}
          disableForm={props.disableForm}
          onInputChange={props.onInputChange}
          onFormSubmit={props.onFormSubmit}
          onCancelAdd={props.onCancelAdd}
          onDragStart={props.onDragStart}
          onDragEnd={props.onDragEnd}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
          onDrop={props.onDrop}
          onClickCard={props.onClickCard}
        />
      )}
    </div>
  </div>
)

const mapStateToProps = ({ columns, drag, form, notification }) => (
  {
    columns: columns.map((column, index) => {
      if (index == drag.from)
        return (
          { ...column,
            cards: column.cards.map(card =>
              card.id == drag.id
              ? { ...card, dragged: true }
              : card
            )
          }
        )
      else if (index == drag.to && drag.status == "valid" && !column.dropzone)
        return ({ ...column, dropzone: drag.height })
      else
        return column
    }),
    showForm: form.show,
    disableForm: form.waiting,
    notification: notification
  }
)

const mapDispatchToProps = dispatch => (
  {
    onClickAdd: () => dispatch(showForm()),
    onCancelAdd: () => dispatch(hideForm()),
    onInputChange: (name, value) => dispatch(updateForm(name, value)),
    onFormSubmit: () => dispatch(submitForm()),
    onDragStart: (columnIndex, id, height) => {
      dispatch(dragStart(columnIndex, id, height))
    },
    onDragEnd: (columnIndex, id) => dispatch(dragEnd(columnIndex, id)),
    onDragEnter: (index) => dispatch(dragEnter(index)),
    onDragLeave: (index) => dispatch(dragLeave(index)),
    onDrop: (index) => {
      dispatch(dropStart(index))
      dispatch(drop())
    },
    onDismissNotification: () => dispatch(dismissNotification())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Funnel))
