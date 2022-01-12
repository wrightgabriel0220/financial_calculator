import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from './App';
import Navbar from '../Navbar';

describe('Basic Render', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

describe('Correct Render', () => {
  it('renders the registration page correctly', () => {
    const appWrapper = render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );

    const navWrapper = shallow(<Navbar />);

    expect(appWrapper.contains(navWrapper)).toEqual(true);
  });
});

