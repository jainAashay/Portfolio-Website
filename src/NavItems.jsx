import React from 'react'
import ReactDOM from 'react-dom/client';
function NavItems(props) {
  return (
    <li className="nav-item px-1">
          <a className="nav-link active text-center" aria-current="page" href="#">{props.name}</a>
    </li>
  )
}

export default NavItems