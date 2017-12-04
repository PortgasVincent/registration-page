import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {Checkinput, Show, RegistrationForm} from './form_component.js';

Enzyme.configure({ adapter: new Adapter() });

// it('renders correctly', () => {
//   const input = renderer.create(
//   	<Testbox classname={"test"} />
//   	).toJSON();
//   expect(input).toMatchSnapshot();
// });

// it("Checkinput test", ()=>{
//   const checkinput = renderer.create(
//     <Checkinput title="测试内容" type="text"  />
//   )
// })

jest.useFakeTimers();

it("test the form", ()=>{
  const form = mount(<RegistrationForm />);

  //检测初始状态
  expect(form.state().permittedname).toBe(false);
  expect(form.state().permittedpsw).toBe(false);
  expect(form.state().confirmpsw).toBe(false);
  expect(form.state().permittedphone).toBe(false);
  expect(form.state().submitted).toBe(false);

  //得到相应input
  const nameinput = form.find({title : "User name:"}).find("input");
  const pswinput = form.find({title : "Password"}).find("input");
  const cpswinput = form.find({title : "Confirm Password:"}).find("input");
  const phoneinput = form.find({title : "Phone Number:"}).find("input");
  const submitbtn = form.find(".submitBtn");


  //simulate onchange  simulate 可以同时模拟运行多个事件。但由于我的timer都是挂在form组件的this.timer上
  //所以设置另一个时会将之前的抵消

  //check name
  nameinput.simulate("change", {target:{value:"aaa"}});
  //run inner of timer   可以同时运行多个timer
  jest.runAllTimers();
  //check value of input 
  expect(form.state().name).toBe("aaa");
  //check value of input whether is permitted
  expect(form.state().permittedname).toBe(true);
  

  // check psw
  pswinput.simulate("change", {target:{value:"Aaaaaaaa"}});
  jest.runAllTimers();
  expect(form.state().psw).toBe("Aaaaaaaa");
  expect(form.state().permittedpsw).toBe(true);

  //check confirm psw
  cpswinput.simulate("change", {target:{value:"Aaaaaaaa"}});
  jest.runAllTimers();
  expect(form.state().confirmpsw).toBe(true);

  //check phone
  phoneinput.simulate("change", {target:{value:"82408888"}});
  jest.runAllTimers();
  expect(form.state().phone).toBe("82408888");
  expect(form.state().permittedphone).toBe(true);

  //submit
  submitbtn.simulate("submit");
  expect(form.state().submitted).toBe(true);

  expect(form.html()).toMatchSnapshot();
});

it("test the Checkinput", ()=>{
  const checkformat = jest.fn();
  const check = mount(<Checkinput title={"test"} type={"text"} checkformat={checkformat} permitted={true} format={"format for test"} />);
  expect(check.html()).toMatchSnapshot();

});

it("test the Show", ()=>{
  const show = mount(<Show submitted={true} name={"bbb"} psw={"Bbbbbbbb"} phone={"82408888"} />);
  expect(show.html()).toMatchSnapshot();
});











































