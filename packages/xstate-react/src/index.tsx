import * as React from "react"
import { capitalize, objDiff } from "./utils"

// lib, returns Context.Provider, Context.
export default function reactXState<D>({
  name,
  machine,
  actions,
  store,
  activities
}) {
  name = name || "defaultName"

  type Props = {
    // state?: any
  }

  type State = {
    value: string | any
  }

  const Context = React.createContext(name)

  class Provider extends React.Component<Props, State> {
    // give an improved name for the React Devtools
    static displayName = `${capitalize(name)}Provider`

    actions: any
    activities: any
    actives: any
    transition: (event: string) => void

    constructor(props) {
      super(props)

      if (machine.parallel) {
        // handle parallel machine
        this.state = {
          // use props.state for setting initial <Provider state={state} /> in tests
          ...machine.initialStateValue,
          ...(props.state || {})
        }
        this.transition = this.parallelTransition
      } else {
        // handle non parallel machine
        this.state = {
          // @ts-ignore
          value: props.state || machine.initialStateValue
        }
        this.transition = this.basicTransition
      }

      const params = {
        transition: this.transition,
        send: this.send,
        store
      }

      this.actions = actions ? actions(params) : {}
      this.activities = activities ? activities(params) : {}

      // hold active activities
      this.actives = {}
    }

    componentDidMount() {
      // handle onEntry on start up
      for (const stateNode of machine.initialStateNodes) {
        // TODO: clean up this check if onEntry is an array or string
        const entryActions =
          typeof stateNode.config.onEntry === "string"
            ? [stateNode.config.onEntry]
            : stateNode.config.onEntry
        this.handleActions(entryActions)
      }
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
      const nextState = machine.transition(this.state, event)
      // actions
      this.handleActions(nextState.actions)

      // activities
      // this.handleActivities(nextState.activities)

      // set only the diff, necessary as setState is async and batches
      const next = objDiff(this.state, nextState.value)
      this.setState(next)
    }

    // transition between states
    basicTransition = event => {
      const nextState = machine.transition(this.state.value, event)
      // actions
      this.handleActions(nextState.actions)

      // activities
      // this.handleActivities(nextState.activities)

      // set next state
      this.setState({ value: nextState.value })
    }

    render() {
      const value: any = {
        send: this.send,
        transition: this.transition,
        state: machine.parallel ? this.state : this.state.value
      }
      return (
        <Context.Provider value={value}>{this.props.children}</Context.Provider>
      )
    }
  }

  return {
    Consumer: Context.Consumer,
    Provider
  }
}
