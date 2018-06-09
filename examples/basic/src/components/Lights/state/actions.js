export default ({ transition, dispatch }) => ({
  triggerEntry() {
    console.log("entry")
    setTimeout(() => {
      transition("NEXT")
    }, 2000)
  },
  triggerExit() {
    console.log("exit")
  },
  triggerAction() {
    console.log("action")
  }
})
