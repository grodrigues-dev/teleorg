import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Home from './pages/home';
import Login from './pages/login';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Home
    })
);

export default Routes;