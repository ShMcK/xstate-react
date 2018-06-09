import React from "react"

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// lib, returns Context.Provider, Context.
export default function reactXState({ name, machine, actions }) {
  name = name || "defaultName"

  const Context = React.createContext(name)

  class Provider extends React.Component {
    static displayName = `${capitalize(name)}Provider`

    constructor(props) {
      super(props)
      this.state = {
        value: machine.initialStateValue
      }
      this.actions = actions ? actions(this.transition) : {}
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

    dispatch = (action, payload) => {
      const triggerableAction = this.actions[action]
      if (triggerableAction) {
        triggerableAction(payload)
      }
    }

    transition = (event, payload) => {
      const nextState = machine.transition(this.state.value, event)

      for (const action of nextState.actions) {
        this.dispatch(action, payload)
      }

      this.setState({ value: nextState.value })
    }

    render() {
      const value = {
        transition: this.transition,
        state: this.state.value
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
