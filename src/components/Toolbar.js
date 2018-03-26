import React from 'react'

const Toolbar = ({
  messageData,
  selectAll,
  markAsRead,
  markAsUnread,
  deleteMessage,
  applyDev,
  applyPersonal,
  applyGSchool
}) => {

  let unread = messageData.filter(message => !message.read)

  let selected = messageData.filter(message => message.selected)
  let boxIcon
  if (!selected.length) boxIcon = "fa fa-square-o"
  else if (selected.length === messageData.length) boxIcon = "fa fa-check-square-o"
  else boxIcon = "fa fa-minus-square-o"

  let unreadMessage
  if (unread.length === 1) unreadMessage = "unread message"
  else unreadMessage = "unread messages"

  let disabledStatus
  if (!selected.length) disabledStatus = "disabled"
  else disabledStatus = ""

  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread.length}</span>
            {unreadMessage}
          </p>

          <a class="btn btn-danger">
            <i class="fa fa-plus"></i>
          </a>

          <button
              className="btn btn-default"
              onClick={selectAll}
            >
            <i className={boxIcon}></i>
          </button>

          <button
            className="btn btn-default"
            disabled={disabledStatus}
            onClick={markAsRead}>
            Mark As Read
          </button>

          <button
            className="btn btn-default"
            disabled={disabledStatus}
            onClick={markAsUnread}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={disabledStatus}>
                <option>Apply label</option>
                <option
                  value="dev"
                  onClick={applyDev}
                  >dev</option>
                <option
                  value="personal"
                  onClick={applyPersonal}
                  >personal</option>
                <option
                  value="gschool"
                  onClick={applyGSchool}>gschool</option>
              </select>

          <select
            className="form-control label-select"
            disabled={disabledStatus}>
            <option>Remove label</option>
            <option
              value="dev"
              >dev</option>
            <option
              value="personal"
              >personal</option>
            <option
              value="gschool"
              >gschool</option>
          </select>

          <button
            className="btn btn-default"
            disabled={disabledStatus}
            onClick={deleteMessage}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  )

}

export default Toolbar
