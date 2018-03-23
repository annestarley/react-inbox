import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends Component {

  constructor(){
    super()
    this.state={messageData:[
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]}
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

  markAsRead = () => {
    let updatedState = this.state.messageData

    updatedState.forEach(x => {
      if (x.selected) {
        x.read = true
        this.updateState(x)
      }
    })
  }

  markAsUnread = () => {
    let updatedState = this.state.messageData

    updatedState.forEach(x => {
      if (x.selected) {
        x.read = false
        this.updateState(x)
      }
    })
  }

  deleteMessage = () => {
    let stuffToDelete = []
    this.state.messageData.forEach(x=> {
      if (x.selected) {
        stuffToDelete.push(x)
      }
    })
    stuffToDelete.forEach(x => {
      this.updateState(x, true)
    })
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
    this.applyLabel("dev")
  }

  applyPersonal = () => {
    this.applyLabel("personal")
  }

  applyGSchool = () => {
    this.applyLabel("gschool")
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
    this.removeLabel("dev")
  }

  removePersonal = () => {
    this.removeLabel("personal")
  }

  removeGSchool = () => {
    this.removeLabel("gschool")
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
        />
        <MessageList
          messageData = {this.state.messageData}
          updateState= {this.updateState}
        />
      </div>
    );
  }
}

export default App;
