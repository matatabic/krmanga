# react native

## 1.1初始化react native

npx react-native init krmanga --template react-native-template-typescript

## 1.2多环境

yarn add react-native-config

cd ios pod install

https://js.coach/package/react-native-config

## 1.3.绝对路径

yarn add babel-plugin-module-resolver



# 2.导航器

## 2.1堆栈式导航器

`yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

`yarn add @react-navigation/stack`

```javascript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import { Platform, StyleSheet } from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float" //页面载入方式
          screenOptions={{
            headerTitleAlign: 'center', //标题位置
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled:true,
            gestureDirection:'horizontal',
            headerStyle:{ //设置android仿ios回滚滑动样式
                ...Platform.select({
                    android:{
                        elevation:0,
                        borderBottomWidth:StyleSheet.hairlineWidth,
                    }
                })
            }
          }}>
          <Stack.Screen name="BottomTabs" component={BottomTabs} options={{
            headerTitle:'首页'
          }} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;

```



## 2.2底部标签导航器

`yarn add @react-navigation/bottom-tabs`

```javascript
import React from 'react';
import Icon from '@/assets/iconfont/index';
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

function getHeaderTitle(route: Route) { //设置标题
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'home';
  switch (routeName) {
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
  componentDidUpdate() {
    const {navigation, route} = this.props;
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#DCBA01', 
        }}>  
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <Icon name="icon-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{tabBarLabel: '分类',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-category" color={color} size={size} />
          ),}}
        />
        <Tab.Screen
          name="Shelf"
          component={Shelf}
          options={{tabBarLabel: '书架',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-shujiashugui" color={color} size={size} />
          ),}}
        />
        <Tab.Screen
          name="Mine"
          component={Mine}
          options={{tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-mine" color={color} size={size} />
          ),}}
        />
      </Tab.Navigator>
    );
  }
}

export default BotttomTabs;

```

## 2.3

# 3.dva

## 3.1

yarn add dva-core-ts react-redux

yarn add @types/react-redux(微软维护ts声明库)

yarn add dva-loading-ts

# 4.Iconfont

yarn add react-native-svg

cd ios pod install

yarn add -D react-native-iconfont-cli

npx iconfont-init(初始化iconfont文件)

npx iconfont-rn

颜色 FFDE02 FCE04F DCBA01

