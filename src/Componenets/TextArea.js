import React from 'react';

function TextArea(props) {
  return (
  <div class="form-group">
    <label for="exampleInputEmail1">{props.label}</label>
    <textarea rows="3" type={props.type} class="form-control" id={props.id} aria-describedby={props.name} placeholder={props.placeholder} onChange={(e) => props.onChange(e)} required={props.required} />
    <small id={`${props.name}Help`} class="form-text text-muted">{props.hint}</small>
  </div>
  );
}

export default TextArea;
