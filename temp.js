// let updatedState = this.state.messageData
//
// updatedState.forEach(x => {
//   if (x.selected) {
//     x.read = true
//     this.updateState(x)
//   }
// })


markAsUnread = () => {
  let updatedState = this.state.messageData

  updatedState.forEach(x => {
    if (x.selected) {
      x.read = false
      this.updateState(x)
    }
  })
}
