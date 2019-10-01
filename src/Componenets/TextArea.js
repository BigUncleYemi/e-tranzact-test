import React from 'react';

function TextArea(props) {
  return (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{props.label}</label>
    <textarea rows="3" type={props.type} className="form-control" id={props.id} aria-describedby={props.name} placeholder={props.placeholder} onChange={(e) => props.onChange(e)} required={props.required} />
    <small id={`${props.name}Help`} className="form-text text-muted">{props.hint}</small>
  </div>
  );
}

export default TextArea;
