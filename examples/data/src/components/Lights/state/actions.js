export default ({ transition, dispatch, update, getData }) => ({
  triggerEntry() {
    setTimeout(() => {
      const { count } = getData()
      console.log("count", count)
      update({ count: count + 1 })
      transition("NEXT")
    }, 2000)
  }
})
