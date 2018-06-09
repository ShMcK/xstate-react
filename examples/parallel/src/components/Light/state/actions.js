export default ({ transition, dispatch, update }) => ({
  lightTimer() {
    setTimeout(() => {
      transition("NEXT")
    }, 2000)
  },
  clockTimer() {
    setTimeout(() => {
      transition("TICK")
    }, 5000)
  }
})
