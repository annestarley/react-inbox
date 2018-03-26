import React from 'react'
import Message from './Message'


const MessageList = ({
    messageData,
    updateState,
    starMessage,
    checkMessage
  }) => {

  return (
    <div>
      {
        messageData.map((message,i) => {
          return <Message
            key={i}
            value={i}
            message={message}
            updateState={updateState}
            starMessage={ (event) => {starMessage(event, i)}}
            checkMessage={ (event) =>{checkMessage(event, i)}}
          />
        })
      }
    </div>
  )
}

export default MessageList
