import "./config"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {RecoilRoot} from "recoil"
import {CurrentUserSubscription} from "./hooks/current-user"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <CurrentUserSubscription />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()