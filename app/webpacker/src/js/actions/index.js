export const dragStart = (id, idx, height) => (
  { type: "DRAG_START", id: id, columnIndex: idx, height: height }
)

export const dragEnd = () => ({ type: "DRAG_END" })

export const dragEnter = (index) => ({ type: "DRAG_ENTER", index: index })

export const dragLeave = (index) => ({ type: "DRAG_LEAVE", index: index })

export const drop = (id, index) => ({ type: "DROP", id: id, index: index })
