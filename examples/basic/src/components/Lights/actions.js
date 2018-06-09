export default transition => ({
  triggerEntry() {
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
