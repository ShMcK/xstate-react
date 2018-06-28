import * as React from "react"

export default Consumer => {
  return Component => {
    return class StatechartWrapper extends React.Component {
      ref = React.createRef()

      componentDidMount() {
        this.runActionMethods()
      }

      componentDidUpdate() {
        this.runActionMethods()
      }

      runActionMethods() {
        const component = this.ref.current
        // console.log(component)
        if (component && component.props.actions) {
          component.props.actions.forEach(action => {
            // console.log('action', action)
            if (component[action]) {
              component[action]()
            }
          })
        }
      }

      render() {
        return (
          <Consumer>
            {({ state, transition, actions }) => (
              <Component
                {...{
                  ref: this.ref,
                  transition,
                  state,
                  actions
                }}
              />
            )}
          </Consumer>
        )
      }
    }
  }
}
