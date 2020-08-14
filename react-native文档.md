# .react native

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

## 动态dva-model

yarn add dva-model-extend

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

# 9.header-buttons

yarn add react-navigation-header-buttons

# 10.拖拽

yarn add react-native-drag-sort

# 11.图片模糊

yarn add @react-native-community/blur 

# 12.手势

手势一般分两个大类:持续手势和不持续手势

持续手势:拖动 旋转 捏合

不持续手势:点击 长按 压力触控

只有Animated动画组件才能使用动画，动画组件:View,Text,Image,ScrollView,FlatList,SectionList,也可以自定义动画组件

## Animated.timing()

```javascript
Animated.timing(this.translateY, { //绑定动画属性到this.translateY
        useNativeDriver: true, //开启原生动画驱动
        toValue: -170,  //变化值
        duration: 3000, //变化时间
  }).start();
```

作用:**普通滑动动画**，推动一个值平均随着时间变化

## Animated.spring()

作用:弹簧动画，推动一个值弹簧动画时间变化

```javascript
 Animated.spring(this.translateY, { //绑定动画属性到this.translateY
        useNativeDriver: true, //开启原生动画驱动
        toValue: -170,  //变化值
        tension:100, //弹力值
   			friction:10, //摩擦力
  }).start();
```

创建一个动画值

```javascript
进入组件，y轴3秒下拉170
componentDidMount(){
  translateY = new Animated.Value(0); Animated.Value只能接受一个number
  Animated.timing(this.translateY, { //绑定动画属性到this.translateY
        useNativeDriver: true, //开启原生动画驱动
        toValue: -170,  //变化值
        duration: 3000, //变化时间
  }).start();
]

render() {
  return (
    <Animated.View
      style={[
      styles.container,
      {transform: [{translateY: this.translateY}]},
      ]}>
		<View><Text>Animated。demo</Text></View>
    </Animated.View>
	);
}
```

差值函数interpolate(可以使颜色变化，图片角度旋转)

```javascript
进入组件，y轴10秒下拉170，从#fff变成red
translateY = new Animated.Value(0); Animated.Value只能接受一个number
Animated.timing(this.translateY, { //绑定动画属性到this.translateY
      useNativeDriver: false, //0.63rn使用差值函数改变backgroundColor需关闭原生驱动
      toValue: -170,  //变化值
      duration: 10000, //变化时间
}).start();

render() {
  return (
    <Animated.View
      style={[
      styles.container,
        {
          padding:10,
          backgroundColor: this.translateY.interpolate({
          inputRange: [-170, 0],
          outputRange: ['red', '#fff']
        }),
          transform: [{translateY: this.translateY}],
        },
      ]}>
      <View><Text>Animated.demo</Text></View>
    </Animated.View>
  );
}
```

```javascript
进入组件，y轴10秒下拉170，组件透明度从1到0
translateY = new Animated.Value(0); Animated.Value只能接受一个number
Animated.timing(this.translateY, { //绑定动画属性到this.translateY
      useNativeDriver: true, //opcity可开启原生驱动
      toValue: -170,  //变化值
      duration: 10000, //变化时间
}).start();

render() {
  return (
    <Animated.View
      style={[
      styles.container,
        {
          opcity: this.translateY.interpolate({
          inputRange: [-170, 0],
          outputRange: [1, 0]
        }),
          transform: [{translateY: this.translateY}],
        },
      ]}>
      <View><Text>Animated.demo</Text></View>
    </Animated.View>
  );
}
```

监听拖动组件(PanGestureHandler)

```javascript
监听滑动距离
onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
      console.log(event.nativeEvent.translationY)
}
render() 
{
  return (
    <PanGestureHandler onGestureEvent={this.onGestureEvent}>
    <Animated.View
      style={[
             styles.container,
             {
               transform:[{translateY:this.translateY}],
             }
             ]}>
			<View><Text>Animated.demo</Text></View>
    </Animated.View>
		</PanGestureHandler>
);
}
```

```javascript
Animated.event是动画监听库，作用是映射动画值
onGestureEvent = Animated.event(
        [{nativeEvent:{translationY:this.translationY}}],{
        useNativeDriver:USE_NATIVE_DRIVER
})
```

```javascript
Animated.Value生成的对象中有两个值value和offset
translationY = new Animated.Value(0); //y轴初始值
translationYOffset = new Animated.Value(0); //y轴偏移值
translateY = Animated.add(this.translationY,this.translationYOffset);

onHandlerStateChange = ({nativeEvent}:PanGestureHandlerStateChangeEvent) =>{
    if(nativeEvent.oldState === State.ACTIVE){ 
      let {translationY} = nativeEvent;
      //将每次拖动的值都累积计算
      this.translationYOffset.extractOffset(); //将translationYOffset的动画值设置到offset，清空value值
      this.translationYOffset.setValue(translationY); //重新设置translationYOffset的value
      this.translationYOffset.flattenOffset(); //value = value + offset
      
      this.translationY.setValue(0);
    }
}
```

目的:拉下到指定高度，list才开始滚动

```javascript
panRef = React.createRef<PanGestureHandler>(); //创建一个ref对象
<PanGestureHandler ref={this.panRef} > //将ref绑定到PanGestureHandler
</PanGestureHandler>

<NativeViewGestureHandler waitFor={panRef}> //传入PanGestureHandler的ref，拦截flatlist的滚动事件，这会导致flatlist不能获取到手势，因为PanGestureHandler是连续手势响应组件，PanGestureHandler滚动的时候设置不了非激活状态
   <FlatList />
</NativeViewGestureHandler>
```



[点击响应组件 (wapper)

​	[ 拖动响应组件 (wapper)

​		[原生响应组件 (flatlist)]

​	]

]



在组件最外层建立点击响应组件，将点击响应组件的ref传给flatlist的waitFor，

拖动到指定高度将点击响应组件设置成不响应，这样原生响应组件就能继续获取手势的操作权

# 13.优化tab-view

yarn add react-native-tab-view-viewpager-adapter(适配器)

yarn  add @react-native-community/viewpager(core)