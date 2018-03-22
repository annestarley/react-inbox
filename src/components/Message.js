import React from 'react'

let checkMessage = (message, updateState) => {
  message.selected = !message.selected
  updateState(message)
}

let starMessage = (message, updateState) => {
  message.starred = !message.starred
  updateState(message)
}

const Message = (props) => {
  return (
    <div>
      <div className={
        `row message ${props.message.read?"read":"unread"} ${props.message.selected?"selected":""}`
      }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
                type="checkbox"
                checked={props.message.selected?"checked":""}
                onChange = {()=>checkMessage(props.message, props.updateState)}
              />
            </div>
            <div className="col-xs-2">
              <i
                className={props.message.starred?"star fa fa-star":"star fa fa-star-o"}
                onClick={()=>starMessage(props.message, props.updateState)}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {
            props.message.labels.map((label, i) => {
              return <span key={i} className="label label-warning">{label}</span>
            })
          }
          <a href="#">
            {props.message.subject}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Message
