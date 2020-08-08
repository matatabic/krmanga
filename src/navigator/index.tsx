import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Detail from '@/pages/Detail';
import { Platform, StyleSheet, StatusBar } from 'react-native';
import CategorySetting from "@/pages/CategorySetting";
import HeaderRightBtn from "@/pages/CategorySetting/HeaderRightBtn";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "@/models/index";

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Detail: undefined;
  CategorySetting: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const mapStateToProps = ({}: RootState) => {
  return {}
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation
}

class Navigator extends React.Component<IProps> {

  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categorySetting/toggle'
    })
  }

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
              android:{
                headerStatusBarHeight: StatusBar.currentHeight,
              }
            }),
            headerBackTitleVisible: false,
            headerTintColor:'#333',
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }
              })
            }
          }}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              headerTitle: '首页'
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
          />
          <Stack.Screen
            name="CategorySetting"
            component={CategorySetting}
            options={{
              headerTitle: '分类设置',
              // headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connector(Navigator);
