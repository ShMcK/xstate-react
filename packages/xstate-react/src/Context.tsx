import * as React from "react"
import { capitalize, objDiff } from "./utils"

type Props = {
  // state?: any
}

type State = {
  value: string | any
}

export default ({ name, machine, actions }) => {
  const Context = React.createContext(name)

  /**
   * Provider
   */
  class Provider extends React.Component<Props, State> {
    // give an improved name for the React Devtools
    static displayName = `${capitalize(name)}Provider`

    actions: any
    activities: any
    actives: any
    machine: any
    transition: (event: string) => void

    constructor(props) {
      super(props)

      this.machine = machine

      if (this.machine.parallel) {
        // handle parallel machine
        this.state = {
          // use props.state for setting initial <Provider state={state} /> in tests
          ...this.machine.initialStateValue,
          ...(props.state || {})
        }
        this.transition = this.parallelTransition
      } else {
        // handle non parallel machine
        this.state = {
          // @ts-ignore
          value: props.state || this.machine.initialStateValue
        }
        this.actions = []
        this.transition = this.basicTransition
      }

      const params = {
        transition: this.transition,
        send: this.send
        // store
      }

      this.actions = actions ? actions(params) : {}

      // this.activities = activities ? activities(params) : {}

      // hold active activities
      // this.actives = {}
    }

    componentDidMount() {
      // handle onEntry on start up
      // for (const stateNode of machine.initialStateNodes) {
      // 	// TODO: clean up this check if onEntry is an array or string
      // 	const entryActions =
      // 		typeof stateNode.config.onEntry === 'string'
      // 			? [stateNode.config.onEntry]
      // 			: stateNode.config.onEntry
      // 	this.handleActions(entryActions)
      // }
    }

    handleActions = (actionList: string | string[]) => {
      if (actionList) {
        if (Array.isArray(actionList)) {
          // actionList: array
          for (const action of actionList) {
            this.send(action)
          }
        } else {
          // actionList: string
          this.send(actionList)
        }
      }
    }

    handleActivities = activityList => {
      // for (const activity of Object.keys(activityList)) {
      // 	const isActive = activityList[activity]
      // 	if (isActive) {
      // 		// cancellable activities
      // 		// Promise.race(this.activities[activity](), wait(10 * 1000))
      // 	} else if (this.actives[activity]) {
      // 		// end activity
      // 	}
      // }
    }

    // onEntry, onExit, actions
    send = action => {
      const triggerableAction = this.actions[action]
      if (triggerableAction) {
        triggerableAction()
      }
    }

    parallelTransition = event => {
      const nextState = this.machine.transition(this.state, event)
      // actions
      this.handleActions(nextState.actions)

      // activities
      // this.handleActivities(nextState.activities)

      // set only the diff, necessary as setState is async and batches
      this.actions = nextState.actions
      const next = objDiff(this.state, nextState.value)
      this.setState(next)
    }

    // transition between states
    basicTransition = event => {
      const nextState = this.machine.transition(this.state.value, event)
      // actions
      this.handleActions(nextState.actions)

      // activities
      // this.handleActivities(nextState.activities)

      // set next state
      this.actions = nextState.actions
      this.setState({ value: nextState.value })
    }

    render() {
      const state = this.machine.parallel ? this.state : this.state.value
      const value: any = {
        // send: this.send,
        transition: this.transition,
        state,
        actions: this.actions
      }
      return (
        <Context.Provider value={value}>{this.props.children}</Context.Provider>
      )
    }
  }

  return {
    Provider,
    Consumer: Context.Consumer
  }
}
