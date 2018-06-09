import React from "react"

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

// lib, returns Context.Provider, Context.
export default function reactXState({ name, machine, actions }) {
  name = name || "defaultName"

  const Context = React.createContext(name)

  class Provider extends React.Component {
    static displayName = `${capitalize(name)}Provider`

    state = {
      value: machine.initialStateValue
    }

    actions = actions ? actions(this.transition) : {}

    transition = event => {
      const nextState = machine.transition(this.state.value, event).value

      // for (const actionKey of nextState.actions) {
      //   const action = this.actions[actionKey]
      //   if (action) {
      //     action(event)
      //   }
      // }

      this.setState({ value: nextState })
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
