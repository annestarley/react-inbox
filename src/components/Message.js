import React from 'react'

const Message = ({
  message,
  updateState,
  checkMessage,
  starMessage
}) => {
  return (
    <div>
      <div className={
        `row message ${message.read?"read":"unread"} ${message.selected?"selected":""}`
      }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={message.selected?"checked":""}
                onChange = {()=>checkMessage(message, updateState)}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={message.starred?"star fa fa-star":"star fa fa-star-o"}
                onClick={()=>starMessage(message, updateState)}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {
            message.labels.map((label, i) => {
              return <span key={i} className="label label-warning">{label}</span>
            })
          }
          <a href="#">
            {message.subject}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Message
