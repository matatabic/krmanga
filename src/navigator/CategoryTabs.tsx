import React, { useRef } from "react";
import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationProp
} from "@react-navigation/material-top-tabs";
import ViewPagerAdapter from "react-native-tab-view-viewpager-adapter";
import { RootState } from "@/models/index";
import { connect, ConnectedProps } from "react-redux";
import { createCategoryModel } from "@/config/dva";
import { Animated, StyleSheet, View } from "react-native";
import TopBar from "@/pages/Category/TopBar/index";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Color } from "@/utils/const";
import { useHeaderHeight } from "@react-navigation/stack";
import { viewportHeight } from "@/utils/index";
import { ICategory } from "@/models/categorySetting";
import Category from "@/pages/Category";
import { RootStackNavigation } from "@/navigator/index";

export type CategoryTabParamList = {
    [key: string]: {
        namespace: string;
        category_id: number;
    };
}

export type CategoryTabNavigation = MaterialTopTabNavigationProp<CategoryTabParamList>;

const Tab = createMaterialTopTabNavigator<CategoryTabParamList>();

const mapStateToProps = ({ category, categorySetting }: RootState) => {
    return {
        statusList: categorySetting.statusList,
        myCategoryList: categorySetting.myCategoryList,
        hideHeader: category.hideHeader,
        activeCategory: category.activeCategory
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

function CategoryTabs({ hideHeader, statusList, myCategoryList }: IProps) {

    const translateY = useRef(new Animated.Value(0)).current;
    const headerHeight = useHeaderHeight();
    const navigationHeight = headerHeight - getStatusBarHeight();

    const getTopOpacity = () => {
        return translateY.interpolate({
            inputRange: [-navigationHeight, 0],
            outputRange: [0, 1],
            extrapolate: "clamp"
        });
    };

    const showTopBar = () => {
        Animated.timing(translateY, {
            toValue: 0,
            useNativeDriver: true
        }).start();
    };

    const hideTopBar = () => {
        Animated.timing(translateY, {
            toValue: -navigationHeight,
            useNativeDriver: true
        }).start();
    };

    const addModel = (id: number) => {
        statusList.map(item => {
            createCategoryModel(`tab-category-${id}-status-${item.id}`);
        });
    };

    const renderScreen = (item: ICategory) => {
        addModel(item.id);
        return (
            <Tab.Screen
                key={`item-${item.id}`}
                name={item.name}
                component={Category}
                initialParams={{
                    namespace: `tab-category-${item.id}`,
                    category_id: item.id
                }}
                options={{
                    tabBarLabel: item.name
                }}
            />
        );
    };

    if (hideHeader) {
        hideTopBar();
    } else {
        showTopBar();
    }
    return (
        <View style={styles.container}>
            <View style={[styles.statusBar, {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: Color.page_bg
            }]} />
            <Animated.View style={[styles.statusBar, {
                backgroundColor: Color.theme,
                opacity: getTopOpacity()
            }
            ]} />
            <Animated.View style={[styles.tabBarView, {
                height: navigationHeight,
                backgroundColor: Color.theme,
                opacity: getTopOpacity(),
                transform: [{ translateY: translateY }]
            }]}>
                <Animated.Text style={[styles.title]}>漫画分类</Animated.Text>
            </Animated.View>
            <Animated.View style={{
                height: viewportHeight - getStatusBarHeight(),
                transform: [{ translateY: translateY }]
            }}>
                <Tab.Navigator
                    lazy
                    tabBar={(props) => <TopBar {...props} />}
                    pager={(props) => <ViewPagerAdapter {...props} />}
                    tabBarOptions={{
                        scrollEnabled: true,
                        tabStyle: {
                            width: 50,
                            height: 45,
                            padding: 0,
                            margin: 0
                        },
                        labelStyle: {
                            fontSize: 13
                        },
                        indicatorStyle: {
                            height: 3,
                            width: 16,
                            marginLeft: 17,
                            marginBottom: 5,
                            borderRadius: 2,
                            backgroundColor: Color.theme
                        },
                        allowFontScaling: true,
                        activeTintColor: Color.theme,
                        inactiveTintColor: Color.black
                    }}>
                    {myCategoryList.map(item => renderScreen(item))}
                </Tab.Navigator>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: getStatusBarHeight()
    },
    tabBarView: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16
    }
});

export default connector(CategoryTabs);
