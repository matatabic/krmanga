import React from 'react';
import {Animated} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import {Platform, StyleSheet, StatusBar} from 'react-native';
import CategorySetting from '@/pages/CategorySetting';
import Brief from '@/pages/Brief';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: undefined;
  CategorySetting: undefined;
  Brief: {
    item: {
      id: string;
      title: string;
      image: string;
      category: string;
    };
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function getBriefOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Brief'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: 0,
    },
    headerBackground: () => {
      return <Animated.View style={styles.headerBackground} />;
    },
  };
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              headerTitle: '首页',
            }}
          />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen
            name="CategorySetting"
            component={CategorySetting}
            options={{
              headerTitle: '分类设置',
            }}
          />
          <Stack.Screen
            name="Brief"
            component={Brief}
            options={getBriefOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
