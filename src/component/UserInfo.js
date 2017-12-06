import React from 'react';

function UserInfo(props){
	return(
		<div>
			<h3>User name:{props.name}</h3>
			<h3>Password:{props.psw}</h3>
			<h3>Phone:{props.phone}</h3>
		</div>
	)
}
export {UserInfo};