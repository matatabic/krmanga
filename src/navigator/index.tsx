import React from 'react';
import {
    NavigationContainer,
    RouteProp,
    NavigationState,
    DefaultTheme,
} from '@react-navigation/native';
import {
    createStackNavigator,
    StackNavigationProp,
    HeaderStyleInterpolators,
    CardStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';

import {
    statusBarHeight,
    navigationRef,
} from '@/utils/index';
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Brief from "@/pages/Brief";
import {Platform, StyleSheet} from "react-native";
import BottomTabs from "@/navigator/BottomTabs";
import {Color} from "@/utils/const";
import CategorySetting from "@/pages/CategorySetting";
import Search from "@/pages/Search";
import MangaView from "@/pages/MangaView";
import Guess from "@/pages/Guess";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export type RootStackParamList = {
    BottomTabs: {
        screen?: string;
    };
    Search: undefined;
    SearchBar: undefined;
    Guess: {
        headerTitle: string;
    };
    CategorySetting: undefined;
    Brief: {
        id: number;
    };
    CategoryTabs: undefined;
    MangaView: undefined;
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const RootStack = createStackNavigator<RootStackParamList>();

export type ModalStackParamList = {
    Root: undefined;
    Login: undefined;
    Register: undefined;
}

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const ModalStack = createStackNavigator<ModalStackParamList>();

function ModalStackScreen() {
    return (
        <ModalStack.Navigator
            mode="modal"
            headerMode="screen"
            screenOptions={() => ({
                ...TransitionPresets.ModalSlideFromBottomIOS,
                cardOverlayEnabled: true,
                gestureEnabled: true,
                headerTitleAlign: 'center',
                // headerStatusBarHeight: statusBarHeight,
                headerBackTitleVisible: false,
                headerTintColor: Color.white,
                headerStyle: {
                    backgroundColor: Color.theme,
                    ...Platform.select({
                        android: {
                            elevation: 0,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        },
                    }),
                },
            })}>
            <ModalStack.Screen
                name="Root"
                component={RootStackScreen}
                options={{headerShown: false}}
            />
            <ModalStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerTitle: '登录',
                }}
            />
            <ModalStack.Screen
                name="Register"
                component={Register}
                options={{
                    headerTitle: '登录',
                }}
            />
        </ModalStack.Navigator>
    )
}

function RootStackScreen() {
    return (
        <RootStack.Navigator
            headerMode="float"
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                // headerStatusBarHeight: statusBarHeight+getStatusBarHeight(),
                headerTintColor: Color.white,
                headerStyle: {
                    backgroundColor: Color.theme,
                    ...Platform.select({
                        android: {
                            elevation: 0,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        },
                    }),
                },
            }}>
            <RootStack.Screen
                name="BottomTabs"
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                }}
                component={BottomTabs}/>
            <RootStack.Screen
                name="Brief"
                component={Brief}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    cardStyle: {backgroundColor: Color.page_bg},
                }}
            />
            <RootStack.Screen
                name="CategorySetting"
                component={CategorySetting}
                options={{
                    headerTitle: '分类设置',
                }}
            />
            <RootStack.Screen
                name="Search"
                component={Search}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
            <RootStack.Screen
                name="MangaView"
                component={MangaView}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    cardStyle: {backgroundColor: Color.black},
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
            <RootStack.Screen
                name="Guess"
                component={Guess}
            />
        </RootStack.Navigator>
    )
}

function Navigator() {
    return (
        <NavigationContainer
            // ref={navigationRef}
        >
            <ModalStackScreen/>
        </NavigationContainer>
    );
}

export default Navigator;
