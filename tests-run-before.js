import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let context = require.context('./src', true, /\.spec\.js$/)
context.keys().forEach(context)
