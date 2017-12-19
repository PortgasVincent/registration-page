import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {RegistrationForm} from '../component/RegistrationForm';
Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

it("form", ()=>{
  const form = mount(<RegistrationForm />);
  //check init state
  expect(form.state().permittedname).toBe(false);
  expect(form.state().permittedpsw).toBe(false);
  expect(form.state().confirmedpsw).toBe(false);
  expect(form.state().permittedphone).toBe(false);
  expect(form.state().submitted).toBe(false);
  //get input
  const nameinput = form.find({title : "User name:"}).find("input");
  const pswinput = form.find({title : "Password:"}).find("input");
  const cpswinput = form.find({title : "Confirm Password:"}).find("input");
  const phoneinput = form.find({title : "Phone Number:"}).find("input");
  const submitbtn = form.find(".submitBtn");
  //simulate onchange  simulate can run multiple events at the same time    
  //but the setTimeout is load in this.timer    so if you set new, it will replace 

  ////unavailable input
  //check name
  nameinput.simulate("change", {target:{value:" "}});
  //run inner of timer   simulate can run multiple events at the same time    
  jest.runAllTimers();
  //check value of input 
  console.log(form.instance().data.name)
  expect(form.instance().data.name).toBe("");

  //check value of input whether is permitted
  expect(form.state().permittedname).toBe(false);
  // check psw
  pswinput.simulate("change", {target:{value:"Aaaaaa"}});
  jest.runAllTimers();
  expect(form.instance().data.psw).toBe("Aaaaaa");
  expect(form.state().permittedpsw).not.toBe(true);
  pswinput.simulate("change", {target:{value:"aaaaaaaa"}});
  jest.runAllTimers();
  expect(form.instance().data.psw).toBe("aaaaaaaa");
  expect(form.state().permittedpsw).not.toBe(true);
  expect(form.state().confirmedpsw).not.toBe(true);
  //check confirm psw
  cpswinput.simulate("change", {target:{value:"Bbbbbb"}});
  jest.runAllTimers();
  expect(form.instance().data.confirmpsw).toBe("Bbbbbb");
  expect(form.state().confirmedpsw).not.toBe(true);
  pswinput.simulate("change", {target:{value:"Bbbbbb"}});
  jest.runAllTimers();
  expect(form.state().confirmedpsw).toBe(true);
  //check phone
  phoneinput.simulate("change", {target:{value:"123456"}});
  jest.runAllTimers();
  expect(form.instance().data.phone).toBe("123456");
  expect(form.state().permittedphone).not.toBe(true);
  expect(form.html()).toMatchSnapshot();

  //available input
  //check name
  nameinput.simulate("change", {target:{value:"aaa"}});
  //run inner of timer
  jest.runAllTimers();
  //check value of input 
  expect(form.instance().data.name).toBe("aaa");
  //check value of input whether is permitted
  expect(form.state().permittedname).toBe(true);
  // check psw
  pswinput.simulate("change", {target:{value:"Aaaaaaaa"}});
  jest.runAllTimers();
  expect(form.instance().data.psw).toBe("Aaaaaaaa");
  expect(form.state().permittedpsw).toBe(true);
  //check confirm psw
  cpswinput.simulate("change", {target:{value:"Aaaaaaaa"}});
  jest.runAllTimers();
  expect(form.instance().data.confirmpsw).toBe("Aaaaaaaa");
  expect(form.state().confirmedpsw).toBe(true);
  //check phone
  phoneinput.simulate("change", {target:{value:"82408888"}});
  jest.runAllTimers();
  expect(form.instance().data.phone).toBe("82408888");
  expect(form.state().permittedphone).toBe(true);
  //submit
  submitbtn.simulate("submit");
  expect(form.state().submitted).toBe(true);
  expect(form.html()).toMatchSnapshot();
});