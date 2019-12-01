import React from "react";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvatarUser from './index';
Enzyme.configure({ adapter: new Adapter() });
import { unwrap } from "@material-ui/core/test-utils";
import { createShallow } from '@material-ui/core/test-utils';
import toJSON from 'enzyme-to-json';
import {Avatar} from "@material-ui/core";

const AvatarUserNaked = unwrap(AvatarUser);

describe('<AvatarUser />', () => {
  it('should render Avatar', () => {
    const wrapper = mount(<AvatarUserNaked classes={{}} />);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});