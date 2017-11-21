import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Checkinput(props){
	return(
		<div className={"inputbox"}>
			<label className={"inputL"}>
				{props.title}<input type={props.type} onChange={props.checkformat} className={"inputC"} />
			</label>
			<span style={props.permitted? {color:"green"} : {color:"red"}}>{props.format}</span>
		</div>
	)
}
function Show(props){
	return(
		<div style={props.submitted? {} : {display:"none"}}>
			<h3>User name:{props.name}</h3>
			<h3>Password:{props.psw}</h3>
			<h3>Phone:{props.phone}</h3>
		</div>
	)
}
class RegistrationForm extends React.Component{
	timer;
	constructor(props){
		super();
		this.state={
			name:"",
			psw:"",
			phone:"",
			permittedname:false,
			permittedpsw:false,
			confirmpsw:false,
			permittedphone:false,
			submitstate:false,
			submitted:false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkName = this.checkName.bind(this);
		this.checkPsw = this.checkPsw.bind(this);
		this.confirmPsw = this.confirmPsw.bind(this);
		this.checkPhone = this.checkPhone.bind(this);
	}
	checkName(e){
		const namestr = e.target.value;
		clearTimeout(this.timer);
		this.timer = setTimeout((namestr) => {
			const name = this.delHtmlTag( namestr );
			if(name !== ""){
				this.setState({
					name: name,
					permittedname: true,
				})
			}else{
				this.setState({
					name: name,
					permittedname:false,
				})
			}
		} ,1000 ,namestr);
		
	}
	checkPsw(e){
		const pswstr = e.target.value;
		clearTimeout(this.timer);
		this.timer = setTimeout((pswstr)=>{
			const psw = this.delHtmlTag( pswstr );
			const regUpper = /[A-Z]/;
			const reglower = /[a-z]/;
			if(regUpper.test(psw) && reglower.test(psw) && psw.length >= 8){
				this.setState({
					psw: psw,
					permittedpsw: true,
				})
			}else{
				this.setState({
					psw: psw,
					permittedpsw:false,
				})
			}
		} ,1000 ,pswstr);
	}
	confirmPsw(e){
		const pswstr = e.target.value;
		clearTimeout(this.timer);
		this.timer = setTimeout((pswstr)=>{
			const psw = this.delHtmlTag( pswstr);
			if(psw === this.state.psw){
				this.setState({
					confirmpsw: true,
				})
			}else{
				this.setState({
					confirmpsw:false,
				})
			}
		} ,1000 ,pswstr);
	}
	checkPhone(e){
		const phonestr = e.target.value;
		clearTimeout(this.timer);
		this.timer = setTimeout((phonestr)=>{
			const phone = this.delHtmlTag( phonestr );
			if(phone.match(/^1(3|4|5|7|8)\d{9}$/) || phone.match(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/)){
				this.setState({
					phone: phone,
					permittedphone: true,
				})
			}else{
				this.setState({
					phone: phone,
					permittedphone:false,
				})
			}
			//console.log(this.state.phone);
			//console.log(this.state.permittedphone);
		} ,1000 ,phonestr);
	}

	handleSubmit(e){
		this.setState({
			submitted: true,
		})
		const dataJson = {
			name:this.state.name, 
			psw:this.state.psw, 
			phone:this.state.phone,
		};
		console.log(dataJson);
		e.preventDefault();
	}

	delHtmlTag(str)
	{
        // let str=str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
        let result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
        return  result.replace(/\s/g,"");//去除文章中间空格
	}
	render(){
		return(
			<form onSubmit={this.handleSubmit} className={"regForm"}>
				<Checkinput type={"text"}     title={"User name:"}        checkformat={this.checkName}  permitted={this.state.permittedname}  format={"Must not be null"}  />
				<Checkinput type={"password"} title={"Password"}          checkformat={this.checkPsw}   permitted={this.state.permittedpsw}   format={"must be at least 8 characters, contain upper and lower case letters"}  />
				<Checkinput type={"password"} title={"Confirm Password:"} checkformat={this.confirmPsw} permitted={this.state.confirmpsw}     format={"must match above"} />
				<Checkinput type={"text"}     title={"Phone Number:"}     checkformat={this.checkPhone} permitted={this.state.permittedphone} format={"ensure the number is valid for a Chinese mobile or fixed line phone number"}   />
				<input type="submit" value="Submit" disabled={!(this.state.permittedname && this.state.permittedpsw && this.state.confirmpsw && this.state.permittedphone)} className={"submitBtn"} />
				<Show submitted={this.state.submitted} name={this.state.name} psw={this.state.psw} phone={this.state.phone} />
			</form>
		);
	}
}
ReactDOM.render(
	<RegistrationForm />,
	document.getElementById("root")
);