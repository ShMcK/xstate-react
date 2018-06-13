import React from "react"

import "./styles.css"
import TrafficLight from "./state"

type Props = {
  state: "red" | "green" | "yellow"
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
      <div className="Page">
        <TrafficLight.Provider>
          <TrafficLight.Consumer>
            {({ state, transition }) => (
              <div className="Container">
                <div style={{ color: "white" }}>{JSON.stringify(state)}</div>
                <Light color="green" active={state === "green"} />
                <Light color="yellow" active={state === "yellow"} />
                <Light color="red" active={state === "red"} />
              </div>
            )}
          </TrafficLight.Consumer>
        </TrafficLight.Provider>
      </div>
    )
  }
}
