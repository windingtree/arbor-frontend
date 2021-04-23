import { Provider } from 'react-redux';
import store from '../redux/store';

export const withStore = (story) => (
    <Provider store={store}>{story()}</Provider>
);