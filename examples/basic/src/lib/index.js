import React from "react"

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// lib, returns Context.Provider, Context.
export default function reactXState({ name, machine, actions, activities }) {
  name = name || "defaultName"

  const Context = React.createContext(name)

  class Provider extends React.Component {
    static displayName = `${capitalize(name)}Provider`

    constructor(props) {
      super(props)
      this.state = {
        data: {},
        value: machine.initialStateValue
      }

      const params = {
        transition: this.transition,
        dispatch: this.dispatch,
        update: this.update,
      }

      this.actions = actions ? actions(params) : {}
      this.activities = activities ? activities(params) : {}

      // hold active activities
      this.actives = {}
    }

    componentDidMount() {
      // handle onEntry on start up
      const initialConfig = machine.initialStateNodes[0].config
      if (initialConfig.onEntry) {
        for (const entryAction of initialConfig.onEntry) {
          this.dispatch(entryAction)
        }
      }
    }

    update = (data) => {
      this.setState({ data })
    }

    // onEntry, onExit, actions
    dispatch = (action, payload) => {
      const triggerableAction = this.actions[action]
      if (triggerableAction) {
        triggerableAction(payload)
      }
    }

    // transition between states
    transition = (event, payload) => {
      const nextState = machine.transition(this.state.value, event)

      // actions
      for (const action of nextState.actions) {
        this.dispatch(action, payload)
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
      const value = {
        dispatch: this.dispatch,
        transition: this.transition,
        state: this.state.value,
        data: this.state.data,
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
