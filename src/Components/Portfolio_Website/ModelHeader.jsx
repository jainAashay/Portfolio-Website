import React from 'react'

function ModelHeader(props) {
  return (
    <div className="modal-header fs-5 fw-bold" id='loginHeader'>
            {props.data}
            <button type="button" className="btn-close" id='modalClose' data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  )
}

export default ModelHeader