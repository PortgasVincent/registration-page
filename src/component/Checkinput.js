import React from 'react';

function Checkinput(props){
  return(
		<div className={"inputCheck"}>
			<label className={"inputLabel"}>{props.title}</label>
			<input type={props.type} onChange={props.checkformat} className={"inputText"} />
			<span className={props.isValid? "active" : "inactive"}>{props.format}</span>
		</div>
		)
  }
export {Checkinput};