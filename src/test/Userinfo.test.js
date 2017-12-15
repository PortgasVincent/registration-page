import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {Userinfo} from '../component/Userinfo';
Enzyme.configure({ adapter: new Adapter() });

it("Userinfo", ()=>{
  const show = mount(<Userinfo name={"bbb"} psw={"Bbbbbbbb"} phone={"82408888"} />);
  expect(show.html()).toMatchSnapshot();
});