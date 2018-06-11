import { Machine } from "xstate"

export default Machine({
  initial: "green",
  states: {
    green: {
      onEntry: ["triggerEntry"],
      on: {
        NEXT: "yellow"
      }
    },
    yellow: {
      onEntry: ["triggerEntry"],
      on: {
        NEXT: "red"
      }
    },
    red: {
      onEntry: ["triggerEntry"],
      on: {
        NEXT: "green"
      }
    }
  }
})
