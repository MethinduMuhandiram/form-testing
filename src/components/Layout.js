import React from "react"
import Navbar from "./Navbar"
import "../styles/global.css"

function Layout(props) {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{props.children}</div>
      <footer>
        <p>copyright 2022 web warrior</p>
      </footer>
    </div>
  )
}

export default Layout
