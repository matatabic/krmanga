import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Shelf from '@/pages/Shelf';
import Mine from '@/pages/Mine';
import {RootStackParamList, RootStackNavigation} from './index';

export type BottomTabParamList = {
  Home: undefined;
  Category: undefined;
  Shelf: undefined;
  Mine: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

function getHeaderTitle(route: Route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'home';
    switch(routeName){
      case 'Home':
        return '首页';
      case 'Category':
          return '分类';
      case 'Shelf':
            return '书架';
      case 'Mine':
        return '我的';
      default:
          return '首页';
    }

}

class BotttomTabs extends React.Component<IProps> {

  componentDidUpdate(){
    const {navigation,route} = this.props;
    navigation.setOptions({
      headerTitle:getHeaderTitle(route)
    })
  }

  componentDidMount(){
    const {navigation,route} = this.props;
    navigation.setOptions({
      headerTitle:getHeaderTitle(route)
    })
  }
  
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{tabBarLabel: '首页'}}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{tabBarLabel: '分类'}}
        />
        <Tab.Screen
          name="Shelf"
          component={Shelf}
          options={{tabBarLabel: '书架'}}
        />
        <Tab.Screen
          name="Mine"
          component={Mine}
          options={{tabBarLabel: '我的'}}
        />
      </Tab.Navigator>
    );
  }
}

export default BotttomTabs;
