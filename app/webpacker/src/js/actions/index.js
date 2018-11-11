export const SHOW_FORM = "SHOW_FORM"
export const DRAG_START = "DRAG_START"
export const DRAG_END = "DRAG_END"
export const DRAG_ENTER = "DRAG_ENTER"
export const DRAG_LEAVE = "DRAG_LEAVE"
export const DRAG_FINISH = "DRAG_FINISH"

export const showForm = () => ({ type: SHOW_FORM })

export const dragStart = (columnIndex, cardId, cardHeight) => (
  { type: DRAG_START, id: cardId, columnIndex: columnIndex, height: cardHeight }
)
export const dragEnd = (columnIndex, cardId) => (
  { type: DRAG_END, id: cardId, columnIndex: columnIndex }
)
export const dragEnter = (index) => ({ type: DRAG_ENTER, index: index })
export const dragLeave = (index) => ({ type: DRAG_LEAVE, index: index })
export const dragFinish = (index) => ({ type: DRAG_FINISH, index: index })

export const drop = (index) => ({ type: DRAG_FINISH, index: index })

/**
export const drop = (id, index) => (
  (dispatch, getState) => {
    dispatch({ type: "DROP", index: index }) // reducer will hide dropzone

    let state = getState()

    if (index == state.drag.columnIndex)
      return

    if (!isAllowedToMove(state.drag.columnIndex, index))
      dispatch(invalidDrop())
    else {
      dispatch(updateCard(state.drag.id, id))
    }
  }
)

export const createCard = (title, customerName, amount) => (
  (dispatch) => {
    fetch("/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": readCsrfToken()
      },
      body: JSON.stringify({
        sale: {
          product: title,
          customer: customerName,
          amount: amount
        }
      })
    })
    .then(
      response => {
        if (response.ok)
          response.json().then(json => dispatch(receiveCreate(json)))
        else
          dispatch(requestError())
      },
      error => dispatch(requestError())
    )
  }
)

export const updateCard = (cardId, targetColumnId) => (
  (dispatch) => {
    fetch(`/sales/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": readCsrfToken()
      },
      body: JSON.stringify({ sale: { stage: targetColumnId } })
    })
    .then(
      response => response.json(),
      error => dispatch(requestError())
    )
    .then(json => dispatch(receiveUpdate(json, targetColumnId)))
  }
)

export const receiveCreate = (card) => ({ type: "RECEIVE_CREATE" })
export const receiveUpdate = (card) => ({ type: "RECEIVE_UPDATE" })
export const requestError = () => ({ type: "REQUEST_ERROR" })

const readCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]').content
**/
