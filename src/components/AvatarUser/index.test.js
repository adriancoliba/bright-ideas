import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvatarUser from './index';
Enzyme.configure({ adapter: new Adapter() });
import { unwrap } from "@material-ui/core/test-utils";
import { createShallow } from '@material-ui/core/test-utils';

const AvatarUserNaked = unwrap(AvatarUser);

describe('Avatar User Component', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  it('should work', () => {
    const wrapper = shallow(<AvatarUserNaked classes={{}} />);
    const text = wrapper.find('div img')
    // console.log(text.debug())
  });
});