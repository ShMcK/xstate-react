import { Machine } from "xstate"
import createContext from "./Context"
import createWithStatechart from "./withStatechart"

export default function reactXState({
  name,
  config,
  actions
  // store
  // activities,
}) {
  name = name || "defaultName"

  const machine = Machine(config)

  const { Provider, Consumer } = createContext({
    name,
    machine,
    actions
  })

  const withStatechart = createWithStatechart(Consumer)

  return {
    Consumer,
    Provider,
    withStatechart
  }
}
