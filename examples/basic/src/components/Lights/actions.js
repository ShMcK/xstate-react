export default transition => ({
  triggerEntry() {
    setTimeout(() => {
      transition("NEXT")
    }, 5000)
  },
  triggerExit() {
    console.log("exit")
  }
})
