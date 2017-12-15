import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount,shallow} from 'enzyme';
import {Checkinput} from '../component/Checkinput';
Enzyme.configure({ adapter: new Adapter() });

it("Checkinput", ()=>{
  const checkformat = jest.fn();
  const check = mount(<Checkinput title={"test"} type={"text"} checkformat={checkformat} permitted={true} format={"format for test"} />);
  expect(check.html()).toMatchSnapshot();

});