import reactXState from "../../lib"
import { Machine } from "xstate"

import actions from "./actions"

const trafficLightMachine = Machine({
  initial: "green",
  states: {
    green: {
      onEntry: ["triggerNext"],
      on: {
        NEXT: "yellow"
      }
    },
    yellow: {
      onEntry: ["triggerNext"],
      on: {
        NEXT: "red"
      }
    },
    red: {
      onEntry: ["triggerNext"],
      on: {
        NEXT: "green"
      }
    }
  }
})

export default reactXState({
  name: "trafficLight",
  machine: trafficLightMachine,
  actions
})
