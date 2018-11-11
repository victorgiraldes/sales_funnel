import React from "react"

const Dropzone = ({ height }) => (
  <div
    className="border-rounded bg-darken-10 margin-bottom-sm"
    style={{ height: height }}
  >
  </div>
)

export default React.memo(Dropzone)

