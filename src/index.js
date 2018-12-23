import App from './component/app'
import React from 'react'
import ReactDOM from 'react-dom'

const id = document.cookie.split("=")[1]

ReactDOM.render(<App userId={id}/>, document.querySelector("#root"))
