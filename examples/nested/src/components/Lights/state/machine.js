import { Machine } from "xstate"

export default Machine({
  initial: "normal",
  states: {
    normal: {
      initial: 'green',
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
          actions: ["triggerAction"],
          activities: ["triggerActivity"],
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
        },
      },
      on: {
        ERROR: 'error'
      }
    },
    error: {
      on: {
        REPAIR: 'normal'
      }
    }
  }
})
