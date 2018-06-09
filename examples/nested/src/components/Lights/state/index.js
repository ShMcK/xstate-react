import reactXState from "../../../lib"

import actions from "./actions"
import activities from "./activities"
import machine from "./machine"

export default reactXState({
  name: "trafficLight",
  machine,
  actions,
  activities
})
