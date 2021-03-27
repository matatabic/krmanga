import React from 'react';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {StyleSheet, View} from 'react-native';
import TopBar from "@/pages/Shelf/TopBar";
import {Color} from "@/utils/const";
import Shelf from "@/pages/Shelf";
import History from "@/pages/Shelf/History/index";
import Download from "@/pages/Shelf/Download/index";
import {ModalStackNavigation} from "@/navigator/index";

export type ShelfTabParamList = {
    [key: string]: undefined;
}

const Tab = createMaterialTopTabNavigator<ShelfTabParamList>();

interface IProps {
    navigation: ModalStackNavigation;
}

function ShelfTabs({navigation}: IProps) {

    const renderTabBar = (props: MaterialTopTabBarProps) => {
        return <TopBar react_navigation={navigation} {...props} />;
    };

    return (
            <Tab.Navigator
                lazy
                tabBar={renderTabBar}
                pager={props => <ViewPagerAdapter {...props}/>}
                tabBarOptions={{
                    scrollEnabled: true,
                    tabStyle: {
                        width: 50,
                        height: 45,
                        padding: 0,
                        margin: 0,
                    },
                    labelStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: Color.white,
                    },
                    indicatorStyle: {
                        height: 3,
                        width: 16,
                        marginLeft: 17,
                        marginBottom: 5,
                        borderRadius: 2,
                        backgroundColor: Color.white,
                    },
                    allowFontScaling: true,
                    activeTintColor: Color.dark_title,
                    inactiveTintColor: Color.black,
                }}>
                <Tab.Screen
                    key={"shelf-tab-1"}
                    name="收藏"
                    component={Shelf}
                />
                <Tab.Screen
                    key={"shelf-tab-2"}
                    name={"历史"}
                    component={History}
                />
                <Tab.Screen
                    key={"shelf-tab-3"}
                    name={"下载"}
                    component={Download}
                />
            </Tab.Navigator>
    )
}

export default ShelfTabs;