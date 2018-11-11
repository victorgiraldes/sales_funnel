export const SHOW_FORM = "SHOW_FORM"
export const HIDE_FORM = "HIDE_FORM"
export const UPDATE_FORM = "UPDATE_FORM"

export const RECEIVE_NEW_CARD = "RECEIVE_NEW_CARD"
export const MOVE_CARD = "MOVE_CARD"
export const ADD_REQUEST_STARTED = "ADD_REQUEST_STARTED"
export const ADD_REQUEST_FINISHED = "ADD_REQUEST_FINISHED"
export const ADD_REQUEST_ERROR = "ADD_REQUEST_ERROR"
export const MOVE_REQUEST_ERROR = "MOVE_REQUEST_ERROR"

export const DRAG_START = "DRAG_START"
export const DRAG_END = "DRAG_END"
export const DRAG_ENTER = "DRAG_ENTER"
export const DRAG_LEAVE = "DRAG_LEAVE"
export const DRAG_FINISH = "DRAG_FINISH"

export const INVALID_DROP = "INVALID_DROP"
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION"

export const showForm = () => ({ type: SHOW_FORM })
export const hideForm = () => ({ type: HIDE_FORM })
export const updateForm = (name, value) => (
  { type: UPDATE_FORM, name: name, value: value }
)

export const submitForm = () => (
  (dispatch, getState) => {
    const { title, customer, amount } = getState().form

    dispatch(addRequestStarted())

    fetch("/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": readCsrfToken()
      },
      body: JSON.stringify({
        sale: {
          product: title,
          customer: customer,
          amount: amount
        }
      })
    })
    .then(
      response => {
        dispatch(addRequestFinished())

        if (response.ok)
          response.json().then(json => {
            dispatch(hideForm())
            dispatch(receiveNewCard(json))
          })
        else
          dispatch(addRequestError())
      },
      error => {
        dispatch(addRequestFinished())
        dispatch(addRequestError())
      }
    )
  }
)

export const receiveNewCard = (card) => ({ type: RECEIVE_NEW_CARD, card: card })

export const addRequestStarted = () => ({ type: ADD_REQUEST_STARTED })
export const addRequestFinished = () => ({ type: ADD_REQUEST_FINISHED })
export const addRequestError = () => ({ type: ADD_REQUEST_ERROR })

export const dragStart = (columnIndex, cardId, cardHeight) => (
  { type: DRAG_START, id: cardId, columnIndex: columnIndex, height: cardHeight }
)
export const dragEnd = (columnIndex, cardId) => (
  { type: DRAG_END, id: cardId, columnIndex: columnIndex }
)
export const dragEnter = (index) => ({ type: DRAG_ENTER, index: index })
export const dragLeave = (index) => ({ type: DRAG_LEAVE, index: index })
export const dragFinish = () => ({ type: DRAG_FINISH })

export const drop = () => (
  (dispatch, getState) => {
    const state = getState()

    switch (state.drag.status) {
      case "invalid":
        dispatch(invalidDrop())
        break;

      case "valid":
        const cardId = state.drag.id
        const sourceIndex = state.drag.from
        const targetIndex = state.drag.to
        const targetId = state.columns[targetIndex].id

        // Optimistic move: we move the card right on the drop, before making
        // the request, and if it fails, we move it back.
        dispatch(moveCard(cardId, sourceIndex, targetIndex))

        fetch(`/sales/${cardId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Csrf-Token": readCsrfToken()
          },
          body: JSON.stringify({ sale: { stage: targetId } })
        })
        .then(
          response => {
            if (!response.ok) {
              dispatch(moveRequestError())
              dispatch(moveCard(cardId, targetIndex, sourceIndex))
            }
          },
          error => {
            dispatch(moveRequestError())
            dispatch(moveCard(cardId, targetIndex, sourceIndex))
          }
        )

      default:
         dispatch(dragFinish())
    }
  }
)

export const invalidDrop = () => ({ type: INVALID_DROP })
export const moveCard = (id, from, to) => (
  { type: MOVE_CARD, id: id, from: from, to: to }
)

export const moveRequestError = () => ({ type: MOVE_REQUEST_ERROR })

export const dismissNotification = () => ({ type: DISMISS_NOTIFICATION })

const readCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]').content
