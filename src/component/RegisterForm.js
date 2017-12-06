import React from 'react';
import {Checkinput} from './Checkinput';
import {UserInfo} from './UserInfo';

class RegistrationForm extends React.Component{
	timer;
	constructor(props){
		super();
		this.state={
			data:{
				name:"",
				psw:"",
				confirmpsw:"",
				phone:"",
			},	
			permittedname:false,
			permittedpsw:false,
			confirmedpsw:false,
			permittedphone:false,
			submitted:false,
		}
		// this.timer = "";
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
				this.setState((prestate)=>{
					prestate.data.name = name;
					prestate.permittedname = true;
					prestate.submitted = false;
					return prestate;
				})
			}else{
				this.setState((prestate)=>{
					prestate.data.name = name;
					prestate.permittedname = false;
					prestate.submitted = false;
					return prestate;
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
				this.setState((prestate)=>{
					prestate.data.psw = psw;
					prestate.permittedpsw = true;
					prestate.submitted = false;
					return prestate;
				})
			}else{
				this.setState((prestate)=>{
					prestate.data.psw = psw;
					prestate.permittedpsw = false;
					prestate.submitted = false;
					return prestate;
				})
			}
			if(psw === this.state.data.confirmpsw){
				this.setState({
					confirmedpsw:true,
				})
			}else{
				this.setState({
					confirmedpsw:false,
				})
			}
		} ,1000 ,pswstr);
	}
	confirmPsw(e){
		const pswstr = e.target.value;
		clearTimeout(this.timer);
		this.timer = setTimeout((pswstr)=>{
			const psw = this.delHtmlTag( pswstr);
			this.setState((prestate)=>{
					prestate.data.confirmpsw = psw;
					prestate.submitted = false;
					return prestate;
				})
			if(psw === this.state.data.psw){
				this.setState({
					confirmedpsw: true,
				})
			}else{
				this.setState({
					confirmedpsw:false,
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
				this.setState((prestate)=>{
					prestate.data.phone = phone;
					prestate.permittedphone = true;
					prestate.submitted = false;
					return prestate;
				})
			}else{
				this.setState((prestate)=>{
					prestate.data.phone = phone;
					prestate.permittedphone = false;
					prestate.submitted = false;
					return prestate;
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
			name:this.state.data.name, 
			psw:this.state.data.psw, 
			phone:this.state.data.phone,
		};
		e.preventDefault();
	}

	delHtmlTag(str)
	{
    let result=str.replace(/<\/?[^>]*>/gim,"");//delete html tag
    result=str.replace(/(^\s+)|(\s+$)/g,"");//delete space in begin or end
    return  result.replace(/\s/g,"");//delete space in center
	}
	render(){
		return(
			<form onSubmit={this.handleSubmit} className={"regForm"}>
				<Checkinput type={"text"}     title={"User name:"}        checkformat={this.checkName}  isValid={this.state.permittedname}  format={"Must not be null"}  />
				<Checkinput type={"password"} title={"Password"}          checkformat={this.checkPsw}   isValid={this.state.permittedpsw}   format={"must be at least 8 characters, contain upper and lower case letters"}  />
				<Checkinput type={"password"} title={"Confirm Password:"} checkformat={this.confirmPsw} isValid={this.state.confirmedpsw}     format={"must match above"} />
				<Checkinput type={"text"}     title={"Phone Number:"}     checkformat={this.checkPhone} isValid={this.state.permittedphone} format={"ensure the number is valid for a Chinese mobile or fixed line phone number"}   />
				<input type="submit" value="Submit" disabled={!(this.state.permittedname && this.state.permittedpsw && this.state.confirmedpsw && this.state.permittedphone)} className={"submitBtn"} />
				{this.state.submitted?
					<UserInfo name={this.state.data.name} psw={this.state.data.psw} phone={this.state.data.phone} /> : ""
				}
			</form>
		);
	}
}
export {RegistrationForm};
