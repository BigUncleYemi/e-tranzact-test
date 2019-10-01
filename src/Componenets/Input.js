import React from 'react';

function Input(props) {
  return (
    <div class="form-group">
      <label for={props.name} className="">{props.label}</label>
      <input type={props.type} class="form-control" id={props.id} aria-describedby={props.name} placeholder={props.placeholder} onChange={(e) => props.onChange(e)} />
      <small id={`${props.name}Help`} class="form-text text-muted">{props.hint}</small>
    </div>
  );
}

export default Input;
