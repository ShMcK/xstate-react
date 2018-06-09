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
          {({ state, transition }) => {
            console.log("state", state)
            return (
              <div className="Page">
                <div className="Container">
                  <Light color="green" active={state.normal === "green"} />
                  <Light color="yellow" active={state.normal === "yellow"} />
                  <Light
                    color="red"
                    active={state.normal === "red" || state === "error"}
                  />
                </div>

                <button
                  className="Button"
                  onClick={() =>
                    transition(state === "error" ? "REPAIR" : "ERROR")
                  }
                >
                  {state === "error" ? "Repair" : "Error"}
                </button>
              </div>
            )
          }}
        </TrafficLight.Consumer>
      </TrafficLight.Provider>
    )
  }
}
