import React from 'react'
import Message from './Message'


const MessageList = ({
    messageData,
    updateState
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
          />
        })
      }
    </div>
  )
}

export default MessageList
