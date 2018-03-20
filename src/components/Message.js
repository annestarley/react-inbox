import React from 'react'

const Message= (props) => {
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
              />
            </div>
            <div className="col-xs-2">
              <i
                className={props.message.starred?"star fa fa-star":"star fa fa-star-o"}
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
