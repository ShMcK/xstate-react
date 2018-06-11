import reactXState from "xstate-react"

import actions from "./actions"
import activities from "./activities"
import machine from "./machine"

export default reactXState({
  name: "trafficLight",
  machine,
  actions,
  activities,
  initialData: { count: 0 }
})
