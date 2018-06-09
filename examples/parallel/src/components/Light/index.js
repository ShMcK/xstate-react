import React from "react"

import "./styles.css"
import TrafficLight from "./state"

type Props = {
  state: any
}

const Light = ({ color, active }) => (
  <div
    className={`Light ${active &&
      "Active" + color[0].toUpperCase() + color.slice(1)}`}
  />
)

export default class Lights extends React.Component<Props> {
  render() {
    return (
      <TrafficLight.Provider>
        <TrafficLight.Consumer>
          {({ state, transition }) => (
            <div className="Page">
              <div className="Container">
                <Light color="green" active={state.light === "green"} />
                <Light color="yellow" active={state.light === "yellow"} />
                <Light color="red" active={state.light === "red"} />
              </div>

              <div className="Time">Time: {state.time}</div>
            </div>
          )}
        </TrafficLight.Consumer>
      </TrafficLight.Provider>
    )
  }
}
