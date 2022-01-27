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
export const DROP_START = "DROP_START"

export const INVALID_DROP = "INVALID_DROP"
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION"

export const HIDE_MODAL = "HIDE_MODAL"
export const SHOW_MODAL = "SHOW_MODAL"
export const INVOKE_MODAL = "INVOKE_MODAL"


// Dispatched when the user clicks the button to add a new card.
export const showForm = () => ({ type: SHOW_FORM })
// Dispatched when the user cancels the creation of a card.
export const hideForm = () => ({ type: HIDE_FORM })
// Dispatched when the user types on the form.
export const updateForm = (name, value) => (
  { type: UPDATE_FORM, name: name, value: value }
)

// Dispatched when the user submits the form; since we're using HTML5
// validations, this only happens when the form is valid.
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

// Dispatched when the request to add a new card starts.
export const addRequestStarted = () => ({ type: ADD_REQUEST_STARTED })
// Dispatched when the request to add a new card finishes, either with error or
// success.
export const addRequestFinished = () => ({ type: ADD_REQUEST_FINISHED })
// Dispatched when the request to add a new card fails.
export const addRequestError = () => ({ type: ADD_REQUEST_ERROR })
// Dispatched when the request to add a new card is successful.
export const receiveNewCard = (card) => ({ type: RECEIVE_NEW_CARD, card: card })

// Dispatched when the user starts dragging a card.
export const dragStart = (columnIndex, cardId, cardHeight) => (
  { type: DRAG_START, id: cardId, columnIndex: columnIndex, height: cardHeight }
)
// Dispatched when the user stops dragging a card; not necessarily a drop,
// because a drop happens on a column, and this could happen anywhere.
export const dragEnd = (columnIndex, cardId) => (
  { type: DRAG_END, id: cardId, columnIndex: columnIndex }
)
// Dispatched when a user is dragging a card and enters a column.
export const dragEnter = (index) => ({ type: DRAG_ENTER, index: index })
// Dispatched when a user is dragging a card and leaves a column.
export const dragLeave = (index) => ({ type: DRAG_LEAVE, index: index })
// Dispatched when a user drops a card on a column; this is actually a
// workaround for browsers that fail to register dragenter events.
export const dropStart = (index) => ({ type: DROP_START, index: index })
// Dispatched within the drop action, before the request starts.
export const dragFinish = () => ({ type: DRAG_FINISH })

// Dispatched when the user drops a card in a column.
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

// Dispatched when a user drops a card on an invalid column.
export const invalidDrop = () => ({ type: INVALID_DROP })
// Dispatched when a card should be moved from one column to another; it's
// dispatched inside the drop action.
export const moveCard = (id, from, to) => (
  { type: MOVE_CARD, id: id, from: from, to: to }
)

// Dispatched when the request to move a card fails.
export const moveRequestError = () => ({ type: MOVE_REQUEST_ERROR })

// Dispatched when the notification is dismissed; there's no button to dismiss
// it, so this happens automatically when the animation ends.
export const dismissNotification = () => ({ type: DISMISS_NOTIFICATION })

// Required by rails controllers to avoid Cross Site Request Forgery (CSRF)
const readCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]').content

// Dispatched when user click on a card.
export const invokeModal = () => (
  (dispatch, getState) => {
    const state = getState()

    const cardId = state.drag.id

    fetch(`/sales/${cardId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": readCsrfToken()
      }
    })
    .then(
      response => {
        if (!response.ok) {
          response.json().then(json => {
            dispatch(showModal(json))
          })
        }
      },
      error => {
        dispatch(moveRequestError())
      }
    )
  }
)

// Dispatched when the request returns a sale
export const showModal = (json) => ({ type: SHOW_MODAL })

// Dispatched user click on close button from modal
export const hideModal = () => ({ type: HIDE_MODAL })
