import { Machine } from "xstate"

export default Machine({
  parallel: true,
  states: {
    light: {
      initial: "green",
      states: {
        green: {
          onEntry: ["lightTimer"],
          on: {
            NEXT: "yellow"
          }
        },
        yellow: {
          onEntry: ["lightTimer"],
          on: {
            NEXT: "red"
          }
        },
        red: {
          onEntry: ["lightTimer"],
          on: {
            NEXT: "green"
          }
        }
      }
    },
    time: {
      initial: "morning",
      states: {
        morning: {
          onEntry: ["clockTimer"],
          on: {
            TICK: "evening"
          }
        },
        afternoon: {
          onEntry: ["clockTimer"],
          on: {
            TICK: "night"
          }
        },
        evening: {
          onEntry: ["clockTimer"],
          on: {
            TICK: "night"
          }
        },
        night: {
          onEntry: ["clockTimer"],
          on: {
            TICK: "morning"
          }
        }
      }
    }
  }
})
