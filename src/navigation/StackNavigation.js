import CountriesDetail from '../screens/CountriesDetail';
import CountriesName from '../screens/CountriesName';
import SCREENS from './Screens';

const StackNavigation = [
  {
    screenName: SCREENS.COUNTRIES_NAME,
    component: CountriesName,
  },
  {
    screenName: SCREENS.COUNTRIES_DETAIL,
    component: CountriesDetail,
  },
];
export default StackNavigation;
