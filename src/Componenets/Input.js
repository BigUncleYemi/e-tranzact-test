import React from 'react';

function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="">{props.label}</label>
      <input type={props.type} className="form-control" id={props.id} aria-describedby={props.name} placeholder={props.placeholder} onChange={(e) => props.onChange(e)} />
      <small id={`${props.name}Help`} className="form-text text-muted">{props.hint}</small>
    </div>
  );
}

export default Input;
