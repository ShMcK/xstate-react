import React from "react"

import "./styles.css"
import TrafficLight from "./state"

type Props = {
  state: "red" | "green" | "yellow"
}

export default class Lights extends React.Component<Props> {
  render() {
    return (
      <div className="Page">
        <TrafficLight.Provider>
          <TrafficLight.Consumer>
            {({ state }) => (
              <div className="Container">
                <div
                  className={`Light ${state === "green" && "ActiveGreen"}`}
                />
                <div
                  className={`Light ${state === "yellow" && "ActiveYellow"}`}
                />
                <div className={`Light ${state === "red" && "ActiveRed"}`} />
              </div>
            )}
          </TrafficLight.Consumer>
        </TrafficLight.Provider>
      </div>
    )
  }
}
