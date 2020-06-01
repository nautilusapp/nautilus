import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TabBar from '../src/renderer/components/TabBar';
import Tab from '../src/renderer/components/Tab';

configure({ adapter: new Adapter() });