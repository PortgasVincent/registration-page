import React from 'react';
import {Checkinput} from './Checkinput';
import {Userinfo} from './Userinfo';

class Registrationform extends React.Component{
  constructor(props){
    super();
    this.timer = null;
    this.data = {
      name:"",
      psw:"",
      confirmpsw:"",
      phone:"",
    };
    this.state={
      permittedname:false,
      permittedpsw:false,
      confirmedpsw:false,
      permittedphone:false,
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
      this.data.name = name;
      this.setState((prestate)=>{
        prestate.permittedname = name !== "";
        prestate.submitted = false;
        return prestate;
      })
    } ,1000 ,namestr);
		
  }
  checkPsw(e){
    const pswstr = e.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout((pswstr)=>{
      const psw = this.delHtmlTag( pswstr );
      const regUpper = /[A-Z]/;
      const reglower = /[a-z]/;
      this.data.psw = psw;
      this.setState((prestate)=>{
        prestate.permittedpsw = regUpper.test(psw) && reglower.test(psw) && psw.length >= 8;
        prestate.submitted = false;
        prestate.confirmedpsw = psw === this.data.confirmpsw;
        return prestate;
      })
    } ,1000 ,pswstr);
  }
  confirmPsw(e){
    const pswstr = e.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout((pswstr)=>{
      const psw = this.delHtmlTag( pswstr);
      this.data.confirmpsw = psw;
      this.setState((prestate)=>{
        prestate.submitted = false;
        prestate.confirmedpsw = psw === this.data.psw;
        return prestate;
      })
    } ,1000 ,pswstr);
  }
  checkPhone(e){
    const phonestr = e.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout((phonestr)=>{
      const phone = this.delHtmlTag( phonestr );
      this.data.phone = phone;
      this.setState((prestate)=>{
        prestate.permittedphone = (/^1(3|4|5|7|8)\d{9}$/).test(phone) || (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/).test(phone);
        prestate.submitted = false;
        return prestate;
      })
    } ,1000 ,phonestr);
  }

  handleSubmit(e){
    this.setState({
      submitted: true,
    })
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
        <Checkinput type={"password"} title={"Password:"}          checkformat={this.checkPsw}   isValid={this.state.permittedpsw}   format={"must be at least 8 characters, contain upper and lower case letters"}  />
        <Checkinput type={"password"} title={"Confirm Password:"} checkformat={this.confirmPsw} isValid={this.state.confirmedpsw}     format={"must match above"} />
        <Checkinput type={"text"}     title={"Phone Number:"}     checkformat={this.checkPhone} isValid={this.state.permittedphone} format={"ensure the number is valid for a Chinese mobile or fixed line phone number"}   />
        <input type="submit" value="Submit" disabled={!(this.state.permittedname && this.state.permittedpsw && this.state.confirmedpsw && this.state.permittedphone)} className={"submitBtn"} />
        {this.state.submitted && <Userinfo name={this.data.name} psw={this.data.psw} phone={this.data.phone} />}
      </form>
    );
  }
}
export {Registrationform};
