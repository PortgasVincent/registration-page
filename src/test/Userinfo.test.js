import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {UserInfo} from '../component/UserInfo';
Enzyme.configure({ adapter: new Adapter() });

it("UserInfo", ()=>{
  const show = mount(<UserInfo name={"bbb"} psw={"Bbbbbbbb"} phone={"82408888"} />);
  expect(show.html()).toMatchSnapshot();
});