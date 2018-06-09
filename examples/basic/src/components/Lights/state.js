import reactXState from "../../lib"
import { Machine } from "xstate"

import actions from "./actions"

const trafficLightMachine = Machine({
  initial: "green",
  states: {
    green: {
      on: {
        TURN_YELLOW: "yellow"
      }
    },
    yellow: {
      on: {
        TURN_RED: "red"
      }
    },
    red: {
      on: {
        TURN_GREEN: "green"
      }
    }
  }
})

export default reactXState({
  name: "trafficLight",
  machine: trafficLightMachine,
  actions
})
