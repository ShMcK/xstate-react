export default transition => ({
  triggerNext() {
    setTimeout(() => {
      transition("NEXT")
    }, 2000)
  }
})
