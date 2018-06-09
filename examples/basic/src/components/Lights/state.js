import reactXState from "../../lib"
import { Machine } from "xstate"

import actions from "./actions"

const trafficLightMachine = Machine({
  initial: "green",
  states: {
    green: {
      onEntry: ["triggerEntry"],
      onExit: ["triggerExit"],
      on: {
        NEXT: "yellow"
      }
    },
    yellow: {
      onEntry: ["triggerEntry"],
      onExit: ["triggerExit"],
      on: {
        NEXT: "red"
      }
    },
    red: {
      onEntry: ["triggerEntry"],
      onExit: ["triggerExit"],
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
