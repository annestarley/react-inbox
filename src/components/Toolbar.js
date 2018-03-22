import React from 'react'


const Toolbar = ({
  messageData,
  selectAll
}) => {

  let unread = messageData.filter(message => !message.read)

  let selected = messageData.filter(message => message.selected)
  let boxIcon
  if (!selected.length) boxIcon = "fa fa-square-o"
  else if (selected.length === messageData.length) boxIcon = "fa fa-check-square-o"
  else boxIcon = "fa fa-minus-square-o"

  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unread.length}</span>
            unread messages
          </p>

          <button
              className="btn btn-default"
              onClick={selectAll}
            >
            <i className={boxIcon}></i>
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Read
          </button>

          <button className="btn btn-default" disabled="disabled">
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  )

}

export default Toolbar
