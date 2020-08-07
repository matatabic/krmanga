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
      			headerStatusBarHeight:StatusBar.currentHeight, //获取状态栏高度，不设置页面高度渲染会重新计算，
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

## 2.3顶部标签导航器

yarn add @react-navigation/material-top-tabs react-native-tab-view



# 3.dva

## 3.1

yarn add dva-core-ts react-redux

yarn add @types/react-redux(ts声明库)

yarn add dva-loading-ts

# 4.Iconfont

yarn add react-native-svg

cd ios pod install

yarn add -D react-native-iconfont-cli

npx iconfont-init(初始化iconfont文件)

npx iconfont-rn

颜色 FFDE02 FCE04F DCBA01

# 5.轮播图

yarn add react-native-snap-carousel

yarn add @types/react-native-snap-carousel -D(ts声明库)

```javascript
import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';

const sliderWidth = viewportWidth;
const sidewidth = wp(90);
const sideHeight = hp(26);
const itemWidth = sidewidth + wp(2) * 2;

const data = [
  'http://39.105.213.120/images/1.jpg',
  'http://39.105.213.120/images/3.jpg',
  'http://39.105.213.120/images/5.jpg',
  'http://39.105.213.120/images/7.jpg',
  'http://39.105.213.120/images/9.jpg',
];

class Carousel extends React.Component {

    state ={
        activeSlide:0,  
    }

    onSnapToItem = (index:number)=>{ ///将
        this.setState({
            activeSlide:index,
        })
    }

  renderItem = (
    {item}: {item: string},
    parallaxProps?: AdditionalParallaxProps, //视差需要传入的属性
  ) => {
    return (
      <ParallaxImage //视差组件
        source={{uri: item}}
        style={styles.image}
        containerStyle={styles.containerStyle}
        parallaxFactor={0.8} //时差的速度
        showSpinner 
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxProps}
      />
    );
  };

  get pagination(){ //轮播图的点
      const {activeSlide} = this.state;
      return(
          <View style={styles.paginationWrapper}>
              <Pagination containerStyle={styles.paginationContainer}
              activeDotIndex={activeSlide}
              dotContainerStyle={styles.dotContainer}
              dotStyle={styles.dot}
                dotsLength = {data.length}
                inactiveDotScale={0.7}
                inactiveDotOpacity={0.4}
              />
          </View>
      )
  }

  render() {
    return (
        <View>
            <SnapCarousel
              data={data}
              renderItem={this.renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages
              onSnapToItem={this.onSnapToItem} 
              loop //无限滚动
              autoplay //自动播放
            />
            {this.pagination}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: itemWidth,
    height: sideHeight,
    borderRadius:8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper:{
    justifyContent:'center',
    alignItems:'center'
    },
  paginationContainer:{
      position:'absolute',
      top:-20,
      paddingHorizontal:3,
      paddingVertical:4,
      borderRadius:8,
  },
  dotContainer:{
    marginHorizontal:6,
  },
  dot:{
    width:6,
    height:6,
    borderRadius:3,
    backgroundColor:'rgba(255,255,255,0.92)',
  }
});

export default Carousel;

```

# 6.axios

yarn add axios

# 7.渐变色组件

yarn add react-native-linear-gradient

cd ios pod install



yarn add react-native-linear-animated-gradient-transition

# 8.本地存储

yarn add @react-native-community/async-storage

cd ios pod install

yarn add react-native-storage