import * as React from "react"

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

type Params = {
  name: string
  machine: any
  actions: (params: any) => any
  activities: (params: any) => any
}

type Props = {}
type State = {
  data: any
  value: any
}

// lib, returns Context.Provider, Context.
export default function reactXState({
  name,
  machine,
  actions,
  activities
}: Params) {
  name = name || "defaultName"

  const Context = React.createContext(name)

  class Provider extends React.Component<Props, State> {
    static displayName = `${capitalize(name)}Provider`

    actions: any
    activities: any
    actives: any

    constructor(props) {
      super(props)
      this.state = {
        data: {},
        value: machine.initialStateValue
      }

      const params = {
        transition: this.transition,
        dispatch: this.dispatch,
        update: this.update
      }

      this.actions = actions ? actions(params) : {}
      this.activities = activities ? activities(params) : {}

      // hold active activities
      this.actives = {}
    }

    componentDidMount() {
      // handle onEntry on start up
      for (const stateNode of machine.initialStateNodes) {
        if (stateNode.config.onEntry) {
          for (const entryAction of stateNode.config.onEntry) {
            this.dispatch(entryAction)
          }
        }
      }
    }

    update = data => {
      this.setState({ data })
    }

    // onEntry, onExit, actions
    dispatch = action => {
      const triggerableAction = this.actions[action]
      if (triggerableAction) {
        triggerableAction()
      }
    }

    // transition between states
    transition = (event, payload) => {
      const nextState = machine.transition(this.state.value, event)

      // actions
      for (const action of nextState.actions) {
        this.dispatch(action)
      }

      // activities
      for (const activity of Object.keys(nextState.activities)) {
        const isActive = nextState.activities[activity]
        if (isActive) {
          // cancellable activities
          // Promise.race(this.activities[activity](), wait(10 * 1000))
        } else if (this.actives[activity]) {
          // end activity
        }
      }

      // set next state
      this.setState({ value: nextState.value })
    }

    render() {
      const value: any = {
        dispatch: this.dispatch,
        transition: this.transition,
        state: this.state.value,
        data: this.state.data
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
