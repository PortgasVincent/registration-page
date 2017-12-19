import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {CheckInput} from '../component/CheckInput';
Enzyme.configure({ adapter: new Adapter() });

it("CheckInput", ()=>{
  const checkformat = jest.fn();
  const check = mount(<CheckInput title={"test"} type={"text"} checkformat={checkformat} permitted={true} format={"format for test"} />);
  expect(check.html()).toMatchSnapshot();

});