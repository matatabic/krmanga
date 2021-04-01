import React from "react";
import {
    createBottomTabNavigator,
    BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";
import Home from "@/pages/Home";
import CategoryTabs from "@/navigator/CategoryTabs";
import Mine from "@/pages/Mine";
import Icon from "@/assets/iconfont/index";
import ShelfTabs from "@/navigator/ShelfTabs";
import { Color } from "@/utils/const";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";

export type BottomTabParamList = {
    Home: undefined;
    CategoryTabs: undefined;
    ShelfTabs: undefined;
    Mine: undefined;
};

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const mapStateToProps = ({ collection, history }: RootState) => {
    return {
        isEdit: collection.isEdit || history.isEdit
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

function BottomTabs({isEdit}:ModelState) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Color.theme
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "首页",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="icon-home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="CategoryTabs"
                component={CategoryTabs}
                options={{
                    tabBarLabel: "分类",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="icon-category" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="ShelfTabs"
                component={ShelfTabs}
                options={{
                    tabBarLabel: "书架",
                    tabBarVisible: !isEdit,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="icon-shujiashugui" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Mine"
                component={Mine}
                options={{
                    tabBarLabel: "我的",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="icon-mine" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default connector(BottomTabs);
