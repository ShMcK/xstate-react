import reactXState from "xstate-react"

import actions from "./actions"
import machine from "./machine"

export default reactXState({
  name: "trafficLight",
  machine,
  actions
})
