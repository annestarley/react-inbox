import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      messageData: [],
      fetchingMessages: true,
      viewComposeForm: false,
      composeFormContent: {
        subject: '',
        body: '',
      },
    }
  }

  async componentDidMount () {
    this.getMessages();
  }

  async getMessages() {
    const messageData = await fetch('http://localhost:8082/api/messages')
    const messageDataJson = await messageData.json()

    this.setState({
      messageData: messageDataJson._embedded.messages,
    })

  }

  updateState = (message, del=false) => {

    let index = this.state.messageData.findIndex(x=>x.id===message.id)

    if (del) this.state.messageData.splice(index, 1)
    else this.state.messageData[index] = message

    this.setState(this.state)
  }

  selectAll = () => {
    let updatedState = this.state.messageData
    let selected = updatedState.filter(message => message.selected)

    if (selected.length === updatedState.length) {
      updatedState.forEach(message => {
        message.selected = false
      })
    } else {
      updatedState.forEach(message => {
        message.selected = true
      })
    }

    this.setState({
      messageData: updatedState
    })
  }

  markAsRead = async (event, i) => {

    let readMessages = this.state.messageData.reduce((id, message) => {
      return message.selected ? [...id, message.id ] : id
    }, [])

    const requestBody = {
      "messageIds": readMessages,
      "command": "read",
      "read": true
    }

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.getMessages()
  }

  markAsUnread = async (event, i) => {
    let unreadMessages = this.state.messageData.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id] : ids
    }, [])

    const requestBody = {
      "messageIds": unreadMessages,
      "command": "read",
      "read": false
    }

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.getMessages()
  }

  deleteMessage = async (event, i) => {
    let stuffToDelete = this.state.messageData.reduce((ids, message)=> {
      return message.selected ? [...ids, message.id] : ids
    }, [])

    const requestBody = {
      "messageIds": stuffToDelete,
      "command": "delete",
    }

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.getMessages()
  }

  applyLabel = (label) => {
    this.state.messageData.forEach(x => {
      if (x.selected) {
        if (x.labels.findIndex(x=> x===label) === -1) {
          x.labels.push(label)
          this.updateState(x)
        }
      }
    })
  }

  applyDev = () => {
    return this.applyLabel("dev")
  }

  applyPersonal = () => {
    return this.applyLabel("personal")
  }

  applyGSchool = () => {
    return this.applyLabel("gschool")
  }

  removeLabel = (label) => {
    this.state.messageData.forEach(x=> {
      if (x.selected) {
        let index = x.labels.findIndex(x => x === label)
        if (index !== -1) {
          x.labels.splice(label,1)
          this.updateState(x)
        }
      }
    })
  }

  removeDev = () => {
    return this.removeLabel("dev")
  }

  removePersonal = () => {
    return this.removeLabel("personal")
  }

  removeGSchool = () => {
    return this.removeLabel("gschool")
  }

  checkMessage = (message, updateState) => {
    message.selected = !message.selected
    this.updateState(message)
  }

  starMessage = async (event, i) => {
    let starredMessage = [this.state.messageData[i].id]

    const requestBody = {
      "messageIds": starredMessage,
      "command": "star",
      "star": !this.state.messageData[i].starred,
    }

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
    })

    this.getMessages()
  }

  composeMessage = () => {
    let toggleState = this.state.viewComposeForm
    toggleState = !toggleState

    this.setState({
      ...this.state,
      viewComposeForm: toggleState,
      composeFormContent: {
        subject: '',
        body: '',
      },
    })

  }

  subject = (e) => {
    let subject = e.target.value

    this.setState({
      composeFormContent: {
        ...this.state.composeFormContent,
        subject: subject,
      }
    })
  }

  body = (e) => {
    let body = e.target.value

    this.setState({
      composeFormContent: {
        ...this.state.composeFormContent,
        body: body,
      }
    })
  }

  sendMessage = async (e) => {
    e.preventDefault()

    let newMessage = this.state.composeFormContent
    if (!newMessage.subject) newMessage.subject = 'no subject'

    await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setState({
      viewComposeForm: false,
      composerFormContent: {
        subject: '',
        body: '',
      }
    })

    this.getMessages()
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          messageData = {this.state.messageData}
          selectAll = {this.selectAll}
          markAsRead = {this.markAsRead}
          markAsUnread = {this.markAsUnread}
          deleteMessage = {this.deleteMessage}
          applyDev = {this.applyDev}
          applyPersonal = {this.applyPersonal}
          applyGSchool = {this.applyGSchool}
          composeMessage = {this.composeMessage}
        />
        <ComposeForm
          composeMessage = {this.composeMessage}
          viewComposeForm = {this.state.viewComposeForm}
          subject = {this.subject}
          body = {this.body}
          sendMessage = {this.sendMessage}

        />
        <MessageList
          messageData = {this.state.messageData}
          updateState= {this.updateState}
          starMessage= {this.starMessage}
          checkMessage= {this.checkMessage}
        />
      </div>
    );
  }
}

export default App;
